import { useState, useEffect } from "react";
import styles from "../../styles/contact.module.css";
import QuestionItem from "../questions/QuestionItem";
import { useQuery } from 'react-query';
import { getQuestions } from "../../utils/questions";
import { Question } from "@/app/types";


const Questions = () => {
  const {data, isLoading} = useQuery<Question[]>('question', ()=> getQuestions());
  const [question, setQuestion] = useState<any>();
  const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});
  useEffect(()=>{
    if (!data) return;
    setQuestion(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data])
  const toggleAnswer = (index: number) => {
    setShowAnswer((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  if(isLoading){
    return <div>Cargando...</div>
   }
  return (
    <>
    <div className={styles.questionsSect}>
      <h2 className={styles.frec}>
        Preguntas frecuentes
      </h2>
      <div className={styles.questionsCont}>
        {!data  
          ?  <p>Sin contenido!</p> 
          : question?.map((el : any , index: number) => (
          <QuestionItem
            key={index}
            question={el.question}
            answer={el.answer}
            type={el.type}
            isOpen={!!showAnswer[index]}
            toggleAnswer={() => toggleAnswer(index)}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default Questions;