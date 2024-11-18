import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserById } from '@/utils/users'; 
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
        <DetailItem label="Direccion" value={user.dancer.Address} />
        <DetailItem label="CI" value={user.dancer.CI} />
        <DetailItem label="Alergias" value={user.dancer.allergies} />
      </>
    ) : user.userRole === "REPRESENTATIVE" ? (
      <>
        <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />   
        <DetailItem label="Telefono" value={user.representative.phone} />
        <DetailItem label="Direccion" value={user.representative.Adress} />
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