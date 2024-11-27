import { FiltersContext } from '@/context/filters'
import { useContext } from 'react';
import styles from '@/styles/admin.module.css'
import { SelectChangeEvent, UserRole } from '@/app/types';
export const Filters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('Filters must be used within a FiltersProvider');
  }
  const { setFilters } = context;
  const handleSelect = (e : SelectChangeEvent) => {
    const newValue = e.target.value;
    setFilters(prevState => ({
     ...prevState,
     role : newValue
    }))
  }
  return(
    <select className={styles.filterSelect} onChange={handleSelect}>
    <option value="all">Todos los usuarios</option>
    <option value={UserRole.REPRESENTATIVE}>Representantes</option>
    <option value={UserRole.DANCER}>Bailarines</option>
    <option value="dancersR">Bailerines Representados</option>
    <option value={UserRole.CONTACT}>Usuarios sin rol asignado</option>
  </select>
  )
}