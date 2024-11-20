import axios from 'axios';
export const updatePayment = async (id: string, updatedUserData: any) => {
  try {
    const response = await axios.put(`/api/payments/${id}`, updatedUserData);
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

export const postPayment = async (paymentData : any) => {
  try {
    const response = await axios.post(`/api/payments`, paymentData);
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