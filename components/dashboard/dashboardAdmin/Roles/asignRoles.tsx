import styles from '../../../../styles/admin.module.css'
import { createRoleDancer } from '@/utils/dancers'
import { createRepresentative} from '@/utils/representative'
import { deleteUser } from '@/utils/users'
export const AsignRoles = ({userId}: any) => {
  const handleRole = (e : any, userId : string) => {
    e.preventDefault();
    const {role} = Object.fromEntries(new window.FormData(event?.target))
     if(role === "REPRESENTATIVE"){
      createRepresentative(userId, role)
     }
     if(role === "DANCER"){
      createRoleDancer(userId, role)
     }
   }
  
  return (
    <form onSubmit={(e)=> handleRole(e, userId)}>
    <select name='role' className={styles.filterSelect} >
      <option value="NONE">Ninguno</option>
      <option value="REPRESENTATIVE">Representante</option>
      <option value="DANCER">Bailarin</option>
    </select>
    <button type='submit' className={styles.roleButton}>
      Asignar Rol
    </button>
    <button className={styles.deleteButton} onClick={() => deleteUser(userId)}>
      Eliminar Usuario
    </button>
      </form>    
  )
}