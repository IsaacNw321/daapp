"use client";
import styles from "@/styles/dashboard.module.css";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import { DancersProps, postPaymentProps, TypePayment } from '@/app/types';
import InfoDancerR from "../fullinfo/infoDancerR";
import { useState } from "react";
import { useMutation } from 'react-query';
import { postPayment } from "@/utils/payments";
import { DetailItem } from "../../dashboardAdmin/users/DancersRDetails";

interface paymentDataR {
  numberRef?: string;
  cash? : boolean
  typePayment: TypePayment;
  dancerRId: string;
}

const Dancers = ({ dancer, Payment, pending }: DancersProps) => {
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL);
  const [isSuccess, setIsSuccess] = useState(false);
  const mutation = useMutation(
    (paymentData: paymentDataR ) => postPayment(paymentData),
    {
      onSuccess: () => {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false);
        },3000);
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
    let dancerRId = id;
    let paymentData;

    if (typePayment === TypePayment.PMOVIL) {
      const numberRef = formData.get('numberRef') as string;
      paymentData = { numberRef, typePayment, dancerRId };
    } else if (typePayment === TypePayment.CASH) {
      paymentData = { cash: true, typePayment, dancerRId };
    }

    if(paymentData){
      mutation.mutate(paymentData);
    }else {
      console.error("Payment data is undefined")
    }
  };

  return (
    <li className={styles.danceCard}>
      <h4>
        Bailarin {dancer.firstName + " " + dancer.lastName}
      </h4>
      <div className={styles.details}>
        <DetailItem label="Edad" value={dancer?.age} />
        <DetailItem label="CI" value={dancer?.cI} />
        <DetailItem label="Alergias" value={dancer?.allergies} />
      </div>
      <InfoDancerR dancerId={dancer.id} />
      <div className={styles.paymentC}>
        <PaymentStatus
          representative={false}
          Payment={Payment}
          pending={pending}
        />
        <button className={styles.roleButton} onClick={handleShowP}>
          Agregar Pago
        </button>
        {addPayment && (
          <form className={styles.formContainer} style={{ border: "none" }} onSubmit={handlePayment(dancer.id)}>
            <select name='typePayment' onChange={handleType}>
              <option value={TypePayment.PMOVIL}>Pago movil</option>
              <option value={TypePayment.CASH}>Efectivo</option>
            </select>
            <div className={styles.myForm}>
              {typePayment === TypePayment.PMOVIL && (
                <input type="text" name='numberRef' placeholder='Numero de referencia' />
              )}
            </div>
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
) : isSuccess  ? (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <span>Pago registrado</span>
  </div>
) : (
  'Enviar'
)}
            </button>
          </form>
        )}
      </div>
    </li>
  );
};

export default Dancers;