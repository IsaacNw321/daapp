import axios from 'axios';
import { infoDancer, postDancers, PostedDancerR } from '../app/types';


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

export const updateDancer = async (id : string , dancerData : infoDancer) => {
  try {
    const response = await axios.put(`/api/dancers/${id}`, dancerData)
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export const createDancerR = async (dancerData: PostedDancerR) =>{
  try {
    const response = await axios.post(`/api/dancersR`, dancerData);
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