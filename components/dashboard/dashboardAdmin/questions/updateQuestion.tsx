import { updateQuestion } from "@/utils/questions"
import styles from '../../../../styles/admin.module.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { questionSchema } from '../../../../validations/questionsSchema'; 
import { dataQuestion } from "@/app/types";
import React from "react";
export const ChangueContentQuestion : React.FC<string> = (id) => {
  const { register, handleSubmit, formState: { errors } } = useForm<dataQuestion>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit: SubmitHandler<dataQuestion> = async (data) => {
    try {
      const response = await updateQuestion(data , id);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };
  return(
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
        Actualizar
      </button>
    </form>
  )
}