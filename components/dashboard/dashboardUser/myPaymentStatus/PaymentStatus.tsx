import styles from "../../../../styles/dashboard.module.css"


export const PaymentStatus = ({ Payment }: any) => {
  const totalMonths = 12;
  const currentMonth = new Date().getMonth();
  const months = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  let monthsNotPaidyet = new Date().getMonth() + 1 - Payment;
  
  let monthsNotInPresent = monthsNotPaidyet <= 0 ? totalMonths - Payment : totalMonths - Payment - monthsNotPaidyet;
  const notPaidMonths = months.slice(Payment, currentMonth +1 );
  const paidMonths = months.slice(0 , Payment);
  const inComingMonths = months.slice(currentMonth +1 );

  

  const greenWidth = (100 / totalMonths) * Payment;
  const redWidth = (100 / totalMonths) * monthsNotPaidyet;
  const grayWidth = (100 / totalMonths) * monthsNotInPresent;


  return (
    <>
      <h4>Estado de pago</h4>
      <div className={styles.paymentB}>
        <div className={styles.greenBar} style={{ width: `${greenWidth}%` }}>
          Pagado
          <ul>{paidMonths.join(', ')}</ul>
        </div>
        <div className={styles.redBar} style={{ width: `${redWidth}%` }}>
          No 
          <ul>{notPaidMonths.join(', ')}</ul> 
        </div>
        <div className={styles.grayBar} style={{ width: `${grayWidth}%` }}>
          Meses por venir
          <ul>{inComingMonths.join(', ')}</ul>
        </div>
      </div>
    </>
  );
};


export default PaymentStatus;