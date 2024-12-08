"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/styles/dashboard.module.css';

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

export default function EnhancedForm() {
  const [showAddDancerForm, setShowAddDancerForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const { register, handleSubmit, formState: { errors } } = useForm<DancerData>();

  const onSubmit = (data: DancerData) => {
    console.log(data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleUpdateDancer = () => {
    setShowAddDancerForm(!showAddDancerForm);
  };

  return (
    <div className={styles.formContainer}>
      <button onClick={handleUpdateDancer} className={styles.button}>
        {showAddDancerForm ? "Ocultar formulario" : "Completar Datos"}
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

