import { useState } from "react";
import ReviewR from "../myReview/ReviewR";
import InfoRepresentative from "../fullinfo/infoRepresentative";
import Dancers from "../../dashboardUser/myDancers/Dancers";
import { postPayment } from "@/utils/payments";
import styles from "@/styles/dashboard.module.css";
import { DancerInfo, Payment, User, TypePayment } from "@/app/types";
import { CreateDancer } from "../myDancers/createDancer";

interface RepresentativeProfileProps {
  dbUser?: User;
  userDancers?: DancerInfo[];
  payment?: Payment[];
}

const RepresentativeProfile: React.FC<RepresentativeProfileProps> = ({ dbUser, userDancers, payment }) => {
  const [showDancers, setShowDancers] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL);

  const toggleShowDancers = () => {
    setShowDancers(prevState => !prevState);
  };

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

  const representativeId = dbUser?.representative?.id;
  const reviewId = dbUser?.representative?.review?.id;
  const numberDancers = userDancers?.length ?? 0;

  return (
    <section className={styles.repCont}>
      <ReviewR representativeId={representativeId} reviewId={reviewId} />
      <InfoRepresentative representativeId={representativeId} />
      <CreateDancer representativeId={representativeId} numberDancers={numberDancers} />
      <button className={styles.button} onClick={toggleShowDancers}>
        {showDancers ? 'Esconder Bailarines' : 'Mostrar Bailarines'}
      </button>
      <div className={styles.dancersCont}>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'green' }}></span>
            <span>Pagado</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'blue' }}></span>
            <span>Pendiente</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'red' }}></span>
            <span>No pagado</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: 'grey' }}></span>
            <span>Próximo</span>
          </div>
        </div>
        {showDancers && (
  <div className={styles.dancersCont}>
    {numberDancers === 0 ? (
      <p>No tienes Bailarines inscritos</p>
    ) : (
      userDancers?.map((dancer: DancerInfo, index: number) => (
        <div key={dancer.id}>
          {index === 0 && (   
              <button className={styles.roleButton} onClick={handleShowP}>
                Agregar Pago
              </button>
          )}
          <Dancers
            key={dancer.id}
            id={dancer.id}
            firstName={dancer.firstName}
            lastName={dancer.lastName}
            Payment={dancer.Payment?.length}
            pending={dancer.pending}
          />
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
      ))
    )}
  </div>
)}
      </div>
    </section>
  );
};

export default RepresentativeProfile;