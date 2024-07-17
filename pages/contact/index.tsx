import { NextPage } from "next";
import RootLayout from "../../components/layout/layout";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/layout/loading";
import WorkDays from "../../components/pageComponents/WorkDays";
const InstructorCLazy = dynamic(() => import("../../components/pageComponents/Instructorc"), { suspense: true });
const QuestionsLazy = dynamic(() => import("../../components/pageComponents/Questions"), { suspense: true });
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