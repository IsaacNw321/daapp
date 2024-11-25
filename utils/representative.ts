import { Representative } from '@prisma/client';
import axios from 'axios';
export const updatedRepresentative = async (id: string, updatedRepresentative: any) => {
  try {
    const response = await axios.put(`/api/representatives/${id}`, updatedRepresentative);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};


export const deleteRepresentative = async (repId: string | undefined): Promise<Representative | null>  =>{
  try {
    const response = await axios.delete(`/api/representatives/${repId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to delete Rep');
    }
  } catch (error) {
    console.error('Error deleting Rep:', error);
    return null;
  }
}
export const createRepresentative = async (userId : string, userRole : string) =>{
  try {
    const response = await axios.put(`/api/users/${userId}`, {userRole})
    if(response.status === 200){
      const newRepresentative = await axios.post('/api/representatives', {userId})
      if(newRepresentative.status === 200){
        return 'Representante creado'
      } else {
        throw new Error('Could not create representative')
      }
    }
  } catch (error) {
    console.error('Error creating representative:', error);
    return null;
  }
}