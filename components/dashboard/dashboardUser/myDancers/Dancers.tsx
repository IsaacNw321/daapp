"use client"
import React from 'react';
import styles from "../../../../styles/dashboard.module.css";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import { DancersProps } from '@/app/types';


const Dancers = ({ firstName, lastName, Payment } : DancersProps) => {
  return (
    <>
      <div>
        <div className={Payment !== 0 ? styles.danceCard : styles.danceCardNoPay}>
          <h4>
            Bailarin {firstName + " " + lastName}
          </h4>
          <div className={styles.paymentC}>
            {!Payment ? <p>sin estado de pago</p> :
              <PaymentStatus
                Payment={Payment}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};


export default Dancers;