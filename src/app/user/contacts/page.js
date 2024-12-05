"use client";
import UserProfileLeft from "../../../components/UserProfileLeft";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../utils/constant";
import axios from "axios";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { MdNavigateNext } from "react-icons/md";
import Pagination from "../../../components/Pagination";
import ProtectedRoute from "../../context/ProtectedRoute";

const Contacts = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [contactsList, setContactsList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [checkedValues, setCheckedValues] = useState({
    All: true,
    Pending: false,
    Shortlist: false,
    Archive: false,
    Adopted: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_user_id");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    getContactsList();
  }, [userId]);

  const getContactsList = async () => {
    let user = {
      user_id: userId,
    };
    let apiURL = `${BASE_URL}/api/contacted_list`;
    try {
      const response = await axios.post(apiURL, user);
      if (response.data.status_code === 200) {
        setContactsList(response.data.data);
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const fillterContacted = async (filters) => {
    let user = {
      user_id: userId,
      search: [filters],
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contacted_list_filter`,
        user
      );
      if (response.data.status_code === 200) {
        setContactsList(response.data.data);
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
      getContactsList();
    } else if (checked) {
      fillterContacted(name);
    } else {
      const isAnyFilterChecked =
        Object.values(updatedCheckedValues).includes(true);
      if (!isAnyFilterChecked) {
        fillterContacted();
      }
    }
  };

  // Logic for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = contactsList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleModel() {
    setDropdownVisible(!isDropdownVisible);
  }

  const userPages = {
    page: "contacts",
  };

  return (
    <ProtectedRoute>
      <div className="breedeerdasboard-profile-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-profile-inner">
              <UserProfileLeft userPages={userPages} />

              <div className="leads-right">
                <form action="">
                  <div className="leads-inner-wrap">
                    <div className="filter-sec">
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

                    <div className="leads-card-wrap">
                      {currentPosts?.map((item, index) => (
                        <div
                          className={`leads-box" ${
                            item?.status_leads == "Adopted"
                              ? "leads-box disable"
                              : "leads-box"
                          }`}
                          key={index}
                        >
                          <div className="adopted-icon">
                            <img
                              src={
                                item?.status_leads == "Adopted"
                                  ? "/images/Nextpet-imgs/dashboard-imgs/adopted.svg"
                                  : ""
                              }
                              alt=""
                            />
                          </div>

                          <div className="image-circle">
                            <Image
                              src={item?.pet_image?.[0] || '/images/Nextpet-imgs/Image_not_available.webp'}
                              alt=""
                              loading="lazy"
                              width={131}
                              height={129}
                            />
                          </div>

                          <div className="leads-content-wrap">
                            <div className="headinglead-wrap">
                              <div className="d-flex align-items-center gap-5">
                                <h3>{item?.pet_name}</h3>
                                <div className="pending-count">
                                  <p>{item?.status_leads}</p>
                                </div>
                              </div>
                            </div>
                            <p>{item?.pet_description}</p>
                            <div className="d-flex align-items-center gap-2">
                              <h4>{item?.breeder_name}</h4>
                              <div className="rating-count">
                                <span>
                                {(Math.round((parseFloat(item?.breeder_star_rating || "0")) * 10) / 10).toFixed(1) || 0} &nbsp;
                                  <FaStar
                                    style={{
                                      color: "white",
                                      marginBottom: "4px",
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                            <div className="date-wrap">
                              <span>
                                <GoClock
                                  style={{
                                    marginRight: "4px",
                                    marginBottom: "5px",
                                  }}
                                />
                                {item.updated_at
                                  ? new Date(item.updated_at)
                                      .toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace(",", " |")
                                  : "Date not available"}
                                <a
                                  href={`/user/trending-pets/${item.breeder_id}/${item.post_id}`}
                                >
                                  <MdNavigateNext
                                    size={25}
                                    style={{ marginLeft: "30px" }}
                                  />
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="influ-pagi">
                    <Pagination
                      postPerPage={postsPerPage}
                      totalPosts={contactsList.length}
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
    </ProtectedRoute>
  );
};

export default Contacts;
