import React, { Suspense } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar/NavBar';
import { Footer } from '@/components/NavBar/Footer';
import Loading from '../components/NavBar/loading';
import styles from '@/styles/dashboard.module.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const adminMetaData = {
  title: "Admin Dashboard - Dancers Angels",
  description: "Admin panel for managing Dancers Angels",
  audience: "admin",
  robots: "noindex, nofollow",
  language: "spanish",
  copyright: "Academia de baile Dancers Angels"
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{adminMetaData.title}</title>
        <meta name="description" content={adminMetaData.description} />
        <meta name="audience" content={adminMetaData.audience} />
        <meta name="robots" content={adminMetaData.robots} />
        <meta name="language" content={adminMetaData.language} />
        <meta name="copyright" content={adminMetaData.copyright} />
        <link type='image/x-icon' rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

export default AdminLayout;