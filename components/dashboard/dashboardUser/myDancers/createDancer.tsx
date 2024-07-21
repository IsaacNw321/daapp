"use client"
import styles from "../../../../styles/dashboard.module.css"
import React, { useState, useEffect } from 'react';
import { postUser } from "../../../../utils/users";
import { createDancer } from "../../../../utils/dancers";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {userSchema} from "../../../../validations/userSchema";
import { createDanceProps, postedUser } from "../../../../app/types";
import { DancerR } from "../../../../app/types";
export const CreateDancer: React.FC<createDanceProps> = ({userRole, representativeId, numberDancers}) =>{

   const {register,handleSubmit,watch, formState: {errors}} = useForm<DancerR>({
    resolver: zodResolver(userSchema)
  });
  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<boolean>(false);
  const [dancerData, setDancerData] = useState({ firstName: '', lastName: '', email: '' });
  
  const onSubmit: SubmitHandler<DancerR> = async (data: postedUser) => {
    try {
      const { firstName, lastName, email } = data;
      const userData = { firstName, lastName, email };
      const newUserResponse = await postUser(userData);
      if (newUserResponse && newUserResponse.id) {
        const userId = newUserResponse.id;
        const createDancerData = { userId, representativeId };
        const newDancerResponse = await createDancer(createDancerData);
      } else {
        console.error("User response is null or does not contain an id property");
      }
      setShowSucess(true);
      setTimeout(() => {
          setShowSucess(false);
      }, 3000);
      setDancerData({firstName: "", lastName: "", email : ""})
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
              <input  {...register("firstName")}type="text" placeholder="Nombre" value={dancerData.firstName} onChange={(e) => setDancerData({ ...dancerData, firstName: e.target.value })} />
              <label htmlFor="lastName">
        {
          errors.lastName ? errors.lastName.message : "Apellido"
        }
        </label>
              <input   {...register("lastName")}type="text" placeholder="Apellido" value={dancerData.lastName} onChange={(e) => setDancerData({ ...dancerData, lastName: e.target.value })} />
              <label htmlFor="email">
      {
       errors.email ? errors.email.message : "Correo electronico"
      }
      </label>
              <input {...register("email")} type="email" placeholder="Correo" value={dancerData.email} onChange={(e) => setDancerData({ ...dancerData, email: e.target.value })} />
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