import { NextComponentType } from "next";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getUserById } from "@/utils/users";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";
import { useQuery } from "react-query";
import Loading from "@/components/NavBar/loading";
import Image from "next/image";
import RepresentativeProfile from "../dashboardUser/users/RepresentativesProfile";
import DancerProfile from "../dashboardUser/users/DancersProfile";
import { UserRole, Payment, DancerInfo, DancerR } from "@/app/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import RegistrationForm from "../pdf/RegisterForm";
import { PDFDownloadLink } from "@react-pdf/renderer";
const MyProfile: NextComponentType = () => {
  const { user, isLoading: isLoadingU } = useUser();
  const [userDancers, setuserDancers] = useState<DancerInfo[] | undefined>();
  const [payment, setPayment] = useState<Payment[] | undefined>([]);
  const userId = user?.sub?.split('|')[1] || '';
  const { data: dbUser, isLoading } = useQuery(['user', userId], () => getUserById(userId));
  
  useEffect(() => {
    if (dbUser) {
      const userRole = dbUser.userRole;
      if (userRole === UserRole.REPRESENTATIVE) {
        setPayment(dbUser.representative?.Payment);
        const dancers = dbUser.representative?.dancers;
        if (dancers) {
          const allDancersInfo: DancerInfo[] = dancers.map((dancer) => {
            const { Payment, firstName, lastName, id, cI, allergies, age } = dancer;
            return {
              id,
              firstName,
              lastName,
              cI,
              allergies,
              age,
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

  if (isLoading || isLoadingU){
    return(
      <main className={styles.dashboardUser}>
        <Loading />;
      </main>
    )
  } 

  const userRole = dbUser?.userRole;
  const firstName = dbUser?.firstName;
  const lastName = dbUser?.lastName;
  const picture : string | StaticImport | undefined = dbUser?.photo;
  const userData = dbUser?.dancer 
  return (
    <main className={styles.dashboardUser}>
      <div className={styles.info}>
        <div className={styles.firstLine}>
        <Link  className={styles.roleButton} style={{ marginBottom: '10px' }}href="/" passHref>
            Volver
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
      {dbUser?.userRole === UserRole.DANCER && dbUser?.firstName !== null &&
     <PDFDownloadLink
     document={<RegistrationForm userData={userData} firstName={dbUser?.firstName} lastName={dbUser?.lastName} />}
     fileName={`${dbUser?.firstName} ${dbUser?.lastName}.pdf`}
   >
     {({ loading }) =>
       loading ? (
         <button className={styles.roleButton} disabled>Cargando documento...</button>
       ) : (
         <button className={styles.roleButton}>Descargar PDF</button>
       )
     }
   </PDFDownloadLink>
      }
    </main>
  );
};

export default MyProfile;