import { representativeUpdateData, Representative } from '@/app/types';
import axios from 'axios';

export const updatedRepresentative = async (
  id: string | undefined,
  updatedRepresentative: representativeUpdateData
): Promise<Representative | void> => {
  try {
    const response = await axios.patch(`/api/representatives/${id}`, updatedRepresentative);
    console.log(updatedRepresentative)
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update representative');
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRepresentative = async (
  repId: string | undefined
): Promise<number | null> => {
  try {
    const response = await axios.delete(`/api/representatives/${repId}`);
    if (response.status === 200) {
      return response.status;
    } else {
      throw new Error('Failed to delete Rep');
    }
  } catch (error) {
    return null;
  }
};

export const createRepresentative = async (
  userId: string,
  userRole: string
): Promise<number | null> => {
  try {
    const response = await axios.patch(`/api/users/${userId}`, { userRole });
    if (response.status === 200) {
      const newRepresentative = await axios.post('/api/representatives', { userId });
      if (newRepresentative.status === 200) {
        return newRepresentative.status;
      } else {
        throw new Error('Could not create representative');
      }
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};