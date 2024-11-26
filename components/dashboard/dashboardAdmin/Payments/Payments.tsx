import { TypePayment, User } from "@/app/types"
import styles from '@/styles/admin.module.css'
import { postPayment, updatePayment } from "@/utils/payments"
import { useState } from "react"
export const ControlPayments: React.FC<User> = ({payments, id} : any) => {
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL)
  const [addPayment, setAddPayment] = useState(false)
  const handlePayment =(id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const typePayment = formData.get('typePayment') as string;
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
            payments?.map(payment => {
              return(
                <li key={payment.id}>
                  {payment.type === "PMOVIL" ? (
                    <strong> Pago Movil : {payment.numberRef}
                     {payment.confirm ? null : (<button  onClick={() => updatePayment(payment.id, {confirm})}className={styles.roleButton}>
                     confirmar Pago
                     </button>)}</strong>
                  ) : (<strong> Efectivo : {payment.cash}   {payment.confirm ? null : (<button onClick={() => updatePayment(payment.id, {confirm})} className={styles.roleButton}>
                     confirmar Pago
                     </button>)}</strong>)}
                </li>
              )
            })
          }
         </ul>
         <button  className={styles.roleButton} onClick={handleShowP}>
            Agregar Pago
          </button>
          {
            addPayment 
            ? (
              <form onSubmit={handlePayment(id)}>
                <select name='typePayment' onChange={handleType} >
                  <option value={TypePayment.PMOVIL}>Pago movil</option>
                  <option value={TypePayment.CASH}>Efectivo</option>
                </select>
                {typePayment === "PMOVIL" ? (
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