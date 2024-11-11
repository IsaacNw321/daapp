"use client"
import styles from "../../../../styles/dashboard.module.css"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { infoRepresentativeSchema } from "../../../../validations/userSchema";
import { createDanceProps, infoRepresentative, infoRepresentativeProps } from "../../../../app/types";
import { updatedRepresentative } from "@/utils/representative";

export const InfoRepresentative: React.FC<infoRepresentativeProps> = ({ userRole, representativeId }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<infoRepresentative>({
    resolver: zodResolver(infoRepresentativeSchema)
  });

  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<boolean>(false);
  const [representativeData, setRepresentativeData] = useState({
    Adress: '',
    phone: ''
  });

  const onSubmit: SubmitHandler<infoRepresentative> = async (data: infoRepresentative) => {
    try {
      const { Adress } = data;
      const phone = Number(data.phone)
      const representativeData = { Adress, phone };
      const newUserResponse = await updatedRepresentative(representativeId, representativeData);
      if (newUserResponse) {
        setShowSucess(true);
        setTimeout(() => {
          setShowSucess(false);
        }, 3000);
        setRepresentativeData({
          Adress: '',
          phone: ''
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
    <>
      <div>
        <div className={userRole === "REPRESENTATIVE" ? styles.leftCont : styles.none}>
          {userRole === "REPRESENTATIVE" && (
            <button onClick={handleUpdatedRepresentative} className={styles.button}>
              {textButton === false ? "Completar Datos" : "Ocultar formulario"}
            </button>
          )}
          {showAddDancerForm && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
              <label htmlFor="Adress">
                {errors.Adress ? errors.Adress.message : "Dirección"}
              </label>
              <input
                {...register("Adress")}
                type="text"
                placeholder="Dirección"
                value={representativeData.Adress}
                onChange={(e) => setRepresentativeData({ ...representativeData, Adress: e.target.value })}
              />

              <label htmlFor="phone">
                {errors.phone ? errors.phone.message : "Teléfono"}
              </label>
              <input
                {...register("phone")}
                type="text"
                placeholder="Teléfono"
                value={representativeData.phone}
                onChange={(e) => setRepresentativeData({ ...representativeData, phone: e.target.value })}
              />

              <button type="submit">Actualizar Información</button>
            </form>
          )}
        </div>
        {showSuccess && (
          <div className={styles.successMessage}>
            La informacion ha sido guardada!
          </div>
        )}
      </div>
    </>
  );
};

export default InfoRepresentative;