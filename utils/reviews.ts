import axios from 'axios';
import { ReviewRProps, ReviewDProps, postReviewDancer, postReviewRepresentative, updateReview } from '../app/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  timeout: 5000, 
});

export const getReviews = async () => {
  try {
      const response = await axiosInstance.get("/api/reviews");
      if (response.status === 200) {
          return response.data;
      }
  } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
  }
};


export const getReviewById = async (id: String) =>{
  try {
    const response = await axios.get(`/api/reviews/${id}`)
    if(response.status === 200){
      return response.data
      
    } else {
      throw new Error('Failed to post Review');
    }
  } catch (error) {
    console.error('Error posting Review:', error);
    return null;
  }
}

export const updatedReview = async ({content , reviewId}: updateReview) => {
  try {
    const response =  await axios.put(`/api/reviews/${reviewId}`, {
      content: content
  });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to post Review');
    }
  } catch (error) {
    console.error('Error posting Review:', error);
    return null;
  }
};

export const postedReviewRepresentative = async ({content, representativeId} :postReviewRepresentative) => {
  try {
    const createReview = await axios.post(`/api/reviews`, {
      content: content,
      representativeId: representativeId,
  });
    if (createReview !== undefined) {
      console.log("comentario posteado");
    } else {
      console.log("no se pudo postear");
    }
  } catch (error) {
      console.error('Error creating review:', error);
  }
};

export const postedReviewDancer = async ({content, dancerId} : postReviewDancer) => {
  try {
    const createReview = await axios.post(`/api/reviews`, {
      content: content,
      dancerId : dancerId
  });
    if (createReview !== undefined) {
      console.log("comentario posteado");
    } else {
      console.log("no se pudo postear");
    }
  } catch (error) {
      console.error('Error creating review:', error);
  }
};

export const deletedReview = async (reviewId: String) =>{
  const deletedReview  = await axios.delete(`/api/reviews/${reviewId}`)
  if(deletedReview){
    console.log("comentario eliminado")
  }else {
    console.log("comentario no eliminado")
  }
}