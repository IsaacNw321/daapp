"use client"
import styles from "@/styles/dashboard.module.css";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import { DancersProps } from '@/app/types';
import InfoDancerR from "../fullinfo/infoDancerR";
import { useState } from "react";
import { postPayment } from "@/utils/payments";
import { TypePayment } from "@/app/types";
import { DetailItem } from "../../dashboardAdmin/users/DancersRDetails";
const Dancers = ({dancer, Payment, pending } : DancersProps) => {
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL);
  const handleShowP = () => {
    setAddPayment(prevState => !prevState);
  };
  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === TypePayment.PMOVIL) {
      setTypePayment(TypePayment.PMOVIL);
    }
    if (e.target.value === TypePayment.CASH) {
      setTypePayment(TypePayment.CASH);
    }
  };
  const handlePayment = (id: string) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const typePayment = formData.get('typePayment') as string;
      let dancerRId = id;
      if (typePayment === TypePayment.PMOVIL) {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerRId };
        postPayment(paymentData);
      } else if (typePayment === TypePayment.CASH) {
        const paymentData = { cash: true, typePayment, dancerRId };
        postPayment(paymentData);
      }
    };
    console.log(dancer)
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
            <InfoDancerR dancerId={dancer.id}/>
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
                <form className={styles.formContainer} style={{border : "none"}} onSubmit={handlePayment(dancer.id)}>
                  <select name='typePayment' onChange={handleType}>
                    <option value={TypePayment.PMOVIL}>Pago movil</option>
                    <option value={TypePayment.CASH}>Efectivo</option>
                  </select>
                  <div className={styles.myForm}>
                  {typePayment === TypePayment.PMOVIL && (
                    <input type="text" name='numberRef' placeholder='Numero de referencia' />
                  )}
                  </div>
                  <button type='submit' className={styles.roleButton}>
                    Enviar
                  </button>
                </form>
              )}
          </div>
      </li>
  );
};


export default Dancers;