import ReviewD from "../myReview/ReviewD";
import InfoDancer from "../fullinfo/infoDancer";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import styles from "@/styles/dashboard.module.css";
import { User, Payment } from "@/app/types";
interface DancerProfileProps{
  dbUser? : User ;
  payment?: Payment[];
}

const DancerProfile: React.FC<DancerProfileProps> = ({ dbUser, payment }) => {
  const dancerId = dbUser?.dancer?.id;
  const reviewId = dbUser?.dancer?.review?.id;
  const pending = payment?.filter(p => !p.confirm).length || 0;

  return (
    <>
      <ReviewD dancerId={dancerId} reviewId={reviewId} />
      <InfoDancer dancerId={dancerId} />
      <div className={!payment ? styles.notPaymentC : styles.paymentC}>
        <h3>Estado de Pago</h3>
        <PaymentStatus Payment={payment?.length} pending={pending} />
        <h3>Lista de Pagos</h3>
        {payment?.map(payment => (
          <li className={styles.payments} key={payment.id}>
            {payment.type === "PMOVIL" 
              ? <p>{payment.numberRef}</p>
              : <p>Efectivo</p>
            }
          </li>
        ))}
      </div>
    </>
  );
};

export default DancerProfile;