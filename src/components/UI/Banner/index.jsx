import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "./Banner";

const MainBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="w-[1320px] m-auto mt-[40px] text-black rounded">
      <Slider {...settings}>
        <div>
          <Banner />
        </div>
        <div>
          <Banner />
        </div>
        <div>
          <Banner />
        </div>
      </Slider>
    </div>
  );
};

export default MainBanner;
