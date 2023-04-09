import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  //캐러셀 옵션
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  //메인 이미지 배열
  const imgArr = ["img/main-img.png", "img/main-img.png", "img/main-img.png"];

  return (
    <div className="w-100">
      <Slider {...settings}>
        {imgArr.map((x, i) => (
          <div key={i}>
            <img className="img-fluid w-100" src={x} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Carousel;
