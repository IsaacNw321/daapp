import Head from 'next/head'


type DashBoardLayoutProps = {
    children: React.ReactNode
    title: string
}
const MainLayout = ({ children, title }: DashBoardLayoutProps) => {
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