"use client"
import styles from "@/styles/dashboard.module.css"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {reviewSchema} from "@/validations/reviewSchema";
import { updatedReview, postedReviewDancer } from "@/utils/reviews";
import { useState } from "react";
import { ReviewDProps, Content } from "@/app/types";
const ReviewD = ({dancerId, reviewId} : ReviewDProps) =>{
  const [content, setContent] = useState({ content: '' }); 
  const [showSuccess, setShowSucess] = useState(false);
  const {register,handleSubmit,watch, formState: {errors}} = useForm<Content>({
    resolver: zodResolver(reviewSchema)
  });
  const onSubmit: SubmitHandler<Content> = async (data) =>{
     const {content} = data ;
     const infoReview = {content, dancerId}
     const editReview = {content, reviewId}
    try {
        if (reviewId) {
          const updateReview =  await updatedReview(editReview)
          if(updateReview){
            setShowSucess(true);
            setTimeout(() => {
                setShowSucess(false);
            }, 3000);
            setContent({ content: "" });
          }
        } else {
          const createReview = await postedReviewDancer(infoReview)
          if(createReview){
            setShowSucess(true);
            setTimeout(() => {
                setShowSucess(false);
            }, 3000);
            setContent({ content: "" });
          }
        } 
  }  catch (error) {
    alert(error);
  }
  }
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
        <p className={styles.text}>Nos interesa la opinion de cada Bailarin</p>
        <label htmlFor="content">
          {errors.content ? errors.content.message : "Comentario"}
        </label>
        {reviewId ? <p>Comentario guardado exitosamente B</p> : <p>Aun no has hecho tu comentario</p>}
        <input
          {...register("content")}
          className={styles.reviewC}
          type="text"
          id="content"
          name="content"
          value={content.content}
          onChange={(e) => setContent({ ...content, content: e.target.value })}
        />
        <button type="submit" className={styles.submitButton}>
          {reviewId ? "Editar comentario" : "Crear comentario"}
        </button>
      </form>
      {showSuccess && (
        <div className={styles.successMessage}>
          La informacion ha sido guardada!
        </div>
      )}
    </div>
  )
}

export default ReviewD;