import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";

export enum UserRole {
  ADMIN = 'ADMIN',
  DANCER = 'DANCER',
  REPRESENTATIVE = 'REPRESENTATIVE',
  CONTACT = 'CONTACT',
}

export enum TypePayment {
  PMOVIL = 'PMOVIL',
  CASH = 'CASH',
}


export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  photo?: string;
  userRole: UserRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  dancer?: Dancer;
  representative?: Representative;
}

export interface Dancer {
  id: string;
  userId: string;
  user : User;
  Payment: Payment[];
  review?: Review;
  allergies?: string;
  CI?: number;
  age?: number;
  dateBirth: Date;
  phone?: number;
  Adress?: string;
}


export interface Representative {
  id: string;
  userId: string;
  user : User;
  dancers: DancerR[];
  Payment: Payment[];
  review?: Review;
  phone?: number;
  Adress?: string;
}


export interface DancerR {
  id: string;
  representativeId: string;
  firstName: string;
  lastName: string;
  allergies: string;
  cI: number;
  age: number;
  dateBirth: Date;
  Payment: Payment[];
}


export interface Review {
  id: string;
  content: string;
  representative: Representative;
  representativeId?: string;
  dancer : Dancer;
  dancerId?: string;
}


export interface Question {
  id: string;
  question: string;
  answer: string;
}


export interface Payment {
  id: string;
  type: TypePayment;
  numberRef?: string;
  cash?: boolean;
  confirm: boolean;
  representativeId?: string;
  dancerRId?: string;
  dancerId?: string;
}

export interface getUser {
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  userRole: string;
  active: boolean;
  updatedAt: Date | null;
  createdAt: Date | null;    
}

export interface reviewProps {
  key : number;
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
  nameInstructor: number;
  array: StaticImageData[];
  text: string;
  position: string;
}

export interface reviewUser {
  firstName : string;
  lastName : string;
  photo: string;
}

export interface Question {
  id : string;
  question: string | undefined;
  answer: string | undefined;
}

export interface ReviewType {
  content: string;
  user: reviewUser;
  userRole: string;
}

export interface postedUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PostedDancerR {
  firstName: string;
  lastName: string;
  cI : number;
  allergies : string;
  age : number,
  dateBirth : Date
}

export interface postDancers {
  representativeId: String | undefined;
  userId: String;
}


export interface postReviewDancer {
  content : String;
  dancerId: String | undefined;
}

export interface Content {
  content : String;
}

export interface postReviewRepresentative {
  representativeId: String | undefined;
  content : String;
}

export interface updateReview {
  content : String;
  reviewId : String;
}

export interface DancerR  {
  firstName: string;
  lastName: string;
  cI : number;
  allergies : string;
  age : number,
  dateBirth : Date
 }

 export interface infoDancer  {
  firstName : string;
  lastName : string;
  phone : number;
  cI : number;
  allergies : string;
  age : number;
  dateBirth : Date;
  Adress : string;
 }

 export interface infoDancerProps {
  userRole : "ADMIN"| "REPRESENTATIVE"| "DANCER" | "CONTACT";
  dancerId : string;
 }

 export interface infoRepresentativeProps {
  userRole : "ADMIN"| "REPRESENTATIVE"| "DANCER" | "CONTACT";
  representativeId : string;
 }

 export interface infoRepresentative {
  firstName : string;
  lastName : string;
  Adress : string;
  phone : number
 }
 export interface updatedDancer {
  firstName : string;
  lastName : string;
  phone : number;
  cI : number;
  allergies : string;
  age : number,
  dateBirth : Date;
  Adress : string
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
  userRole : "ADMIN"| "REPRESENTATIVE"| "DANCER" | "CONTACT";
  representativeId : string | undefined;
  numberDancers : number | undefined;
}

export interface RoleProps {
  userRole : "ADMIN"| "REPRESENTATIVE"| "DANCER" | "CONTACT";
  userId : string;
}

export interface postRole {
  userRole: "CONTACT" | "DANCER" | "REPRESENTATIVE";
}

export interface DancersProps {
  firstName: string;
  lastName: string;
  Payment: number;
  pending : number;
}

export interface PaymentStatusProps {
  Payment: number;
  pending : number;
}

export interface DancerInfo {
  firstName: string;
  lastName: string;
  Payment: number | undefined;
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