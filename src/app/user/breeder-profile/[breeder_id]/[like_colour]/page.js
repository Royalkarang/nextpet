"use client";
import React, { useState, useEffect } from "react";
import BASE_URL from "../../../../utils/constant";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import Pagination from "../../../../../components/Pagination";
import ContactModal from "../../../../../components/ContactModal";
import PreviouslyContacted from "../../../../../components/PreviouslyContacted";
// import ProtectedRoute from "../../../../context/ProtectedRoute";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ContactPetDetails = () => {
  const { breeder_id, like_colour } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [breederDetails, setBreederDetails] = useState([]);
  const [recentPostData, setRecentPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [userId, setUserId] = useState(null);
  const [modalData, setModalData] = useState({
    breeder_id: "",
  });

  const router = useRouter();
  // const [breederData, setBreederData] = useState(null);

  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href; // Returns full URL
    }
    return '';
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_user_id" || "breeder_user_id");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("authToken");
      if (!storedUserId) {
        toast.error('User or Breeder must be login')
        router.push('/')
      }
    }
  }, []);

  
  useEffect(() => {
    const fetchBreederData = async () => {
      try {
        // const response = await axios.post(`${BASE_URL}/api/all_post_listing`, {
        //   user_id: userId,
        // });
        // setBreederData(response.data);
        await axios.post(`${BASE_URL}/api/all_post_listing`, {
          user_id: userId,
        });
        // setBreederData(response.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
  
    fetchBreederData();
  }, []);
  

  useEffect(() => {
    getBreederDetails();
    getAllRecentPost();
  }, [breeder_id, userId]);

  const getBreederDetails = async () => {
    let apiData = {
      user_id: breeder_id,
    };
    const response = await axios.post(
      `${BASE_URL}/api/breeder_details`,
      apiData
    );
    if (response.data.code === 200 || 400) {
      setBreederDetails(response.data.data);
    }
  };

  const handlePostLike = async (value) => {
    let checkBreederLike = like_colour ? 1 : 111;
    let checkUserLike = value?.check_like == "0" ? 1 : 111;
    let likeData = {
      user_id: userId,
      breeder_id: breeder_id || "",
      post_id: value?.post_id || "",
      like_post: value?.post_id ? checkUserLike : checkBreederLike,
    };

    let apiURL = value?.post_id
      ? `${BASE_URL}/api/like_post`
      : `${BASE_URL}/api/breeder_like`;
    try {
      const response = await axios.post(apiURL, likeData);
      if (response.data.code === 200) {
        if (value?.post_id) {
          getAllRecentPost();
        } else {
          getBreederDetails();
        }
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  
  const getAllRecentPost = async () => {
    let apiData = {
      user_id: userId,
      user_breeder_id: breeder_id,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/popular_breeder_list_details`,
        apiData
      );
      if (response.data.code === 200) {
        setRecentPostData(response.data.data);
        setShowModal(false);
        setShowPreviousModal(false);
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.clipboard.writeText( getFullUrl());
        // Use the Web Share API to share content (for mobile devices)
        await navigator.share({
          title: 'Breeder Details',
          url: getFullUrl(),
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText( getFullUrl());
    }
  };

  // Logic for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = recentPostData?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleModal = (value) => {
    let checkConnect = value?.check_like_breeder == 0 ? 1 : 0;
    setModalData({
      user_id: userId,
      breeder_id: breeder_id,
      breeder_do_not_show_me: checkConnect,
    });
    if (checkConnect == 1) {
      setShowModal(true);
    } else {
      setShowPreviousModal(true);
    }
  };

  const closeModal = () => {
    getAllRecentPost();
    setShowModal(false);
    setShowPreviousModal(false);
  };

  return (
    <>
      {/* <ProtectedRoute> */}
        <div className="breedeerdasboard-createpost-wrap">
          <div className="container">
            <div className="col-lg-12">
              {breederDetails === undefined ? (
                "This Breeder have no data"
              ) : (
                <div className="breedeerdasboard-createpost-inner">
                  <div className="breedeerdasboard-createpost-left">
                    <div className="breeder-profileinner-wrap">
                      <img
                        src={breederDetails?.image || ""}
                        alt="Breeder Profile"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="breedeerdasboard-createpost-right">
                    <div className="postcreate-heading">
                      <h3>{breederDetails?.name}</h3>
                      <div className="edit-heartpost">
                        <div className="inner-heartt" onClick={handlePostLike}>
                          <div className="inner-heartt-div">
                            <Image
                              src={
                                like_colour == "1"
                                  ? "/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                                  : "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                              }
                              alt="like"
                              width={45}
                              height={39}
                            />
                          </div>
                        </div>
                        <div className="inner-heartt" style={{ padding: "7px 4px" }}>
                          <div className="inner-heartt-div">
                            <Image
                              src="/images/Nextpet-imgs/dashboard-imgs/share.svg"
                              alt="share" width={45} height={39}  onClick={handleShare}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <form action="">
                      <p>{breederDetails?.bio || ""}</p>
                      <span>
                        <FaLocationDot fill="#e49a01" />
                        &nbsp;{breederDetails?.location}
                      </span>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="recent-posted-innerwrap">
          <div className="container">
            <h1>Recently Posted</h1>
            {recentPostData ? "" : <p> This Breeder have no recent post</p>}
            <div className="pets-breeder-cards">
              {currentPosts && currentPosts.length > 0 ? 
              currentPosts?.map((item, index) => (
                <div className="newyear-cat-dog-in" key={index}>
                  <div className="newyear-catimg-wrap">
                    <img src={item?.image?.[0] || ""} alt="" loading="lazy" />

                    <div
                      className="heart-icon-wrap"
                      onClick={() => handlePostLike(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={
                          item?.check_like == 1
                            ? "/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                            : "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                        }
                        alt=""
                        className="active"
                      />

                      <span>{item?.total_like}</span>
                    </div>
                  </div>

                  <div className="newyear-content-card">
                    <div className="before-curve-icons">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                        alt=""
                      />
                    </div>
                    <div className="heading-content">
                      <h3>{item?.name}</h3>
                      <div
                        className="mail-boxwrap"
                        onClick={() => handleModal(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={
                            item?.contacts_colour == 1
                              ? "/images/Nextpet-imgs/newyear-cats-imgs/mail.svg"
                              : "/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                          }
                          alt=""
                        />
                        <div className="mail-count">
                          <span>{item?.total_contact}</span>
                        </div>
                      </div>
                    </div>
                    <p>{item?.description}</p>

                    <div className="viewmore-wrap">
                      <h4>${item?.price}</h4>
                      <div className="action-wrap">
                        <Link href="/user/contact-pet-details">
                          View More&nbsp;<i className="fas fa-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <p style={{ textAlign: 'center', width:'100%'}}> No Recent Post Available </p>}
            </div>

            {currentPosts && currentPosts.length > 0 && 
            <div className="influ-pagi pt-4">
              <Pagination
                postPerPage={postsPerPage}
                totalPosts={recentPostData?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div> }
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
      {/* </ProtectedRoute> */}
    </>
  );
};

export default ContactPetDetails;
