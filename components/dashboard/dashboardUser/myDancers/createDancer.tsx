"use client"
import styles from "@/styles/dashboard.module.css"
import React, { useState } from 'react';
import { createDancer, createDancerR } from "@/utils/dancers";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {danceRSchema} from "@/validations/dancerRSchema";
import { DancerR, createDanceProps } from "@/app/types";
export const CreateDancer = ({userRole, representativeId, numberDancers} : createDanceProps) =>{

   const {register,handleSubmit,watch, formState: {errors}} = useForm<DancerR>({
    resolver: zodResolver(danceRSchema)
  });
  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<boolean>(false);
  const [dancerData, setDancerData] = useState({
    firstName: '',
    lastName: '',
    allergies: '',
    cI: '',
    age: '',
    dateBirth: '',
  });
  
  const onSubmit: SubmitHandler<DancerR> = async (data) => {
    try {
      const { firstName, lastName, allergies } = data;
      const dateBirth = new Date(data.dateBirth)
      const age = Number(data.age)
      const cI = Number(data.cI)
      const dancerData = { firstName, lastName, allergies, cI, age, dateBirth, representativeId  };
      const newUserResponse = await createDancerR(dancerData);
     if(newUserResponse){
       setShowSucess(true);
       setTimeout(() => {
           setShowSucess(false);
       }, 3000);
       setDancerData({
         firstName: '',
         lastName: '',
         allergies: '',
         cI: '',
         age: '',
         dateBirth: '',
       })
     }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddDancer = () => {
    setShowAddDancerForm((prevShowAddDancerForm) => !prevShowAddDancerForm);
    setShowSucess(false); 
    setTextButton((prevShowAddDancerForm) => !prevShowAddDancerForm);
  };
  
  if (numberDancers !== undefined && numberDancers >2) {
    return null; 
  }
  
  return (
    <>
      <div>
        <div className={userRole === "REPRESENTATIVE" ? styles.leftCont : styles.none}>
          {userRole === "REPRESENTATIVE" && (
            <button onClick={handleAddDancer} className={styles.button}>
              {textButton === false ? "Registrar Bailarin" : "Ocultar formulario"}
            </button>
          )}
          {showAddDancerForm && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
              <label htmlFor="firstName">
                {errors.firstName ? errors.firstName.message : "Nombre"}
              </label>
              <input
                {...register("firstName")}
                type="text"
                placeholder="Nombre"
                value={dancerData.firstName}
                onChange={(e) => setDancerData({ ...dancerData, firstName: e.target.value })}
              />
  
              <label htmlFor="lastName">
                {errors.lastName ? errors.lastName.message : "Apellido"}
              </label>
              <input
                {...register("lastName")}
                type="text"
                placeholder="Apellido"
                value={dancerData.lastName}
                onChange={(e) => setDancerData({ ...dancerData, lastName: e.target.value })}
              />
  
              <label htmlFor="allergies">
                {errors.allergies ? errors.allergies.message : "Alergias"}
              </label>
              <input
                {...register("allergies")}
                type="text"
                placeholder="Alergias"
                value={dancerData.allergies}
                onChange={(e) => setDancerData({ ...dancerData, allergies: e.target.value })}
              />
  
              <label htmlFor="cI">
                {errors.cI ? errors.cI.message : "CI"}
              </label>
              <input
                {...register("cI")}
                type="number"
                placeholder="CI"
                value={dancerData.cI}
                onChange={(e) => setDancerData({ ...dancerData, cI: e.target.value })}
              />
  
              <label htmlFor="age">
                {errors.age ? errors.age.message : "Edad"}
              </label>
              <input
                {...register("age")}
                type="number"
                placeholder="Edad"
                value={dancerData.age}
                onChange={(e) => setDancerData({ ...dancerData, age: e.target.value })}
              />
  
              <label htmlFor="dateBirth">
                {errors.dateBirth ? errors.dateBirth.message : "Fecha de Nacimiento"}
              </label>
              <input
                {...register("dateBirth")}
                type="date"
                value={dancerData.dateBirth}
                onChange={(e) => setDancerData({ ...dancerData, dateBirth: e.target.value })}
              />
              <button type="submit">Inscribir Bailarin</button>
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

export default createDancer;