import styles from '@/styles/admin.module.css';
import { ControlPayments } from '../Payments/Payments';
import PaymentStatus from '../../dashboardUser/myPaymentStatus/PaymentStatus';
import { DancerR } from '@/app/types';
import { deleteDancerR } from '@/utils/dancers';
import InfoDancerR from '../../dashboardUser/fullinfo/infoDancerR';
export interface DancerProp{
  dancer : DancerR
}
export const DancerRDetails: React.FC<DancerProp> = ({ dancer }) => {
  
  let pending = 0;
  for (let i = 0; i < dancer.Payment?.length; i++) {
    if (dancer.Payment[i].confirm === false) {
      pending++;
    }
  }
  const handleDelete = async () => {
    const deleted = await deleteDancerR(dancer.id);
  }
  return (
    <div className={styles.grid}>
      <p>Bailarin</p>
      {dancer.firstName !== undefined ? <DetailItem label="Nombre" value={`${dancer?.firstName} ${dancer?.lastName}`} /> : null }
      <DetailItem label="Edad" value={dancer?.age} />
      <DetailItem label="CI" value={dancer?.cI} />
      <DetailItem label="Alergias" value={dancer?.allergies} />    
      <div>
        Hola
      </div>
      <InfoDancerR dancerId={dancer.id} /> 
      <button onClick={() => handleDelete()} className={styles.deleteButton}>
        Eliminar Bailarin
      </button>
      <ControlPayments id={dancer.id} payments={dancer.Payment} dancerR={true} /> 
      <PaymentStatus Payment={dancer.Payment.length} pending={pending} representative={true} />
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