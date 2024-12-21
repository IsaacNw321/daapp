import Head from 'next/head';
import NavBar from '@/components/NavBar/NavBar';
import styles from "@/styles/admin.module.css"; 
import { Suspense } from 'react';
import Loading from '@/components/NavBar/loading';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const adminMetaData = {
  title: "Admin Dashboard - Dancers Angels",
  description: "Admin dashboard for managing the dance academy",
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Head>
        <title>{adminMetaData.title}</title>
        <meta name="description" content={adminMetaData.description} />
        <meta name='audience' content='admin'/>
        <meta name='language' content='spanish'/>
        <meta name='copyright' content='Academia de baile Dancers Angels'/>
        <meta name="robots" content="noindex, nofollow" />
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

export default AdminLayout;