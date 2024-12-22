import React, { Suspense } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar/NavBar';
import { Footer } from '@/components/NavBar/Footer';
import Loading from '../components/NavBar/loading';
import styles from '@/styles/dashboard.module.css'; 

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const dashboardMetaData = {
  title: "Mi Perfil - Dancers Angels",
  description: "User profile and dashboard for Dancers Angels",
  audience: "all",
  language: "spanish",
  copyright: "Academia de baile Dancers Angels"
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{dashboardMetaData.title}</title>
        <meta name="description" content={dashboardMetaData.description} />
        <meta name="audience" content={dashboardMetaData.audience} />
        <meta name="language" content={dashboardMetaData.language} />
        <meta name="copyright" content={dashboardMetaData.copyright} />
        <link type='image/x-icon' rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loading />}>
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

export default DashboardLayout;