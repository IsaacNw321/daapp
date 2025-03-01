import axios from 'axios';
import { Review, postReviewDancer, postReviewRepresentative, updateReview } from '@/app/types';


export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>("/api/reviews");
    return response.data;
  } catch (error) {
    return [];
  }
};


export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    const response = await axios.get<Review>(`/api/reviews/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updatedReview = async ({ content, reviewId }: updateReview): Promise<200 | null> => {
  try {
    const response = await axios.put<Review>(`/api/reviews/${reviewId}`, { content });
    return response.status === 200 ? response.status : null;
  } catch (error) {
    return null;
  }
};


export const postedReviewRepresentative = async ({ content, representativeId }: postReviewRepresentative): Promise<boolean> => {
  try {
    const response = await axios.post<Review>(`/api/reviews`, { content, representativeId });
    return true;
  } catch (error) {
    return false;
  }
};


export const postedReviewDancer = async ({ content, dancerId }: postReviewDancer): Promise<boolean> => {
  try {
    const response = await axios.post<Review>(`/api/reviews`, { content, dancerId });
    return true;
  } catch (error) {
    return false;
  }
};


export const deletedReview = async (reviewId: string | undefined): Promise<boolean> => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`);
    return true;
  } catch (error) {
    return false;
  }
};