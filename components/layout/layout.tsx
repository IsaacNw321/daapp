import Head from 'next/head';
import Navbar from './NavBar';
import styles from "../../styles/home.module.css";
import { Footer } from './Footer';
import { Suspense } from 'react';
import Loading from './loading';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>Dancer Angels </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Navbar/>
        <Suspense fallback={<Loading/>}>
        <main className={styles.main}>
          {children}
        </main>
      <Footer/> 
        </Suspense>
    </>
  )
}