import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from 'react-query';
import { getUserById } from '../../utils/users';
import { UseUsers } from '@/context/UserContext';
import styles from '../../styles/NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { UserRole } from '@/app/types';

export const LogginButton: React.FC = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { error } = useUser();
  const usuario = UseUsers();
  const router = useRouter(); 
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const showMenu = () => {
    setDropdown(!dropdown);
  };

  let id: string = usuario || '';

  const { data: dbUser, isLoading: isDbUserLoading } = useQuery(
    ['user', id],
    () => getUserById(id),
    {
      enabled: !!id, 
      onSettled: () => setIsUserLoading(false), 
    }
  );

  useEffect(() => {
    if (!isDbUserLoading && !dbUser) {
      const timeoutId = setTimeout(() => {
        router.push('/api/auth/logout'); 
      }, 20000);

      return () => clearTimeout(timeoutId); 
    }

    if (!isDbUserLoading && dbUser) {
      if (dbUser?.userRole === UserRole.ADMIN) {
        setIsAdmin(true);
      }
    }
  }, [dbUser, isDbUserLoading, router]);

  if (error) {
    return <div>Error</div>;
  }

  if (isUserLoading || isDbUserLoading) {
    return <div className={styles.logNavBar}>Cargando...</div>;
  }

  return (
    <div className={styles.logNavBar}>
      <div>
        <button onClick={showMenu}>
          {dbUser?.photo && (
            <Image
              className={styles.imgLogNavBar}
              width={40}
              height={40}
              src={dbUser?.photo ?? ""}
              alt="User profile picture"
              loading="lazy"
            />
          )}
        </button>
        <ul className={dropdown === false ? styles.userButton : styles.userButtonShow}>
          <h3>{dbUser?.firstName}</h3>
          <li className={isAdmin ? styles.button : styles.notButton}>
            {isAdmin && (
              <Link href="/admin">
                <button className="">
                  Panel de control
                </button>
              </Link>
            )}
          </li>
          <li>
            <Link href="/profile">
              <button>
                Mi perfil
              </button>
            </Link>
          </li>
          <li>
            <Link href="/api/auth/logout">
              <button>
                Cerrar Sesion
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};