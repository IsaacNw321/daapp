"use client"
import styles from "@/styles/dashboard.module.css";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import { DancersProps } from '@/app/types';
import InfoDancerR from "../fullinfo/infoDancerR";

const Dancers = ({id, firstName, lastName, Payment, pending } : DancersProps) => {
  return (
      <li className={styles.danceCard}>
          <h4>
            Bailarin {firstName + " " + lastName}
          </h4>
          <div className={styles.paymentC}>
              <PaymentStatus
                representative={true}
                Payment={Payment}
                pending={pending}
              />
          </div>
          <InfoDancerR dancerId={id}/>
      </li>
  );
};


export default Dancers;