import { useState } from "react";
import { updateUser, getUserById } from '@/utils/users';
import { deleteDancer } from '@/utils/dancers';
import { deleteRepresentative } from '@/utils/representative';
import styles from '@/styles/admin.module.css';
import { UserRole, UserIdProp } from "@/app/types";

export const RemoveRoles: React.FC<UserIdProp> = ({userId}) => {
  const [showRemove, setShowRemove] = useState<string | null>(null);

  const toggleRemoveRole = (userId: string) => {
    if (showRemove === userId) {
      setShowRemove(null);
    } else {
      setShowRemove(userId);
    }
  };

  const removeRole = async (userId: string) => {
    const user = await getUserById(userId);
    if (user?.userRole === "REPRESENTATIVE") {
      const repId = user?.representative?.id;
      await deleteRepresentative(repId);
    }
    if (user?.userRole === "DANCER") {
      const dancerId = user?.dancer?.id;
      await deleteDancer(dancerId);
    }
    const userRole: UserRole = UserRole.CONTACT;
    
    await updateUser(userId, { userRole });
  };

  return (
    <div>
      <button className={styles.roleButton} onClick={() => toggleRemoveRole(userId)}>
        {showRemove === userId ? 'Cancelar' : 'Quitar Rol'}
      </button>
      {showRemove === userId && (
        <>
          <strong>Esta segura de remover el rol? se eliminara toda la informacion</strong>
          <button className={styles.roleButton} onClick={() => { removeRole(userId); setShowRemove(null); }}>
            Remover y eliminar informacion
          </button>
        </>
      )}
    </div>
  );
};