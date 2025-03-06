"use client"
import styles from "@/styles/dashboard.module.css"
import { useState } from 'react';
import { updateDancerR } from "@/utils/dancers";
import { useMutation } from "react-query";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {danceRSchema} from "@/validations/dancerRSchema";
import { DancerRSubmitData } from "@/app/types";

const InfoDancerR = ({ dancerId }: any) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DancerRSubmitData>({
      resolver: zodResolver(danceRSchema)
  });
  const mutation = useMutation((dancerData: DancerRSubmitData) => updateDancerR(dancerId, dancerData), {
      onSuccess: () => {
            reset();
        },
        onError: (error) => {
            console.error(error);
        }
    });
  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);;
  const [textButton, setTextButton] = useState<boolean>(false);
  const [dancerData, setDancerData] = useState({
      firstName: '',
      lastName: '',
      allergies: '',
      cI: '',
      age: '',
      dateBirth: '',
  });
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();

    return age;
};

  const onSubmit: SubmitHandler<DancerRSubmitData> = async (data) => {
      try {
          const { firstName, lastName, allergies } = data;
          const age = Number(calculateAge(String(data.dateBirth)));
          const cI = Number(data.cI);
          const dateBirth = new Date(data.dateBirth);
          const dancerData = { firstName, lastName, allergies, cI, age, dateBirth };
          mutation.mutate(dancerData);
      } catch (error) {
          console.error(error);
      }
  };

 const handleForm = () =>{
    setShowAddDancerForm(!showAddDancerForm);
 }
  return (
      <>
          <div className={styles.formContainer}>
              <button onClick={() => handleForm()} className={styles.button}>
                  {textButton === false ? "Editar informacion" : "Ocultar"}
              </button>
              <div className={`${styles.formWrapper} ${showAddDancerForm ? styles.open : ''}`}>
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

                          <label htmlFor="dateBirth">
                              {errors.dateBirth ? errors.dateBirth.message : 'Fecha'}
                          </label>
                          <input
                              type="date"
                              placeholder="Fecha"
                              value={dancerData.dateBirth}
                              {...register('dateBirth')}
                              onChange={(e) => {
                                  const newDate = e.target.value;
                                  setDancerData({
                                      ...dancerData,
                                      dateBirth: newDate,
                                      age: calculateAge(newDate).toString()
                                  });
                              }}
                          />

                          <label htmlFor="age">
                              {errors.age ? errors.age.message : 'Edad'}
                          </label>
                          <input
                              type="number"
                              placeholder="Edad"
                              value={dancerData.age}
                              {...register('age')}
                              readOnly
                          />
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
              ? ('Cargando...') 
              : mutation.isError 
              ? ('Error intente mas tarde') 
              : mutation.isSuccess 
              ? ('Datos actualizados') 
              : ('Actualizar')}
            </button>
                      </form>
                  )}
              </div>
          </div>
      </>
  );
};

export default InfoDancerR;