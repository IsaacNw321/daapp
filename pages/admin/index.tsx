import { NextPage } from "next";
import AdminDashboardLayout from "@/layouts/AdminLayout";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/NavBar/loading";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { FiltersProvider } from "@/context/filters";
const AdminLazy = dynamic(() => import('../../components/dashboard/dashboardAdmin/controlPanel'), { suspense: true });
const ControlPanel : NextPage = withPageAuthRequired(() => {
  return (
    <AdminDashboardLayout title="Mi perfil">
      <Suspense fallback={<Loading/>}>
      <FiltersProvider>
        <AdminLazy/>
      </FiltersProvider>
      </Suspense>
    </AdminDashboardLayout>
  )
})
export default ControlPanel;