import axios from 'axios';
import { Review, postReviewDancer, postReviewRepresentative, updateReview } from '@/app/types';


export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>("/api/reviews");
    return response.data;
  } catch (error) {
    console.error('Error getting reviews:', error);
    return [];
  }
};


export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    const response = await axios.get<Review>(`/api/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting review by ID:', error);
    return null;
  }
};

export const updatedReview = async ({ content, reviewId }: updateReview): Promise<Review | null> => {
  try {
    const response = await axios.put<Review>(`/api/reviews/${reviewId}`, { content });
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    return null;
  }
};


export const postedReviewRepresentative = async ({ content, representativeId }: postReviewRepresentative): Promise<boolean> => {
  try {
    const response = await axios.post<Review>(`/api/reviews`, { content, representativeId });
    console.log("Comentario posteado");
    return true;
  } catch (error) {
    console.error('Error creating review for representative:', error);
    return false;
  }
};


export const postedReviewDancer = async ({ content, dancerId }: postReviewDancer): Promise<boolean> => {
  try {
    const response = await axios.post<Review>(`/api/reviews`, { content, dancerId });
    console.log("Comentario posteado");
    return true;
  } catch (error) {
    console.error('Error creating review for dancer:', error);
    return false;
  }
};


export const deletedReview = async (reviewId: string): Promise<boolean> => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`);
    console.log("Comentario eliminado");
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};