import styles from '@/styles/admin.module.css'
import { createRoleDancer } from '@/utils/dancers'
import { createRepresentative} from '@/utils/representative'
import { deleteUser } from '@/utils/users'
import { UserRole } from '@/app/types'
import { SubmitHandler, useForm } from 'react-hook-form'
interface FormValues {
  role: UserRole;
}
export const AsignRoles: React.FC<string> = (userId) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ role }) => {
    if (role === UserRole.REPRESENTATIVE) {
      createRepresentative(userId, role);
    }
    if (role === UserRole.DANCER) {
      createRoleDancer(userId, role);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('role')} className={styles.filterSelect}>
        <option value={UserRole.CONTACT}>Ninguno</option>
        <option value={UserRole.REPRESENTATIVE}>Representante</option>
        <option value={UserRole.DANCER}>Bailarin</option>
      </select>
      <button type='submit' className={styles.roleButton}>
        Asignar Rol
      </button>
      <button
        type='button'
        className={styles.deleteButton}
        onClick={() => deleteUser(userId)}
      >
        Eliminar Usuario
      </button>
    </form>
  );
};