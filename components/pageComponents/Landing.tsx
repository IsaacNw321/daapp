import styles from "../../styles/home.module.css";
import Image from "next/image";
import Reginfo from "../../public/images/reginfo.jpeg";
import { NextComponentType } from "next";
import Link from "next/link";
const Landing : NextComponentType = () => {
  return(
    <section className={styles.Landing}>
      <Image
        className={styles.image}
        width={700} 
        height={700} 
        alt={'Dancers'} 
        src={Reginfo}
        priority={true}>
      </Image>
    <div className={styles.fadeInLeftWhen}>
    <h1 className={styles.title}>
      Aprende a Bailar con
      <br></br>
      Dancers Angels
      <br></br> 
      Pasion por el baile
    </h1>
    <p className={styles.text}>
      Creamos artistas capaces de desplegar sus alas
    </p>
    <Link href={'/about'} style={{ textDecoration: 'none', backgroundColor: 'transparent' }}>
    <button className={styles.buttonH}>
    Conoce mas 
    </button>
    </Link>
    </div>
</section>
  )
}

export default Landing;