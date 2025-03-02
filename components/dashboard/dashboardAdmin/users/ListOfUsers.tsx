import Link from "next/link";
import { FilterUsers } from '@/hooks/filters';
import { useState, useEffect } from "react";
import { AsignRoles } from "../Roles/asignRoles";
import { RemoveRoles } from "../Roles/removeRoles";
import { getUsers } from "@/utils/users";
import styles from "@/styles/admin.module.css";
import { User, UserRole } from "@/app/types";
import { useQuery, useQueryClient } from "react-query";
import Loading from "@/components/NavBar/loading";

export const ListOfUsers = () => {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, isLoading } = useQuery<User[]>('usersAdmin', getUsers);

  useEffect(() => {
    if (!data) return;
    setUsers(data);
  }, [data]);

  const filteredUsers = FilterUsers(users);

  if (isLoading) {
    return (
      <section className={styles.userGrid}>
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <div>
        Ha habido un error
      </div>
    );
  }

  const handleUserDeleted = () => {
    queryClient.invalidateQueries('usersAdmin'); 
  }
  return (
    <section className={styles.userGrid}>
      {filteredUsers.map((user: User) => (
        <div key={user.id} className={styles.userCard}>
          <Link href={`/admin/user/${user.id}`}>
            {user.firstName && user.lastName !== null
              ? <p>Name: {user.firstName} {user.lastName}</p>
              : <p>{user.email}</p>
            }
          </Link>
          <p className={styles.userType}>
            {user.userRole === UserRole.REPRESENTATIVE ? "Representante" :
              user.userRole === UserRole.DANCER ? "Bailarin" :
                user.userRole === UserRole.CONTACT ? "Usuario sin rol" : ""}
          </p>
          {user.userRole === UserRole.CONTACT ? (
            <AsignRoles userId={user.id} onUserDeleted={handleUserDeleted} />
          )
            : <RemoveRoles userId={user.id} />}
        </div>
      ))}
    </section>
  );
};