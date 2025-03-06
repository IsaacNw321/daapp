"use client"
import styles from '../../../styles/admin.module.css'
import { LisOfQuestions } from "./questions/sectionQuestions"
import { ListOfReviews } from "./reviews/ListOfReviews";
import { Filters } from "./Roles/filters";
import { ListOfUsers } from "./users/ListOfUsers";
import { Statistics } from "./users/statistics";
import Link from 'next/link';
export default function AdminPanel() {
  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminPanel}>
        <button style={{marginBottom: '10px'}}className={styles.roleButton}>
          Volver
        <Link href={'/'}  />
        </button>
        <h2 style={{marginBottom: '10px'}} className={styles.title}>Panel de Control</h2>        
        <div className={styles.topSection}>
          <Filters/>
          <Statistics/>
        </div>        
       <ListOfUsers />
       <LisOfQuestions />   
        <ListOfReviews />
      </div>
    </div>
  )
}