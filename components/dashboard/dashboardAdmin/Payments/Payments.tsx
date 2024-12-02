import { Payment, TypePayment, User, UserRole } from "@/app/types"
import styles from '@/styles/admin.module.css'
import { postPayment, confirmedPayment, deletePayment } from "@/utils/payments"
import { useState } from "react"
export interface ControlPaymentsProps{
  payments?: Payment[];
  id? : string;
  dancerR : boolean;
}
export const ControlPayments: React.FC<ControlPaymentsProps> = ({payments, id, dancerR}) => {
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL)
  const [addPayment, setAddPayment] = useState<boolean>(false)
  const handlePayment =(id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const typePayment = formData.get('typePayment') as string;
    if(dancerR){
      let dancerRId = id
      if (typePayment === TypePayment.PMOVIL) {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerRId };
        postPayment(paymentData)
      } else if (typePayment === TypePayment.CASH) {
        const paymentData = { cash: true, typePayment, dancerRId };
        postPayment(paymentData);
      }
    } else {
      let dancerId = id
      if (typePayment === TypePayment.PMOVIL) {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerId };
        postPayment(paymentData)
      } else if (typePayment === TypePayment.CASH) {
        const paymentData = { cash: true, typePayment, dancerId };
        postPayment(paymentData);
      }
    }
}

let confirm = true;


const handleShowP = (e: any) => {
  setAddPayment(prevState => !prevState)
}
const handleType = (e: any) => {
const type = e.target.value
setTypePayment(type)
}

  return(
    <>
    <h3>Lista de Pagos</h3>
         <ul>               
          { 
          payments?.length === 0 ? <p>No hay datos de pago</p> : 
            payments?.map((payment : Payment) => {
              return(
                <li key={payment.id}>
                  {payment.type === TypePayment.PMOVIL ? (
                    <strong> Pago Movil : {payment.numberRef}
                     {payment.confirm ? null : (<button  onClick={() => confirmedPayment(payment.id, {confirm})}className={styles.roleButton}>
                     confirmar Pago
                     </button>)}</strong>
                  ) : (<strong> Efectivo : {payment.cash}   {payment.confirm ? null : (<button onClick={() => confirmedPayment(payment.id, {confirm})} className={styles.roleButton}>
                     confirmar Pago
                     </button>)}</strong>)}
                    <button className={styles.deleteButton} onClick={() => deletePayment(payment.id)}>
                     Eliminar Pago  
                    </button> 
                </li>
              )
            })
          }
         </ul>
         <button  className={styles.roleButton} onClick={handleShowP}>
            Agregar Pago
          </button>
          {
            addPayment && id !== undefined
            ? (
              <form onSubmit={handlePayment(id)}>
                <select name='typePayment' onChange={handleType} >
                  <option value={TypePayment.PMOVIL}>Pago movil</option>
                  <option value={TypePayment.CASH}>Efectivo</option>
                </select>
                {typePayment === TypePayment.PMOVIL ? (
                  <>
                  <label htmlFor="numberRef">Numero de Referencia</label>
                  <input type="text" name='numberRef'  placeholder='Numero de referencia'/>
                  </>
                ) : null}
                <button type='submit' className={styles.roleButton}>
                  Enviar
                </button>
              </form>
            ) : null
          }
    </>
  )
}