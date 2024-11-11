"use client"
import styles from "../../../../styles/dashboard.module.css"
import React, { useState, useEffect } from 'react';
import { postUser } from "../../../../utils/users";
import { createDancer, createDancerR, updateDancer } from "../../../../utils/dancers";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {infoDancerSchema} from "../../../../validations/userSchema";
import { createDanceProps, infoDancer, infoDancerProps, postDancers, PostedDancerR, postedUser, updatedDancer } from "../../../../app/types";
import { DancerR } from "../../../../app/types";
export const InfoDancer: React.FC<infoDancerProps> = ({userRole, dancerId}) =>{

   const {register,handleSubmit,watch, formState: {errors}} = useForm<infoDancer>({
    resolver: zodResolver(infoDancerSchema)
  });
  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<boolean>(false);
  const [dancerData, setDancerData] = useState({
    allergies: "",
    cI: "",
    age: "",
    dateBirth: "",
    phone : ""
  });
  
  const onSubmit: SubmitHandler<infoDancer> = async (data: updatedDancer) => {
    try {
      const { allergies } = data;
      const cI = Number(data.cI);
      const age = Number(data.age);
      const phone = Number(data.phone);
      const dateBirth = new Date(data.dateBirth);
  
      const dancerData = { allergies, cI, age, dateBirth, phone };
      const newUserResponse = await updateDancer(dancerId, dancerData);
  
      if (newUserResponse) {
        setShowSucess(true);
        setTimeout(() => {
          setShowSucess(false);
        }, 3000);
        setDancerData({
          allergies: "",
          cI: "",
          age: "",
          dateBirth: "",
          phone: ""
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
        <div className={userRole === "DANCER" ? styles.leftCont : styles.none}>
          {userRole === "DANCER" && (
            <button onClick={handleUpdateDancer} className={styles.button}>
              {textButton === false ? "Completar Datos" : "Ocultar formulario"}
            </button>
          )}
          {showAddDancerForm && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>          
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