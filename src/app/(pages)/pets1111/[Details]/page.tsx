"use client";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      src: "../images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
      alt: "Slide 1",
    },
    {
      src: "../images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
      alt: "Slide 2",
    },
    {
      src: "../images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
      alt: "Slide 3",
    },
    {
      src: "../images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
      alt: "Slide 4",
    },
    {
      src: "../images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
      alt: "Slide 5",
    },
    // Add more slides if needed
  ];

  const itemsPerPage = 1;
  const numPages = Math.ceil(slides.length);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numPages) % numPages);
  };

  return (
    <div className="breedeerdasboard-createpost-wrap">
      <div className="container">
        <div className="col-lg-12">
          <div className="breedeerdasboard-createpost-inner">
            <div className="breedeerdasboard-createpost-left">
              <div className="edit-uploadpost-wrap">
                <div id="uploaded-post-imgs" className="custom-carousel">
                  <div className="edit-post-icon">
                    <Link href="#">
                      <img
                        src="../images/Nextpet-imgs/dashboard-imgs/edit-post-icon.svg"
                        alt=""
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="carousel-inner">
                    <div
                      className="carousel-track"
                      style={{
                        display: "flex",
                        transition: "transform 0.5s ease-in-out",
                        transform: `translateX(-${
                          currentIndex * (100 / itemsPerPage)
                        }%)`,
                      }}
                    >
                      {slides.map((slide, index) => (
                        <div className="carousel-item" key={index}>
                          <div className="uploaded-post-wrap">
                            {/* <Image
                              src={slide.src}
                              alt={slide.alt}
                              width={276}
                              height={206}
                            /> */}
                            <img
                              src="../images/Nextpet-imgs/dashboard-imgs/dog-slide.png"
                              alt="Slide 1"
                              width="276"
                              height="206"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="carousel-nav">
                    <button
                      type="button"
                      className="carousel-prev"
                      onClick={prevSlide}
                    >
                      <i className="far fa-chevron-left"></i>
                    </button>
                    <button
                      type="button"
                      className="carousel-next"
                      onClick={nextSlide}
                    >
                      <i className="far fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="carousel-dots">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${
                          currentIndex === index ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                      >
                        <span></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="breedeerdasboard-createpost-right">
              <div className="postcreate-heading">
                <h3>Tommy</h3>
                <div className="edit-heartpost">
                  <div className="inner-heartt">
                    <a href="#">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                        alt="Mail"
                      />
                    </a>
                  </div>
                  <div className="heart-icon-wrap">
                    <img
                      src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                      alt="Heart Border"
                      className="active"
                    />
                    <img
                      src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                      alt="Heart Fill"
                    />
                  </div>
                  <div className="inner-heartt">
                    <a href="#">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/share.svg"
                        alt="Share"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <form action="">
                <label>
                  <p>
                   {` There are many variations of Lorem Ipsum available, but the
                    majority have been altered in some form, often by injected
                    humor or random words which don't look even slightly
                    believable.`}
                  </p>
                </label>

                <h4>About Tommy</h4>
                <div className="list-post-form">
                  {[
                    "Type",
                    "Breed",
                    "Price",
                    "General Size",
                    "Anticipated Weight",
                    "Gender",
                    "Birthdate",
                    "Date Available",
                    "Health guarantee",
                    "Certifications",
                    "Delivery availability",
                    "Boarding availability",
                    "Flying availability",
                  ].map((field) => (
                    <div className="formdata-wrap" key={field}>
                      <p>{field}</p>
                      <input type="text" placeholder="" />
                    </div>
                  ))}

                  <div className="posts-btn-wrap">
                    <button
                      type="button"
                      value="Submit"
                      data-bs-target="#breeder-guide2"
                      data-bs-toggle="modal"
                    >
                      Contact Breeder
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
