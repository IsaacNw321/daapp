import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
import logo from "../../public/images/blackLogo.png";
import Image from "next/image";
import { LogginButton } from "../login/LoginButton";
import MenuIcon from "../../public/images/MenuuIcon.jpg"
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";


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




export default function NavBar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <header className={styles.header}>
      <nav>
        <button onClick={() => setShowMenu(!showMenu)}>
          <div>
            <Image
              src={MenuIcon}
              className={styles.toggleMenu}
              alt="MenuIcon"
              width={40}
              height={40}
            />
          </div>
        </button>
        <ul className={showMenu ? styles.Nav : styles.NavShow}>
          {links.map(({ type, label, route }) => (
            <li key={route} className={styles.Div}>
              <Link href={route}>
                <div>
                  {type === "image" && (
                    <h3>
                      <Image
                        width={50}
                        height={50}
                        alt="logo"
                        src={logo}
                        priority={true}
                        className={styles.logo}
                      />
                    </h3>
                  )}
                  {label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          {user ? (
            <LogginButton />
          ) : (
            <Link href="/api/auth/login">
              <button className={styles.notLoog}>
                Iniciar Sesion
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}