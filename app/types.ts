import { User } from "@prisma/client"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Url } from "next/dist/shared/lib/router/router";
import { StaticImageData } from "next/image";

export interface getUser {
  firstName: string,
  lastName: string,
  email: string,
  photo: string,
  userRole: string,
  active: boolean,
  updatedAt: Date | null 
  createdAt: Date | null    
}

export interface reviewProps {
  key : number
  content: string;
  userRole: string | undefined;
  user: reviewUser;
}

export interface QuestionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  type : String;
  toggleAnswer: () => void;
}

export interface LogginButtonProps {
  userName: String;
  userPicture:  StaticImport | string;
}

export interface LogginNavProps {
  userName: String;
  userPicture:  StaticImport | String;
}



export interface UserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  photo: string | undefined;
}

export interface HomeProps {
  reviews: ReviewType[]; 
}

export interface InstructorProps {
  nameInstructor: string;
  array: StaticImageData[];
  text: string;
  position: string;
}

export interface reviewUser {
  firstName : string,
  lastName : string,
  photo: string
}

export interface Question {
  id : string;
  question: string | undefined;
  answer: string | undefined;
}

export interface ReviewType {
  content: string,
  user: reviewUser,
  userRole: string
}

export interface postedUser {
  firstName: string,
  lastName: string,
  email: string
}

export interface postDancers {
  representativeId: String | undefined,
  userId: String,
}


export interface postReviewDancer {
  content : String
  dancerId: String | undefined,
}

export interface Content {
  content : String
}

export interface postReviewRepresentative {
  representativeId: String | undefined,
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

export interface DancersProps {
  firstName: string;
  lastName: string;
  Payment: number;
}

export interface PaymentStatusProps {
  Payment: number;
}

export interface DancerInfo {
  firstName: string;
  lastName: string;
  Payment: number | undefined
}


export interface GendersAndShowsProps {
  nameGender: string;
  description: string;
  array: StaticImageData[]; 
}

export interface fullName{
  firstName : string;
  lastName : string;
}