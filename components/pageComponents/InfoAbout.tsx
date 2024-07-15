import styles from "../../styles/about.module.css";
import ballet from "../../public/images/about2.jpeg";
import flow from "../../public/images/about1.jpeg";
import Image from "next/image"
import { NextComponentType } from "next";

const InfoAbout : NextComponentType = () =>{
  return(
    <div className={styles.upCont}>
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
        src={flow}
        width={400}
        height={450}
        loading="lazy">
      </Image>
    </div>
    <div>
    <Image
      className={styles.image}
        alt={'student'}
        src={ballet}
        width={400}
        height={450}
        loading="lazy">
      </Image>
    </div>
  </div>
  )
}

export default InfoAbout;