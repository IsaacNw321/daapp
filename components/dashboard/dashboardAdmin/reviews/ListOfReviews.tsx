import { useQuery } from 'react-query';
import { deletedReview, getReviews } from '@/utils/reviews';
import { useState, useEffect } from 'react';
import styles from '../../../../styles/admin.module.css';
import { Review } from '@/app/types';

export const ListOfReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { data, error, isLoading } = useQuery<Review[]>('reviewsAdmin', () => getReviews());

  useEffect(() => {
    if (!data) return;
    setReviews(data);
    console.log(reviews);
  }, [isLoading, data, reviews]);

  return (
    <section className={styles.questionsCont}>
      <strong>Seccion de Comentarios</strong>
      <ul className={styles.questions}>
        {reviews.map((review) => (
          <li className={styles.questionCard} key={review.id}>
            {review.representative ? <p>Representante</p> : <p>Bailarin</p>}
            <br />
            {review.representative ? (
              <p>
                {review.representative.user.firstName + ' '}
                {review.representative.user.lastName}
              </p>
            ) : (
              <p>
                {review.dancer?.user.firstName + ' '}
                {review.dancer?.user.lastName}
              </p>
            )}
            <br />
            <p>{review.content}</p>
            <br />
            <button onClick={() => deletedReview(review.id)} className={styles.roleButton}>
              Eliminar Comentario
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};