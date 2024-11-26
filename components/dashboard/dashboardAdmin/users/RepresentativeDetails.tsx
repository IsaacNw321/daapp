import styles from '@/styles/admin.module.css';
import { deletedReview } from "@/utils/reviews";
import { DancerDetails } from "./DancersDetails";
import { DetailItem } from "./DancersDetails";
export const RepresentativeDetails = ({ representative } : any) => {

  let pending = 0;
  for (let i = 0; i < representative.Payment.length; i++) {
    if (representative.Payment[i].confirm === false) {
      pending++;
    }
  }

  return (
    <div className={styles.grid}>
      <strong>Representante</strong>
      <DetailItem label="Telefono" value={representative?.phone} />
      <DetailItem label="Direccion" value={representative?.Adress} />
      <section>
      {representative?.review?.content ? (
        <>
          <DetailItem label="Comentario" value={representative.review.content} />
          <button
            onClick={() => deletedReview(representative?.review?.id)}
            className={styles.deleteButton}
          >
            Borrar Comentario
          </button>
        </>
      ) : null}
      </section>
      <section>
      {
        representative?.dancers.map(dancer => (
          <DancerDetails key={dancer.id} dancer={dancer} />
        ))
      }
      </section>
    </div>
  );
};

