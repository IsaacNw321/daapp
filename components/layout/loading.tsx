import styles from "../../styles/dashboard.module.css";

const Loading = ({ className } : any) => {
  return <div className={`${styles.contenedor} ${className}`}>
    <div className={styles.cargando}>
     <div className={styles.rueda}>
        </div>
    </div>
  </div>;
}

export default Loading;