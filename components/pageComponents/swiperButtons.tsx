"use client";
import { useSwiper } from "swiper/react";
import styles from "../../styles/OurTeam.module.css";
import Image from "next/image";
import arrow from "../../public/images/arrowSwipe.png";
import arrowPre from "../../public/images/arrowpreSwipe.png";
import { NextComponentType } from "next";
export const SwiperButtons : NextComponentType = () =>{
  const swiper = useSwiper();
  return (
    <>
      <button
        onClick={()=> swiper.slidePrev()}
        className={styles.slidePrev}>
           <Image
                className={styles.bimage}
                height={28} 
                width={28}  
                alt={`arrow`} 
                src={arrow}
                loading="lazy">
            </Image>
      </button>
      <button 
        onClick={() => swiper.slideNext()} 
        className={styles.slideNext}>
           <Image
                className={styles.bimage}
                height={28} 
                width={28}  
                alt={`arrow`} 
                src={arrow}
                loading="lazy">
            </Image>
      </button>
    </>
  ) 
}