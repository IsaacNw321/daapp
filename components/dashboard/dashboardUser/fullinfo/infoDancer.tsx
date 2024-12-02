"use client"
import styles from "@/styles/dashboard.module.css"
import React, { useState } from 'react';
import { updateDancer } from "@/utils/dancers";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {infoDancerSchema} from "@/validations/dancerSchema";
import { infoDancer, infoDancerProps } from "@/app/types";
export const InfoDancer = ({dancerId} : infoDancerProps) =>{

   const {register,handleSubmit,watch, formState: {errors}} = useForm<infoDancer>({
    resolver: zodResolver(infoDancerSchema)
  });
  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<boolean>(false);
  const [dancerData, setDancerData] = useState({
    firstName : "",
    lastName : "",
    allergies: "",
    cI: "",
    age: "",
    dateBirth: "",
    phone : "",
    Adress : ""
  });
  
  const onSubmit: SubmitHandler<infoDancer> = async (data) => {
    try {
      const { allergies, firstName, lastName, Adress } = data;
      const cI = Number(data.cI);
      const age = Number(data.age);
      const phone = Number(data.phone);
      const dateBirth = new Date(data.dateBirth);
  
      const dancerData = { firstName, lastName, allergies, cI, age, dateBirth, phone, Adress };
      const newUserResponse = await updateDancer(dancerId, dancerData);
  
      if (newUserResponse) {
        setShowSucess(true);
        setTimeout(() => {
          setShowSucess(false);
        }, 3000);
        setDancerData({
          firstName : "",
          lastName : "",
          allergies: "",
          cI: "",
          age: "",
          dateBirth: "",
          phone: "",
          Adress : ""
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateDancer = () => {
    setShowAddDancerForm((prevShowAddDancerForm) => !prevShowAddDancerForm);
    setShowSucess(false); 
    setTextButton((prevShowAddDancerForm) => !prevShowAddDancerForm);
  };
  
  
  return (
    <>
      <div>
        <div className={styles.leftCont}>
            <button onClick={handleUpdateDancer} className={styles.button}>
              {textButton === false ? "Completar Datos" : "Ocultar formulario"}
            </button>
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
                onChange={(e) => {
                  setDancerData({...dancerData, firstName: e.target.value });
                }}
              />
              <label htmlFor="lastName">
                {
                  errors.lastName ? errors.lastName.message : "Apellido"
                }
             </label>
              <input   
                {...register("lastName")}
                type="text"
                placeholder="Apellido"
                value={dancerData.lastName}
                onChange={(e) => setDancerData({...dancerData, lastName : e.target.value})}
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
                 <label htmlFor="phone">
                {errors.cI ? errors.cI.message : "Phone"}
              </label>
              <input
                {...register("phone")}
                type="number"
                placeholder="phone"
                value={dancerData.phone}
                onChange={(e) => setDancerData({ ...dancerData, phone: e.target.value })}
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
               <label htmlFor="Adress">
                {errors.Adress ? errors.Adress.message : "Dirección"}
              </label>
              <input
                {...register("Adress")}
                type="text"
                placeholder="Dirección"
                value={dancerData.Adress}
                onChange={(e) => setDancerData({ ...dancerData, Adress: e.target.value })}
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

export default InfoDancer;