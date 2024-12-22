import { useState, useEffect } from "react";
import styles from "../../styles/contact.module.css";
import QuestionItem from "../questions/QuestionItem";
import { useQuery } from 'react-query';
import { getQuestions } from "../../utils/questions";
import { Question, QuestionItemProps } from "@/app/types";
import Loading from "../NavBar/loading";


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
    return(
      <section className={styles.questionsSect}>
      <h2 className={styles.frec}>
        Preguntas frecuentes
      </h2>
      <div className={styles.questionsCont}>
       <Loading />
      </div>
      </section>
    )
   }
  return (
    <section className={styles.questionsSect}>
      <h2 className={styles.frec}>
        Preguntas frecuentes
      </h2>
      <ul className={styles.questionsCont}>
        {!data  
          ?  <p>Sin contenido!</p> 
          : question?.map((el : QuestionItemProps , index: number) => (
          <QuestionItem
            key={index}
            question={el.question}
            answer={el.answer}
            type={el.type}
            isOpen={!!showAnswer[index]}
            toggleAnswer={() => toggleAnswer(index)}
          />
        ))}
      </ul>
      </section>
  );
};

export default Questions;