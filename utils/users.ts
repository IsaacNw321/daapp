import axios from 'axios';
import { postedUser, User } from '@/app/types';
import { ImgurClient } from 'imgur';



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


/**
 * 
 * @param imageFile 
 * @returns 
 */
export const uploadImage = async (imageFile: File): Promise<string | null> => {
  const client = new ImgurClient({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
  });

  try {
    console.log('Image file type:', imageFile.constructor.name);

    if (!(imageFile instanceof File)) {
      throw new Error('Provided image is not a valid File object');
    }
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Buffer size:', buffer.length);
    if (buffer.length > 10 * 1024 * 1024) {
      throw new Error('Image size exceeds 10MB limit');
    }

    const response = await client.upload({
      image: buffer,
      type: 'stream',
    });

    if (response.success) {
      return response.data.link;
    } else {
      console.error('Image upload failed:', response.status, response.data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};