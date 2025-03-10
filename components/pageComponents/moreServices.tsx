import styles from "../../styles/moreServices.module.css";
import Image from "next/image";
import { useState } from "react";
import { NextComponentType } from "next";
import {motion} from "framer-motion"
const MoreServices : NextComponentType = () =>{

  const [showService, setShowService] = useState(false);
  return(
       <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={styles.fatherCont}
        >
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
            src={"https://i.imgur.com/bGXJ8kc.jpg"}
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
            src={"https://i.imgur.com/ZENt4Un.jpg"}
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
            src="https://i.imgur.com/CbmUYpP.jpg"
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
                src="https://i.imgur.com/xZ3K22M.jpg"
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
                src="https://i.imgur.com/iPXLjFr.jpg"
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
                src="https://i.imgur.com/EvVAMHY.jpg"
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
    </motion.section>
  )
}

export default MoreServices;