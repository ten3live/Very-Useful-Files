'use client'
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/slider.module.css';


const ImageCarousel = ({ style }) => {
  const images = [
    '/1.jpg',
    '/2.jpg',
    // Add more image URLs as needed
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change 3000 to the desired autoplay interval in milliseconds

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    arrows:false,
    lazyLoad: true,
    speed: 200,
    autoplaySpeed: 6000,
    cssEase: "linear",
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    swipeToSlide: true,
    autoplay: true, // Autoplay is handled separately
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  return (
   <div className={styles.container} style={{...style,}}>
    
    <Slider  {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img className={styles.images} src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default ImageCarousel;