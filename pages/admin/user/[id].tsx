import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';
import { User } from '@/app/types';
import { getUserById } from '@/utils/users';
import { UserRole } from '@/app/types';
import { RepresentativeDetails } from '@/components/dashboard/dashboardAdmin/users/RepresentativeDetails';
import { DancerDetails } from '@/components/dashboard/dashboardAdmin/users/DancersDetails';
import { DetailItem } from '@/components/dashboard/dashboardAdmin/users/DancersDetails';
export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | undefined>(undefined);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUserById(id as string);
        setUser(userResponse);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Detalles de usuario</h1>
        </header>
        <div className={styles.content}>
        <DetailItem label="Nombre" value={`${user?.firstName} ${user?.lastName}`} />
          <div className={styles.grid}>
            {user?.userRole === UserRole.REPRESENTATIVE ? (
              <RepresentativeDetails representative={user.representative} />
            ) : user?.userRole === UserRole.DANCER ? (
              <DancerDetails dancer={user.dancer} />
            ) : (
              <p>Rol sin asignar</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

