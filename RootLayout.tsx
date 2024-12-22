import Head from 'next/head';
import NavBar from '@/components/NavBar/NavBar';
import styles from "@/styles/home.module.css";
import { Footer } from '@/components/NavBar/Footer';
import { Suspense } from 'react';
import Loading from '@/components/NavBar/loading';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { title } from 'process';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metaData = {
  title : "Dancers Angels",
  description : "Sitio web de la academia de baile Dancers Angels"
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name='audience' content='all'/>
        <meta name='language' content='spanish'/>
        <meta name='copyright' content='Academia de baile Dancers Angels'/>
        <link type='image/x-icon' rel="icon" href="/favicon.ico" />
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
