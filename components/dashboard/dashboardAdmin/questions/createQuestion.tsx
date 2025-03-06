import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { questionSchema } from '@/validations/questionsSchema'; 
import { createQuestion } from "@/utils/questions";
import { dataQuestion } from '@/app/types';
import styles from '@/styles/admin.module.css';



export const NewQuestion = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<dataQuestion>({
    resolver: zodResolver(questionSchema),
  });
  const mutation = useMutation((data: dataQuestion) => createQuestion(data), {
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const onSubmit: SubmitHandler<dataQuestion> = async (data) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.questionForm}>
      <label htmlFor="question">
        {errors.question ? errors.question.message : "Pregunta"}
      </label>
      <input
        {...register("question")}
        type="text"
        name="question"
      />
      <label htmlFor="answer">
        {errors.answer ? errors.answer.message : "Respuesta"}
      </label>
      <input
        {...register("answer")}
        type="text"
        name="answer"
      />
      <button 
        className={
          mutation.isSuccess
          ? styles.successMessage
          : mutation.isError
          ? styles.errorMessage
          :
          styles.roleButton}
        type="submit"
        disabled={mutation.isLoading 
          || mutation.isError 
          || mutation.isSuccess}
        
        >
        {mutation.isLoading ? "Creando..."
        : mutation.isSuccess ? "Creado"
        : mutation.isError ? "Error intente mas tarde"
        : "Crear"}
      </button>
    </form>
  );
};