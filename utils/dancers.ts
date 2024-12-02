import axios from 'axios';
import { infoDancer, postDancers, PostedDancerR } from '../app/types';
import { Dancer } from '@prisma/client';

export const createDancer = async (dancerData: postDancers): Promise<Dancer | null> => {
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
};

export const deleteDancer = async (dancerId: string | undefined): Promise<Dancer | null> => {
  try {
    const response = await axios.delete(`/api/dancers/${dancerId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to delete dancer');
    }
  } catch (error) {
    console.error('Error deleting dancer:', error);
    return null;
  }
};

export const updateDancer = async (id: string | undefined, dancerData: infoDancer): Promise<Dancer | null> => {
  try {
    const response = await axios.put(`/api/dancers/${id}`, dancerData);
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

export const createDancerR = async (dancerData: PostedDancerR): Promise<Dancer | null> => {
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
};

export const createRoleDancer = async (userId: string, userRole: string): Promise<Dancer | undefined> => {
  try {
    const response = await axios.put(`/api/users/${userId}`, { userRole: userRole });
    if (response.status === 200) {
      const newRepresentative = await axios.post('/api/dancers', { userId });
      if (newRepresentative.status === 200) {
        return response.data;
      } else {
        throw new Error('Could not create Bailarin');
      }
    }
  } catch (error) {
    console.error('Error creating dancer:', error);
    return undefined;
  }
};