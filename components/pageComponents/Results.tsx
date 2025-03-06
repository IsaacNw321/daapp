import styles from "../../styles/Results.module.css";
import R1 from "../../public/images/results.jpeg";
import Image from "next/image";
import { NextComponentType } from "next";
import {motion} from 'framer-motion'
const Results : NextComponentType = () => {
  return(
      <motion.section
        initial={{ opacity : 0, y : 20 }}
        whileInView={{ opacity : 1, y : 0}}
        transition={{duration : 1}}
      >
      <div className={styles.upCont}>
        <Image
          className={styles.image}
          width={400}
          height={400}
          alt="image"
          src={R1}
          loading="lazy"
        />
      </div>
      <div className={styles.downCont}>
        <h2>
          Nuestros Resultados
        </h2>
        <p className={styles.proud}>
          Estamos orgullosos de lo que hemos logrado, pero no nos detenemos aquí.
        </p>
        <div className={styles.infoResults}>
          <div className={styles.infoResult}>
            <h3>
              5
            </h3>
            <p>
              Años de experiencia
            </p>
          </div>
          <div className={styles.infoResult}>
            <h3>
              100%
            </h3>
            <p>
              Clientes satisfechos
            </p>
          </div>
          <div className={styles.infoResult}>
            <h3>
              Mas de 10
            </h3>
            <p>
              Eventos Organizados
            </p>
          </div>
          <div className={styles.infoResult}>
            <h3>
              Mas de  50
            </h3>
            <p>
              Proyectos completados
            </p>
          </div>
        </div>
      </div>
      </motion.section>
  )
}

export default Results;