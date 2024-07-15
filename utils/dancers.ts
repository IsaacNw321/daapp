import axios from 'axios';
import { postDancers } from '@components/app/types';
export const getDancers = async () =>{
  const Dancers = await axios.get("/api/dancers")
  if(!Dancers){
    console.log("there is no data")
  } else {
    return Dancers
  }
}

export const createDancer = async (dancerData: postDancers) =>{
  try {
    const response = await axios.post(`/api/dancers`, dancerData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to post user');
    }
  } catch (error) {
    console.error('Error posting user:', error);
    return null;
  }
}