"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
import  { getUserById} from "../../utils/users";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { LogginButtonProps, UserRole} from "@/app/types";
import { UseUsers } from "@/context/UserContext";

export const LogginButton: React.FC<LogginButtonProps>  = ({ userName, userPicture }) =>{
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const {error,  user} = useUser();
  const usuario = UseUsers()
  const { picture } = user || {};
  const showMenu = () => {
    setDropdown(!dropdown); 
}
 
 let id: string = usuario || ''
  const { data: dbUser, isLoading } = useQuery(['user', id], () => getUserById(id), {
    enabled: !!id, 
  });
  useEffect(() => {
    if (!isLoading && dbUser) {
        if (dbUser?.userRole === UserRole.ADMIN) {
            setIsAdmin(true)
            return
        }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dbUser])
  if(error){
    return <div>Error</div>
  }
  if (isLoading) {
    return <div className={styles.logNavBar}>Cargando...</div>;
  }
  //if (!dbUser){
  //  setTimeout(() => {
  //    window.location.href = '/api/auth/logout'; 
  //  }, 100000); 
  //}
 return (
  <div className={styles.logNavBar}>
      <div>
        <button onClick={showMenu}>
          {userPicture && (
            <Image
              className={styles.imgLogNavBar}
              width={40}
              height={40}
              src={userPicture ?? ""}
              alt="User profile picture"
              loading="lazy"
            />
          )}
        </button>
        <u className={dropdown=== false ? styles.userButton : styles.userButtonShow}>
        <h3>{userName}</h3>       
            <li className={isAdmin === true ? styles.button : styles.notButton}>
          {isAdmin === true ?
            <Link href="/admin">
              <button className="">
                Panel de control
              </button>
            </Link>
            : null
          }
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
        </u>
      </div>
  </div>
);
}