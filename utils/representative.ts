import axios from 'axios';

export const getRepresentativeById = async(id : String) =>{
  const response = await axios.get(`/api/representatives/${id}`);
  
  
  if(!response){
      return 'There is no data';
  };
  return response.data;
};

export const postUser = async (userData: any) => {
  try {
    const response = await axios.post(`/api/users`, userData);
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

export const emailExist = async (email : any) =>{
  const response = await axios.get(`/api/users`, email);
  const userExist = await response.data;
  
  if(!userExist){
      return 'There is no data';
  };
  return userExist;
};

