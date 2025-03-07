import styles from "../../styles/Testimonials.module.css";
import { useQuery } from 'react-query';
import { getReviews } from "../../utils/reviews";
import { ReviewCard } from "../reviews/ReviewCard";
import { NextComponentType } from "next";
import AliceCarousel from "react-alice-carousel";
import { Review } from "@/app/types";
import "react-alice-carousel/lib/alice-carousel.css";
import Loading from "../NavBar/loading";

const responsive = {
  0: { items: 1 },
  800: { items: 2 }
}

const Testimonials: NextComponentType = () => {
  const { data, error, isLoading } = useQuery<Review[]>('reviews', () => getReviews());

  if (isLoading) {
    return (
      <section className={styles.fatherCont}>
        <Loading />
      </section>
    )
  }

  const reviewItems = data?.map((review: Review) => {
    let userRole;
    let user;
    if (!review.representative) {
      user = review?.dancer?.user;
      userRole = "Bailarin"
    } else {
      user = review.representative.user;
      userRole = "Representante"
    }
    return (
      <ReviewCard
        key={review.id}
        content={review.content}
        firstName={user.firstName}
        lastName={user.lastName}
        photo={user.photo}
        userRole={userRole}
      />
    );
  });

  return (
    <section className={styles.fatherCont}>
      <h2>
        Testimonios
      </h2>
      <h3>
        Lo que dicen nuestros clientes
      </h3>
      <p>
        Nuestra sección de testimonios del estudio de baile presenta historias reales de un grupo diverso de bailarines y representantes de todos los orígenes culturales, edades y géneros, que han sido inspirados por nuestras clases.
      </p>
      <div className={styles.reviews}>
        <ul className={styles.carouselCont}>
          {reviewItems?.length ? (
            <AliceCarousel
              mouseTracking
              responsive={responsive}
              controlsStrategy="alternate"
              infinite
              keyboardNavigation
              disableButtonsControls
              items={reviewItems}
            />
          ) : (
            <div className={styles.reviews}>No hay comentarios</div>
          )}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials;