import styles from '@/styles/admin.module.css';
import { createRoleDancer } from '@/utils/dancers';
import { createRepresentative } from '@/utils/representative';
import { deleteUser } from '@/utils/users';
import { UserIdProp, UserRole } from '@/app/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';


interface FormValues {
  role: UserRole;
}

export const AsignRoles: React.FC<UserIdProp> = ({ userId }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isAssigning, setIsAssigning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async ({ role }) => {
    try {
      setIsAssigning(true);
      if (role === UserRole.REPRESENTATIVE) {
        const response = await createRepresentative(userId, role);
        if (response === 200) {
          setSuccess("Rol asignado");
        } else{
          setError("Error al asignar rol")
        }
      }
      if (role === UserRole.DANCER) {
        const response = await createRoleDancer(userId, role);
        if (response === 200) {
          setSuccess("Rol asignado");
        }else{
          setError("Error al asignar rol")
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleDelete = async() => {
    setIsDeleting(true);
    const response = await deleteUser(userId);
    if(response === 200){
      setIsDeleting(false);
      setSuccess("Usuario Borrado");
    }else{
      setError("Error borrando usuario")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('role')} className={styles.filterSelect}>
        <option value={UserRole.CONTACT}>Ninguno</option>
        <option value={UserRole.REPRESENTATIVE}>Representante</option>
        <option value={UserRole.DANCER}>Bailarin</option>
      </select>
      <button
        type="submit"
        disabled={isAssigning 
          || success === "Rol asignado"
          || success === "Usuario Borrado"
          || error === "Error borrando usuario"
          || error === "Error al asignar rol"
        }
        className={
          error === "Error al asignar rol" ? styles.errorMessage
          : success ? styles.successMessage
          : isAssigning ? styles.loading
          : styles.roleButton
        }
      >
        {error === "Error al asignar rol"
         ? "Error intente mas tarde"
         : error === "Error borrando usuario"
         ? ""
         : isAssigning 
         ? 'Asignando...' 
         : success === "Rol asignado" 
         ? 'Rol Asignado'
         : success === "Usuario Borrado"
         ? "" 
         : 'Asignar Rol'}
      </button>
      <button
        type="button"
        disabled={isDeleting || success === "Rol asignado"
          || success === "Usuario Borrado"
          || error === "Error borrando usuario"
          || error === "Error al asignar rol"}
        className={
          error === "Error borrando usuario" ? styles.errorMessage
          : success ? styles.successMessage
          : isDeleting ? styles.loading
          : styles.deleteButton
        }
        onClick={handleDelete}
      >
        {isDeleting ? 'Eliminando...' 
          : success === "Usuario Borrado" 
          ? "Usuario Eliminado"
          : success === "Rol asignado"
          ? ""
          : error === "Error Borrando Usuario" 
          ? "Hubo un error intente mas tarde"
          : error === "Error al asignar rol"
          ? "" 
          : 'Eliminar Usuario'}
      </button>
    </form>
  );
};