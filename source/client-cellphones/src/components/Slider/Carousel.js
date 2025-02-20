import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let { slider, slider1, slider2 } = props;
  const [nav, setNav] = useState({ nav1: null, nav2: null });

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2,
    });
  }, []);

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    autoplay: true, // ✅ Bật tự động chuyển slide
    autoplaySpeed: 2500, // ✅ Tốc độ 2.5 giây mỗi lần
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const next = () => {
    slider1.slickNext();
  };
  const previous = () => {
    slider2.slickPrev();
  };

  return (
    <section id="carousel">
      <div className="carousel">
        {/* ✅ Điều chỉnh chiều rộng để giống trang bên phải */}
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider
              asNavFor={nav.nav2}
              ref={(slider) => (slider1 = slider)}
              {...settings}
            >
              <div key={1}>
                <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s25-thu-cu-3tr-home.png"></img>
              </div>
              <div key={2}>
                <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/16-pro-max-Valentine-home.jpg"></img>
              </div>
              <div key={3}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/ip11-tg-690-300-max.png"></img>
              </div>
              <div key={4}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/dd690x300_XR.png"></img>
              </div>
              <div key={5}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/se-aw-690-300-max.png"></img>
              </div>
            </Slider>
            {/* ✅ Điều chỉnh hover và di chuyển mượt hơn */}
            <div className="carousel-left-move">
              <div className="prev" onClick={() => previous()}>
                <LeftOutlined />
              </div>
              <div className="next" onClick={() => next()}>
                <RightOutlined />
              </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider
              asNavFor={nav.nav1}
              ref={(slider) => (slider2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              <div>GALAXY S25 ULTRA <br /> Mở bán ưu đãi khủng</div>
              <div>IPHONE 16 PROMAX <br /> Lên đời ngay</div>
              <div>XR CHÍNH HÃNG <br /> Giá mới cực tốt</div>
              <div>APPLE WATCH SE <br /> Mua đi chờ chi</div>
              <div>ĐẠI TIỆC ÂM THANH <br /> Loa sale bung nóc</div>
            </Slider>
          </div>
        </div>

        {/* ✅ Điều chỉnh lại phần banner nhỏ bên phải */}
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-14-02.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-imac-m4-30-12.jpg"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/11lite-690-300-max.png"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
