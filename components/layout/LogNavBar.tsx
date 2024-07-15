import { NextComponentType } from "next";
import styles from "../../styles/NavBar.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface LogNavBarProps {
  userPicture: string | StaticImport;
}

const LogNavBar: React.FC<LogNavBarProps> = ({  userPicture }) =>  {
  const {user} = useUser();
  const { picture } = user || {};
  return (
      <div>
        {picture && 
          <Image
            className={styles.imgLogNavBar} 
            width={50} 
            height={50} 
            src={userPicture} 
            alt="User profile picture"
            loading="lazy" 
          />
        }
      </div>
  );
};

export default withPageAuthRequired(LogNavBar);