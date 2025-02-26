import styles from '@/styles/admin.module.css';
import { deletedReview } from "@/utils/reviews";
import { DancerRDetails } from './DancersRDetails';
import { DetailItem } from "./DancersDetails";
import { DancerR, RepresentativeProps } from '@/app/types';
import InfoRepresentative from '../../dashboardUser/fullinfo/infoRepresentative';

export const RepresentativeDetails: React.FC<RepresentativeProps> = ({ representative }) => {

  let pending = 0;
  if(representative?.Payment !== undefined){
    for (let i = 0; i < representative.Payment.length; i++) {
      if (representative.Payment[i].confirm === false) {
        pending++;
      }
    }
  }

  return (
    <section className={styles.flex}>
    <div className={styles.details}>
      <strong>Representante</strong>
      <DetailItem label="Telefono" value={representative?.phone} />
      <DetailItem label="Direccion" value={representative?.Adress} />
    </div>
    <div className={styles.infoForm}>
      <InfoRepresentative representativeId={representative?.id} />
    </div>
      {representative?.review?.content ? (
        <div className={styles.flex}>
          <DetailItem label="Comentario" value={representative.review.content} />
          <button
            onClick={() => deletedReview(representative?.review?.id)}
            className={styles.deleteButton}
          >
            Borrar Comentario
          </button>
        </div>
      ) : null}
      <section>
      {
        representative?.dancers.map((dancer : DancerR) => (
          <DancerRDetails key={dancer.id} dancer={dancer}  />
        ))
      }
      </section>
    </section>
  );
};

