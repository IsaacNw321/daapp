import Link from "next/link"
import { FilterUsers } from '@/hooks/filters'
import { useState, useEffect } from "react";
import { AsignRoles } from "../Roles/asignRoles";
import { RemoveRoles } from "../Roles/removeRoles";
import { getUsers } from "@/utils/users";
import styles from "@/styles/admin.module.css"
import { User } from "@/app/types";
import { useQuery } from "react-query";
import Loading from "@/components/layout/loading";
export const ListOfUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, isLoading } = useQuery<User[]>('usersAdmin', () => getUsers());
  useEffect(() => {
    if (!data) return;
    setUsers(data);
  }, [isLoading, data, users]);
  const filteredUsers = FilterUsers(users);
  if(isLoading){
    return(
      <Loading/>
    )
  }
  if(error){
    return(
      <div>
        Ha habido un error
      </div>
    )
  }
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