import axios from 'axios';

export const getQuestions = async () =>{
  const response = await axios.get("/api/questions")
  return response;
}