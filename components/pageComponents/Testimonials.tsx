import styles from "../../styles/Testimonials.module.css";
import { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { getReviews } from "../../utils/reviews";
import { ReviewCard } from "../reviews/ReviewCard";
import { NextComponentType } from "next";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
const responsive = {
  0 : {items : 1},
  800 : {items: 2}
}

const Testimonials: NextComponentType = () =>{
  
  const {data} = useQuery('reviews', ()=> getReviews());
  const [reviews, setReviews] = useState<any>();
  useEffect(()=>{
    if (!data) return;
    let reviewItems = data?.map((review: any, idx : number) => {
      let userRole;  
      review.representative.id !== undefined 
      ? userRole = "Representante"
       : "Bailarin";
       let user;
       if (review.representative) {
         user = review.representative.user;
       } else if (review.dancer) {
         user = review.dancer.user;
       }
      return ReviewCard({
        key : idx,
        content : review.content,
        user : user,
        userRole : userRole
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  setReviews(reviewItems);
}, [ data, reviews])
 

  return (
  <div className={styles.fatherCont}>
  
    <h3>
      Testimonios
    </h3>
    <h2>
      Lo que dicen nuestros clientes
    </h2>
    <p>
      Nuestra sección de testimonios del estudio de baile presenta historias reales de un grupo diverso de bailarines y representantes de todos los orígenes culturales, edades y géneros, que han sido inspirados por nuestras clases.
    </p>
    <div className={styles.reviews}>
    <div className={styles.carouselCont}>
    {!reviews ? <div className={styles.reviews}>No hay comentarios</div> : 
       <AliceCarousel
        mouseTracking
        responsive={responsive}
        controlsStrategy="alternate"
        infinite
        keyboardNavigation
        disableButtonsControls
        items={reviews}
        />}
    </div>
    </div>
  </div>
  )
}

export default Testimonials;