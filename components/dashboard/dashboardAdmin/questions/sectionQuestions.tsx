import styles from '../../../../styles/admin.module.css'
import { useEffect, useState } from 'react';
import { getQuestions } from '@/utils/questions'
export const LisOfQuestions = () =>{
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () =>{
      try {
        const questionsResponse = await getQuestions();
        setQuestions(questionsResponse)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);
  return (
    <section className={styles.questionsCont}>
    <h3>Seccion de Preguntas Frecuentes</h3>
    <ul className={styles.questions}>
      {
        questions.map(question => {
          return(
            <li className={styles.questionCard} key={question.id}>
              <p>{question.question}</p>
              <p>{question.answer}</p>
              <button className={styles.roleButton}>
                Editar Pregunta
              </button>
              <button className={styles.deleteButton}>
                Eliminar Pregunta
              </button>
            </li>
          )
        })
      }
    </ul>
    <button className={styles.roleButton}>
      Crear Pregunta
    </button>
  </section>
  )
}