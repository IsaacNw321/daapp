import { NextPage } from "next";
import RootLayout from "@/layouts/RootLayout"
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/NavBar/loading";
import  InfoAbout from "../../components/pageComponents/InfoAbout";
import SomeServices from "../../components/pageComponents/SomeServices";
const GenderLazy = dynamic(() => import("../../components/pageComponents/Gender"));
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