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
export type noRole = UserRole | undefined;
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

export interface DancerInfo{
  id : string;
  Payment : Payment[] ;
  firstName : string;
  lastName : string;
  pending : number
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
export interface UserIdProp{
  userId : string;
}

export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

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

export interface RepresentativeProps{
  representative: Representative | undefined;
}

export interface LogginButtonProps {
  userName: String;
  userPicture:  string | undefined;
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
  firstName : string;
  lastName : string;
  photo: string;
}

export interface Question {
  id : string;
  question: string;
  answer: string ;
}

export type dataQuestion = Omit<Question, 'id'>

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
  content : string;
}

export interface postReviewRepresentative {
  representativeId: String | undefined;
  content : String;
}

export interface updateReview {
  content? : string;
  reviewId? : string;
}



export interface representativeUpdateData{
  firstName? : string;
  lastName?: string;
  Adress? : string;
  phone? : number;
  representativeId? : string;
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
  dancerId? : string;
 }

 export interface infoRepresentativeProps {
  representativeId? : string;
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
  representativeId?: string ;
  reviewId?: string;
}

export interface ReviewDProps {
  dancerId?: string ;
  reviewId?: string;
}

export interface postPaymentProps{
  numberRef? : string; 
  cash?: boolean;
  dancerId?: string;
}

export interface confirmPayment{
  confirm? : boolean; 
}

export interface createDanceProps {
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
  Payment?: number;
  pending? : number;
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