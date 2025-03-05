import DashboardLayout  from "@/layouts/DashboardLayout";
import dynamic from 'next/dynamic';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Suspense } from 'react';
import Loading from "../../components/NavBar/loading";
import { NextPage } from "next";
const MyProfileLazy = dynamic(() => import('../../components/dashboard/dashboardUser/MyProfile'));
const Profile : NextPage = withPageAuthRequired(() => {

  return (
    <DashboardLayout>
      <Suspense fallback={<Loading/>}>
        <MyProfileLazy/>
      </Suspense>
    </DashboardLayout>
  )
})
export default Profile;