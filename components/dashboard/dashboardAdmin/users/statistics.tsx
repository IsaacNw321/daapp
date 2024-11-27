import { useEffect, useState } from "react";
import styles from '@/styles/admin.module.css'
import { getUsers } from "@/utils/users";
import { User, UserRole } from "@/app/types";
import Loading from "@/components/layout/loading";
import { useQuery } from "react-query";
export const Statistics = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, isLoading } = useQuery<User[]>('statisticsUser', () => getUsers());
  useEffect(() => {
    if (!data) return;
    setUsers(data);
  }, [isLoading, data, users]);
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
  const userCounts = {
    total: users.length,
    representatives: users.filter(user => user.userRole === UserRole.REPRESENTATIVE).length,
    dancers: users.filter(user => user.userRole ===UserRole.DANCER ).length,
    noRoleUser: users.filter(user => user.userRole === UserRole.CONTACT).length,
  }
  return (
    <div className={styles.userInfo}>
    <p>Cantidad de usuarios: {userCounts.total}</p>
    <p>Representantes: {userCounts.representatives}</p>
    <p>Bailarines: {userCounts.dancers}</p>
    <p>Usuarios sin Rol : {userCounts.noRoleUser}</p>
  </div>
  )
}