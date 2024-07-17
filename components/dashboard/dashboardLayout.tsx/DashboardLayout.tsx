import Head from 'next/head'

const MainLayout = ({ children, title }: any) => {
  return (
      <>
          <Head>
              <title>{title} - Dashboard</title>
              <meta name="description" content="Pawsitive admin dashboard" />
          </Head>
          <div >
              <div >
              
              </div>
              <div >
                  <main >
                      {children}
                  </main>
              </div>
          </div>
      </>
  )
}

export default MainLayout;