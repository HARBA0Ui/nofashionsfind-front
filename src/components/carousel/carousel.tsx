// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay"; // Import Swiper autoplay styles (if needed)
import { SwiperNavButtons } from "../SwiperNavButton/SwiperNavButton";

import styles from "./carousel.module.css";
import { useProducts } from "@/context/products-context";
import { CgSpinner } from "react-icons/cg";

import { Link } from "react-router-dom";

const Carousel = () => {
  const { latestProducts } = useProducts();
  return (
    <section className="pt-12 pl-12 pb-6 bg-gray-50 relative">
      <h1 className="text-2xl md:text-4xl mb-3">Out Latest Products</h1>
      <Swiper
        className="flex flex-col pt-14 pb-12 !static"
        // install Swiper modules
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={4}
        slidesPerView={3.1} // Default for very large screens
        navigation
        autoplay={{
          delay: 1600, // 3 seconds delay between slides
          disableOnInteraction: false, // Continue autoplay even after user interactions
        }}
        speed={750}
        loop={true}
        breakpoints={{
          550: {
            slidesPerView: 3.5,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 8
          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 6,
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 12,
          },
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="absolute top-16 right-16">
          <SwiperNavButtons />
        </div>
        <div>
          {!latestProducts ? (
            <div className="w-full h-full flex justify-center items-center">
              <CgSpinner className="w-6 h-6 animate-spin " />
            </div>
          ) : (
            latestProducts?.map((p: any) => (
              <SwiperSlide key={p.id}>
                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.imgs[0]}
                    className={`${styles.img} h-[170px] w-[130px]  sm:h-[200px] sm:w-[160px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[250px] xl:h-[350px] xl:w-[300px] object-cover border border-zinc-950/70`}
                  />
                  <div className="text-center pt-2">
                    <h2 className="text-md -mb-2">{p.title}</h2>
                    <span className="font-bold text-sm">{p.price} TND</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )}
        </div>
      </Swiper>
    </section>
  );
};

export default Carousel;
