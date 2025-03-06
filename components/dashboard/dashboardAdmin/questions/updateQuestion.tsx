import { updateQuestion } from "@/utils/questions";
import styles from '@/styles/admin.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { questionSchema } from '@/validations/questionsSchema'; 
import { dataQuestion, UserIdProp } from "@/app/types";
import { useState } from "react";
import React from "react";

export const ChangueContentQuestion: React.FC<UserIdProp> = ({ userId }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<dataQuestion>({
    resolver: zodResolver(questionSchema),
  });

  const mutation = useMutation(
    (data: dataQuestion) => updateQuestion(data, userId),
    {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const onSubmit: SubmitHandler<dataQuestion> = (data) => {
    mutation.mutate(data);
  };

  const handleEdit = () => {
    setEdit(prevState => !prevState);
  };

  return (
    <>
      <button onClick={handleEdit} className={styles.roleButton}>
        {edit ? "Cancelar" : "Editar Pregunta"}
      </button>
      {edit && (
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
              mutation.isError ? styles.errorMessage
              : mutation.isSuccess ? styles.successMessage
              : mutation.isLoading ? styles.loading
              : styles.roleButton
            }
            type="submit"
            disabled={mutation.isLoading || mutation.isSuccess}
          >
            {mutation.isLoading ? "Actualizando..." 
            : mutation.isSuccess ?  "" : "Actualizar"}
          </button>
          {mutation.isSuccess && <p className={styles.successMessage}>Pregunta actualizada</p>}
          {mutation.isError && <p className={styles.errorMessage}>Error al actualizar pregunta</p>}
        </form>
      )}
    </>
  );
};