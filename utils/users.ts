import axios from 'axios';

export const getUserById = async(id : String) =>{
  const response = await axios.get(`/api/users/${id}`, {
    timeout: 1000, 
  });

  
  
  if(!response){
      return 'There is no data';
  };
  return response.data;
};

export const postUser = async (userData : any) => {
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

export const emailExist = async () => {
  try {
      const response = await axios.get(`/api/users`);
      const usersEmail = response.data;
     return usersEmail
  } catch (error) {
      console.error('An error occurred:', error);
      return 'Error checking email existence';
  }
};
export const updateUser = async (id: string, updatedUserData: any) => {
  try {
    const response = await axios.put(`/api/users/${id}`, updatedUserData);
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