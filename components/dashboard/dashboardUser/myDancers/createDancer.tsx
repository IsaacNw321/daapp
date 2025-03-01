"use client"
import styles from "@/styles/dashboard.module.css";
import { useState } from 'react';
import { useMutation } from 'react-query';
import { createDancerR } from "@/utils/dancers";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { danceRSchema } from "@/validations/dancerRSchema";
import { DancerR, createDanceProps } from "@/app/types";

type DancerRSubmitData = Omit<DancerR, 'id' | 'Payment'>;

interface DancerRData {
  firstName: string;
  lastName: string;
  allergies: string;
  cI: string;
  age: string;
  dateBirth: string;
}

export const CreateDancer = ({ representativeId, numberDancers }: createDanceProps) => {
  const [dancerData, setDancerData] = useState<DancerRData>({
    firstName: '',
    lastName: '',
    allergies: '',
    cI: '',
    age: '',
    dateBirth: ''
  });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DancerRSubmitData>({
    resolver: zodResolver(danceRSchema)
  });

  const mutation = useMutation((dancerData: DancerRSubmitData) => createDancerR(dancerData), {
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const [showAddDancerForm, setShowAddDancerForm] = useState<boolean>(false);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    return age;
  };

  const onSubmit: SubmitHandler<DancerRSubmitData> = async (data) => {
    try {
      const { firstName, lastName, allergies, dateBirth, cI } = data;
      const age = Number(calculateAge(String(dateBirth)));
      const dancerData = { firstName, lastName, allergies, cI: Number(cI), age, dateBirth: new Date(dateBirth), representativeId };
      mutation.mutate(dancerData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDancer = () => {
    setShowAddDancerForm((prevShowAddDancerForm) => !prevShowAddDancerForm);
  };
  const handleAge = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDancerData({...dancerData, 
      dateBirth: newDate, 
      age: calculateAge(e.target.value).toString()})
}
  if (numberDancers !== undefined && numberDancers > 2) {
    return (
      <div className={styles.formContainer}>
        <p style={{ color: 'white' }}>
          Ya tienes a tus bailarines inscritos
        </p> 
      </div>
    );
  }
  return (
    <>
      <div className={styles.formContainer}>
        <button onClick={handleAddDancer} className={styles.button}>
          {showAddDancerForm ? "Ocultar" : "Inscribir Bailarin"}
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
                onChange={(e) => handleAge(e)}
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
                      ? ('Bailarin Registrado')
                      : ('Registrar')}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateDancer;