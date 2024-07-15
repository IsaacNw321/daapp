"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
import  {emailExist, getUserById, postUser} from "../../utils/users";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import Loading from "../layout/loading";

export const LogginButton = ({ userName, userEmail, userPicture }: any) =>{
  const [dropdown, setDropdown] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const {error,  user} = useUser();
  const { picture } = user || {};
  const showMenu = () => {
    setDropdown(!dropdown); 
}


  const userId = user?.sub ?? '';
 
  let id: string = ''
  if (user && user.sub) {
      id = user.sub
  }
  const { data: dbUser, isLoading } = useQuery(['user', id], () => getUserById(id));
  useEffect(() => {
    if (!isLoading && dbUser) {
        if (dbUser?.message?.userRole === 'ADMIN') {
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
    return <div className={styles.logNavBar}>Cargando, espere un momento por favor...</div>;
  }
  if (!dbUser){
    setTimeout(() => {
      window.location.href = '/api/auth/logout'; 
    }, 10000); 
  }
 return (
  <div className={styles.logNavBar}>
    {isLoading ?( <Loading/>) : (
      <div>
        <button onClick={showMenu}>
          {userPicture && (
            <Image
              className={styles.imgLogNavBar}
              width={40}
              height={40}
              src={userPicture}
              alt="User profile picture"
              priority={true}
            />
          )}
        </button>
        <u className={dropdown=== false ? styles.userButton : styles.userButtonShow}>
        <h3>{userName}</h3>
          <div className={isAdmin === true ? styles.button : styles.notButton}>
            <li>
          {isAdmin === true ?
            <Link href="/dashboard">
              <button className="">
                Panel de control
              </button>
            </Link>
            : null
          }
          </li>
          </div>
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
    ) 
    }
  </div>
);
}