import styles from '@/styles/admin.module.css';
import { deletedReview } from '@/utils/reviews';
import { ControlPayments } from '../Payments/Payments';
import PaymentStatus from '../../dashboardUser/myPaymentStatus/PaymentStatus';
import { Dancer } from '@/app/types';
export interface DancerProp{
  dancer : Dancer | undefined
}
export const DancerDetails: React.FC<DancerProp> = ({ dancer }) => {
  
  let pending = 0;
  if(dancer?.Payment !== undefined){
    for (let i = 0; i < dancer.Payment.length; i++) {
      if (dancer?.Payment[i].confirm === false) {
        pending++;
      }
    }
  }

  return (
    <div className={styles.grid}>
      <p>Bailarin</p>
      <DetailItem label="Edad" value={dancer?.age} />
      {dancer?.phone !== undefined ? <DetailItem label="Telefono" value={dancer?.phone} /> : null}
      {dancer?.Adress !== undefined ? <DetailItem label="Direccion" value={dancer?.Adress} /> : null}
      <DetailItem label="CI" value={dancer?.CI} />
      <DetailItem label="Alergias" value={dancer?.allergies} />
      {dancer?.review?.content ? (
        <>
          <DetailItem label="Comentario" value={dancer.review.content} />
          <button
            onClick={() => deletedReview(dancer?.review?.id)}
            className={styles.deleteButton}
          >
            Borrar Comentario
          </button>
        </>
      ) : null}
      <ControlPayments id={dancer?.id} payments={dancer?.Payment} dancerR={false} /> 
      <PaymentStatus Payment={dancer?.Payment.length} pending={pending} />
    </div>
  );
};

export function DetailItem({ label, value }: any) {
  return (
    <div className={styles.detailItem}>
      <p className={styles.detailLabel}>{label}</p>
      <p className={styles.detailValue}>{value}</p>
    </div>
  );
}