import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserById } from '@/utils/users'; 
import { deletedReview } from '@/utils/reviews';
import PaymentStatus from '@/components/dashboard/dashboardUser/myPaymentStatus/PaymentStatus';
import styles from '@/styles/admin.module.css'
export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await getUserById(id as string);
          setUser(userData);
          console.log(user)
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Detalles de usuario</h1>
        </header>
        <div className={styles.content}>
  <div className={styles.grid}>
    <p>
      {user.userRole === "REPRESENTATIVE" ? "Representante" :
      user.userRole === "DANCER" ? "Bailarin" : 
      user.userRole === "CONTACT" ? "Usuario sin rol" : ""}
    </p>
    {user.userRole === "DANCER" ? (
      <>
        <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />
        <DetailItem label="Edad" value={user.dancer.age} />
        <DetailItem label="Telefono" value={user.dancer.phone} />
        <DetailItem label="Direccion" value={user.dancer.Adress} />
        <DetailItem label="CI" value={user.dancer.CI} />
        <DetailItem label="Alergias" value={user.dancer.allergies} />
        <DetailItem label= "Fecha de inscripcion" value={user.createdAt}/>
        {
          user.dancer.review?.content ? (
            <>
        <DetailItem label="Comentario" value={user.dancer.review.content} />
        <button onClick={() => deletedReview(user.dancer.review.id)} className={styles.deleteButton}>
          Borrar Comentario 
        </button>
            </>

          ) : <></>
        }
        {
          user.active ? (
            <PaymentStatus Payment={user.dancer.Payment} />
          ) : <></> 
        }
      </>
    ) : user.userRole === "REPRESENTATIVE" ? (
      <>
        <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />   
        <DetailItem label="Telefono" value={user.representative.phone} />
        <DetailItem label="Direccion" value={user.representative.Adress} />
        {
          user.representative.review?.content ? (
            <>
        <DetailItem label="Comentario" value={user.representative.review.content} />
        <button onClick={() => deletedReview(user.representative.review.id)} className={styles.deleteButton}>
          Borrar Comentario 
        </button>
            </>

          ) : <></>
        }
        <DetailItem label= "Fecha de inscripcion" value={user.createdAt}/>
        <ul className={styles.dancersR}>
          {user.representative?.dancers.map(dancer => {
            return(
              <li key={dancer.id}>
                <DetailItem label="Nombre" value={`${dancer.firstName} ${dancer.lastName}`} />
                <DetailItem label="Edad" value={dancer.age} />
                <DetailItem label="CI" value={dancer.cI} />
                <DetailItem label="Alergias" value={dancer.allergies} />
                <DetailItem label= "Fecha de inscripcion" value={dancer.dateBirth}/>
                {
                user.active ? (
                 <PaymentStatus Payment={dancer.Payment} />
                ) : <></> 
                }
              </li>
            )
          })}
        </ul>
      </>
    ) : (
      <p>Rol sin asignar</p>
    )}
  </div>
</div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: any) {
  return (
    <div className={styles.detailItem}>
      <p className={styles.detailLabel}>{label}</p>
      <p className={styles.detailValue}>{value}</p>
    </div>
  );
}