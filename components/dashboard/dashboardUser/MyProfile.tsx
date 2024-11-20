import { NextComponentType } from "next";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getUserById, postUser } from "../../../utils/users";
import Link from "next/link";
import styles from "../../../styles/dashboard.module.css"
import { useQuery } from "react-query";
import Dancers from "../dashboardUser/myDancers/Dancers";
import PaymentStatus from "./myPaymentStatus/PaymentStatus";
import { CreateDancer } from "./myDancers/createDancer";
import Loading from "../../../components/layout/loading";
import ReviewD from "./myReview/ReviewD";
import ReviewR from "./myReview/ReviewR";
import Image from "next/image";
import { DancerInfo } from "@/app/types";
import { postPayment } from "@/utils/payments";
import InfoDancer from "./fullinfo/infoDancer";
import InfoRepresentative from "./fullinfo/infoRepresentative";

const MyProfile: NextComponentType = () => {
  const { user, isLoading: isLoadingU } = useUser();
  const [showDancers, setShowDancers] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [typePayment, setTypePayment] = useState('PMOVIL');
  const [userDancers, setuserDancers] = useState<any>();
  const [payment, setPayment] = useState<any>();
  const toggleShowDancers = () => {
    setShowDancers(prevState => !prevState);
  };

  const userId = user?.sub ?? '';
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId));
  let numberDancers;
  if (dbUser?.representative?.dancers) {
    numberDancers = [...dbUser?.representative?.dancers].length;
  }
  const userRole = dbUser?.userRole;
  useEffect(() => {
    if(userRole === "REPRESENTATVIE"){
      const payment = dbUser?.representative?.Payment;
      if (payment) {
        setPayment(payment);
      }
    }
    if(userRole === "DANCER"){
      const payment = dbUser?.dancer?.Payment;
      if (payment) {
        setPayment(payment);
      }
    }
    const dancers = dbUser?.representative?.dancers;
    if (dancers) {
      const allDancersInfo: DancerInfo[] = dancers.map((dancer: any) => {
        const { Payment, firstName, lastName, id } = dancer;
        return {
          id,
          firstName,
          lastName,
          Payment: Payment,
          pending: Payment.filter(payment => !payment.confirm).length 
        };
      });
      setuserDancers(allDancersInfo);
    }
  }, [user, userId, dbUser, payment, numberDancers]);

  if (isLoading) return <Loading />;
  let reviewId;
  let representativeId;
  let dancerId;
  let pending = 0;
  let firstName = dbUser?.firstName;
  let lastName = dbUser?.lastName;
  let picture = dbUser?.photo;
  if (userRole === "REPRESENTATIVE" && dbUser?.representative.review !== undefined) {
    reviewId = dbUser?.representative?.review?.id;
  }
  if (userRole === "DANCER" && dbUser?.dancer.review !== undefined) {
    reviewId = dbUser?.dancer?.review?.id;
  }
  if (userRole === "REPRESENTATIVE") {
    representativeId = dbUser?.representative?.id;
    for (let i = 0; i < dbUser.representative.Payment.length; i++) {
      if (dbUser.representative.Payment[i].confirm === false) {
        pending++;
      }
    }
  }
  if (userRole === "DANCER") {
    dancerId = dbUser?.dancer?.id;
    for (let i = 0; i < dbUser.dancer.Payment.length; i++) {
      if (dbUser.dancer.Payment[i].confirm === false) {
        pending++;
      }
    }
  }
  const handleShowP = (e: any) => {
    setAddPayment(prevState => !prevState);
  };
  const handleType = (e: any) => {
    const type = e.target.value;
    setTypePayment(type);
  };
  const handlePayment = (id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const typePayment = formData.get('typePayment') as string;
    if (userRole === "DANCER") {
      let dancerId = id;
      if (typePayment === "PMOVIL") {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerId };
        postPayment(paymentData);
      } else if (typePayment === "CASH") {
        const paymentData = { cash: true, typePayment, dancerId };
        postPayment(paymentData);
      }
    }
    if (userRole === "REPRESENTATIVE") {
      let dancerRId = id;
      if (typePayment === "PMOVIL") {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerRId };
        postPayment(paymentData);
      } else if (typePayment === "CASH") {
        const paymentData = { cash: true, typePayment, dancerRId };
        postPayment(paymentData);
      }
    }
  };
  return (
    <div className={styles.dashboardUser}>
      <div className={styles.info}>
        <div className={styles.firstLine}>
          <Link href={'/'} style={{ textDecoration: 'none', backgroundColor: 'transparent' }}>
            <button className={styles.back}>Volver</button>
          </Link>
          <div className={styles.text1}>
            <h3>Bienvenido {firstName} {lastName}</h3>
            <div>
              <Image
                src={picture}
                alt="Prev arrow"
                width={50}
                height={50}
                style={{
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                  borderRadius: '100%',
                }}
              />
            </div>
          </div>
        </div>
        <label className={styles.text}>
          Si quieres ser parte de nosotros escoje tu rol aqui, veremos tu solicitud y tendras nuestra respuesta
          Si eres Representante que quiere inscribir a su hijo escoja el rol Representante, asi tendra la opcion de inscibirlo una vez activada su cuenta
        </label>
        {userRole === "REPRESENTATIVE" ? (
          <>
            <ReviewR representativeId={representativeId} reviewId={reviewId} />
            <InfoRepresentative representativeId={representativeId} userRole={userRole} />
          </>
        ) : userRole === "DANCER" ? (
          <>
            <ReviewD dancerId={dancerId} reviewId={reviewId} />
            <InfoDancer dancerId={dancerId} userRole={userRole} />
          </>
        ) : null}
        <div className={!payment ? styles.notPaymentC : styles.paymentC}>
          <h3>Estado de Pago</h3>
          <PaymentStatus Payment={payment.length} pending={pending} />
          <h3>Lista de Pagos</h3>
          {
                      payment.map(payment => {
                        return(
                          <li className={styles.payments} key={payment.id}>
                            {payment.type === "PMOVIL" 
                              ? <p>{payment.numberRef}</p>
                              : <p>Efectivo</p>
                              }
                          </li>
                        )
                      })
                    }
          <button className={styles.roleButton} onClick={handleShowP}>
                       Agregar Pago
                     </button>
                     {addPayment && (
                       <form onSubmit={handlePayment(dancerId)}>
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
                       </form>)}
        </div>
        <CreateDancer userRole={userRole} representativeId={representativeId} numberDancers={numberDancers} />
        <div>
          {userRole === 'REPRESENTATIVE' && (
           <>
           <button className={styles.button} onClick={toggleShowDancers}>
             {showDancers ? 'Esconder Bailarines' : 'Mostrar Bailarines'}
           </button>
           {showDancers && (
             numberDancers === 0 || numberDancers === undefined ? (
               <p>No tienes Bailarines inscritos</p>
             ) : (
               userDancers?.map((el: any) => {
                console.log(el)
                 return (
                   <div key={el.id}>
                     <Dancers
                      key={el.id}
                       firstName={el.firstName}
                       lastName={el.lastName}
                       Payment={el.Payment.length}
                       pending={el.pending}
                     />
                    {
                      el.Payment.map(payment => {
                        return(
                          <li className={styles.payments} key={payment.id}>
                            {payment.type === "PMOVIL" 
                              ? <p>{payment.numberRef}</p>
                              : <p>Efectivo</p>
                              }
                          </li>
                        )
                      })
                    }
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
                 );
               })
             )
           )}
         </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;