"use client";
import styles from "../../styles/Services.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperButtons } from '../pageComponents/swiperButtons';
import { EffectFade } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-fade';


export const GendersAndShows  = ({ nameGender, description, array}: any) =>{

  return(
    <div className={styles.genderCont}>
      <div className={styles.infoGender}>
        <h2>
          {nameGender}
        </h2>
        <p>
          {description}
        </p>
      </div>
      <div className={styles.swiperCont}>
        <Swiper
          modules={[Navigation, EffectFade]}
          effect='fade'
          spaceBetween={10}
          slidesPerView={1}
        >
        <div className={styles.swiperSlide}>
          {
            array?.map((e:any) => 
            <SwiperSlide key={e}> 
            <Image
                className={styles.image}
                height={400} 
                width={400}  
                alt={`picture`} 
                src={e}
                loading="lazy">
            </Image>
            </SwiperSlide>
          )}
        </div>
          <SwiperButtons/>
          </Swiper>
      </div>  
    </div>
  )
}