import { NextPage } from "next";
import { DashboardLayout } from "../../components/dashboard";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/layout/loading";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
const AdminLazy = dynamic(() => import('../../components/dashboard/dashboardAdmin/controlPanel'), { suspense: true });
const ControlPanel : NextPage = withPageAuthRequired(() => {
  return (
    <DashboardLayout title="Mi perfil">
      <Suspense fallback={<Loading/>}>
        <AdminLazy/>
      </Suspense>
    </DashboardLayout>
  )
})
export default ControlPanel;