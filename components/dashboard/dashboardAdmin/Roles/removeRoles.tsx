import { useState } from "react";
import { updateUser, getUserById } from '@/utils/users';
import { deleteDancer } from '@/utils/dancers';
import { deleteRepresentative } from '@/utils/representative';
import styles from '@/styles/admin.module.css';
import { UserRole, UserIdProp } from "@/app/types";

export const RemoveRoles: React.FC<UserIdProp> = ({userId}) => {
  const [showRemove, setShowRemove] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toggleRemoveRole = (userId: string) => {
    if (showRemove === userId) {
      setShowRemove(null);
    } else {
      setShowRemove(userId);
    }
  };

  const removeRole = async (userId: string) => {
    try {
      setIsLoading(true);
      const user = await getUserById(userId);
      if (user?.userRole === "REPRESENTATIVE") {
        const repId = user?.representative?.id;
        const response = await deleteRepresentative(repId);
        if(response === 200){
          setIsLoading(false);
          setSuccess(true);
        }else{
          setError("Error intente mas tarde")
        }
      }
      if (user?.userRole === "DANCER") {
        const dancerId = user?.dancer?.id;
        const response = await deleteDancer(dancerId);
        if(response === 200){
          setIsLoading(false);
          setSuccess(true);
        }else{
          setError("Error intente mas tarde")
        }
      }
      const userRole: UserRole = UserRole.CONTACT;
      
      const response = await updateUser(userId, { userRole });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className={styles.roleButton} onClick={() => toggleRemoveRole(userId)}>
        {showRemove === userId ? 'Cancelar' : 'Quitar Rol'}
      </button>
      {showRemove === userId && (
        <>
          <strong>Esta segura de remover el rol? se eliminara toda la informacion</strong>
          <button
           type="submit"
            disabled={isLoading || success}
           className={
            success
            ? styles.successMessage
            : isLoading 
            ? styles.loading
            : error !== null ? styles.errorMessage 
            : styles.roleButton
          } onClick={() => { removeRole(userId); }}>
            {error !== null 
              ? "Hubo un error intente mas tarde" : isLoading ? 'Eliminando...' : success ? 'Rol Eliminado' : 'Eliminar Rol'}
          </button>
        </>
      )}
    </div>
  );
};