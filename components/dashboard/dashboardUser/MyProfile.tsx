import { NextComponentType } from "next";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getUserById } from "@/utils/users";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";
import { useQuery } from "react-query";
import Loading from "@/components/layout/loading";
import Image from "next/image";
import RepresentativeProfile from "../dashboardUser/users/RepresentativesProfile";
import DancerProfile from "../dashboardUser/users/DancersProfile";
import { UserRole, Payment, DancerInfo } from "@/app/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const MyProfile: NextComponentType = () => {
  const { user, isLoading: isLoadingU } = useUser();
  const [userDancers, setuserDancers] = useState<DancerInfo[] | undefined>();
  const [payment, setPayment] = useState<Payment[] | undefined>([]);
  
  const userId = user?.sub ?? '';
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId));
  
  useEffect(() => {
    if (dbUser) {
      const userRole = dbUser.userRole;
      if (userRole === UserRole.REPRESENTATIVE) {
        setPayment(dbUser.representative?.Payment);
        const dancers = dbUser.representative?.dancers;
        if (dancers) {
          const allDancersInfo: DancerInfo[] = dancers.map((dancer) => {
            const { Payment, firstName, lastName, id } = dancer;
            return {
              id,
              firstName,
              lastName,
              Payment: Payment,
              pending: Payment.filter((payment : Payment) => !payment.confirm).length 
            };
          });
          setuserDancers(allDancersInfo);
        }
      } else if (userRole === UserRole.DANCER) {
        setPayment(dbUser.dancer?.Payment);
      }
    }
  }, [dbUser]);

  if (isLoading || isLoadingU) return <Loading />;

  const userRole = dbUser?.userRole;
  const firstName = dbUser?.firstName;
  const lastName = dbUser?.lastName;
  const picture : string | StaticImport | undefined = dbUser?.photo;

  return (
    <div className={styles.dashboardUser}>
      <div className={styles.info}>
        <div className={styles.firstLine}>
          <Link href={'/'} style={{ textDecoration: 'none', backgroundColor: 'transparent' }}>
            <button className={styles.back}>Volver</button>
          </Link>
          <div className={styles.text1}>
            <h3>Bienvenido {firstName} {lastName}</h3>
            <div>
              <Image
                src={picture ? picture : ""}
                alt="User profile picture"
                width={50}
                height={50}
                style={{
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                  borderRadius: '100%',
                }}
              />
            </div>
          </div>
        </div>
        {userRole === UserRole.REPRESENTATIVE && (
          <RepresentativeProfile dbUser={dbUser} userDancers={userDancers} payment={payment} />
        )}
        {userRole === UserRole.DANCER && (
          <DancerProfile dbUser={dbUser} payment={payment} />
        )}
      </div>
    </div>
  );
};

export default MyProfile;