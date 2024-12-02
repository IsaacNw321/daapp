import { NextPage } from "next";
import RootLayout from "@/layouts/RootLayout"
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/NavBar/loading";
import WorkDays from "../../components/pageComponents/WorkDays";
const InstructorCLazy = dynamic(() => import("../../components/pageComponents/Instructorc"));
const QuestionsLazy = dynamic(() => import("../../components/pageComponents/Questions"));
const Contact : NextPage = () => {

  return (
    <RootLayout>
      <Suspense fallback={<Loading/>}>
      <WorkDays/>
      <InstructorCLazy/>
      <QuestionsLazy/>
      </Suspense>
    </RootLayout>
  )
}

export default Contact;