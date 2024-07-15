import styles from "../../styles/OurTeam.module.css"
import { NextComponentType } from "next"
import { Instructor } from "../../components/pageComponents/Instructor";
import { Instructors } from "../../utils/Instructors";

const InstructorC : NextComponentType = () =>{
  return (
    <>
    <div className={styles.ourTeam}>
    <h1 className={styles.teamTitle}>
      Conoce a Nuestros Instructores
    </h1>
    <p className={styles.instructorText}>
      Nuestro equipo de experimentados instructores de baile está dedicado a brindar un excelente servicio al cliente y la más alta calidad de enseñanza. Ofrecemos una variedad de clases para estudiantes de todas las edades y niveles, desde clases para principiantes hasta niveles más avanzados. ¡Nuestro objetivo es ayudarte a alcanzar tus metas de baile mientras te diviertes!
    </p>
  </div>
  <div className={styles.outContI}>
  {
    Instructors?.map((e :any)=> (
 <Instructor 
   key={e.id}
   nameInstructor={e.nameInstructor}
   position={e.position}
   text = {e.text}
   array={e.array}
   >
 </Instructor>
  ))}
 </div>
 </>
  )
}

export default InstructorC;