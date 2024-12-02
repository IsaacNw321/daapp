import Head from 'next/head';


interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for managing the application" />
      </Head>
          <main>
            {children}
          </main>
    </>
  );
};

export default AdminDashboardLayout;