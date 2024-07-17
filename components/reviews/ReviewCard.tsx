import styles from "../../styles/Testimonials.module.css";
import Image from "next/image";
export const ReviewCard = ({ content, userRole , user }: any) =>{
  const {firstName, lastName, photo,  } = user
  return(
    <>
      <div className={styles.item}>
        <h3>
          {firstName + " "}
          {lastName}
        </h3> 
        <div>
        {userRole === "Representante" ? <p>Representante</p> : <p>Bailarin</p>}
        </div>
        <p>
          {content}
        </p>
        <Image
        width={80}
        height={80}
        alt="userPhoto"
        src={photo}
        className={styles.tImage}
         loading="lazy"
        />
      </div>
    </>
  )
}