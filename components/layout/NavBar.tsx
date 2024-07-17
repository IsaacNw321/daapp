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
  const postUserMutation = useMutation(postUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId]);
    },
  });
  const {user} = useUser();
  const userId = user?.sub ?? '';
  
  
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId));
  
  useEffect(() => {
    const verifyEmails = emailExist();
    if(!user) return
    if (user && !verifyEmails !== undefined) {
        verifyEmails.then(result => {
            if (result.some(email => email === user?.email)) {
                console.log("This user already exists");
            } else {
                const data = {
                    id: userId,
                    firstName: user?.given_name,
                    lastName: user?.family_name,
                    email: user?.email,
                    photo: user?.picture,
                };
                postUserMutation.mutate(data);
            }
        });

        if (!isLoading) {
            setName(dbUser?.message.firstName);
            setPicture(dbUser?.message.photo);
        }
    }
}, [isLoading, dbUser, user, userId, postUserMutation]);
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