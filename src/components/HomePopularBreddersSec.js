"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
// import Link from "next/link";
// import { MdNavigateNext } from "react-icons/md";
import ContactModal from "../components/ContactModal";
import PreviouslyContacted from "../components/PreviouslyContacted";
import { useAuth } from "../app/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const HomePopularBreddersSec = ({ slides, onClick }) => {
  const [userId, setUserId] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [slidesPerViewHighDemand, setSlidesPerViewHighDemand] = useState(4);
  const [modalData, setModalData] = useState({
    post_id: "",
    breeder_id: "",
  });
  const { isAuthenticated } = useAuth(); 
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_user_id");
      setUserId(storedUserId);
    }
  }, []);
  // console.log("checkkslidess", slides);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSlidesPerViewHighDemand(1);
      } else if (window.innerWidth <= 1000) {
        setSlidesPerViewHighDemand(2);
      } else {
        setSlidesPerViewHighDemand(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModal = (value) => {
    let checkConnect = value?.breeder_do_not_show_me == null ? 1 : 0;
    setModalData({
      user_id: userId,
      breeder_id: value?.breeder_id,
      breeder_do_not_show_me: checkConnect,
    });
    if (checkConnect == 1) {
      setShowModal(true);
    } else {
      setShowPreviousModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPreviousModal(false);
  };

  function likeHandler(slide) {
    if (isAuthenticated) {
      onClick(slide)
    } else {
      toast.error("User must be logged in");
      setTimeout(() => {
        router.push('/user/sign-in');
      }, 1000);
    }
  }
  function handleViewMore (slide) {
    if(isAuthenticated){
      let likeId="";
      if(slide?.like_colour==null){
        likeId=0;
      }
      else{
        likeId=1;
      }

      router.push(`/user/breeder-profile/${slide.breeder_id}/${likeId} `)
    } else{
      toast.error("User must be logged in");
      setTimeout(() => {
        router.push('/user/sign-in');
      }, 1000);
    }
  }

  return (
    <div className="newyear-cat-dog-wrap" style={{ position: "relative" }}>
      <div className="custom-navigation">
        <button ref={prevRef} className="swiper-button-prev" />
        <button ref={nextRef} className="swiper-button-next" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Popular Breeders</h1>
          </div>
          <div className="col-lg-12">
            <section className="lg:px-32 md:px-30 sm:px-10 px-4 py-16 max-md:py-8">
              <main className="flex flex-col gap-7 mb-20">
                <div className="flex justify-center items-center text-primary_dark"></div>
              </main>
              <Swiper
                slidesPerView={slidesPerViewHighDemand}
                spaceBetween={30}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                // pagination={{ clickable: true }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {slides?.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center items-center">
                      <div className="newyear-cat-dog-in">
                        <div className="popular-breedersimg-wrap">
                        <Image src={slide.image} alt="Popular Breeder" 
                          width={500} height={300} /> 
                          <div
                            className="heart-icon-wrap"
                            style={{ cursor: "pointer" }}
                          >
                            <Image
                              width={20}
                              height={20}
                              onClick={() => likeHandler(slide)}
                              src={
                                slide?.like_colour == null
                                  ? "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                                  : "/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                              }
                              alt=""
                              className="active"
                            />
                            <span>
                              {slide.like_count ? slide.like_count : 0}
                            </span>
                          </div>
                        </div>
                        <div className="newyear-content-card">
                          <div className="heading-content">
                            <h3>{slide.name}</h3>
                            <div className="rating-wrap">
                              <span>
                              {/* {slide.star_rating ? (Math.round(slide.star_rating * 10) / 10).toFixed(1) : "4.4"} */}
                              {(Math.round((parseFloat(slide?.star_rating || "0")) * 10) / 10).toFixed(1) || 0} &nbsp;

                              &nbsp;
                                <FaStar
                                  style={{
                                    color: "white",
                                    marginBottom: "4px",
                                  }}
                                />
                              </span>
                            </div>
                            <div
                              className="mail-boxwrap"
                              onClick={() => handleModal(slide)}
                              style={{ cursor: "pointer" }}
                            >
                              <Image
                                src="/images/Nextpet-imgs/newyear-cats-imgs/mail.svg"
                                alt=""
                                width={20}
                                height={20}
                              />
                              <div className="mail-count pt-1">
                                <span> {slide.total_contact ? slide.total_contact : 0} </span>
                              </div>
                            </div>
                          </div>
                          {/* <p> {slide.bio.slice(0,45)}
                            {slide.bio
                              ? slide.bio.split(" ").slice(0, 8).join(" ")
                              : " "}
                          </p> */}
                          <p>
                            {slide.bio
                              ? slide.bio.length > 50
                                ? `${slide.bio.slice(0, 50)}...`
                                : slide.bio
                              : "Description not available"}
                          </p>
                          <div className="viewmore-wrap">
                            <h4>11 posts active</h4>

                            <div className="action-wrap" onClick={() => handleViewMore(slide)} style={{fontSize:'14px', color:'#4e4e4e', cursor:'pointer'}}>
                              View More  &gt;
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </div>
        </div>
        <ContactModal
          modalIsOpen={showModal}
          closeModal={closeModal}
          modalDetails={modalData}
        />
        <PreviouslyContacted
          modalIsOpen={showPreviousModal}
          closeModal={closeModal}
          modalDetails={modalData}
        />
      </div>
      <style jsx>{`
        .custom-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          z-index: 10;
          pointer-events: none;
        }

        .swiper-button-prev,
        .swiper-button-next {
          pointer-events: auto;
          background-color: white;
          color: rgba(0, 0, 0, 0.5);
          padding: 15px 15px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          margin: 0 50px;
          border: none;
          border-radius: 15px 0 0 15px;
        }

        .swiper-button-next {
          border-radius: 0 15px 15px 0;
        }
        .newyear-cat-dog-wrap {
          --swiper-navigation-size: 15px;
        }
      `}</style>

      <ContactModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        modalDetails={modalData}
      />
      <PreviouslyContacted
        modalIsOpen={showPreviousModal}
        closeModal={closeModal}
        modalDetails={modalData}
      />
    </div>
  );
};

export default HomePopularBreddersSec;
