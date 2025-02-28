"use client"
import styles from "@/styles/dashboard.module.css"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { infoRepresentativeSchema } from "@/validations/representativeSchema";
import { infoRepresentative, infoRepresentativeProps } from "@/app/types";
import { updatedRepresentative } from "@/utils/representative";



export const InfoRepresentative : React.FC<infoRepresentativeProps> = ({representativeId} ) => {

  const { register, handleSubmit, formState: { errors } } = useForm<infoRepresentative>({
    resolver: zodResolver(infoRepresentativeSchema)
  });

  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
  const [phonePrefix, setPhonePrefix] = useState<string>('0424');
  const [textButton, setTextButton] = useState<boolean>(false);
  const [representativeData, setRepresentativeData] = useState({
    firstName : '',
    lastName : '',
    Adress: '',
    phone: '',
    cI: ''
  });
 const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
     setPhonePrefix(e.target.value);
   };
  const onSubmit: SubmitHandler<infoRepresentative> = async (data) => {
    try {
      const { Adress, firstName, lastName } = data;
      const phone = Number(phonePrefix.concat(String(data.phone))); 
      const CI = Number(data.cI)
      const representativeData = { firstName , lastName, Adress, phone, CI };
      console.log(representativeData)
      const newUserResponse = await updatedRepresentative(representativeId, representativeData);
      if (newUserResponse) {
        setShowSucess(true);
        setTimeout(() => {
          setShowSucess(false);
        }, 3000);
        setRepresentativeData({
          firstName : '',
          lastName : '',
          Adress: '',
          phone: '',
          cI: ''
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatedRepresentative = () => {
    setShowAddDancerForm((prevShowAddDancerForm) => !prevShowAddDancerForm);
    setShowSucess(false);
    setTextButton((prevShowAddDancerForm) => !prevShowAddDancerForm);
  };
  return (
    <div className={styles.formContainer}>
      <button onClick={handleUpdatedRepresentative} className={styles.button}>
        {textButton === false ? "Completar Datos" : "Ocultar"}
      </button>
      <div className={`${styles.formWrapper} ${showAddDancerForm ? styles.open : ''}`}>
        {showAddDancerForm && (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
            {[
              { name: 'firstName', label: 'Nombre', type: 'text' },
              { name: 'lastName', label: 'Apellido', type: 'text' },
              { name: 'cI', label: 'Cedula', type: 'number' },
              { name: 'Adress', label: 'Dirección', type: 'text' },
            ].map((field) => (
              <div key={field.name} className={styles.inputGroup}>
                <label htmlFor={field.name}>
                  {errors[field.name as keyof infoRepresentative]
                    ? errors[field.name as keyof infoRepresentative]?.message
                    : field.label}
                </label>
                <input
                  {...register(field.name as keyof infoRepresentative)}
                  type={field.type}
                  placeholder={field.label}
                  value={representativeData[field.name as keyof infoRepresentative]}
                  onChange={(e) => setRepresentativeData({ ...representativeData, [field.name]: e.target.value })}
                />
              </div>
            ))}
            <div className={styles.inputGroup}>
              <label htmlFor="phone">
                {errors.phone ? errors.phone.message : 'Telefono'}
              </label>
            <div className={styles.phoneInput}>
              <select
                onChange={(e) => handleSelect(e)}
              >
                <option value="0424">0424</option>
                <option value="0414">0414</option>
                <option value="0416">0416</option>
                <option value="0426">0426</option>
              </select>
              <input
                {...register('phone')}
                type="number"
                placeholder="Numero"
              />
            </div>
            </div>
            <button type="submit" className={styles.submitButton}>Actualizar Información</button>
          </form>
        )}
      </div>
      {showSuccess && (
        <div className={styles.successMessage}>
          La informacion ha sido guardada!
        </div>
      )}
    </div>
  );
};

export default InfoRepresentative;