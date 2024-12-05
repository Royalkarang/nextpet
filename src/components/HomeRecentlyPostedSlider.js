"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ContactModal from "../components/ContactModal";
import PreviouslyContacted from "../components/PreviouslyContacted";
import Image from "next/image";
import { useAuth } from "../app/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const HomeRecentlyPostedSlider = ({ slides, onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [modalData, setModalData] = useState({
    post_id: "",
    breeder_id: "",
  });
  const { isAuthenticated } = useAuth(); 
  const router = useRouter();


  // console.log("checkvalueeee m", slides);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1000) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModal = (post_id, breeder_id, contacts_colour) => {
    setModalData({ post_id, breeder_id });
    if (contacts_colour == 1) {
      setShowPreviousModal(true);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPreviousModal(false);
  };


  function likeHandler(slide) {
    if (isAuthenticated) {
      onClick(slide);
    } else {
      toast.error("User must be logged in");
      setTimeout(() => {
        router.push('/user/sign-in');
      }, 1000);
    }
  }
  
  function handleViewMore (slide) {
    if(isAuthenticated){
      router.push(`/user/posts/${slide.user_breeder_id}/${slide.id}/${slide.like_colour}`)
    } else{
      toast.error("User must be logged in");
      setTimeout(() => {
        router.push('/user/sign-in');
      }, 1000);
    }
  }

  return (
    <div className="recentposted-cat-dog-wrap" style={{ position: "relative" }}>
      <div className="custom-navigation">
        <button ref={prevRef} className="swiper-button-prev" />
        <button ref={nextRef} className="swiper-button-next" />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="col-lg-12">
              <Swiper
                slidesPerView={slidesPerView}
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
                {slides.map((slide, index) => (
                 <SwiperSlide key={index}>
                 <div id="recentposted-cat-dog-slider" className="owl-carousel">
                   <div className="recentposted-cat-dog-in">
                     <div className="recentposted-catimg-wrap">
                       <Image 
                        src={Array.isArray(slide.image) && slide.image.length > 0 ? slide.image[0] : "/images/Nextpet-imgs/Image_not_available.webp"}
                        alt="Pet image" 
                         width={500} 
                         height={300}
                         loading="lazy"  className="home-Image-height" 
                       />
                       <div
                         className="heart-icon-wrap"
                         onClick={() => likeHandler(slide)}
                         style={{ cursor: "pointer" }}
                       >
                         {slide.like_colour === "1" ? (
                           <Image
                             src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                             alt="Heart Fill"
                             className="active"
                             width={20} // Adjust based on the image size
                             height={20}
                           />
                         ) : (
                           <Image
                             src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                             alt="Heart Border"
                             className="active"
                             width={20}
                             height={20}
                           />
                         )}
                         <span>{slide.total_like ? slide.total_like : "0"}</span>
                       </div>
                     </div>
                     <div className="recentposted-content-card">
                       <div className="before-curve-icons">
                         <Image
                           src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                           alt="Curve Icon"
                           width={45} 
                           height={45}
                         />
                       </div>
                       <div className="heading-content">
                         <h3>{slide.name ? slide.name : "Name"}</h3>
                         <div
                           className="mail-boxwrap"
                           onClick={() =>
                             handleModal(
                               slide.id,
                               slide.user_breeder_id,
                               slide?.contacts_colour
                             )
                           }
                           style={{ cursor: "pointer" }}
                         >
                           <Image
                             src={
                               slide?.contacts_colour == 1
                                 ? "/images/Nextpet-imgs/newyear-cats-imgs/mail.svg"
                                 : "/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                             }
                             alt="Mail Icon"
                             width={20}
                             height={20}
                           />
                           <div className="mail-count pt-1" data-bs-target="#previous-information" data-bs-toggle="modal">
                             <span>{slide.total_contact ? slide.total_contact : "0"}</span>
                           </div>
                         </div>
                       </div>
                       {/* <p>
                         {slide?.description
                           ? slide.description.split(" ").slice(0, 10).join(" ")
                           : "Description Not Available..."}
                       </p> */}
                       <p>
                        {slide.description
                          ? slide.description.length > 50
                            ? `${slide.description.slice(0, 50)}...`
                            : slide.description
                          : "Description not available"}
                      </p>
                       <div className="viewmore-wrap">
                         <h4>${slide.price ? slide.price : "Price"}</h4>
                         
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
            </div>
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
        .recentposted-cat-dog-wrap {
          --swiper-navigation-size: 15px;
        }
      `}</style>
    </div>
  );
};

export default HomeRecentlyPostedSlider;
