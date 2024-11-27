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
export default function AdminPanel() {
  const {user} = useUser()
  const userId = user?.sub
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId), {
    enabled: !!userId, 
  });
  console.log(dbUser?.userRole)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(dbUser?.userRole !== UserRole.ADMIN){
      window.location.href = '/';
  }
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