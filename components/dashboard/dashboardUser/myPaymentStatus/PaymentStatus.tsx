import styles from "@/styles/dashboard.module.css";
import { PaymentStatusProps } from "@/app/types";
import {PDFDownloadLink} from "@react-pdf/renderer"
import ConfirmedPayment from "../../pdf/ConfirmedPayment"
export const PaymentStatus = ({ Payment, pending, representative, firstName, lastName }: PaymentStatusProps) => {
  const totalMonths: number = 12;
  const currentDateTime = new Date().toISOString();
  const currentMonth = new Date(currentDateTime).getMonth();
  const months: string[] = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

 
  const confirmedPayments = (Payment ?? 0) - (pending ?? 0);
  const pendingPayments = (Payment ?? 0) - confirmedPayments;

  let monthsNotPaidyet: number = currentMonth + 1 - confirmedPayments;
  let monthsNotInPresent: number = monthsNotPaidyet <= 0 ? totalMonths - confirmedPayments : totalMonths - confirmedPayments - monthsNotPaidyet;

  const notPaidMonths: string[] = months.slice(confirmedPayments +(pending ?? 0), currentMonth + 1);
  const paidMonths: string[] = months.slice(0, confirmedPayments);
  const pendingMonths: string[] = months.slice(confirmedPayments, confirmedPayments + pendingPayments);
  const inComingMonths: string[] = months.slice(currentMonth + 1);

  const confirmedWidth: number = (100 / totalMonths) * confirmedPayments;
  const pendingWidth: number = (100 / totalMonths) * pendingPayments;
  const notPaidWidth: number = (100 / totalMonths) * monthsNotPaidyet;
  const inComingWidth: number = (100 / totalMonths) * monthsNotInPresent;
  
  const handleConfirmedPayment = (index: number) =>{
    const paidMonth = months[index]
    let monthFullName = '';
    switch (paidMonth){
      case 'E':
      monthFullName = 'Enero';
      break;
      case 'F':
      monthFullName = 'Febrero';
      break;
      case 'M':
      monthFullName = index === 2 ? 'Marzo' : 'Mayo';
      break;
      case 'A':
      monthFullName = 'Abril';
      break;
      case 'J':
      monthFullName = index === 5 ? 'Junio' : 'Julio';
      break;
      case 'A':
      monthFullName = 'Agosto';
      break;
      case 'S':
      monthFullName = 'Septiembre';
      break;
      case 'O':
      monthFullName = 'Octubre';
      break;
      case 'N':
      monthFullName = 'Noviembre';
      break;
      case 'D':
      monthFullName = 'Diciembre';
      break;   
      default:
        monthFullName = '' 
    }
    
    const data = {
      mes : monthFullName,
      firstName,
      lastName
    }
    return(
      <PDFDownloadLink
      document={<ConfirmedPayment data={data} />}
      fileName={`Comprobante-pago-${monthFullName}.pdf`}
      >
      { ({loading}) => 
        loading ? (<button disabled className={styles.pButton}>...</button>)
        : (<button className={styles.pButton}>DC</button>)
      }
      </PDFDownloadLink>  
    )
  }

  return (
    <div className={styles.paymentStatus}>
      <h4 className={styles.title}>Estado de pago</h4>
      <div className={styles.paymentBar}>
        {confirmedWidth > 0 && (
          <div className={styles.barSection} style={{ width: `${confirmedWidth}%`, backgroundColor: 'var(--color-confirmed)' }}>
            {paidMonths.map((month, index) => (
              <span key={index} className={styles.month}>
                {index < confirmedPayments && handleConfirmedPayment(index)}
              </span>
            ))}
          </div>
        )}
        {pendingWidth > 0 && (
          <div className={styles.barSection} style={{ width: `${pendingWidth}%`, backgroundColor: 'var(--color-pending)' }}>
            {pendingMonths.map((month, index) => (
              <span key={index} className={styles.month}>{month}</span>
            ))}
          </div>
        )}
        {notPaidWidth > 0 && (
          <div className={styles.barSection} style={{ width: `${notPaidWidth}%`, backgroundColor: 'var(--color-not-paid)' }}>
            {notPaidMonths.map((month, index) => (
              <span key={index} className={styles.month}>{month}</span>
            ))}
          </div>
        )}
        {inComingWidth > 0 && (
          <div className={styles.barSection} style={{ width: `${inComingWidth}%`, backgroundColor: 'var(--color-incoming)' }}>
            {inComingMonths.map((month, index) => (
              <span key={index} className={styles.month}>{month}</span>
            ))}
          </div>
        )}
      </div>
      {
        representative === false ? (
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-confirmed)' }}></span>
              <span>Pagado</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-pending)' }}></span>
              <span>Pendiente</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-not-paid)' }}></span>
              <span>No pagado</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendColor} style={{ backgroundColor: 'var(--color-incoming)' }}></span>
              <span>Próximo</span>
            </div>
          </div>
      
        ) : null
      }
      </div>
  );
};

export default PaymentStatus;



 
