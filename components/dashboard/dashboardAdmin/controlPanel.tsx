"use client"
import { getUserById } from '@/utils/users';
import styles from '../../../styles/admin.module.css'
import { LisOfQuestions } from "./questions/sectionQuestions"
import { ListOfReviews } from "./reviews/ListOfReviews";
import { Filters } from "./Roles/filters";
import { ListOfUsers } from "./users/ListOfUsers";
import { Statistics } from "./users/statistics";
import { useUser } from '@auth0/nextjs-auth0/client';
import { UserRole } from '@/app/types';
import { useQuery } from 'react-query';
import { User } from '@/app/types';
export default function AdminPanel() {
  
  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminPanel}>
        <h2 className={styles.title}>Panel de Control</h2>        
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