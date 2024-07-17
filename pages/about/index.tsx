import { NextPage } from "next";
import RootLayout from "../../components/layout/layout";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/layout/loading";
import  InfoAbout from "../../components/pageComponents/InfoAbout";
import SomeServices from "../../components/pageComponents/SomeServices";
const GenderLazy = dynamic(() => import("../../components/pageComponents/Gender"), { suspense: true });
const About : NextPage =() => {
  
  return (
    <RootLayout>
      <Suspense fallback={<Loading/>}>
        <InfoAbout/>
        <SomeServices/>
        <GenderLazy />
      </Suspense>
    </RootLayout>
  )
}

export default About;