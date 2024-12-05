"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { DeleteUser } from "../app/services/user/authService";
import { useAuth } from "../app/context/AuthContext";
import { toast } from "react-toastify";

const UserProfileLeft = ({ userPages }) => {
  const {  logout } = useAuth();
  const [userId, setUserId] = useState(null);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_user_id");
      setUserId(storedUserId);
    }
  }, []);

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
    e.preventDefault(); // Prevents default link behavior
    setShowLogOut(true); // Sets modal visibility state to true
  }

  function closeLogoutModal() {
    setShowLogOut(false); // Sets modal visibility state to false
  }

  function openDeleteAccountModal(e) {
    e.preventDefault();
    setShowDeleteAccount(true);
  }

  function closeDeleteAccountModal(e) {
    e.preventDefault();
    setShowDeleteAccount(false);
  }

  const DeleteUserAccount = async () => {
    try {
      const payload = {
        user_id: userId,
      };
      const res = await DeleteUser(payload);
      if (res?.data?.status_code == 200) {
        console.log("Account Deleted!");
        localStorage.removeItem("user_user_id");
        localStorage.removeItem("authToken");
        toast.success('User Deleted Successfully');
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
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
              href="/user/dashboard-user-profile"
              className={userPages.page === "profile" ? "active" : ""}
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
              href="/user/alert"
              className={userPages.page === "alert" ? "active" : ""}
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon2.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Alerts</p>
            </Link>
          </li>

          <li>
            <Link
              href="/user/favourites"
              className={userPages.page === "favorites" ? "active" : ""}
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
              href="/user/contacts"
              className={userPages.page === "contacts" ? "active" : ""}
            >
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon3.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Contacts</p>
            </Link>
          </li>

          <li>
            <a href="#" onClick={openLogoutModal}> {/* Open modal when clicked */}
              <Image
                src="/images/Nextpet-imgs/dashboard-imgs/icon6.svg"
                alt=""
                width={15}
                height={15}
              />
              <p>Logout</p>
            </a>

            <Modal
              isOpen={showLogOut} // Modal visibility based on state
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
                      onClick={closeLogoutModal} // Close the modal
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
                        <p>Are you sure you want to logout?</p>
                        <div className="delete-account-btns">
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              window.location.href = "/"; // Redirect after logout
                            }}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={closeLogoutModal} // Close modal without logging out
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
              contentLabel="Delete Account Modal"
              onAfterOpen={() => {
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
                        <p>Are you sure you want to delete your account?</p>
                        <div className="delete-account-btns">
                          <button
                            type="button"
                            onClick={DeleteUserAccount}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
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

export default UserProfileLeft;
