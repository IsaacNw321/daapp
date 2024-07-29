import styles from "../../../styles/dashboard.module.css";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import { redirectionAlert } from "@/utils/alerts";
import { zodResolver } from "@hookform/resolvers/zod";
import {fullNameSchema} from "../../../validations/userSchema";
import { fullName } from "@/app/types";
import { useState } from "react";
const UserUpdate: NextComponentType = () => {
  const [userName, setUserName] = useState<any>("");

  const router = useRouter();
  interface UserUpdate {};
  const user = useUser();
  const userId = user?.user?.sub ?? '';

  const {register,handleSubmit,watch, formState: {errors}} = useForm<fullName>({
    resolver: zodResolver(fullNameSchema)
  });
  const onSubmit: SubmitHandler<UserUpdate> = async(data)=> {

      let datos = {
          ...data,
      }
      console.log(datos,userId, 'Soy datos')
      const response = await axios.put(`/api/users/${userId}`, datos);
      const user = await response.data;
      if(user){
          console.log('User updated')
      }
      if(!user){
          console.log('User was not updated!!!')
      }
      redirectionAlert({
          icon: 'info',
          title: '<strong>Datos actualizados con éxito</strong>',
          confirmButtonText: 'Ok!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
      });
      setTimeout(()=>{
          router.push('/profile')
      }, 1000)
  }

  return (
      <div >
          <div >  
              <h2 >
                  Bienvenido, por favor coloca tu nombre y apellido
              </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.myForm}>
               <label htmlFor="firstName">
        {errors.firstName ? errors.firstName.message : "Nombre"}
        </label>
              <input  {...register("firstName")}type="text" placeholder="Nombre" value={userName.firstName} onChange={(e) => setUserName({ firstName: e.target.value })} />
              <label htmlFor="lastName">
        {
          errors.lastName ? errors.lastName.message : "Apellido"
        }
        </label>
              <input   {...register("lastName")}type="text" placeholder="Apellido" value={userName.lastName} onChange={(e) => setUserName({ lastName: e.target.value })} />
             
              <button type="submit">Enviar</button>
            </form>
            
      </div>
  )
}
export default UserUpdate;