import styles from '../../../../styles/admin.module.css'
import { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '@/utils/questions'
import { NewQuestion } from './createQuestion';
import { ChangueContentQuestion } from './updateQuestion';
import { Question } from '@/app/types';
export const LisOfQuestions = () =>{
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showCreateQuestion, setShowCreateQestion] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false);
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
  const handleShow = () => {
    setShowCreateQestion(prevState => !prevState)
  }
  const handleEdit = () => {
    setEdit(prevState => !prevState)
  }
  return (
    <section className={styles.questionsCont}>
    <strong>Seccion de Preguntas Frecuentes</strong>
    <ul className={styles.questions}>
      {
        questions.map(question => {
          return(
            <li className={styles.questionCard} key={question.id}>
              <p>{question.question}</p>
              <p>{question.answer}</p>
              <button onClick={handleEdit} className={styles.roleButton}>
                Editar Pregunta
              </button>
              {
                edit ? (
                  <ChangueContentQuestion id={question.id} />
                ) : <></>
              }
              <button onClick={() => deleteQuestion(question.id)} className={styles.deleteButton}>
                Eliminar Pregunta
              </button>
            </li>
          )
        })
      }
    </ul>
    <button onClick={handleShow} className={styles.roleButton}>
      Crear Pregunta
    </button>
    {
      showCreateQuestion 
        ? (
          <NewQuestion />
        ) : <></>
    }
  </section>
  )
}