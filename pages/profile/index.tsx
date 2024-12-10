import { NextPage } from "next";
import DashboardLayout  from "@/layouts/DashboardLayout";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from "../../components/NavBar/loading";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
const MyProfileLazy = dynamic(() => import('../../components/dashboard/dashboardUser/MyProfile'));
const Profile : NextPage = withPageAuthRequired(() => {

  return (
    <DashboardLayout title="Mi perfil">
      <Suspense fallback={<Loading/>}>
        <MyProfileLazy/>
      </Suspense>
    </DashboardLayout>
  )
})
export default Profile;