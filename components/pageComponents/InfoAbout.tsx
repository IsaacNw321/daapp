import styles from "../../styles/about.module.css";
import Image from "next/image"
import { NextComponentType } from "next";
import {motion} from "framer-motion"
const InfoAbout : NextComponentType = () =>{
  return(
    <motion.section
      initial={{ opacity : 0}}
      whileInView={{ opacity : 1}}
      transition={{duration : 1}}
      className={styles.upCont}
      >
    <div className={styles.about}>
      <h3>
        Sobre nosotros
      </h3>
      <h2>
        Bienvenidos
      </h2>
      <span className={styles.line}>
      </span>
      <p>
        Bienvenido a Dancers Angels, tu mejor estudio de danza integral. Estamos ubicados en Ejido, Mérida, Venezuela; destacandonos en areas de baile como Ballet, Danza Contemporanea, Danza Lirica y Urbana, canalizando nuestras puestas en escena mediante el manejo emocional y corporal. Te brindamos clases de baile para todas las edades y niveles, brindando una experiencia única y divertida. Únete a nuestra comunidad de bailarines y descubre tu pasión por el baile en Dancers Angels.
      </p>
    </div>
    <div>
      <Image
        className={styles.image}
        alt={'Directora'}
        src="https://i.imgur.com/fH47st6.jpg"
        width={400}
        height={450}
        priority={true}>
      </Image>
    </div>
    <div>
    <Image
      className={styles.image}
        alt={'student'}
        src="https://i.imgur.com/22fOykq.jpg"
        width={400}
        height={450}
        priority={true}>
      </Image>
    </div>
    </motion.section>
  )
}

export default InfoAbout;