'use client'

import { useContext, useState, useEffect } from 'react'
import styles from '../../../styles/admin.module.css'
import { FilterUsers } from '@/hooks/filters'
import { FiltersContext } from '@/context/filters'
import { getUsers, deleteUser, updateUser, getUserById } from '@/utils/users'
import { createRoleDancer } from '@/utils/dancers'
import { createRepresentative} from '@/utils/representative'
import { RemoveRoles } from './Roles/removeRoles'
import { AsignRoles } from './Roles/asignRoles'

export default function AdminPanel() {
  const context = useContext(FiltersContext);
  const { filters, setFilters } = context;
  const [users, setUsers] = useState([]);

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
              <h2 className={styles.userName}>
                {user.firstName}
                {user.lastName}
              </h2>
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
      </div>
    </div>
  )
}