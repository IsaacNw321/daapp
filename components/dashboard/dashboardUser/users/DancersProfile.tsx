"use client";
import ReviewD from "../myReview/ReviewD";
import { InfoDancer } from "../fullinfo/infoDancer";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import styles from "@/styles/dashboard.module.css";
import { User, Payment, TypePayment } from "@/app/types";
import { useState } from "react";
import { useMutation } from 'react-query';
import { postPayment } from "@/utils/payments";
import { DetailItem } from "../../dashboardAdmin/users/DancersDetails";

interface DancerProfileProps {
  dbUser?: User;
  payment?: Payment[];
}

interface paymentData {
  numberRef?: string;
  cash? : boolean
  typePayment: TypePayment;
  dancerId: string;
}

const DancerProfile: React.FC<DancerProfileProps> = ({ dbUser, payment }) => {
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation(
    (paymentData: paymentData) => postPayment(paymentData),
    {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      },
      onError: (error) => {
        console.error(error);
      }
    }
  );

  const handleShowP = () => {
    setAddPayment(prevState => !prevState);
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypePayment(e.target.value as TypePayment);
  };

  const handlePayment = (id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const typePayment = formData.get('typePayment') as string;
    let dancerId = id;
    let paymentData;

    if (typePayment === TypePayment.PMOVIL) {
      const numberRef = formData.get('numberRef') as string;
      paymentData = { numberRef, typePayment, dancerId };
    } else if (typePayment === TypePayment.CASH) {
      paymentData = { cash: true, typePayment, dancerId };
    }
    if(paymentData){
      mutation.mutate(paymentData);
    }else {
      console.error("Payment data is undefined")
    }
  };

  const dancerId = dbUser?.dancer?.id;
  const reviewId = dbUser?.dancer?.review?.id;
  const pending = payment?.filter(p => !p.confirm).length || 0;

  return (
    <section>
      <div className={styles.details}>
        <strong>Bailarin</strong>
        <DetailItem label="Edad" value={dbUser?.dancer?.age} />
        {dbUser?.dancer?.phone !== undefined ? <DetailItem label="Telefono" value={dbUser?.dancer?.phone} /> : null}
        {dbUser?.dancer?.Adress !== undefined ? <DetailItem label="Direccion" value={dbUser?.dancer?.Adress} /> : null}
        <DetailItem label="CI" value={dbUser?.dancer?.CI} />
        <DetailItem label="Alergias" value={dbUser?.dancer?.allergies} />
      </div>
      <ReviewD dancerId={dancerId} reviewId={reviewId} />
      <InfoDancer dancerId={dancerId} />
      <div className={!payment ? styles.notPaymentC : styles.paymentC}>
        <h3>Estado de Pago</h3>
        <PaymentStatus Payment={payment?.length} pending={pending} representative={false} />
        <button className={styles.roleButton} onClick={handleShowP}>
          Agregar Pago
        </button>
        {addPayment && dancerId && (
          <form className={styles.formContainer} style={{ border: "none" }} onSubmit={handlePayment(dancerId)}>
            <select name='typePayment' onChange={handleType}>
              <option value={TypePayment.PMOVIL}>Pago movil</option>
              <option value={TypePayment.CASH}>Efectivo</option>
            </select>
            {typePayment === TypePayment.PMOVIL && (
              <div className={styles.myForm}>
                <input type="text" name='numberRef' placeholder='Numero de referencia' />
              </div>
            )}
            <button
              type='submit'
              disabled={mutation.isLoading}
              className={
                mutation.isError
                  ? styles.errorMessage
                  : isSuccess
                    ? styles.successMessage
                    : styles.roleButton
              }
            >
              {mutation.isLoading ? (
                <span className={styles.loadingSpinner}></span>
              ) : mutation.isError ? (
                'Error intente mas tarde'
              ) : isSuccess ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span>Pago registrado</span>
                </div>
              ) : (
                'Enviar'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default DancerProfile;