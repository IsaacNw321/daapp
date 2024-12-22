import Head from 'next/head';
import NavBar from '@/components/NavBar/NavBar';
import styles from "@/styles/dashboard.module.css";
import { Suspense } from 'react';
import Loading from '@/components/NavBar/loading';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const dashboardMetaData = {
  title: "User Dashboard - Dancers Angels",
  description: "User dashboard for managing dance classes and schedules",
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Head>
        <title>{dashboardMetaData.title}</title>
        <meta name="description" content={dashboardMetaData.description} />
        <meta name='audience' content='registered users'/>
        <meta name='language' content='spanish'/>
        <meta name='copyright' content='Academia de baile Dancers Angels'/>
        <link type='image/x-icon' rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <main className={styles.main}>
          {children}
        </main>
      </Suspense>
    </>
  );
};

export default DashboardLayout;