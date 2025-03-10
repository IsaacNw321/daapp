import axios from 'axios';
import { infoDancer, postDancers, PostedDancerR } from '../app/types';
import { Dancer } from '@prisma/client';

export const createDancer = async (dancerData: postDancers): Promise<Dancer | null> => {
  try {
    const response = await axios.post(`/api/dancers`, dancerData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to post dancer');
    }
  } catch (error) {
    return null;
  }
};

export const deleteDancer = async (dancerId: string | undefined): Promise<number | null> => {
  try {
    const response = await axios.delete(`/api/dancers/${dancerId}`);
    if (response.status === 200) {
      return response.status;
    } else {
      throw new Error('Failed to delete dancer');
    }
  } catch (error) {
    return null;
  }
};

export const deleteDancerR = async (dancerId: string | undefined): Promise<Dancer | null> => {
  try {
    const response = await axios.delete(`/api/dancersR/${dancerId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to delete dancer');
    }
  } catch (error) {
    return null;
  }
};

export const updateDancer = async (id: string | undefined, dancerData: infoDancer): Promise<Dancer | null> => {
  try {
    const response = await axios.patch(`/api/dancers/${id}`, dancerData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update dancer');
    }
  } catch (error) {
    return null;
  }
};

export const createDancerR = async (dancerData: PostedDancerR): Promise<Dancer | null> => {
  try {
    const response = await axios.post(`/api/dancersR`, dancerData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to post dancerR');
    }
  } catch (error) {
    return null;
  }
};

export const updateDancerR = async (id: string | undefined, dancerData:any): Promise<Dancer | null> => {
  try {
    const response = await axios.patch(`/api/dancersR/${id}`, dancerData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update dancer');
    }
  } catch (error) {
    return null;
  }
};

export const createRoleDancer = async (
  userId: string,
  userRole: string
): Promise<number | null> => {
  try {
    const response = await axios.patch(`/api/users/${userId}`, { userRole });
    if (response.status === 200) {
      const newDancer = await axios.post('/api/dancers', { userId });
      if (newDancer.status === 200) {
        return newDancer.status;
      } else {
        throw new Error('Could not create dancer');
      }
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};