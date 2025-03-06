import { NextPage } from 'next';
import RootLayout from '@/layouts/RootLayout';
import Loading from '../components/NavBar/loading';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Landing from '../components/pageComponents/Landing';
const MoreServicesLazy = dynamic(() => import('../components/pageComponents/moreServices'));
const TestimonialsLazy = dynamic(() => import('../components/pageComponents/Testimonials'));

const Home : NextPage = () => {
  return (
    <RootLayout>
      <Suspense fallback={<Loading/>}>
          <Landing />
          <MoreServicesLazy />
          <TestimonialsLazy />  
          </Suspense>  
    </RootLayout>
  )
}

export default Home;

