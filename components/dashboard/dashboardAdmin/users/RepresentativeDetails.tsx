import { TypePayment, User } from "@/app/types";
import PaymentStatus from "../../dashboardUser/myPaymentStatus/PaymentStatus";
import styles from '@/styles/admin.module.css';
import { postPayment, updatePayment } from "@/utils/payments";
import { deletedReview } from "@/utils/reviews";
import { useState } from "react";
import { ControlPayments } from "../Payments/Payments";

export const RepresentativeDetails: React.FC<{ user: User }> = ({ user }) => {

  let pending = 0;
  for (let i = 0; i < user.representative.Payment.length; i++) {
    if (user.representative.Payment[i].confirm === false) {
      pending++;
    }
  }

  return (
    <div className={styles.grid}>
      <p>Representante</p>
      <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />
      <DetailItem label="Telefono" value={user.representative?.phone} />
      <DetailItem label="Direccion" value={user.representative?.Adress} />
      <DetailItem label="Fecha de inscripcion" value={user.createdAt} />
      {user.representative?.review?.content ? (
        <>
          <DetailItem label="Comentario" value={user.representative.review.content} />
          <button
            onClick={() => deletedReview(user.representative?.review?.id)}
            className={styles.deleteButton}
          >
            Borrar Comentario
          </button>
        </>
      ) : null}
      {user.representative?.dancers.map(dancer => (
        <PaymentStatus key={dancer.id} Payment={dancer.Payment.length} pending={pending} />
      ))}
      {user.representative?.dancers.map(dancer => (
        <ControlPayments key={dancer.id} id={dancer.id} payments={dancer.Payment} />
      ))}
    </div>
  );
};

function DetailItem({ label, value }: any) {
  return (
    <div className={styles.detailItem}>
      <p className={styles.detailLabel}>{label}</p>
      <p className={styles.detailValue}>{value}</p>
    </div>
  );
}