"use client"
import styles from "../../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/finalLogo.jpg";
export const Footer = () =>{
  return (
    <footer>
    <div className={styles.fatherCont}>
      <span className={styles.lineCont}>
      </span>
      <nav>
        <div className={styles.links}>
          <div className={styles.trendding}>
            <div className={styles.logo}>
              <Image
              width={60}
              height={60}
              alt="logo"
              src={logo}
              />
            </div>
            <Link 
              href={'/'}
              style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent' 
              }}
            >
              <button>
                Inicio
              </button>
            </Link>
            <Link 
              href={'/api/auth/login'}
              style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent' 
              }}
            >
              <button>
                Registrate ya
              </button>
            </Link>
          </div>
          <div className={styles.social}>
            <h3 className={styles.fooTitle2}>
              Social
            </h3>
            <div className={styles.media}>
              <div className={styles.media2}>  
                <Link 
                  href={'https://www.instagram.com/dancersangels?igsh=MXBobTU5cW1hbnQydQ=='}
                  style={{ 
                  textDecoration: 'none',
                  backgroundColor: 'transparent' 
                  }}
                >
                  <button>
                    Instagram
                  </button>
                </Link>
                <Link 
                  href={'https://www.facebook.com/profile.php?id=100064278514677'}
                  style={{ 
                  textDecoration: 'none',
                  backgroundColor: 'transparent' 
                  }}
                 >
                  <button>
                    Facebook
                  </button>
                </Link>
                <Link 
                  href={'https://www.tiktok.com/@dancersangels?_t=8nk9pFUBKBZ&_r=1'}
                  style={{ 
                  textDecoration: 'none',
                  backgroundColor: 'transparent' 
                  }}
                >
                  <button>
                    Tiktok
                  </button>
                </Link>
              </div> 
            </div>
          </div>
          <div className={styles.legal}>
            <h3 className={styles.fooTitle3}>
              Legal
            </h3>
            <Link 
              href={'/'}
              style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent' 
              }}
            >
              <button>
                Terminos y condiciones
              </button>
            </Link>  
            <Link 
              href={'/'}
              style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent' 
              }}
            >
              <button>
                Politica de privacidad
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.lineCont}>
      </div>
      <div className={styles.copyCont}>
        <p className={styles.text}>
          ©2024 Dancers Angels. Derechos Reservados.
        </p>
      </div>    
    </div>
  </footer>
  )
}