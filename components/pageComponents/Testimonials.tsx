import { useState, useEffect } from "react";
import styles from "../../styles/Testimonials.module.css";
import { useQuery } from 'react-query';
import { getReviews } from "../../utils/reviews";
import { ReviewCard } from "../reviews/ReviewCard";
import { Review } from "@/app/types";
import Loading from "../NavBar/loading";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';


const Testimonials = () => {
  const { data, isLoading } = useQuery<Review[]>('reviews', () => getReviews());
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <section className={styles.fatherCont}>
        <Loading />
      </section>
    );
  }

  return (
    <section className={styles.fatherCont}>
      <h2>Testimonios</h2>
      <h3>Lo que dicen nuestros clientes</h3>
      <p>
        Nuestra sección de testimonios del estudio de baile presenta historias reales de un grupo diverso de bailarines y representantes de todos los orígenes culturales, edades y géneros, que han sido inspirados por nuestras clases.
      </p>
      <div className={styles.reviews}>
        <Swiper
          modules={[Navigation, EffectFade]}
          effect="fade"
          navigation
          spaceBetween={30}
          slidesPerView={1}
        >
          {reviews.length ? (
            reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard
                  content={review.content}
                  firstName={review.representative ? review?.representative?.user.firstName : review.dancer?.user?.firstName}
                  lastName={review.representative ? review?.representative?.user.lastName : review.dancer?.user?.lastName}
                  photo={review.representative ? review.representative.user?.photo : review.dancer?.user.photo}
                  userRole={review.representative ? "Representante" : "Bailarin"}
                />
              </SwiperSlide>
              
            ))
          ) : (
            <section className={styles.fatherCont}>No hay comentarios</section>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials