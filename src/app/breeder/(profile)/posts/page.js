"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BreederProfileLeft from "../../../../components/BreederProfileLeft";
import axios from "axios";
import BASE_URL from "../../../utils/constant";
import Link from "next/link";
import { DeleteBreederPost } from "../../../services/user/post";
import Pagination from "../../../../components/Pagination";
import BreederProtectedRoute from "@/src/app/context/BreederProtectedRoute";
const Post = () => {
  // const [breederId, setBreederId] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [allBreederPosts, setAllBreederPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  const [deletePostId, setDeletePostId] = useState(null);
  const [checkedValues, setCheckedValues] = useState({
    All: true,
    Pending: false,
    Shortlist: false,
    Archive: false,
    Adopted: false,
  });
  const [breederId, setBreederId] = useState(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setBreederId(localStorage.getItem("breeder_user_id"));
      }
    }, []);

  // const breederId = localStorage.getItem("breeder_user_id");
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedUserId = localStorage.getItem("breeder_user_id");
  //     setBreederId(storedUserId);
  //   }
  // }, []);

  const breederData = {
    page: "posts",
  };

  const fetchBreederPosts = async () => {
    const formData = new FormData();
    formData.append("user_id", breederId);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/get_post_breeder`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setAllBreederPosts(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching breeder posts:", error);
    }
  };

  useEffect(() => {
    fetchBreederPosts();
  }, [breederId]);

  // Logic for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBreederPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const DeleteBreederPostFun = async () => {
    let payload = {
      post_id: deletePostId,
    };
    try {
      await DeleteBreederPost(payload);
      fetchBreederPosts();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const fillterPost = async (filters) => {
    let user = {
      user_breeder_id: breederId,
      search: [filters],
    };
    try {
      const response = await axios.post(`${BASE_URL}/api/post_filter`, user);
      if (response.data.code === 200) {
        setAllBreederPosts(response.data.data);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleChange = ({ target: { name, checked } }) => {
    let updatedCheckedValues = {
      All: false,
      Pending: false,
      Shortlist: false,
      Archive: false,
      Adopted: false,
    };

    if (name === "All" && checked) {
      updatedCheckedValues.All = true;
    } else if (checked) {
      updatedCheckedValues[name] = true;
    }
    setCheckedValues(updatedCheckedValues);
    if (name === "All" && checked) {
      fetchBreederPosts();
    } else if (checked) {
      fillterPost(name);
    } else {
      const isAnyFilterChecked =
        Object.values(updatedCheckedValues).includes(true);
      if (!isAnyFilterChecked) {
        fillterPost();
      }
    }
  };
  function handleModel() {
    setDropdownVisible(!isDropdownVisible);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
  
    // Format the date in dd-mm-yyyy format
    const formattedDate = `${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
  
    return formattedDate;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <BreederProtectedRoute>
      <div className="breedeerdasboard-profile-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-profile-inner">
              <BreederProfileLeft data={breederData} />
              <div className="posts-right">
                <form action="">
                  <div className="leads-inner-wrap">
                    <div className="post-apet-wrap">
                      <div className="filter-sec">
                        <button type="button" id="post-a-pet" value="Submit">
                          <Link href="posts/create-post">Post a Pet</Link>
                        </button>
                        <div className="quotes2">
                          <div
                            className="dropdown-filterbtn"
                            onClick={handleModel}
                          >
                            Filter
                            <img
                              src="/images/Nextpet-imgs/dashboard-imgs/mi_filter.svg"
                              alt=""
                            />
                          </div>
                          <div
                            className="dropdown-showfilter"
                            style={{
                              display: isDropdownVisible ? "block" : "none",
                            }}
                          >
                            <div className="quotes-list">
                              {[
                                "All",
                                "Pending",
                                "Shortlist",
                                "Archive",
                                "Adopted",
                              ].map((option) => (
                                <div className="filter-data-list" key={option}>
                                  <input
                                    type="checkbox"
                                    name={option}
                                    checked={checkedValues[option]}
                                    onChange={handleChange}
                                  />
                                  <p>
                                    {option.charAt(0).toUpperCase() +
                                      option.slice(1)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="all-posts-cards">
                      {currentPosts.map((post) => (
                        <div className="post-cards-wrap" key={post.post_id}>
                          <div className="post-cardsimg-wrap relative">
                            <span style={{position:'absolute', top:'5px', left:'5px', fontSize:'12px', color:'gray'}}> {formatDate(post?.created_at)} </span>
                            <Image
                              src={post.image[0]}
                              alt="image"
                              loading="lazy"
                              width={265}
                              height={199} className="postImage"
                            />
                            <div className="actionpost-heart">
                              <div className="heart-icon-wrap">
                                <img
                                  src={
                                    post.total_like
                                      ? "/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                                      : "/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                                  }
                                  alt=""
                                  className="active"
                                />

                                <span>
                                  {post.total_like ? post.total_like : 0}
                                </span>
                              </div>
                              <a href="#">
                                <div
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.cursor = "pointer";
                                  }}
                                  onClick={() => setDeletePostId(post.post_id)}
                                  className="delete-icon-wrap"
                                  data-bs-target="#delete-post"
                                  data-bs-toggle="modal"
                                >
                                  <img
                                    src="/images/Nextpet-imgs/dashboard-imgs/post-delete-icon.svg"
                                    alt=""
                                  />
                                </div>
                              </a>
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
                              <h3>{post.name ? post.name : ""}</h3>
                              <div className="mail-boxwrap">
                                <img
                                  src={
                                    post.total_contact
                                      ? "/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                                      : "/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                                  }
                                  alt=""
                                />
                                <div className="mail-count">
                                  <span>
                                    {post.total_contact
                                      ? post.total_contact
                                      : 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <p>{post.description ? post.description : ""}</p> */}
                            <p>
                              {post.description
                                ? post.description.length > 50
                                  ? `${post.description.slice(0, 50)}...`
                                  : post.description
                                : "Description not available"}
                            </p>

                            <div className="viewmore-wrap">
                              <h4>${post.price ? post.price : ""}</h4>
                              <div className="action-wrap">
                                <Link href={`posts/edit-post/${post.post_id}`}>
                                  View More&nbsp;
                                  <i className="fas fa-angle-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          {post.status_add === 3 && (
                            <div className="under-moderation-band">
                              <span>This post is under moderation</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Pagination
                      postPerPage={postsPerPage}
                      totalPosts={allBreederPosts.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DELETE YOU POST-POPUP */}
      <div
        className="modal fade modal-common"
        id="delete-post"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className="modal-dialog modal-dialog-edit" role="document">
          <div className="modal-content">
            <div className="modal-heading">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="profileverify-popup-wrap">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/delete-icon-popup.svg"
                    alt=""
                  />
                  <h1>Delete</h1>
                  <p>Are you sure you want to delete your post.</p>
                  <div className="delete-account-btns">
                    <button
                      type="button"
                      value="Submit"
                      data-bs-toggle="modal"
                      onClick={DeleteBreederPostFun}
                      data-bs-dismiss="close"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      value="Submit"
                      data-bs-toggle="modal"
                      data-bs-dismiss="close"
                    >
                      No
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* DELETE YOU POST-POPUP */}
      </BreederProtectedRoute>
    </>
  );
};

export default Post;
