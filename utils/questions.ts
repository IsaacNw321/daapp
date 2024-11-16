import axios from 'axios';
import { Question } from '@/app/types';
export const getQuestions = async (): Promise<Question[]> =>{
  const response = await axios.get<Question[]>("/api/questions")
  return response.data;
}

export const deleteQuestion = async (userId : string) => {
  try {
    const response = await axios.delete(`/api/questions/${userId}`)
    if(response.status === 200){
      return response.data
    }  
  } catch (error) {
    console.log(error)
  }
}

export const createQuestion = async (data : any) => {
  try {
    const response = await axios.post(`/api/questions`, data)
    if(response.status === 200){
      return response.data
    }  
  } catch (error) {
    console.log(error)
  }
}

export const updateQuestion = async (data : any, id : any) => {
  console.log(id.id)
  try {
    const response = await axios.put(`/api/questions/${id.id}`, data)
    if(response.status === 200){
      return response.data
    }  
  } catch (error) {
    console.log(error)
  }
}