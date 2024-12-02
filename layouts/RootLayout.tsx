import Head from 'next/head';
import NavBar from '@/components/NavBar/NavBar';
import styles from "@/styles/home.module.css";
import { Footer } from '@/components/NavBar/Footer';
import { Suspense } from 'react';
import Loading from '@/components/NavBar/loading';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Head>
        <title>Dancer Angels</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <main className={styles.main}>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

export default RootLayout;
