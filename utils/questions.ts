import axios from 'axios';
import { dataQuestion, Question } from '@/app/types';

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axios.get<Question[]>(`/api/questions`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error getting questions');
    }
  } catch (error) {
    return []; 
  }
}

export const deleteQuestion = async (userId: string): Promise<void | null> => {
  try {
    const response = await axios.delete(`/api/questions/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null
  }
}

export const createQuestion = async (data: dataQuestion): Promise<number | undefined | boolean> => {
  try {
    const response = await axios.post('/api/questions', data);
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return false;
  }
};

export const updateQuestion = async (data: dataQuestion, id: string): Promise<number | undefined | boolean> => {
  
  try {
    const response = await axios.put<Question>(`/api/questions/${id}`, data);
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    return false
  }
}