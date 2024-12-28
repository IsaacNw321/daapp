import styles from "../../styles/about.module.css";
import { NextComponentType } from "next";
import {motion} from 'framer-motion'
const SomeServices : NextComponentType = () =>{

  return(
        <motion.section
      initial={{ opacity : 0}}
      whileInView={{ opacity : 1}}
      transition={{duration : 1}}
      className={styles.downCont}
      >
        <h2>
          Servicios
        </h2>
        <div className={styles.services}>
          <div className={styles.service}>
            <h3>
              Clases privadas de baile
            </h3>
            <p>
              Contamos con instructores capacitados para ofrecer diversos talleres personalizados a interes y demanda del cliente
            </p>
          </div>
          <div className={styles.service}>
            <h3>
              Clases de baile en grupo
            </h3>
            <p>
              Preparacion practica y teorica sobre las diferentes areas de baile que manejamos,como tambien la elaboracion de montajes coreograficos especificos y tematicos.
            </p>
          </div>
          <div className={styles.service}>
            <h3>
              Eventos de baile social
            </h3>
            <p>
              Organizamos y ofrecemos presentaciones personalizadas para una gran cantidad de motivos: 15 años, Bodas, Reinados de Belleza, Aniversarios, Competencias y aportes comunitarios y sociales. 
            </p>
          </div>
          <div className={styles.service}>
            <h3>
              Clases de flexibilidad y acondicionamiento fisico
            </h3>
            <p>
              Aplicamos tecnicas adecuadas para cada alumno, desde sus condiciones y capacidades para conseguir de manera saludable los objetivos planteados en el area de baile.
            </p>
          </div>
          <div className={styles.service}>
            <h3>
              Clases de manejo emocional y corporal
            </h3>
            <p>
              Un buen manejo escenico y coreografico, parte desde la seguridad y confianza que transmites al publico, pero primordialmente desde el control instrospectivo que desarrolla cada bailarin a traves de tecnicas y planteamientos emocionales con la realizacion de ejercicios adaptados a las necesidades y debilidades de nuestros artistas.  
            </p>
          </div>
        </div>
        </motion.section>
  )
}

export default SomeServices;