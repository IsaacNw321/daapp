"use client"
import styles from "@/styles/dashboard.module.css";
import PaymentStatus from "../myPaymentStatus/PaymentStatus";
import { DancersProps } from '@/app/types';


const Dancers = ({ firstName, lastName, Payment, pending } : DancersProps) => {
  return (
      <li className={Payment !== 0 ? styles.danceCard : styles.danceCardNoPay}>
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
      </li>
  );
};


export default Dancers;