"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { DeleteUser } from "../app/services/user/authService";
import { useAuth } from "../app/context/AuthContext";
import { toast } from "react-toastify";

const UserProfileLeft = ({ userPages = {} }) => {
  const { logout } = useAuth();
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
      transform: "translate(-50%, 0%)",
      borderRadius: "15px",
      transition: "transform 0.5s ease-out",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const DeleteUserAccount = async () => {
    try {
      const payload = { user_id: userId };
      const res = await DeleteUser(payload);
      if (res?.data?.status_code === 200) {
        localStorage.clear();
        toast.success("User Deleted Successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div className="breedeerdasboard-profile-left">
      <ul>
        {[
          { href: "/user/dashboard-user-profile", text: "My Profile", icon: "icon1", page: "profile" },
          { href: "/user/alert", text: "Alerts", icon: "icon2", page: "alert" },
          { href: "/user/favourites", text: "Favorites", icon: "icon4", page: "favorites" },
          { href: "/user/contacts", text: "Contacts", icon: "icon3", page: "contacts" },
        ].map(({ href, text, icon, page }) => (
          <li key={page}>
            <Link href={href} className={userPages?.page === page ? "active" : ""}>
              <Image src={`/images/Nextpet-imgs/dashboard-imgs/${icon}.svg`} alt={text} width={15} height={15} />
              <p>{text}</p>
            </Link>
          </li>
        ))}
        <li>
          <a href="#" onClick={() => setShowLogOut(true)}>
            <Image src="/images/Nextpet-imgs/dashboard-imgs/icon6.svg" alt="Logout" width={15} height={15} />
            <p>Logout</p>
          </a>
          <Modal
            isOpen={showLogOut}
            onRequestClose={() => setShowLogOut(false)}
            style={customStyles}
            contentLabel="Logout Modal"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <h1>Logout</h1>
                  <p>Are you sure you want to logout?</p>
                  <button
                    onClick={() => {
                      logout();
                      window.location.href = "/";
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowLogOut(false)}>No</button>
                </div>
              </div>
            </div>
          </Modal>
        </li>
        <li>
          <a href="#" onClick={() => setShowDeleteAccount(true)}>
            <Image src="/images/Nextpet-imgs/dashboard-imgs/icon6.svg" alt="Delete Account" width={15} height={15} />
            <p>Delete Account</p>
          </a>
          <Modal
            isOpen={showDeleteAccount}
            onRequestClose={() => setShowDeleteAccount(false)}
            style={customStyles}
            contentLabel="Delete Account Modal"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <h1>Delete</h1>
                  <p>Are you sure you want to delete your account?</p>
                  <button onClick={DeleteUserAccount}>Yes</button>
                  <button onClick={() => setShowDeleteAccount(false)}>No</button>
                </div>
              </div>
            </div>
          </Modal>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileLeft;
