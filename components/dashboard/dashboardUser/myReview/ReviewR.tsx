"use client";
import styles from "@/styles/dashboard.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/validations/reviewSchema";
import { updatedReview, postedReviewRepresentative } from "@/utils/reviews";
import { Content, ReviewRProps } from "@/app/types";
import { useState } from "react";

const ReviewR = ({ representativeId, reviewId }: ReviewRProps) => {
  const [content, setContent] = useState({ content: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Content>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit: SubmitHandler<Content> = async (data) => {
    const { content } = data;
    const infoReview = { content, representativeId };
    const editReview = { content, reviewId };

    try {
      setIsLoading(true);
      if (reviewId) {
        const updateReview = await updatedReview(editReview);
        if (updateReview === 200) {
          setShowSuccess(true);
        } else {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 5000);
        }
      } else {
        const createReview = await postedReviewRepresentative(infoReview);
        if (createReview) {
          setShowSuccess(true);
        } else {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 5000);
        }
      }
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
        <p className={styles.text}>Nos interesa la opinion de cada Representante</p>
        <label htmlFor="content">
          {errors.content ? errors.content.message : "Comentario"}
        </label>
        {reviewId ? <p>Comentario guardado exitosamente R</p> : <p>Aun no has hecho tu comentario</p>}
        <input
          {...register("content")}
          className={styles.reviewC}
          type="text"
          id="content"
          name="content"
          value={content.content}
          onChange={(e) => setContent({ ...content, content: e.target.value })}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={
            isError
              ? styles.errorMessage
              : showSuccess
                ? styles.successMessage
                : styles.submitButton
          }
        >
          {isLoading ? (
            'Cargando...'
          ) : isError ? (
            'Error intente mas tarde'
          ) : showSuccess ? (
            'Comentario Creado'
          ) : reviewId ? (
            'Actualizar Comentario'
          ) : (
            'Crear Comentario'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewR;