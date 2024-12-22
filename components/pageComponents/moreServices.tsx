import styles from "../../styles/moreServices.module.css";
import Image from "next/image";
import { useState } from "react";
import MS1 from "../../public/images/MS1.jpeg";
import MS2 from "../../public/images/MS2.jpeg";
import MS3 from "../../public/images/MS3.jpeg";
import MS4 from "../../public/images/contempo.jpeg";
import MS5 from "../../public/images/MS5.jpeg";
import MS6 from "../../public/images/MS6.jpeg";
import { NextComponentType } from "next";

const MoreServices : NextComponentType = () =>{

  const [showService, setShowService] = useState(false);
  return(
   
    <section className={styles.fatherCont}>
    <div 
      className={showService 
      ? styles.mServicesCont 
      : styles.mServicesContLittle}>
      <section 
        className={showService 
        ? styles.mServices 
        : styles.mServicesLittle}>
        <div className={styles.mservice}>
          <Image
            className={styles.imageS}
            height={260} 
            width={260}  
            alt={`picture`} 
            src={MS1}
            priority={true}>
          </Image>
          <h3>
            Clases Privadas
          </h3>
          <p>
            Todas nuestras clases disponibles para ti de manera personalizada
          </p>
        </div>
        <div className={styles.mservice}>
          <Image
            className={styles.imageS}
            height={260} 
            width={260}  
            alt={`picture`} 
            src={MS2}
            priority={true}>
          </Image>
              <h3>
                Clases de flexibilidad
              </h3>
              <p>
                Te enseñamos las tecnicas adecuadas para tu desarrollo corporal
              </p>
        </div>
        <div className={styles.mservice}>
          <Image
            className={styles.imageS}
            height={260} 
            width={260}  
            alt={`picture`} 
            src={MS4}
            priority={true}>
          </Image>
              <h3>
                Eventos de baile social
              </h3>
              <p>
                Te ofrecemos presentaciones adaptadas a cualquier tipo de evento o tematica
              </p>
        </div>
        {showService && (
          <>
            <div className={styles.mservice}>
              <Image
                className={styles.imageS}
                height={260} 
                width={260}  
                alt={`picture`} 
                src={MS3}
                loading="lazy">
              </Image>
              <h3>
                Clases acrobaticas
              </h3>
              <p>
                Te guiamos en los fundamentos basicos, desarrollando tus habilidades de acuerdo a tu nivel. 
              </p>
            </div>
            <div className={styles.mservice}>
              <Image
                className={styles.imageS}
                height={260} 
                width={260}  
                alt={`picture`} 
                src={MS5}
                loading="lazy">
              </Image>
              <h3>
                Condicionamiento fisico
              </h3>
              <p>
                Preparacion fisica y teorica sobre el manejo saludable en las practicas de baile.
              </p>
            </div>
            <div className={styles.mservice}>
              <Image
                className={styles.imageS}
                height={260} 
                width={260}  
                alt={`picture`} 
                src={MS6}
                loading="lazy">
              </Image>
              <h3>
                Eventos y espectaculos
              </h3>
              <p>
                Organizacion y desarrollo de montajes de alto rendimiento y duracion.
              </p>
            </div>
          </>
        )}
      </section>
      <button onClick={() => setShowService(!showService)}>
        {showService ? 'Ver menos' : 'Ver mas'}
      </button>
    </div>
    </section>
  )
}

export default MoreServices;