import styles from '@/styles/admin.module.css';
import { deletedReview } from '@/utils/reviews';
import { ControlPayments } from '../Payments/Payments';
import PaymentStatus from '../../dashboardUser/myPaymentStatus/PaymentStatus';
import { DancerR } from '@/app/types';
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

  return (
    <div className={styles.grid}>
      <p>Bailarin</p>
      {dancer.firstName !== undefined ? <DetailItem label="Nombre" value={`${dancer?.firstName} ${dancer?.lastName}`} /> : null }
      <DetailItem label="Edad" value={dancer?.age} />
      <DetailItem label="CI" value={dancer?.cI} />
      <DetailItem label="Alergias" value={dancer?.allergies} />
      <ControlPayments id={dancer.id} payments={dancer.Payment} dancerR={true} /> 
      <PaymentStatus Payment={dancer.Payment.length} pending={pending} />
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