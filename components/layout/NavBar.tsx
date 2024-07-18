import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
import logo from "../../public/images/finalLogo.jpg";
import Image from "next/image";
import { LogginButton } from "../login/LoginButton";
import MenuIcon from "../../public/images/MenuuIcon.jpg"
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserById } from "../../utils/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import { postUser, emailExist } from "../../utils/users";
import { string } from "zod";

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
  const [picture, setPicture] = useState<String | undefined>('');
  const [showMenu, setShowMenu] = useState<any>(false);
  const queryClient = useQueryClient();
  const {user} = useUser();
  const userId = user?.sub ?? '';
  
  
  const postUserMutation = useMutation(postUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId]);
    },
  });
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId), {
    enabled: !!userId, 
  });
  let count = 0;
  useEffect(() => {
    if (count>0) return;
    if (!user) return;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email && emailPattern.test(user.email)) {
      if (!dbUser) {
        try {
          const data = {
            id: userId,
            firstName: user.given_name as string,
            lastName: user.family_name as string,
            email: user.email as string,
            photo: user.picture as string,
          };
          postUserMutation.mutate(data);
          count++;
        } catch (error) {
          console.error("Error verifying emails:", error);
        }
      } else {
        if (!isLoading) {
          setName(dbUser?.firstName);
          setPicture(dbUser?.photo);
        }
      }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, dbUser, user, userId, count]);
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
                  width={80}
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