import { Payment, postPaymentProps, TypePayment } from "@/app/types";
import styles from '@/styles/admin.module.css';
import { useMutation } from "react-query";
import { postPayment, confirmedPayment, deletePayment } from "@/utils/payments";
import { useState } from "react";

export interface ControlPaymentsProps {
  payments?: Payment[];
  id?: string;
  dancerR: boolean;
}

export const ControlPayments: React.FC<ControlPaymentsProps> = ({ payments, id, dancerR }) => {
  const [typePayment, setTypePayment] = useState<TypePayment>(TypePayment.PMOVIL);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [successStates, setSuccessStates] = useState<{ [key: string]: string | null }>({});

  const mutation = useMutation((data: postPaymentProps) => postPayment(data), {
    onSuccess: () => {
      setSuccessStates(prev => ({ ...prev, [id!]: "Pago enviado" }));
      setTimeout(() => {
        setAddPayment(false);
        setSuccessStates(prev => ({ ...prev, [id!]: null }));
      }, 2000);
    },
    onError: () => {
      setTimeout(() => {
        setAddPayment(false);
      }, 2000);
    }
  });

  const handlePayment =(id: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const typePayment = formData.get('typePayment') as string;
    if(dancerR){
      let dancerRId = id
      if (typePayment === TypePayment.PMOVIL) {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerRId };
        mutation.mutate(paymentData)
      } else if (typePayment === TypePayment.CASH) {
        const paymentData = { cash: true, typePayment, dancerRId };
        mutation.mutate(paymentData);
      }
    } else {
      let dancerId = id
      if (typePayment === TypePayment.PMOVIL) {
        const numberRef = formData.get('numberRef') as string;
        const paymentData = { numberRef, typePayment, dancerId };
        mutation.mutate(paymentData);
      } else if (typePayment === TypePayment.CASH) {
        const paymentData = { cash: true, typePayment, dancerId };
        mutation.mutate(paymentData);
      }
    }
}

  const handleShowP = () => {
    setAddPayment(prevState => !prevState);
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypePayment(e.target.value as TypePayment);
  };

  const handleDelete = async (paymentId: string) => {
    setLoadingStates(prev => ({ ...prev, [paymentId]: true }));
    try {
      const deleted = await deletePayment(paymentId);
      setSuccessStates(prev => ({ ...prev, [paymentId]: deleted === 200 ? "Pago eliminado" : "Error eliminando" }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [paymentId]: false }));
    }
  };

  const handleConfirm = async (paymentId: string) => {
    setLoadingStates(prev => ({ ...prev, [paymentId]: true }));
    try {
      const responseStatus = await confirmedPayment(paymentId, { confirm: true });
      setSuccessStates(prev => ({ ...prev, [paymentId]: responseStatus === 200 ? "Pago confirmado" : "Error confirmando" }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [paymentId]: false }));
    }
  };

  return (
    <>
      <h3>Lista de Pagos</h3>
      <section className={styles.listPayment}>
        <ul className={styles.listPayments}>
          {payments?.length === 0 ? <p>No hay datos de pago</p> :
            payments?.map((payment: Payment) => (
              <li className={styles.payment} key={payment.id}>
                <p>
                  <strong>{payment.type === TypePayment.PMOVIL ? "Pago Movil" : "Efectivo"}</strong> : {payment.type === TypePayment.PMOVIL ? payment.numberRef : payment.cash}
                  {!payment.confirm && (
                    <button
                      onClick={() => handleConfirm(payment.id)}
                      disabled={loadingStates[payment.id] || successStates[payment.id] === "Pago confirmado"}
                      className={
                        successStates[payment.id] === "Error confirmando"
                          ? styles.errorMessage
                          : successStates[payment.id] === "Pago confirmado"
                            ? styles.successMessage
                            : styles.roleButton
                      }>
                      {loadingStates[payment.id] ? "Confirmando..."
                        : successStates[payment.id] === "Error confirmando"
                          ? "Error confirmando"
                          : successStates[payment.id] === "Pago confirmado"
                            ? "Pago confirmado"
                            : "Confirmar Pago"}
                    </button>
                  )}
                </p>
                <button
                  className={
                    successStates[payment.id] === "Error eliminando"
                      ? styles.errorMessage
                      : successStates[payment.id] === "Pago eliminado"
                        ? styles.successMessage
                        : styles.deleteButton
                  }
                  onClick={() => handleDelete(payment.id)}>
                  {loadingStates[payment.id] ? "Eliminando..."
                    : successStates[payment.id] === "Error eliminando"
                      ? "Error eliminando"
                      : successStates[payment.id] === "Pago eliminado"
                        ? "Pago eliminado"
                        : "Eliminar Pago"}
                </button>
              </li>
            ))
          }
        </ul>
        <div className={styles.flex}>
          <button className={styles.roleButton} onClick={handleShowP}>
            Agregar Pago
          </button>
          {addPayment && id !== undefined && (
            <form className={styles.form} onSubmit={handlePayment(id)}>
              <select name='typePayment' onChange={handleType}>
                <option value={TypePayment.PMOVIL}>Pago movil</option>
                <option value={TypePayment.CASH}>Efectivo</option>
              </select>
              {typePayment === TypePayment.PMOVIL && (
                <>
                  <label htmlFor="numberRef">Numero de Referencia</label>
                  <input type="text" name='numberRef' placeholder='Numero de referencia' />
                </>
              )}
              <button
                type='submit'
                disabled={mutation.isLoading || mutation.isError}
                className={
                  mutation.isError
                    ? styles.errorMessage
                    : successStates[id!] === "Pago enviado"
                      ? styles.successMessage
                      : styles.roleButton
                }>
                {mutation.isLoading ? 'Enviando...'
                  : successStates[id!] === "Pago enviado" ? 'Enviado'
                    : mutation.isError ? 'Hubo un error intente mas tarde'
                      : 'Enviar'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};