import { Genders } from "../../utils/Genders";
import { GendersAndShows } from "../Genders/GendersAndShows";
import { NextComponentType } from "next";
import styles from "../../styles/about.module.css";

const Gender : NextComponentType = () =>{
  return (
    <div className={styles.gendersCont}>
    {
      Genders?.map((e :any)=> (
      <GendersAndShows 
        key={e.id}
        nameGender={e.nameGender}
        description={e.description}
        array={e.array}
      />
    ))}
  </div>
  )
}

export default Gender;
