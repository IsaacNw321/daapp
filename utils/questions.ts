import axios from 'axios';
import { Question } from '@/app/types';
export const getQuestions = async (): Promise<Question[]> =>{
  const response = await axios.get<Question[]>("/api/questions")
  return response.data;
}