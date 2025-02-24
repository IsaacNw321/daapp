"use client"
import styles from "@/styles/dashboard.module.css"
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
  dancerR : boolean;
}

export const InfoDancer = ({dancerId, dancerR} : InfoDancerProps) =>{
  
  const [showAddDancerForm, setShowAddDancerForm] = useState(false);
  const [showSuccess, setShowSucess] = useState<boolean>(false);
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
  const {register,handleSubmit,watch, formState: {errors}} = useForm<infoDancer>({
    resolver: zodResolver(infoDancerSchema)
  });
  const onSubmit: SubmitHandler<infoDancer> = async (data) => {
    try {
      const { allergies, firstName, lastName, Adress } = data;
      const cI = Number(data.cI);
      const age = Number(data.age);
      const phone = Number(data.phone);
      const dateBirth = new Date(data.dateBirth);
  
      const dancerData = { firstName, lastName, allergies, cI, age, dateBirth, phone, Adress };   
        const updateDancerResponse = await updateDancer(dancerId, dancerData);
        if (updateDancerResponse) {
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
    setShowAddDancerForm(!showAddDancerForm);
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
            { name: 'phone', label: 'Phone', type: 'number' },
            { name: 'age', label: 'Edad', type: 'number' },
            { name: 'Adress', label: 'Dirección', type: 'text' },
            { name: 'dateBirth', label: 'Fecha de Nacimiento', type: 'date' },
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
          <button type="submit" className={styles.submitButton}>Actualizar Datos</button>
        </form>
      </div>
      {showSuccess && (
        <div className={styles.successMessage}>
          La informacion ha sido guardada!
        </div>
      )}
    </div>
  );
}

