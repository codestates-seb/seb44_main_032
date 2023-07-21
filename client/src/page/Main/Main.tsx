import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Main.css';
import { Pagination } from 'swiper/modules';
import LandingPageOne from '../../components/Main/LandingPageOne';
import LandingPageTwo from '../../components/Main/LandingPageTwo';
import LandingPageThree from '../../components/Main/LandingPageThree';

function Main() {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <LandingPageOne />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPageTwo />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPageThree />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Main;
