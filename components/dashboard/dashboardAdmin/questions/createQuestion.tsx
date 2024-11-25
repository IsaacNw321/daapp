import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionSchema } from '../../../../validations/questionsSchema'; 
import { createQuestion } from "@/utils/questions";
import { dataQuestion } from '@/app/types';
import styles from '../../../../styles/admin.module.css';



export const NewQuestion = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<dataQuestion>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit: SubmitHandler<dataQuestion> = async (data) => {
    try {
      const response = await createQuestion(data);
      console.log(response)
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
      <button className={styles.roleButton} type="submit">
        Crear
      </button>
    </form>
  );
};