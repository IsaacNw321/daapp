import styles from '@/styles/admin.module.css';
import { ControlPayments } from '../Payments/Payments';
import PaymentStatus from '../../dashboardUser/myPaymentStatus/PaymentStatus';
import { DancerR } from '@/app/types';
import { useMutation } from 'react-query';
import { deleteDancerR } from '@/utils/dancers';
import InfoDancerR from '../../dashboardUser/fullinfo/infoDancerR';
export interface DancerProp{
  dancer : DancerR
}
export const DancerRDetails: React.FC<DancerProp> = ({ dancer }) => {
  const mutation = useMutation((id : string) => deleteDancerR(id),{
  })
  let pending = 0;
  for (let i = 0; i < dancer.Payment?.length; i++) {
    if (dancer.Payment[i].confirm === false) {
      pending++;
    }
  }
  const handleDelete = async () => {
    mutation.mutate(dancer.id)
  }
  return (
    <div className={styles.flex}>
      <div className={styles.details}>
      <strong>Bailarin</strong>
      {dancer.firstName !== undefined ? <DetailItem label="Nombre" value={`${dancer?.firstName} ${dancer?.lastName}`} /> : null }
      <DetailItem label="Edad" value={dancer?.age} />
      <DetailItem label="CI" value={dancer?.cI} />
      <DetailItem label="Alergias" value={dancer?.allergies} />    
      </div>
      <div className={styles.infoForm}>
      <InfoDancerR dancerId={dancer.id} /> 
      </div>
      <button 
        onClick={() => handleDelete()} 
        disabled={mutation.isLoading 
          || mutation.isError 
          || mutation.isSuccess}
        className={
          mutation.isError 
          ? styles.errorMessage
          : mutation.isSuccess
          ? styles.successMessage
          : styles.deleteButton}>
        {mutation.isLoading 
         ? "Eliminando..."
        : mutation.isError
        ? "Error, intente mas tarde"
        : mutation.isSuccess
        ? "Eliminado"
        : "Eliminar Bailarin"
        }
      </button>
      <ControlPayments id={dancer.id} payments={dancer.Payment} dancerR={true} /> 
      <PaymentStatus Payment={dancer.Payment.length} pending={pending} representative={false} />
    </div>
  );
};

export function DetailItem({ label, value }: any) {
  return (
    <div className={styles.detailItem}>
      <p className={styles.detailLabel}>{label}</p>
      <p className={styles.detailValue}>{value}</p>
    </div>
  );
}