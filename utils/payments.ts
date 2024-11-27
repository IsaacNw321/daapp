import axios from 'axios';
import { postPaymentProps, confirmPayment } from '@/app/types';
export const confirmedPayment = async (
  id: string,
  paymentData: confirmPayment
): Promise<string | null> => {
  try {
    const response = await axios.patch(`/api/payments/${id}`, paymentData);
    if (response.status === 200) {
      return "updated Payment";
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export const postPayment = async (
  paymentData: postPaymentProps
): Promise<string | null> => {
  try {
    const response = await axios.post(`/api/payments`, paymentData);
    if (response.status === 200) {
      return "Created Payment";
    } else {
      throw new Error('Failed to post user');
    }
  } catch (error) {
    console.error('Error posting user:', error);
    return null;
  }
};

export const deletePayment = async (
  paymentId: string
): Promise<string | null> => {
  try {
    const response = await axios.delete(`/api/payments/${paymentId}`);
    if (response.status === 200) {
      return "Deleted Payment";
    } else {
      throw new Error('Failed removing payment');
    }
  } catch (error) {
    console.error('Error removing user:', error);
    return null;
  }
};