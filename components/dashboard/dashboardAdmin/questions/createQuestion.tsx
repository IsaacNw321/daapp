import { createQuestion } from "@/utils/questions"
import styles from '../../../../styles/admin.module.css'
export const NewQuestion = () => {
  const handleSubmit = (e : any) =>{
    e.preventDefault();
    const {question, answer} = Object.fromEntries(new window.FormData(e.target))
    const data = {question, answer}
    createQuestion(data)
  }
  return(
    <form onSubmit={handleSubmit} className={styles.questionForm}>
      <label htmlFor="question">
        Pregunta
      </label>
      <input type="text" name="question"/>
      <label htmlFor="question">
        Respuesta
      </label>
      <input type="text" name="answer" />
      <button className={styles.roleButton} type="submit">
        Crear
      </button>
    </form>
  )
}