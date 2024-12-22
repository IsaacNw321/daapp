import ReviewD from "../myReview/ReviewD";
import {InfoDancer} from "../fullinfo/infoDancer";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import styles from "@/styles/dashboard.module.css";
import { User, Payment, TypePayment } from "@/app/types";
import { useState } from "react";
import { postPayment } from "@/utils/payments";
interface DancerProfileProps{
  dbUser? : User ;
  payment?: Payment[];
}

const DancerProfile: React.FC<DancerProfileProps> = ({ dbUser, payment }) => {
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL);


  const handleShowP = () => {
    setAddPayment(prevState => !prevState);
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value === TypePayment.PMOVIL){
      setTypePayment(TypePayment.PMOVIL);
    }
    if(e.target.value === TypePayment.CASH){
      setTypePayment(TypePayment.CASH);
    }
  };

  const handlePayment = (id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const typePayment = formData.get('typePayment') as string;
    let dancerId = id;
    if (typePayment === TypePayment.PMOVIL) {
      const numberRef = formData.get('numberRef') as string;
      const paymentData = { numberRef, typePayment, dancerId };
      postPayment(paymentData);
    } else if (typePayment === TypePayment.CASH) {
      const paymentData = { cash: true, typePayment, dancerId };
      postPayment(paymentData);
    }
  };
  const dancerId = dbUser?.dancer?.id;
  const reviewId = dbUser?.dancer?.review?.id;
  const pending = payment?.filter(p => !p.confirm).length || 0;

  return (
    <section>
      <ReviewD dancerId={dancerId} reviewId={reviewId} />
      <InfoDancer dancerId={dancerId} />
      <div className={!payment ? styles.notPaymentC : styles.paymentC}>
        <h3>Estado de Pago</h3>
        <PaymentStatus Payment={payment?.length} pending={pending} representative={false} />
            <button className={styles.roleButton} onClick={handleShowP}>
              Agregar Pago
            </button>
            {addPayment && dancerId && (
              <form className={styles.formContainer} style={{border : "none"}} onSubmit={handlePayment(dancerId)}>
                <select name='typePayment' onChange={handleType}>
                  <option value={TypePayment.PMOVIL}>Pago movil</option>
                  <option value={TypePayment.CASH}>Efectivo</option>
                </select>
                {typePayment === TypePayment.PMOVIL && (
                  <input type="text" name='numberRef' placeholder='Numero de referencia' />
                )}
                <button type='submit' className={styles.roleButton}>
                  Enviar
                </button>
              </form>) }
      </div>
    </section>
  );
};

export default DancerProfile;