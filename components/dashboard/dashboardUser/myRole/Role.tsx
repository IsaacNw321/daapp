"use client"
import styles from "../../../../styles/dashboard.module.css"
import React, { useState, useEffect } from 'react';
import { updateUser } from "../../../../utils/users";
import { RoleProps } from "../../../../app/types";

export const Role: React.FC<RoleProps> = ({ userRole, userId}) => {
  const [selectedRole, setSelectedRole] = useState(userRole);
  const [showSuccess, setShowSucess] = useState(false);

  useEffect(() => {
    if (userRole === "CONTACT") {
      setSelectedRole("CONTACT");
    }
    if (userRole === "DANCER"){
      setSelectedRole("DANCER")
    }
    if(userRole=== "REPRESENTATIVE"){
      setSelectedRole("REPRESENTATIVE")
    }
  }, [userRole]);

  const handleChange = (e : any) => {
    setSelectedRole(e.target.value);
  };
  const handleRoleSelection = async () => {
    if (selectedRole === 'REPRESENTATIVE' || selectedRole === 'DANCER') {
      const activeAccount = await updateUser(userId, {
         active: true 
      }); 
      if(activeAccount){
        setShowSucess(true);
        setTimeout(() => {
            setShowSucess(false);
        }, 3000);
      } 
    } else {
      const inactiveAccount = await  updateUser(userId, {
        active: false
     });
     if(inactiveAccount){
     setShowSucess(true);
     setTimeout(() => {
         setShowSucess(false);
     }, 3000);
    }}
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleRoleSelection();
  };

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <select    className={styles.select} id="useRole" name="role" value={selectedRole} onChange={handleChange}>
          <option value="CONTACT">Contacto</option>
          <option value="DANCER">Bailarin</option>
          <option value="REPRESENTATIVE">Representante</option>
        </select>
        <button type="submit">Confirmar Rol</button>
      </form>
      {showSuccess && (
  <div className={styles.successMessage}>
    La informacion ha sido guardada!
  </div>
)}
    </>
  );
};

export default Role;