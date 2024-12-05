"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const slides = [
    { src: "/images/Nextpet-imgs/categories-imgs/cate1.png", alt: "Dog", title: "Dog" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate2.png", alt: "Cat", title: "Cat" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate3.png", alt: "Rabbit", title: "Rabbit" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate1.png", alt: "Dog", title: "Dog" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate2.png", alt: "Cat", title: "Cat" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate3.png", alt: "Rabbit", title: "Rabbit" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate1.png", alt: "Dog", title: "Dog" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate2.png", alt: "Cat", title: "Cat" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate3.png", alt: "Rabbit", title: "Rabbit" },
    { src: "/images/Nextpet-imgs/categories-imgs/cate1.png", alt: "Dog", title: "Dog" },
  ];

  const itemsPerPage = 6;
  const numPages = slides.length - itemsPerPage + 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numPages) % numPages);
  };

  return (
    <div className="banner-cat-wrap">
      <div className="container"  style={{ position: 'relative'}}>
        <div className="row" >
          <div className="col-lg-12" >
            <div className="slider-controls">
              <button className="slider-button slider-button-prev" onClick={prevSlide}>
                ❮
              </button>
              <button className="slider-button slider-button-next" onClick={nextSlide}>
                ❯
              </button>
            </div>
            <div className="slider-container shadow-md">
              <div
                className="slider-slide"
                style={{
                  display: "flex",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="slider-item"
                    style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                  >
                    <div className="banner-cat-in">
                      <div className="banner-inner-category" style={{cursor:'pointer'}} onClick={() => {router.push(`pets?searchItem=${slide.title}`)}}>
                        <Image src={slide.src} alt={slide.alt} width={45} height={45} />
                        <a>
                          <h3>{slide.title}</h3>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
        .slider-slide {
          display: flex;
        }
        .slider-item {
          padding: 10px;
        }
        .banner-inner-category {
          text-align: center;
          border-right: 1px solid #a8a8a8 !important;
        }
        .slider-controls {
          display: flex;
          justify-content: center;
        }
        .slider-button {
          background-color: #e49a0196;
          color: gray;
          border: none;
          padding: 3px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 30px 0px 0px 30px;
        }
        .slider-button-prev{
          margin-top: 10px;
          left: -20px;
          border-radius: 30px 0px 0px 30px;
        }
        .slider-button-next{
          margin-top: 10px;
          right: -20px;
          border-radius: 0px 30px 30px 0px;
        }
        .slider-button:hover {
          background-color: #444;
        }
      `}</style>
    </div>
  );
};

export default Slider;
