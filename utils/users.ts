import axios from 'axios';
import { postedUser, User } from '@/app/types';


export const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const response = await axios.get<User>(`/api/users/${id}`, { timeout: 3000 });
    return response.data;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return undefined;
  }
};


export const postUser = async (userData: postedUser): Promise<User | null> => {
  try {
    const response = await axios.post<User>(`/api/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error posting user:', error);
    return null;
  }
};


export const emailExist = async (): Promise<User[] | string> => {
  try {
    const response = await axios.get<User[]>(`/api/users`);
    return response.data;
  } catch (error) {
    console.error('An error occurred:', error);
    return 'Error checking email existence';
  }
};


export const updateUser = async (id: string, updatedUserData: Partial<User>): Promise<User | null> => {
  try {
    const response = await axios.put<User>(`/api/users/${id}`, updatedUserData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};


export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`/api/users`);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};


export const deleteUser = async (id: string): Promise<User | null> => {
  try {
    const response = await axios.delete<User>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error removing user:', error);
    return null;
  }
};