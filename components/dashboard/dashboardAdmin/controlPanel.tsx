'use client'
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react'
import styles from '../../../styles/admin.module.css'
import { FilterUsers } from '@/hooks/filters'
import { FiltersContext } from '@/context/filters'
import { getUsers } from '@/utils/users'
import { RemoveRoles } from './Roles/removeRoles'
import { AsignRoles } from './Roles/asignRoles'
import { LisOfQuestions } from './questions/sectionQuestions'
import { deletedReview, getReviews } from '@/utils/reviews';
import { useQuery } from 'react-query';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import AliceCarousel from 'react-alice-carousel';
export default function AdminPanel() {
  const context = useContext(FiltersContext);
  const responsive = {
    0 : {items : 1},
    800 : {items: 2}
  }
  const { filters, setFilters } = context;
  const [users, setUsers] = useState([]);
  const {data, error, isLoading} = useQuery('reviews', ()=> getReviews());
  const [reviews, setReviews] = useState<any>([]);
  useEffect(()=>{
    if (!data) return;
    setReviews(data);
    console.log(reviews)
}, [isLoading, data, reviews])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await getUsers();
        setUsers(usersResponse);
        console.log(usersResponse);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = FilterUsers(users);

  const userCounts = {
    total: users.length,
    representatives: users.filter(user => user.userRole === 'REPRESENTATIVE').length,
    dancers: users.filter(user => user.userRole === 'DANCER').length,
    noRoleUser: users.filter(user => user.userRole === 'CONTACT').length,
  }
 const handleSelect = (e : any) => {
   const newValue = e.target.value;
   setFilters(prevState => ({
    ...prevState,
    role : newValue
   }))
 }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminPanel}>
        <h1 className={styles.title}>Panel de Control</h1>
        
        <div className={styles.topSection}>
          <select className={styles.filterSelect} onChange={handleSelect}>
            <option value="all">Todos los usuarios</option>
            <option value="REPRESENTATIVE">Representantes</option>
            <option value="DANCER">Bailarines</option>
            <option value="dancersR">Bailerines Representados</option>
            <option value="CONTACT">Usuarios sin rol asignado</option>
          </select>
          
          <div className={styles.userInfo}>
            <p>Cantidad de usuarios: {userCounts.total}</p>
            <p>Representantes: {userCounts.representatives}</p>
            <p>Bailarines: {userCounts.dancers}</p>
            <p>Usuarios sin Rol : {userCounts.noRoleUser}</p>
          </div>
        </div>
        
        <div className={styles.userGrid}>
          {filteredUsers.map(user => (
            <div key={user.id} className={styles.userCard}>
            <Link href={`/admin/user/${user.id}`}>
            {
              user.firstName && user.lastName !== null 
              ? <p>Name: {user.firstName} {user.lastName}</p> 
              : <p>{user.email}</p>     
            }
              </Link>
              <p className={styles.userType}>
                {user.userRole === "REPRESENTATIVE" ? "Representante" :
                user.userRole === "DANCER" ? "Bailarin" : 
                user.userRole === "CONTACT" ? "Usuario sin rol" : ""}
              </p>
              {user.userRole === "CONTACT" ? (           
               <AsignRoles userId={user.id} />             
              ) 
              : <RemoveRoles userId={user.id} /> }
            </div>
          ))}
        </div>
       <LisOfQuestions />
       <section className={styles.questionsCont}>
        <strong>Seccion de Comentarios</strong>
        <ul className={styles.questions}>
          {
            reviews.map(review => {
              return(
                <li className={styles.questionCard} key={review.id}>
                   {review.representative ? <p>Representante</p> : <p>Bailarin</p>}
                   <br />
                  {review.representative 
                    ? <p>{review.representative.user.firstName + ' '} {review.representative.user.lastName}</p>
                    :  <p>{review.dancer.user.firstName + ' '}  {review.dancer.user.lastName}</p>}
                    <br />
                    <p>{review.content}</p>
                    <br />
                    <button onClick={(e) => deletedReview(review.id)} className={styles.roleButton}>
                      Eliminar Comentario
                    </button>
                </li>
              )
            })
          }
        </ul>
       </section>
      </div>
    </div>
  )
}