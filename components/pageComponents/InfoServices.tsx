"use client"
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "../../styles/moreServices.module.css";
import Link from "next/link";
import IS5 from "../../public/images/IS5.jpeg";
import IS2 from "../../public/images/IS2.jpeg";
import IS3 from "../../public/images/IS3.jpeg";
import IS4 from "../../public/images/IS4.jpeg";
import { NextComponentType } from "next";
import arrow from "../../public/images/arrowSwipe.png";

const responsive = {
  0 : {items : 1},
  1050 : {items: 2}
}

const items = [
  {
    id: 1,
    title: "Supera tus Limites",
    image: IS5,
    buttonText: "Mas informacion",
    buttonLink: "/about",
  },
  {
    id: 2,
    title: "Te enseñamos paso a paso",
    image: IS2,
    buttonText: "Preguntas Frecuentes",
    buttonLink: "/contact",
  },
  {
    id: 3,
    title: "Mas que un estilo de baile, un estilo de vida",
    image: IS3,
    buttonText: "Volver al inicio",
    buttonLink: "/",
  },
  {
    id: 4,
    title: "Se parte de nosotros",
    image: IS4,
    buttonText: "Registrate ya",
    buttonLink: "/api/auth/login",
  },
  
];
const InfoServices : NextComponentType = () => {
  return (
    <div className={styles.carouselCont}>
      <AliceCarousel
       disableDotsControls
        mouseTracking
        responsive={responsive}
        controlsStrategy="alternate"
        infinite
        keyboardNavigation
        renderPrevButton={() => {
          return (
            <>
              <div
                className={styles.buttoncontainer}
                style={{
                  backgroundColor: '#232323',
                  textDecoration: 'none',
                  border: '4px solid white',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '100%',
                 transform: 'rotate(180deg)',
                 marginLeft : "42%"
                }}
              >
                <Image
                  src={arrow}
                  alt="Prev arrow"
                  width={20}
                  height={23}
                  style={{
                    backgroundColor: 'transparent',
                    textDecoration: 'none'
                  }}
                />
              </div>
            </>
          )
        }}
          renderNextButton={() => {
            return (
              <>
                <div
                  className={styles.buttoncontainer}
                  style={{
                    backgroundColor: '#232323',
                    textDecoration: 'none',
                    border: '4px solid white',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%',
                    marginLeft : "45%"
                  }}
                >
                  <Image
                    src={arrow}
                    alt="Prev arrow"
                    width={20}
                    height={23}
                    style={{
                      backgroundColor: 'transparent',
                      textDecoration: 'none'
                    }}
                  />
                </div>
              </>
            )
        }}
        items={items.map((item) => (
          <div className={styles.item} key={item.id} data-value={item.id}>
            <Image
              className={styles.image}
              height={400}
              width={850}
              alt={`picture`}
              src={item.image}
               loading="lazy"
            />
            <h2>{item.title}</h2>
            <button className={styles.buttonLink}>
              <Link 
                href={item.buttonLink}>
                {item.buttonText}
              </Link>
            </button>
          </div>
        ))}
      />
    </div>
  );
};

export default InfoServices;