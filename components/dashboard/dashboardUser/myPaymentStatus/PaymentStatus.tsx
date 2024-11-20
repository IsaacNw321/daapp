import styles from "../../../../styles/dashboard.module.css";
import { PaymentStatusProps } from "@/app/types";

export const PaymentStatus = ({ Payment, pending }: PaymentStatusProps) => {
  const totalMonths: number = 12;
  const currentDateTime = new Date().toISOString();
  const currentMonth = new Date(currentDateTime).getMonth();
  const months: string[] = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  // Calculate confirmed and pending payments
  const confirmedPayments = Payment - pending;
  const pendingPayments = Payment - confirmedPayments;

  let monthsNotPaidyet: number = currentMonth + 1 - confirmedPayments;
  let monthsNotInPresent: number = monthsNotPaidyet <= 0 ? totalMonths - confirmedPayments : totalMonths - confirmedPayments - monthsNotPaidyet;

  const notPaidMonths: string[] = months.slice(confirmedPayments + pending, currentMonth + 1);
  const paidMonths: string[] = months.slice(0, confirmedPayments);
  const pendingMonths: string[] = months.slice(confirmedPayments, confirmedPayments + pendingPayments);
  const inComingMonths: string[] = months.slice(currentMonth + 1);

  const greenWidth: number = (100 / totalMonths) * confirmedPayments;
  const blueWidth: number = (100 / totalMonths) * pendingPayments;
  const redWidth: number = (100 / totalMonths) * monthsNotPaidyet;
  const grayWidth: number = (100 / totalMonths) * monthsNotInPresent;

  return (
    <>
      <h4>Estado de pago</h4>
      <div className={styles.paymentB}>
        <div className={styles.greenBar} style={{ width: `${greenWidth}%` }}>
          <ul>{paidMonths.join(', ')}</ul>
        </div>
        <div className={styles.blueBar} style={{ width: `${blueWidth}%` }}>
          <ul>{pendingMonths.join(', ')}</ul>
        </div>
        <div className={styles.redBar} style={{ width: `${redWidth}%` }}>
          <ul>{notPaidMonths.join(', ')}</ul>
        </div>
        <div className={styles.grayBar} style={{ width: `${grayWidth}%` }}>
          <ul>{inComingMonths.join(', ')}</ul>
        </div>
      </div>
    </>
  );
};

export default PaymentStatus;