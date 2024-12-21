import styles from "../../styles/contact.module.css";
import { NextComponentType } from "next";
import Link from "next/link";
const WorkDays : NextComponentType = () =>{
  return (
    <section className={styles.daysCont}>
    <div className={styles.rightCont}>
        <h2>
          Registrate y mantente informado
        </h2>
        <span></span>
        <p>
          ¡Si tienes una duda, no dudes en contactarte con nosotros!
        </p>
        <Link 
              href={'/api/auth/login'}
              style={{ 
              textDecoration: 'none',
              backgroundColor: 'transparent' 
              }}
            >
              <button>
                Registrarme
              </button>
            </Link>
    <h3>Horario de trabajo</h3>
    <ul className={styles.order}> 
      <li className={styles.day} >
        Martes : 09:30 am a 11:30 am
      </li>
      <li className={styles.day} >
        Jueves : 09:30 am a 11:30 am
      </li>
      <li className={styles.day} >
        Sabado : 01:00 pm a 4:30pm
      </li>
    </ul>
   </div>
   </section>
  )
}

export default WorkDays;