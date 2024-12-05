"use client";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../utils/constant";
import axios from "axios";
import UserProfileLeft from "../../../components/UserProfileLeft";
import Image from "next/image";
import Link from "next/link";
import ContactModal from "../../../components/ContactModal";
import PreviouslyContacted from "../../../components/PreviouslyContacted";
import { FaStar } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import ProtectedRoute from "../../context/ProtectedRoute";
import Pagination from "../../../components/Pagination";

const Favorites = () => {
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isBreeder, setIsBreeder] = useState(false);
  const [modalData, setModalData] = useState({
    post_id: "",
    breeder_id: "",
  });
;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_user_id");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    getFavoriteList();
  }, [userId, isBreeder]);

  const getFavoriteList = async () => {
    let user = {
      user_id: userId,
    };

    let apiURL =
      isBreeder == true
        ? `${BASE_URL}/api/breeder_favourites_list`
        : `${BASE_URL}/api/favourites_list`;
    try {
      const response = await axios.post(apiURL, user);
      if (response.data.code === 200 || 400) {
        setFavoriteList(response.data.data);
        console.log("checkresponse", response.data.data);
        setShowModal(false);
        setShowPreviousModal(false);
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const handlePostLike = async (value) => {
    let checkLikeDislike =
      value?.check_like == "0" || value?.like_count == "0" ? 1 : 111;

    let likeData = {
      user_id: userId,
      post_id: value?.post_id || "",
      breeder_id: value?.user_breeder_id
        ? value?.user_breeder_id
        : value?.breeder_id,
      like_post: checkLikeDislike,
    };
    try {
      let apiURL =
        isBreeder == true
          ? `${BASE_URL}/api/breeder_like`
          : `${BASE_URL}/api/like_post`;

      const response = await axios.post(apiURL, likeData);
      if (response.data.code === 200) {
        getFavoriteList();
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const handleToggle = () => {
    setIsBreeder(!isBreeder);
  };

  const handleModal = (post_id, breeder_id, contacts_colour) => {
    setModalData({ post_id, breeder_id, contacts_colour });
    if (contacts_colour == 1) {
      setShowPreviousModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleModalbreeder = (value) => {
    let checkConnect = value?.breeder_do_not_show_me == null ? 1 : 0;
    console.log("checkkkbrederconect", value);
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

  // Logic for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = favoriteList?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const closeModal = () => {
    getFavoriteList();
    setShowModal(false);
    setShowPreviousModal(false);
  };
  const userPages = {
    page: "favorites",
  };

  return (
    <>
      <ProtectedRoute>
        <div className="breedeerdasboard-profile-wrap">
          <div className="container">
            <div className="col-lg-12">
              <div className="breedeerdasboard-profile-inner">
                <UserProfileLeft userPages={userPages} />
                <div className="posts-right">
                  <div className="heading-favourite">
                    <h1>Favorites</h1>
                    <div className="user-breeder-toggle">
                      <span>Pet</span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={isBreeder}
                          onChange={handleToggle}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span>Breeder</span>
                    </div>
                  </div>
                  <form action="">
                    <div
                      className={
                        isBreeder ? "breeder-main-wrap" : "leads-inner-wrap"
                      }
                    >
                      <div
                        className={
                          isBreeder ? "pets-breeder-cards" : "all-posts-cards"
                        }
                      >
                        {favoriteList?.length === 0 && (
                          <p>No favorites found.</p>
                        )}
                        {currentPosts?.map((item, index) =>
                          isBreeder ? (
                            <div
                              className="newyear-cat-dog-in"
                              style={{ width: "33%" }}
                              key={index}
                            >
                              <div className="popular-breedersimg-wrap">
                                <Image
                                  src={item?.image || "/imageimages/Nextpet-imgs/Image_not_available.webp"}
                                  width={250}
                                  height={206}
                                  alt="new "
                                  loading="lazy"
                                />
                                <div
                                  className="heart-icon-wrap"
                                  onClick={() => handlePostLike(item)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Image
                                    width={15}
                                    height={15}
                                    src={
                                      item?.like_colour == 1
                                        ? "/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                                        : "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                                    }
                                    alt=""
                                    className="active"
                                  />

                                  <span>{item?.like_count}</span>
                                </div>
                              </div>

                              <div className="newyear-content-card">
                                <div className="heading-content">
                                  <h3>{item?.name}</h3>
                                  <div className="rating-wrap">
                                    <span>
                                      {/* {item?.star_rating}&nbsp; */}
                                      {(Math.round((parseFloat(item?.star_rating || "0")) * 10) / 10).toFixed(1) || 0} &nbsp;
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
                                    onClick={() => handleModalbreeder(item)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <Image
                                      width={15}
                                      height={15}
                                      src={
                                        item?.contacts_colour_breeder == null
                                          ? "/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                                          : "/images/Nextpet-imgs/newyear-cats-imgs/mail.svg"
                                      }
                                      alt=""
                                    />

                                    <div
                                      className="mail-count"
                                      data-bs-target="#previous-information"
                                      data-bs-toggle="modal"
                                    >
                                      <span>
                                        {item?.breeder_total_count_all}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p>{item?.bio}</p>

                                <div className="viewmore-wrap">
                                  <h4>11 active posts</h4>
                                  <div className="action-wrap">
                                    <a
                                      href={`/user/breeder-profile/${item?.breeder_id}/${item?.like_colour} `}
                                    >
                                      View More&nbsp;
                                      <MdNavigateNext
                                        size={25}
                                        style={{ marginLeft: "30px" }}
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`post-cards-wrap 
                                ${
                                  item?.delivery == 1
                                    ? "post-cards-wrap disable"
                                    : ""
                                }`}
                              key={index}
                            >
                              <div
                                className="adopted-icon"
                                style={{ top: "32px" }}
                              >
                                <img
                                  src={
                                    item?.delivery == 1
                                      ? "/images/Nextpet-imgs/dashboard-imgs/adopted.svg"
                                      : ""
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="post-cardsimg-wrap">
                                <img src={item?.image?.[0] || "/images/Nextpet-imgs/Image_not_available.webp"} alt="" />
                                <div className="actionpost-heart">
                                  <div
                                    className="heart-icon-wrap"
                                    onClick={() => handlePostLike(item)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      src={
                                        item?.total_like?.length < 0
                                          ? "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                                          : "/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                                      }
                                      alt=""
                                      className="active"
                                    />

                                    <span>{item?.total_like}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="posts-content-card">
                                <div className="before-curve-icons">
                                  <img
                                    src="/images/Nextpet-imgs/dashboard-imgs/all-cards-before.svg"
                                    alt=""
                                  />
                                </div>
                                <div className="posts-content">
                                  <h3>{item?.name}</h3>
                                  <div
                                    className="mail-boxwrap"
                                    onClick={() =>
                                      handleModal(
                                        item.post_id,
                                        item.user_breeder_id,
                                        item?.contacts_colour
                                      )
                                    }
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
                                    <Link
                                      href={`/user/posts/${item.user_breeder_id}/${item.post_id}/${item.total_like} `}
                                    >
                                      View More&nbsp;
                                      <i className="fas fa-angle-right"></i>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="influ-pagi">
                      <Pagination
                        postPerPage={postsPerPage}
                        totalPosts={favoriteList?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                      />
                    </div>
                  </form>
                </div>
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
      </ProtectedRoute>
    </>
  );
};

export default Favorites;
