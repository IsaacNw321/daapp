import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';
import { User } from '@/app/types';
import { getUserById } from '@/utils/users';
import { UserRole } from '@/app/types';
import { RepresentativeDetails } from '@/components/dashboard/dashboardAdmin/users/RepresentativeDetails';
import { DancerDetails } from '@/components/dashboard/dashboardAdmin/users/DancersDetails';
import { DetailItem } from '@/components/dashboard/dashboardAdmin/users/DancersDetails';
import { useQuery } from 'react-query';
import Loading from '@/components/NavBar/loading';
import Link from 'next/link';
export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | undefined>(undefined);
  const { data: dbUser, isLoading, error } = useQuery<User | undefined>(
    ['user', id],
    () => {
      if (id) {
        return getUserById(id as string);
      }
      return undefined;
    },
    {
      enabled: !!id,
    }
  );
  useEffect(() => {
    if(!dbUser) return
    setUser(dbUser)
    
  }, [id, dbUser]);

 if(isLoading){
  return(
    <div className={styles.container}>
      <Loading/>
    </div>
  )
 }
 if(error) return <div>
  Hubo un error vuelva a intentarlo mas tarde
 </div>
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Detalles de usuario</h1>
        <DetailItem label="Nombre" value={`${user?.firstName} ${user?.lastName}`} />
        </header>
        <Link  className={styles.roleButton} style={{ marginBottom: '10px' }}href="/admin" passHref>
            Volver
        </Link>
        <div className={styles.content}>
            {user?.userRole === UserRole.REPRESENTATIVE ? (
              <RepresentativeDetails representative={user.representative} />
            ) : user?.userRole === UserRole.DANCER ? (
              <DancerDetails firstName={user.firstName} lastName={user.lastName} dancer={user.dancer} />
            ) : (
              <p>Rol sin asignar</p>
            )}
        </div>
      </div>
    </div>
  );
}

