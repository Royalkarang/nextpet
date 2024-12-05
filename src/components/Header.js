"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import routes from "../config/routes";
import "toastr/build/toastr.min.css";
import BASE_URL from "../app/utils/constant";
import axios from "axios";
import { GoClock } from "react-icons/go";

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [userId, setUserId] = useState(null);
  const [breederId, setBreederId] = useState(null);
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [mobileToggleBtn, setMobileToggleBtn] = useState(false);

  // console.log("notification44", userId);

  useEffect(() => {
    const breederId = JSON.parse(localStorage.getItem("breeder_user_id"));
    const userId = JSON.parse(localStorage.getItem("user_user_id"));
    if (breederId || userId) {
      setUserId(userId);
      setBreederId(breederId);
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (userId || breederId) {
      getNotification();
    }
  }, [userId || breederId]);

  const getNotification = async () => {
    let userLogin = breederId
      ? { breeder_id: breederId || "" }
      : { user_id: userId || "" };

    let apiURL = breederId
      ? `${BASE_URL}/api/breeder_notification`
      : `${BASE_URL}/api/user_notification`;
    try {
      const response = await axios.post(apiURL, userLogin);
      if (response.data.code === 200) {
        setNotificationDetails(response.data.data);
        // console.log("notification445", response.data.data);
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className="topbanner-wrap">
        <div className="container">
          <div className="inner-sectiontop">
            <h2>Follow :</h2>
            <div className="social-icons">
              <Link href="#">
                <Image
                  src="/images/Nextpet-imgs/all-icons/Insta.svg"
                  alt="Instagram"
                  width={21}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/images/Nextpet-imgs/all-icons/Fb.svg"
                  alt="Facebook"
                  width={21}
                  height={20}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/images/Nextpet-imgs/all-icons/twitter.svg"
                  alt="Twitter"
                  width={21}
                  height={20}
                />
              </Link>
            </div>
            <Notification notificationDetails={notificationDetails} />
          </div>
        </div>
      </div>

      <div className="nav-wrap">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link className="navbar-brand" href="/">
                <Image
                  src="/images/Nextpet-imgs/LOGO.png"
                  alt="Logo"
                  width={100}
                  height={50}
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className={"navbar-toggler-icon"} onClick={() => setMobileToggleBtn(!mobileToggleBtn)}></span>
              </button>
              <div className={mobileToggleBtn ? "navbar-collapse-close" : "collapse navbar-collapse"} id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" href="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/about-us">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/pets">
                      Pets
                    </Link>
                  </li>
                  <li className="nav-item" style={{paddingRight:'10px'}}>
                    <Link className="nav-link" href="/breeders">
                      Breeders
                    </Link>
                  </li>
                  {!userId ? (
                    <li className="nav-item">
                      <Link
                        className="nav-link user-signin"
                        href="/user/sign-in"
                        onClick={() => {
                          // localStorage.removeItem("breeder_user_id");
                        }}
                      >
                        User Sign In
                      </Link>
                    </li>
                  ) : null}

                    {userId || breederId ? (
                  <li className="nav-item">
                      <div className="influ-dropdown">
                        <button
                          className="influ-btn "
                          onClick={toggleDropdown}
                          type="button"
                        >
                          <Image
                            src="/images/Nextpet-imgs/all-icons/user.svg"
                            alt=""
                            width={15}
                            height={15}
                          />
                          {userId ? "User Profile" : "Anna Brown"}
                          <i className="far fa-chevron-down"></i>
                        </button>

                        <DropdownUserMenu
                          isOpen={isOpen}
                          closeDropdown={closeDropdown}
                          userId={userId}
                          isDropdownVisible={isDropdownVisible}
                        />
                      </div>
                     
                  </li>) : (
                      ""
                    )}

                  {!breederId ? (
                    <li className="nav-item">
                      <Link
                        href={routes.breeder_sign_in}
                        className="nav-link breeder-signin"
                        onClick={() => {
                          // logout();
                        }}
                      >
                        Breeder Sign In
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

const Notification = ({ notificationDetails }) => (
  <div className="notification-in">
    <button type="button">
      <img
        src="/images/Nextpet-imgs/all-icons/notification.svg"
        alt="Notification"
      />
    </button>
    <div className="notification-list">
      <div className="notification-heading">
        <h1>Notifications</h1>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="notification-list-inner">
        {notificationDetails ? (
          notificationDetails.map((item, index) => (
            <NotificationItem key={index} item={item} />
          ))
        ) : (
          <p>No notifications available</p>
        )}
      </div>
    </div>
  </div>
);

const NotificationItem = ({ item }) => (
  <div className="notification-list-item">
    <div className="notification-list-item-image">
      <Image
        width={50}
        height={50}
        src={
          item?.user_image
            ? item?.user_image
            : "/images/Nextpet-imgs/notification-imgs/user1.png"
        }
        alt=""
      />
    </div>
    <div className="notification-list-item-text">
      <p>
        {item?.user_name ? item?.user_name : "Richard Brown"} (
        {item.pet_name + " " + item.pet_breed + " " + item.pet_type ||
          "Notification Not Available"}{" "}
        )
      </p>
      <span>
        <i className="far fa-clock"></i>{" "}
        <p>
          <GoClock style={{ margin: "3px", marginBottom: "6px" }} />
          {item.date_time
            ? new Date(item.date_time)
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
        </p>
      </span>
    </div>
  </div>
);

const DropdownUserMenu = ({
  // isOpen,
  closeDropdown,
  userId,
  isDropdownVisible,
}) => {
  return (
    <>
      <div
        className="influ-drop-list-header"
        style={{
          display: isDropdownVisible ? "block" : "none",
        }}
      >
        {userId ? (
          <div className="">
            <div className="influ-drop-list-item">
              <Link href="/user/favourites" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/send.png"
                  alt="Posts"
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Favorites</span>
              </Link>
            </div>

            <div className="influ-drop-list-item">
              <Link href="/user/contacts" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/copy.png"
                  alt="Subscription"
                  width={15}
                  height={15}
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Contacts</span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/user/alert" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/profile.png"
                  width={15}
                  height={15}
                  alt="Profile"
                />
                &nbsp;
                <span className="influ-drop-list-header-text">Alerts</span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/user/dashboard-user-profile" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/profile.png"
                  width={15}
                  height={15}
                  alt="Profile"
                />
                &nbsp;
                <span className="influ-drop-list-header-text">My Profile</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="influ-drop-list-item">
              <Link href="/breeder/leads" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/sms.png"
                  alt=""
                  width={15}
                  height={15}
                />
                &nbsp;{" "}
                <span className="influ-drop-list-header-text">Leads</span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/breeder/posts/no-posts" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/send.png"
                  alt="Posts"
                  width={15}
                  height={15}
                />
                &nbsp;{" "}
                <span className="influ-drop-list-header-text">Posts</span>
              </Link>
            </div>

            <div className="influ-drop-list-item">
              <Link href="/breeder/subscription" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/copy.png"
                  alt="Subscription"
                  width={15}
                  height={15}
                />
                &nbsp;{" "}
                <span className="influ-drop-list-header-text">
                  Subscription
                </span>
              </Link>
            </div>
            <div className="influ-drop-list-item">
              <Link href="/breeder/breeder-profile" onClick={closeDropdown}>
                <Image
                  src="/images/Nextpet-imgs/all-icons/profile.png"
                  width={15}
                  height={15}
                  alt="Profile"
                />
                &nbsp;{" "}
                <span className="influ-drop-list-header-text">My Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
