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
        Martes : 08:00 am a 11:00 am
        <p>Lirico</p>
      </div>
      <div className={styles.day} >
        Miercoles : 08:00 am a 11:00 am
         <p>Urbano</p>
      </div>
      <div className={styles.day} >
        Jueves : 08:00 am a 11:00 am
         <p>Ballet</p>
      </div>
      <div className={styles.day} >
        Viernes : 08:00 am a 11:00 am
        <p>Contemporaneo</p>
      </div>
      <div className={styles.day} >
        Sabado : 08:00 am a 12:00pm
         <p>Condicionamiento fisico</p>
      </div>
    </div>
   </div>
  )
}

export default WorkDays;