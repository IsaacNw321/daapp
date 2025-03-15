import { useState } from "react";
import ReviewR from "../myReview/ReviewR";
import InfoRepresentative from "../fullinfo/infoRepresentative";
import Dancers from "../../dashboardUser/myDancers/Dancers";
import styles from "@/styles/dashboard.module.css";
import { DancerInfo, Payment, User } from "@/app/types";
import { CreateDancer } from "../myDancers/createDancer";
import { DetailItem } from "../../dashboardAdmin/users/DancersRDetails";
import {PDFDownloadLink} from '@react-pdf/renderer'
import RegistrationFormDR from '../../pdf/RegisterFormDR'
import { DancerR } from "@prisma/client";
interface RepresentativeProfileProps {
  dbUser?: User;
  userDancers?: DancerInfo[];
  payment?: Payment[];
}

const RepresentativeProfile: React.FC<RepresentativeProfileProps> = ({ dbUser, userDancers, payment }) => {
  const [showDancers, setShowDancers] = useState(false);

  const toggleShowDancers = () => {
    setShowDancers(prevState => !prevState);
  };

  const representativeId = dbUser?.representative?.id;
  const reviewId = dbUser?.representative?.review?.id;
  const numberDancers = userDancers?.length ?? 0;
  const repData = {
    firstName : dbUser?.firstName,
    lastName : dbUser?.lastName,
    Adress : dbUser?.representative?.Adress,
    CI : dbUser?.representative?.CI,
    phone : dbUser?.representative?.phone
  }
  return (
    <section >
       <div className={styles.details}>
      <strong>Representante</strong>
      {dbUser?.representative?.phone !== undefined ? <DetailItem label="Telefono" value={dbUser?.representative?.phone} /> : null}
      {dbUser?.representative?.Adress !== undefined ? <DetailItem label="Direccion" value={dbUser?.representative?.Adress} /> : null}
      {dbUser?.representative?.CI !== undefined ? <DetailItem label="Cedula" value={dbUser?.representative?.CI} /> : null}
      </div>
      <ReviewR representativeId={representativeId} reviewId={reviewId} />
      <InfoRepresentative representativeId={representativeId} />
      <CreateDancer representativeId={representativeId} numberDancers={numberDancers} />
      <button className={styles.button} onClick={toggleShowDancers}>
        {showDancers ? 'Esconder Bailarines' : 'Mostrar Bailarines'}
      </button>
        {showDancers && (
  <div className={styles.dancersCont}>
    {numberDancers === 0 ? (
      <p>No tienes Bailarines inscritos</p>
    ) : (
      userDancers?.map((dancer: DancerInfo) => (
        <div key={dancer.id}>
          <Dancers
            key={dancer.id}
            dancer={dancer}
            Payment={dancer.Payment?.length}
            pending={dancer.pending}
          />
        <PDFDownloadLink 
          document={<RegistrationFormDR dancerData={dancer} repData={repData} />}
          fileName={`${dancer.firstName} ${dancer.lastName}.pdf`}
        >
        {({loading}) => 
          loading ? (
            <button disabled className={styles.roleButton}> Cargando documento..</button>
          ) : (
            <button className={styles.roleButton}>Descargar PDF</button>
          )

        }
        </PDFDownloadLink>  
        </div>
      ))
    )}
  </div>
)}
    </section>
  );
};

export default RepresentativeProfile;