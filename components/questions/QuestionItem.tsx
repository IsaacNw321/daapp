import Image from "next/image";
import styles from "../../styles/contact.module.css";
import arrow from "../../public/images/awd.jpg";

interface QuestionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  type : String;
  toggleAnswer: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answer, isOpen, toggleAnswer }) => {
  return (
    <>
    
    <ul className={styles.question} onClick={toggleAnswer}>
      <div className={styles.qI}>
        {question}
        <Image
          className={isOpen ? styles.image : styles.imageOpen}
          width="25"
          height="25"
          alt="arrow"
          src={arrow}
        />
      </div>
      {isOpen && (
        <p className={`${styles.answer} ${isOpen ? styles.open : styles.close}`}>{answer}</p>
      )}
    </ul>
    </>
  );
};

export default QuestionItem;