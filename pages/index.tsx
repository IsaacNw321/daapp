import { NextPage, GetServerSideProps } from 'next';
import RootLayout from '../components/layout/layout';
import Loading from '../components/layout/loading';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getReviews } from '@/utils/reviews';
import Landing from '../components/pageComponents/Landing';
import { HomeProps, ReviewType } from '@/app/types';
import Reviews from './api/reviews';
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
          <TestimonialsLazy />  
          </Suspense>  
    </RootLayout>
    </>
  )
}

export default Home;

