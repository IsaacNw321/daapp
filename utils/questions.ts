import axios from 'axios';
import { dataQuestion, idQuestion, Question } from '@/app/types';

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axios.get<Question[]>(`/api/questions`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error getting questions');
    }
  } catch (error) {
    console.error('Error getting questions:', error);
    return []; 
  }
}

export const deleteQuestion = async (userId: string): Promise<void> => {
  try {
    const response = await axios.delete(`/api/questions/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const createQuestion = async (data: dataQuestion): Promise<Question | undefined> => {
  try {
    const response = await axios.post<Question>(`/api/questions`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateQuestion = async (data: dataQuestion, id: idQuestion): Promise<Question | undefined> => {
  console.log(id.id);
  try {
    const response = await axios.put<Question>(`/api/questions/${id.id}`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}