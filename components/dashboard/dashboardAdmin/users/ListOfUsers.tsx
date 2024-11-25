import Link from "next/link"
import { FilterUsers } from '@/hooks/filters'
import { useState, useEffect } from "react";
import { AsignRoles } from "../Roles/asignRoles";
import { RemoveRoles } from "../Roles/removeRoles";
import { getUsers } from "@/utils/users";
import styles from "@/styles/admin.module.css"
import { User } from "@/app/types";
export const ListOfUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
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
  return(
    <section className={styles.userGrid}>
    {filteredUsers.map((user : User) => (
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
  </section>
  )
}