import React, { useState } from 'react';
import ReviewR from "../myReview/ReviewR";
import InfoRepresentative from "../fullinfo/infoRepresentative";
import Dancers from "../../dashboardUser/myDancers/Dancers";
import { postPayment } from "@/utils/payments";
import styles from "@/styles/dashboard.module.css";

const RepresentativeProfile = ({ dbUser, userDancers, payment }) => {
  const [showDancers, setShowDancers] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState('PMOVIL');

  const toggleShowDancers = () => {
    setShowDancers(prevState => !prevState);
  };

  const handleShowP = () => {
    setAddPayment(prevState => !prevState);
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypePayment(e.target.value);
  };

  const handlePayment = (id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const typePayment = formData.get('typePayment') as string;
    let dancerRId = id;
    if (typePayment === "PMOVIL") {
      const numberRef = formData.get('numberRef') as string;
      const paymentData = { numberRef, typePayment, dancerRId };
      postPayment(paymentData);
    } else if (typePayment === "CASH") {
      const paymentData = { cash: true, typePayment, dancerRId };
      postPayment(paymentData);
    }
  };

  const representativeId = dbUser?.representative?.id;
  const reviewId = dbUser?.representative?.review?.id;
  const numberDancers = userDancers?.length ?? 0;

  return (
    <>
      <ReviewR representativeId={representativeId} reviewId={reviewId} />
      <InfoRepresentative representativeId={representativeId} userRole="REPRESENTATIVE" />
      <button className={styles.button} onClick={toggleShowDancers}>
        {showDancers ? 'Esconder Bailarines' : 'Mostrar Bailarines'}
      </button>
      {showDancers && (
        numberDancers === 0 ? (
          <p>No tienes Bailarines inscritos</p>
        ) : (
          userDancers?.map((el: any) => (
            <div key={el.id}>
              <Dancers
                firstName={el.firstName}
                lastName={el.lastName}
                Payment={el.Payment.length}
                pending={el.pending}
              />
              {el.Payment.map(payment => (
                <li className={styles.payments} key={payment.id}>
                  {payment.type === "PMOVIL" 
                    ? <p>{payment.numberRef}</p>
                    : <p>Efectivo</p>
                  }
                </li>
              ))}
              <button className={styles.roleButton} onClick={handleShowP}>
                Agregar Pago
              </button>
              {addPayment && (
                <form onSubmit={handlePayment(el.id)}>
                  <select name='typePayment' onChange={handleType}>
                    <option value="PMOVIL">Pago movil</option>
                    <option value="CASH">Efectivo</option>
                  </select>
                  {typePayment === "PMOVIL" && (
                    <>
                      <label htmlFor="numberRef">Numero de Referencia</label>
                      <input type="text" name='numberRef' placeholder='Numero de referencia' />
                    </>
                  )}
                  <button type='submit' className={styles.roleButton}>
                    Enviar
                  </button>
                </form>
              )}
            </div>
          ))
        )
      )}
    </>
  );
};

export default RepresentativeProfile;