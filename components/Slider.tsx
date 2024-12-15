import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "@/styles/Slider.module.css";

const Slider: React.FC = () => {
  const slides = [
    { image: "/img/slide1.png" },
    { image: "/img/slide2.png" },
    { image: "/img/slide3.png" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={style.sliderContainer}>
      <div className={style.additionalImages}>
        <Image
          src="/img/promo 1.png"
          alt="слайд-1"
          className={style.additionalImageOne}
          width={149} 
          height={204} 
        />
        <Image
          src="/img/promo 2.png"
          alt="слайд-2"
          className={style.additionalImageTwo}
          width={158} 
          height={273} 
        />
      </div>
      <div className={style.slider}>
        <Image
          src={slides[currentSlide].image}
          alt={`Слайд ${currentSlide + 1}`}
          className={style.image}
          width={1120} 
          height={702} 
          priority
        />
        <div className={style.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${style.dot} ${
                currentSlide === index ? style.active : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
