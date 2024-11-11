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