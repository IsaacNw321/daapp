import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
import logo from "../../public/images/blackLogo.png";
import Image from "next/image";
import { LogginButton } from "../login/LoginButton";
import MenuIcon from "../../public/images/MenuuIcon.jpg"
import { useState, useEffect } from "react";
import { useQuery} from "react-query";
import { getUserById } from "../../utils/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import {UseUsers} from "@/context/UserContext";

const links = [{
    type: "image",
    alt: "Logo",
    route : '/'
}, {
    type : "text",
    label: 'Sobre Nosotros',
    route: '/about'
},{
  type : "text",
  label : 'Contactanos',
  route: '/contact'
},{
  type : "text",
  label: 'Comenzar',
  route: '/profile'
}]




export default function NavBar(){
  const [name, setName] = useState<String | undefined>('')
  const [picture, setPicture] = useState<string | undefined>(undefined);
  const [showMenu, setShowMenu] = useState<any>(false);
  const usuario = UseUsers()
  const {user} = useUser();
  let id: string = usuario || ''
  const { data: dbUser, isLoading } = useQuery(['user', id], () => getUserById(id), {
    enabled: !!id, 
  });
  useEffect(() => {
    if (!isLoading &&dbUser) {
      setName(dbUser.firstName);
      setPicture(dbUser.photo);
    }
  }, [isLoading, dbUser]);
  return (
    <header className={styles.header}>
      <nav >
      <button onClick={()=>setShowMenu(!showMenu)}>
        <div>
          <Image
          src={MenuIcon}
          className={styles.toggleMenu}
          alt={"MenuIcon"}
          width={40}
          height={40}
          />
        </div>
        </button>
        <ul className={showMenu === false ? styles.NavShow : styles.Nav}>
          {links.map(({ type, label, route })=>
            <li key={route} className={styles.Div}>
              <Link href={route}>
                <div>
                  {type === "image" && 
                  <Image
                  width={50}
                  height={50}
                  alt="logo"
                  src={logo}
                   priority={true}
                   className={styles.logo}
                  />}
                  {label}
                </div>
              </Link>
            </li>
          )}
            </ul>
          <div>
            {user ? 
            <LogginButton
              userName={name ?? ''} 
              userPicture={picture ?? ''}  
              /> 
            :  <Link href="/api/auth/login">
            <button className={styles.notLoog}>
              Iniciar Sesion
            </button>
          </Link>}
          </div>
      </nav>
    </header>  
  )
}