import { NextComponentType } from "next";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getUserById, postUser } from "../../../utils/users";
import Link from "next/link";
import styles from "../../../styles/dashboard.module.css"
import { useQuery } from "react-query";
import {Dancers} from "../dashboardUser/myDancers/Dancers";
import PaymentStatus from "./myPaymentStatus/PaymentStatus";
import Role from "./myRole/Role";
import { CreateDancer } from "./myDancers/createDancer";
import Loading from "../../../components/layout/loading";
import ReviewD from "./myReview/ReviewD";
import ReviewR from "./myReview/ReviewR";
import Image from "next/image";

const MyProfile : NextComponentType = () =>{
  const { user, isLoading: isLoadingU  } = useUser();
  const [showDancers, setShowDancers] = useState(false);
const [userDancers , setuserDancers] = useState<any>()
const [payment , setPayment] = useState<any>()
const toggleShowDancers = () => {
  setShowDancers(prevState => !prevState);
};

  const userId = user?.sub ?? '';
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId));
  let numberDancers;
  if(dbUser?.message.representative?.dancers){
    numberDancers = [...dbUser?.message.representative?.dancers].length
  }
useEffect(() => {
  
  const payment = dbUser?.message?.representative?.Payment;
  if (payment) {
    setPayment(payment);
  }
  

  const dancers = dbUser?.message?.representative?.dancers;
  if (dancers) {
    const allDancersInfo = dancers.map((dancer: any) => {
      const { Payment, user: { firstName, lastName } } = dancer;
      return {
        firstName,
        lastName,
        Payment
      };
    });
    setuserDancers(allDancersInfo);
  }
}, [user, userId, dbUser, payment, numberDancers]);

  if (isLoading) return <Loading/>;
  const userRole = dbUser?.message.userRole;
  let reviewId;
  let representativeId;
  let dancerId;
  let firstName = dbUser?.message.firstName;
  let lastName = dbUser?.message.lastName;
  let picture = dbUser?.message.photo;
  if(userRole === "REPRESENTATIVE" && dbUser?.message.representative.review !== undefined){
    reviewId = dbUser?.message.representative?.review?.id
  } 
  if(userRole === "DANCER" && dbUser?.message.dancer.review !== undefined)
    reviewId =  dbUser?.message.dancer?.review?.id
  if(userRole === "REPRESENTATIVE"){
    representativeId = dbUser?.message.representative?.id
  }
  if(userRole === "DANCER"){
    dancerId = dbUser?.message.dancer?.id
  }
  return (
    <div className={styles.dashboardUser}>
        <div className={styles.info}>
          <div className={styles.firstLine}>
            <Link
               href={'/'} 
               style={{ textDecoration: 'none', backgroundColor: 'transparent' }}>
              <button className={styles.back}>
                Volver
              </button>
            </Link>
            <div className={styles.text1}>
            <h3>
              Bienvenido {firstName} {lastName}
            </h3>
            <div>
            <Image
                  src={picture}
                  alt="Prev arrow"
                  width={50}
                  height={50}
                  style={{
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    borderRadius: '100%'
                  }}
                />
            </div>
            </div>
          </div>
          <label  className={styles.text}>
            Si quieres ser parte de nosotros escoje tu rol aqui, veremos tu solicitud y tendras nuestra respuesta
            Si eres Representante que quiere inscirbir a su hijo escoja el rol Representante, asi tendra la opcion de inscibirlo una vez activada su cuenta
          </label>
        <Role 
          userRole={userRole}
          userId={userId}
        />
           {userRole === "REPRESENTATIVE" ? (
        <ReviewR
          representativeId={representativeId}
          reviewId={reviewId}
        />
      ) : userRole === "DANCER" ? (
        <ReviewD
          dancerId={dancerId}
          reviewId={reviewId}
        />
      ) : null}
        <div className={!payment ? styles.notPaymentC : styles.paymentC}> 
          <PaymentStatus 
            Payment={payment}
          />  
        </div>
        <CreateDancer
          userRole={userRole}
          representativeId={representativeId}
          numberDancers={numberDancers}
        />
    <div>
  {userRole === 'REPRESENTATIVE' && (
    <>
      <button className={styles.button} onClick={toggleShowDancers}>
        {showDancers ? 'Esconder Bailarines' : 'Mostrar Bailarines'}
      </button>
      {showDancers && (
        (numberDancers === 0 || undefined) ? (
          <p>
            No tienes Bailarines inscritos
          </p>
        ) : (
          userDancers?.map((el : any, index : any) => (
            <Dancers
              key={index}
              firstName={el.firstName}
              lastName={el.lastName}
              Payment={el.Payment}
            />
          ))
        )
      )}
    </>
  )}
</div>
      </div>
    </div>
  );
}

export default MyProfile;