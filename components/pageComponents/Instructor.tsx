"use client";
import Image, { StaticImageData } from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SwiperButtons } from '../pageComponents/swiperButtons';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import styles from "../../styles/OurTeam.module.css";

interface InstructorProps {
  nameInstructor: string;
  array: StaticImageData[];
  text: string;
  position: string;
}

export const Instructor = ({nameInstructor, array, text, position}:InstructorProps) =>{
  return (
    <div className={styles.instructor}>
      <div className={styles.swiperCont}>
        <Swiper
          modules={[Navigation, EffectFade]}
          effect='fade'
          spaceBetween={0}
          slidesPerView={1}
        >
        <div className={styles.swiperSlide}>
          {
            array?.map((e:any, index : number) => 
            <SwiperSlide key={index}> 
            <Image
                className={styles.image}
                height={450} 
                width={450}  
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
        <div className={styles.infoInstructor}>
        <h2>
          {nameInstructor}
        </h2>
        <h3>
          {position}
        </h3>
        <p>
          {text}
        </p>
      </div>
    </div>
  )
}