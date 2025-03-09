import styles from "../../styles/Results.module.css";
import Image from "next/image";
import { NextComponentType } from "next";
import {motion} from 'framer-motion'
const Results : NextComponentType = () => {
  return(
      <motion.section
        initial={{ opacity : 0, y : 20 }}
        whileInView={{ opacity : 1, y : 0}}
        transition={{duration : 1}}
        className={styles.fatherCont}
      >
      <div className={styles.upCont}>
        <Image
          className={styles.image}
          width={400}
          height={400}
          alt="image"
          src="https://i.imgur.com/5g1s7ZW.jpg"
          loading="lazy"
        />
      </div>
      </motion.section>
  )
}

export default Results;