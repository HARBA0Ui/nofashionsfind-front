import { useSwiper } from "swiper/react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns flex items-center gap-x-3">
      <button className="flex items-center justify-center text-zinc-900 rounded-full text-xl" onClick={() => swiper.slidePrev()}><MdKeyboardDoubleArrowLeft /></button>
      <button className="flex items-center justify-center text-zinc-900 rounded-full text-xl" onClick={() => swiper.slideNext()}><MdKeyboardDoubleArrowRight /></button>
    </div>
  );
};
