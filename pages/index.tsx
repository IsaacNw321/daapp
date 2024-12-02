import { NextPage } from 'next';
import RootLayout from '@/layouts/RootLayout';
import Loading from '../components/NavBar/loading';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Landing from '../components/pageComponents/Landing';
const MoreServicesLazy = dynamic(() => import('../components/pageComponents/moreServices'));
const ResultsLazy = dynamic(() => import('../components/pageComponents/Results'));
const TestimonialsLazy = dynamic(() => import('../components/pageComponents/Testimonials'));

const Home : NextPage = () => {
  return (
    <>
    <RootLayout>
      <Suspense fallback={<Loading/>}>
          <Landing />
          <MoreServicesLazy />
          <ResultsLazy />
          <TestimonialsLazy />  
          </Suspense>  
    </RootLayout>
    </>
  )
}

export default Home;

