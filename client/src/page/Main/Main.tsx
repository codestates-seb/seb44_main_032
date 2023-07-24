import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Main.css';
import { Pagination, Mousewheel } from 'swiper/modules';
import LandingPage1 from '../../components/Main/LandingPage1';
import LandingPage2 from '../../components/Main/LandingPage2';
import LandingPage3 from '../../components/Main/LandingPage3';
import LandingPage4 from '../../components/Main/LandingPage4';
import LandingPage5 from '../../components/Main/LandingPage5';

function Main() {
  return (
    <>
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <LandingPage1 />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPage2 />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPage3 />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPage4 />
        </SwiperSlide>
        <SwiperSlide>
          <LandingPage5 />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Main;
