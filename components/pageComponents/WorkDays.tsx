import styles from "../../styles/contact.module.css";
import { NextComponentType } from "next";
import Link from "next/link";
const WorkDays : NextComponentType = () =>{
  return (
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
    <h2>Horario de trabajo</h2>
    <div className={styles.order}> 
      <div className={styles.day} >
        Martes : 09:30 am a 11:30 am
      </div>
      <div className={styles.day} >
        Jueves : 09:30 am a 11:30 am
      </div>
      <div className={styles.day} >
        Sabado : 01:00 pm a 4:30pm
      </div>
    </div>
   </div>
  )
}

export default WorkDays;