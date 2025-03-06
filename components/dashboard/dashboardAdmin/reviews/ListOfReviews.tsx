import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deletedReview, getReviews } from '@/utils/reviews';
import styles from '@/styles/admin.module.css';
import { useState } from 'react';
import { Review } from '@/app/types';
import Loading from '@/components/NavBar/loading';

export const ListOfReviews = () => {
  const queryClient = useQueryClient();
  const { data: reviews, error, isLoading } = useQuery<Review[]>('reviewsAdmin', getReviews);
  const [success, setSuccess] = useState<string | null>(null);

  const mutation = useMutation((id: string) => deletedReview(id), {
    onSuccess: () => {
      setSuccess("Comentario eliminado");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      queryClient.invalidateQueries('reviewsAdmin');
    },
    onError: (error) => {
      console.error(error);
    }
  });


  if (error) {
    return (
      <section className={styles.questionsCont}>
        Hubo un error intente mas tarde
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className={styles.questionsCont}>
        No hay comentarios
      </section>
    );
  }

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <section className={styles.questionsCont}>
      <strong>Seccion de Comentarios</strong>
      <ul className={styles.questions}>
        {reviews.map((review: Review) => (
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
            <button
              onClick={() => handleDelete(review.id)}
              disabled={mutation.isLoading || mutation.isError}
              className={
                success
                  ? styles.successMessage
                  : mutation.isError
                  ? styles.errorMessage
                  : styles.roleButton
              }
            >
              {mutation.isLoading
                ? 'Eliminando...'
                : success
                ? 'Eliminado'
                : mutation.isError
                ? 'Hubo un error intente mas tarde'
                : 'Eliminar'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};