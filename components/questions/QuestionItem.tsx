import Image from "next/image";
import styles from "../../styles/contact.module.css";
import arrow from "../../public/images/awd.jpg";
import { QuestionItemProps } from "@/app/types";
import {motion} from "framer-motion";
const QuestionItem: React.FC<QuestionItemProps> = ({ question, answer, isOpen, toggleAnswer }) => {
  return (
    <motion.li 
      initial={{ opacity : 0 }}
      transition={{duration : 1}}
      whileInView={{ opacity : 1}}
      className={styles.question} onClick={toggleAnswer}
    >
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
    </motion.li>
  )
};

export default QuestionItem;