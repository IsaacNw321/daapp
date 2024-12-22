import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from '@/components/NavBar/loading';
import Landing from '@/components/pageComponents/Landing';

const MoreServicesLazy = dynamic(() => import('@/components/pageComponents/moreServices'));
const ResultsLazy = dynamic(() => import('@/components/pageComponents/Results'));
const TestimonialsLazy = dynamic(() => import('@/components/pageComponents/Testimonials'));

const Home: NextPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Landing />
      <MoreServicesLazy />
      <ResultsLazy />
      <TestimonialsLazy />
    </Suspense>
  );
}

export default Home;

