import axios from 'axios';
import { postedUser, User } from '@/app/types';




export async function getUserById(id: string): Promise<User | undefined> {
 try {
   const response = await axios.get(`/api/users/${id}`);
   if (response.status === 200) {
     return response.data
   } else{
    return undefined
   }
 } catch (error) {
   return undefined
 }
}



export const postUser = async (userData: postedUser): Promise<User | null> => {
  try {
    const response = await axios.post<User>(`/api/users`, userData);
    return response.data;
  } catch (error) {
    return null;
  }
};


export const emailExist = async (): Promise<User[] | string> => {
  try {
    const response = await axios.get<User[]>(`/api/users`);
    return response.data;
  } catch (error) {
    return 'Error checking email existence';
  }
};


export const updateUser = async (id: string, updatedUserData: Partial<User>): Promise<User | null> => {
  try {
    const response = await axios.patch<User>(`/api/users/${id}`, updatedUserData);
    return response.data;
  } catch (error) {
    return null;
  }
};


export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`/api/users`);
    if(response.status === 200){
      return response.data
    } else {
      throw new Error("Error fetching Users")
    }
  } catch (error) {
    return [];
  }
};


export const deleteUser = async (id: string): Promise<number | null> => {
  try {
    const response = await axios.delete<User>(`/api/users/${id}`);
    if(response.status === 200){
      return response.status;
    }else{
      return null
    }
  } catch (error) {
    return null;
  }
};