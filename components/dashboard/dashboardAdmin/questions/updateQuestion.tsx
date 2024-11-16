import { updateQuestion } from "@/utils/questions"
import styles from '../../../../styles/admin.module.css'
export const ChangueContentQuestion = (id : any) => {
  const handleSubmit = (e : any) =>{
    e.preventDefault();
    const {question, answer} = Object.fromEntries(new window.FormData(e.target))
    const data = {question, answer}
    console.log(id)
    updateQuestion(data, id)
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
        Editar
      </button>
    </form>
  )
}