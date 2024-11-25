import { useEffect, useState } from "react";
import styles from '@/styles/admin.module.css'
import { getUsers } from "@/utils/users";
import { User } from "@prisma/client";
export const Statistics = () => {
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
  const userCounts = {
    total: users.length,
    representatives: users.filter(user => user.userRole === 'REPRESENTATIVE').length,
    dancers: users.filter(user => user.userRole === 'DANCER').length,
    noRoleUser: users.filter(user => user.userRole === 'CONTACT').length,
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