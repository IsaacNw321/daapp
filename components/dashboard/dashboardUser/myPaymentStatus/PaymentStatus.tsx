import styles from "../../../../styles/dashboard.module.css";
import { PaymentStatusProps } from "@/app/types";


export const PaymentStatus = ({ Payment }: PaymentStatusProps) => {
  const totalMonths: number = 12;
  const currentDateTime = new Date().toISOString();
const currentMonth = new Date(currentDateTime).getMonth();
  const months: string[] = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  let monthsNotPaidyet: number = currentMonth + 1 - Payment;
  let monthsNotInPresent: number = monthsNotPaidyet <= 0 ? totalMonths - Payment : totalMonths - Payment - monthsNotPaidyet;

  const notPaidMonths: string[] = months.slice(Payment, currentMonth + 1);
  const paidMonths: string[] = months.slice(0, Payment);
  const inComingMonths: string[] = months.slice(currentMonth + 1);

  const greenWidth: number = (100 / totalMonths) * Payment;
  const redWidth: number = (100 / totalMonths) * monthsNotPaidyet;
  const grayWidth: number = (100 / totalMonths) * monthsNotInPresent;

  return (
    <>
      <h4>Estado de pago</h4>
      <div className={styles.paymentB}>
        <div className={styles.greenBar} style={{ width: `${greenWidth}%` }}>
          Pagado <ul>{paidMonths.join(', ')}</ul>
        </div>
        <div className={styles.redBar} style={{ width: `${redWidth}%` }}>
          No <ul>{notPaidMonths.join(', ')}</ul>
        </div>
        <div className={styles.grayBar} style={{ width: `${grayWidth}%` }}>
          Meses por venir <ul>{inComingMonths.join(', ')}</ul>
        </div>
      </div>
    </>
  );
};

export default PaymentStatus;