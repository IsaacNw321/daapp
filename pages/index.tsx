import { NextPage } from 'next';
import RootLayout from '../components/layout/layout';
import Loading from '../components/layout/loading';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Landing from '../components/pageComponents/Landing';
const MoreServicesLazy = dynamic(() => import('../components/pageComponents/moreServices'), { suspense: true });
const ResultsLazy = dynamic(() => import('../components/pageComponents/Results'), { suspense: true });
const TestimonialsLazy = dynamic(() => import('../components/pageComponents/Testimonials'), { suspense: true });

const Home : NextPage = () => {
  return (
    <>
    <RootLayout>
      <Suspense fallback={<Loading/>}>
          <Landing />
          <MoreServicesLazy />
          <ResultsLazy />
          <TestimonialsLazy/>
          </Suspense>    
    </RootLayout>
    </>
  )
}

export default Home;