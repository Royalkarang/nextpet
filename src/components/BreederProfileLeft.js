"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { DeleteBreeder } from "../app/services/authService";
import { useAuth } from "../app/context/AuthContext";

const BreederProfileLeft = ({ data }) => {
  const { logout } = useAuth();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

  const breaderId = localStorage.getItem("breeder_user_id");

  const customStyles = {
    content: {
      top: "0%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      borderRadius: "15px",
      transition: "transform 0.5s ease-out",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  function openLogoutModal(e) {
    e.preventDefault();
    setShowLogOut(true);
  }

  function closeLogoutModal() {
    setShowLogOut(false);
  }

  const breederLogout = () => {
    localStorage.removeItem("breeder_user_id");
    toast.success("Breeder Logout!");
    logout();
  };

  function openDeleteAccountModal() {
    // e.preventDefault();
    setShowDeleteAccount(true);
  }

  function closeDeleteAccountModal() {
    setShowDeleteAccount(false);
  }

  const DeleteBreederAccount = async () => {
    try {
      const payload = {
        user_id: breaderId,
      };
      const res = await DeleteBreeder(payload);
      if (res?.data?.status_code == 200) {
        console.log("Account Deleted!");
        localStorage.removeItem("breeder_user_id");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="breedeerdasboard-profile-left">
        <ul>
          <li>
            <Link
              href="/breeder/breeder-profile/dashboard-breeder-profile"
              className={
                data.page === "dashboard-breeder-profile" ? "active" : ""
              }
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon1.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>My Profile</p>
            </Link>
          </li>
          <li>
            <Link
              href="/breeder/leads"
              className={data.page === "leads" ? "active" : ""}
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon2.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Leads</p>
            </Link>
          </li>
          <li>
            <Link
              href="/breeder/posts/no-posts"
              className={data.page === "posts" ? "active" : ""}
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon3.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Posts</p>
            </Link>
          </li>
          <li>
            <Link
              href="/breeder/favorites"
              className={data.page === "favorites" ? "active" : ""}
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon4.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Favorites</p>
            </Link>
          </li>
          <li>
            <Link
              href="/breeder/subscription"
              className={data.page === "subscription" ? "active" : ""}
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon5.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Subscription</p>
            </Link>
          </li>

          <li>
            <a href="#" onClick={openLogoutModal}>
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon6.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Logout</p>
            </a>

            <Modal
              isOpen={showLogOut}
              onRequestClose={closeLogoutModal}
              style={customStyles}
              contentLabel="Logout Modal"
              onAfterOpen={() => {
                // Apply animation when modal opens
                document.querySelector(".ReactModal__Content").style.transform =
                  "translate(-50%, 20%)";
              }}
            >
              <div className="modal-dialog modal-dialog-edit" role="document">
                <div className="modal-content">
                  <div className="modal-heading">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeLogoutModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form action="">
                      <div className="profileverify-popup-wrap">
                        <Image
                          src="/images/Nextpet-imgs/dashboard-imgs/logout-icon-popup.svg"
                          alt=""
                          width={85}
                          height={85}
                        />
                        <h1>Logout</h1>
                        <p>Are you sure you want to logout.</p>
                        <div className="delete-account-btns">
                          <button
                            type="button"
                            value="Submit"
                            onClick={breederLogout}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            value="Submit"
                            onClick={closeLogoutModal}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal>
          </li>

          <li>
            <a href="#" onClick={openDeleteAccountModal}>
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon6.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Delete Account</p>
            </a>

            <Modal
              isOpen={showDeleteAccount}
              onRequestClose={closeDeleteAccountModal}
              style={customStyles}
              contentLabel="Logout Modal"
              onAfterOpen={() => {
                // Apply animation when modal opens
                document.querySelector(".ReactModal__Content").style.transform =
                  "translate(-50%, 20%)";
              }}
            >
              <div className="modal-dialog modal-dialog-edit" role="document">
                <div className="modal-content">
                  <div className="modal-heading">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeDeleteAccountModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form action="">
                      <div className="profileverify-popup-wrap">
                        <Image
                          src="/images/Nextpet-imgs/dashboard-imgs/delete-icon-popup.svg"
                          alt=""
                          width={85}
                          height={85}
                        />
                        <h1>Delete</h1>
                        <p>Are you sure you want to delete your account.</p>
                        <div className="delete-account-btns">
                          <button
                            type="button"
                            value="Submit"
                            onClick={DeleteBreederAccount}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            value="Submit"
                            onClick={closeDeleteAccountModal}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
    </>
  );
};
export default BreederProfileLeft;
