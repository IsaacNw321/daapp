import { NextPage } from "next";
import { DashboardLayout } from "../../components/dashboard";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Loading from "../../components/layout/loading";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
const MyProfileLazy = dynamic(() => import('../../components/dashboard/dashboardUser/MyProfile'), { suspense: true });
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