import styles from '@/styles/admin.module.css';
import { deletedReview } from '@/utils/reviews';
import { ControlPayments } from '../Payments/Payments';
import PaymentStatus from '../../dashboardUser/myPaymentStatus/PaymentStatus';

export const DancerDetails = ({ user }: any) => {
  
  let pending = 0;
  for (let i = 0; i < user.dancer.Payment.length; i++) {
    if (user.dancer.Payment[i].confirm === false) {
      pending++;
    }
  }

  return (
    <div className={styles.grid}>
      <p>Bailarin</p>
      <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />
      <DetailItem label="Edad" value={user.dancer?.age} />
      <DetailItem label="Telefono" value={user.dancer?.phone} />
      <DetailItem label="Direccion" value={user.dancer?.Adress} />
      <DetailItem label="CI" value={user.dancer?.CI} />
      <DetailItem label="Alergias" value={user.dancer?.allergies} />
      <DetailItem label="Fecha de inscripcion" value={user.createdAt} />
      {user.dancer?.review?.content ? (
        <>
          <DetailItem label="Comentario" value={user.dancer.review.content} />
          <button
            onClick={() => deletedReview(user.dancer?.review?.id)}
            className={styles.deleteButton}
          >
            Borrar Comentario
          </button>
        </>
      ) : null}
      <ControlPayments id={user.dancer.id} payments={user.dancer.Payment} /> 
      <PaymentStatus Payment={user.dancer.Payment.length} pending={pending} />
    </div>
  );
};

function DetailItem({ label, value }: any) {
  return (
    <div className={styles.detailItem}>
      <p className={styles.detailLabel}>{label}</p>
      <p className={styles.detailValue}>{value}</p>
    </div>
  );
}