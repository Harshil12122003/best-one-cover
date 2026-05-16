import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "components/productCard";
import styles from "./Swiper.module.scss";

const SwiperSlider = ({ products, category, cardType }) => {
  let counter = 0;
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      slidesPerView={1}
      spaceBetween={30}
      breakpoints={{
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 5,
        },
      }}
      className={styles.swiperSlider}
    >
      {/* <SwiperSlide className={styles.slide1}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide2}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide3}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide4}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide5}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide6}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide7}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide8}><ProductCard cardType="miniProductCard"/></SwiperSlide>
    <SwiperSlide className={styles.slide9}><ProductCard cardType="miniProductCard"/></SwiperSlide> */}
      {products && category  && 
        products.map((product, i) => {
          counter = product.category.toLowerCase() === category.toLowerCase() ? counter + 1 : counter;
          return (
            product.category.toLowerCase() === category.toLowerCase() &&
            counter <= 10 && (
              <SwiperSlide className={styles.slide1}>
                <ProductCard cardType="miniProductCard" product={product} />
              </SwiperSlide>
            )
          );
        })}

      {products && !category &&
        products.map((product, i) => {
          return (
            i <= 10 && (
              <SwiperSlide className={styles.slide1}>
                <ProductCard cardType={cardType} product={product} />
              </SwiperSlide>
            )
          );
        })}
    </Swiper>
  );
};

export default SwiperSlider;
