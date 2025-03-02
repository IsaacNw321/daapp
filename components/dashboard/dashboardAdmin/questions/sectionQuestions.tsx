import styles from '@/styles/admin.module.css'
import { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '@/utils/questions'
import { useMutation } from 'react-query';
import { NewQuestion } from './createQuestion';
import { ChangueContentQuestion } from './updateQuestion';
import { Question } from '@/app/types';
export const LisOfQuestions = () =>{
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showCreateQuestion, setShowCreateQestion] = useState<boolean>(false)
  const mutation = useMutation((data: string) => deleteQuestion(data));
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
 const handleDelete = (id: string) =>{
    mutation.mutate(id);
    setQuestions(prevState => prevState.filter(question => question.id !== id))
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
                <ChangueContentQuestion userId={question.id} />
              <button 
                onClick={() => handleDelete(question.id)} 
                className={styles.deleteButton}
                disabled={mutation.isLoading 
                  || mutation.isSuccess 
                  || mutation.isError}
                >
                {mutation.isLoading ? 'Eliminando...' 
                : mutation.isSuccess ? 'Eliminado'
                : mutation.isError ? 'Hubo un eror intente mas tarde'
                : 'Eliminar'}
              </button>
            </li>
          )
        })
      }
    </ul>
    <button onClick={() => handleShow()} className={styles.roleButton}>
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