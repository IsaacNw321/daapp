"use client"
import styles from "@/styles/dashboard.module.css"
import { useMutation } from 'react-query';
import React, { useState } from 'react';
import { updateDancer} from "@/utils/dancers";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {infoDancerSchema} from "@/validations/dancerSchema";
import { infoDancer, infoDancerProps } from "@/app/types";

interface DancerData {
  firstName: string;
  lastName: string;
  allergies: string;
  cI: string;
  phone: string;
  age: string;
  Adress: string;
  dateBirth: string;
}

interface InfoDancerProps {
  dancerId?: string;
}

export const InfoDancer = ({dancerId} : InfoDancerProps) =>{
  
  const [showAddDancerForm, setShowAddDancerForm] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState<string>('0424');
  const [dancerData, setDancerData] = useState<DancerData>({
    firstName: '',
    lastName: '',
    allergies: '',
    cI: '',
    phone: '',
    age: '',
    Adress: '',
    dateBirth: '',
  });
  
  const {register,handleSubmit,watch, formState: {errors}, reset} = useForm<infoDancer>({
    resolver: zodResolver(infoDancerSchema)
  });
  const mutation = useMutation((dancerData:any) => updateDancer(dancerId, dancerData), {
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error(error);
    }
  });
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhonePrefix(e.target.value);
  };
  const onSubmit: SubmitHandler<infoDancer> = async (data) => {
    try {
      const { allergies, firstName, lastName, Adress } = data;
      console.log(data)
      const cI = Number(data.cI);
      const age = Number(calculateAge(String(data.age)));
      const phone = Number(phonePrefix.concat(String(data.phone))); 
      const dateBirth = new Date(data.dateBirth);
      const dancerData = { firstName, lastName, allergies, cI, age, dateBirth, phone, Adress };   
      mutation.mutate(dancerData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDancer = () => {
    setShowAddDancerForm(!showAddDancerForm);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    return age;
};

  return (
    <div className={styles.formContainer}>
      <button onClick={handleUpdateDancer} className={styles.button}>
        {showAddDancerForm ? "Ocultar" : "Completar Datos"}
      </button>
      <div className={`${styles.formWrapper} ${showAddDancerForm ? styles.open : ''}`}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
          {[
            { name: 'firstName', label: 'Nombre', type: 'text' },
            { name: 'lastName', label: 'Apellido', type: 'text' },
            { name: 'allergies', label: 'Alergias', type: 'text' },
            { name: 'cI', label: 'CI', type: 'number' },
            { name: 'Adress', label: 'Dirección', type: 'text' },
          ].map((field) => (
            <div key={field.name} className={styles.inputGroup}>
              <label htmlFor={field.name}>
                {errors[field.name as keyof DancerData]
                  ? errors[field.name as keyof DancerData]?.message
                  : field.label}
              </label>
              <input
                {...register(field.name as keyof DancerData)}
                type={field.type}
                placeholder={field.label}
                value={dancerData[field.name as keyof DancerData]}
                onChange={(e) => setDancerData({...dancerData, [field.name]: e.target.value})}
              />
            </div>
          ))}
          <div className={styles.inputGroup}>
            <label htmlFor="dateBirth">
              {errors.dateBirth ? errors.dateBirth.message : 'Fecha'}
            </label>
            <input
              type="date"
              placeholder="Fecha"
              value={dancerData.dateBirth}
              {...register('dateBirth')}
              onChange={(e) => setDancerData({...dancerData, dateBirth: e.target.value, age: calculateAge(e.target.value).toString()})}
            />
            <label htmlFor="age">
              {errors.age ? errors.age.message : 'Edad'}
            </label>
            <input
              type="number"
              placeholder="Edad"
              value={Number(dancerData.age)}
              {...register('age')}
              readOnly
            />
          </div>
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
                <option value="0412">0412</option>
              </select>
              <input
                {...register('phone')}
                type="number"
                placeholder="Numero"
              />
            </div>
          </div>
          <button
              type="submit"
              disabled={mutation.isLoading}
              className={
                mutation.isError
                ? styles.errorMessage
                : mutation.isSuccess
                ? styles.successMessage
                : styles.submitButton
              }
            >
            {mutation.isLoading
              ? (<span className={styles.loadingSpinner}></span>) 
              : mutation.isError 
              ? ('Error intente mas tarde') 
              : mutation.isSuccess 
              ? ('Datos actualizados') 
              : ('Actualizar')}
            </button>
        </form>
      </div>
    </div>
  );
}

