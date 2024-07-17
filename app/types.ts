import { User } from "@prisma/client"
import { Url } from "next/dist/shared/lib/router/router";

export interface HomeProps {
  reviews: ReviewType[]; 
}

export interface reviewUser {
  firstName : string,
  lastName : string,
  photo: string
}

export interface ReviewType {
  content: string,
  user: reviewUser,
  userRole: string
}

export interface postedUser {
  firstName: String,
  lastName: String,
  email: String
}

export interface postDancers {
  representativeId: String,
  userId: String,
}


export interface postReviewDancer {
  content : String
  dancerId: String,
}

export interface Content {
  content : String
}

export interface postReviewRepresentative {
  representativeId: String,
  content : String
}

export interface updateReview {
  content : String,
  reviewId : String
}

export interface DancerR  {
  firstName: string;
  lastName: string;
  email: string;
 }

export  interface ReviewRProps {
  representativeId: String | undefined;
  reviewId: String;
}

export interface ReviewDProps {
  dancerId: string | undefined;
  reviewId: string;
}

export interface createDanceProps {
  userRole : "ADMIN"| "REPRESENTATIVE"| "DANCER" | "CONTACT",
  representativeId : string | undefined,
  numberDancers : number | undefined
}

export interface RoleProps {
  userRole : "ADMIN"| "REPRESENTATIVE"| "DANCER" | "CONTACT",
  userId : string
}

export interface postRole {
  userRole: "CONTACT" | "DANCER" | "REPRESENTATIVE";
}