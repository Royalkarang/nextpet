"use client";
import React, { useState, useEffect } from "react";
import BreederProfileLeft from "../../../../../components/BreederProfileLeft";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import BASE_URL from "../../../../utils/constant";
import BreederProtectedRoute from "@/src/app/context/BreederProtectedRoute";

const BreederDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch user details from API
  const fetchUserDetails = async () => {
    try {
      const breederUserId = localStorage.getItem("breeder_user_id");
      // console.log("breederUserId : ", breederUserId);
      const response = await axios.post(
        `${BASE_URL}/api/get-user`,
        { user_id: breederUserId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData(response.data.data);

      setLoading(false);
    } catch (err) {
      console.log("Show Error");
      setError("Failed to load user details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Network Error...</p>;
  }

  const breederData = {
    page: "dashboard-breeder-profile",
  };

  return (
    <>
    <BreederProtectedRoute>
      <div className="breedeerdasboard-profile-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-profile-inner">
              <BreederProfileLeft data={breederData} />
              <div className="breedeerdasboard-profile-right">
                <div className="profile-pic-wrap">
                  <form>
                    <div className="edit-profile-icon">
                      <Link href="/breeder/breeder-profile">
                        <Image
                          src="/images/Nextpet-imgs/dashboard-imgs/edit-profile-icon.svg"
                          alt="Edit Profile"
                          width={50}
                          height={50}
                        />
                      </Link>
                    </div>
                    <h1>Profile</h1>
                    <div className="profile-right-img">
                      <div
                        className="profile-right-img-prev"
                        style={{
                          backgroundImage: formData?.image
                            ? `url(${formData?.image})`
                            : "url('/images/Nextpet-imgs/all-icons/user.svg')",
                        }}
                        id="imagePreview"
                      />
                      <label className="upload-icon">
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/breeder-img.svg"
                          alt="Upload Icon"
                          width={15}
                          height={15}
                        />
                        <input type="file" />
                      </label>
                    </div>
                    <div className="profile-form-wrap">
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/breeder-signin-imgs/user.svg"
                          alt="Input Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.name}
                          placeholder="Your Name*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/breeder-signin-imgs/user.svg"
                          alt="Input Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.business_name}
                          placeholder="Business Name (optional)"
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/breeder-signin-imgs/mail-icon.svg"
                          alt="Email Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="email"
                          value={formData?.email}
                          placeholder="Email*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/call.svg"
                          alt="Phone Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="number"
                          value={formData?.phone}
                          placeholder="Phone Number*"
                          required=""
                          maxLength="10"
                          minLength="10"
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/location.svg"
                          alt="Website Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.website}
                          placeholder="Website*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/location.svg"
                          alt="Location Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          value={formData?.location}
                          placeholder="Location*"
                          required=""
                          readOnly
                        />
                      </label>
                      <label>
                        <textarea placeholder="Business Description*" readOnly>
                          {formData?.bio}
                        </textarea>
                      </label>

                      <div className="gallery-imgs-wp">
                        <div className="gallery-heading">
                          <h3>Gallery</h3>
                          <div className="tooltip">
                            <Image
                              src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
                              alt="Info Icon"
                              width={15}
                              height={15}
                            />
                            <span className="tooltiptext">
                              A simple gallery of nine photos of the breeder’s
                              choice.
                            </span>
                          </div>
                        </div>
                        <div className="gallery-uploadedbox-wrap">
                          {formData?.breeder_image.map((image, index) => (
                            <div className="gallery-uploadedimg-box" key={index}>
                              <img src={image} alt={`Image ${index}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <AvailablePlansSection />
                      {/* Coaching Section */}
                      <CoachingSection />
                      <div className="profile-btn-wrap">
                        <button
                          type="button"
                          data-bs-target="#contact-coach"
                          data-bs-toggle="modal"
                        >
                          Contact a Coach
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BreederProtectedRoute>
    </>
  );
};

const AvailablePlansSection = () => (
  <div className="available-plans-wp">
    <div className="available-heading">
      <h3>Available Plans</h3>
      <div className="tooltip">
        <Image
          src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
          alt="Info Icon"
          width={15}
          height={15}
        />
        <span className="tooltiptext">
          A simple gallery of nine photos of the breeder’s choice.
        </span>
      </div>
    </div>
    <div className="available-plansbox-wrap">
      {[
        {
          name: "Free",
          price: "$0",
          description: "First 6 posts are free",
          buttonText: "Active",
        },
        {
          name: "Silver",
          price: "$20",
          description: "First 6 posts are free",
          buttonText: "Subscribe",
        },
        {
          name: "Gold",
          price: "$150",
          description: "First 6 posts are free",
          buttonText: "Subscribe",
        },
        {
          name: "Platinum",
          price: "$480",
          description: "First 6 posts are free",
          buttonText: "Subscribe",
        },
      ].map((plan, index) => (
        <div className="available-plans-box" key={index}>
          <div className="price-sec-wrap">
            <span>{plan.name}</span>
            <span>{plan.price}</span>
          </div>
          <p>{plan.description}</p>
          <div className="available-plans-btns">
            <Link
              href={{
                pathname: `/breeder/subscription/payment`,
                query: {
                  // user_id: lead?.user_id,
                  // sub_id: lead?.post_id,
                  price: plan?.price,
                  sub_plan: plan?.name,
                  // name:
                },
              }}
              // href={`/breeder/subscription/payment/${plan.name}/${plan.price} `}
            >
              <button
                type="button"
                className={plan.name === "Free" ? "active" : ""}
                onClick={() => {
                  // Add logic to handle subscription
                  console.log(`Subscribed777 ${plan.name} plan`);
                }}
              >
                {plan.buttonText}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    <div className="note-wrap">
      <p>
        <span>Note:&nbsp;</span>Post Validity 1 month, per post payment $20
      </p>
    </div>
  </div>
);

const CoachingSection = () => (
  <div className="coaching-wp">
    <div className="coaching-heading">
      <h3>Coaching</h3>
    </div>
    <p>
      NextPet provides one on one coaching from experienced breeders. Click the
      button below to connect for more information.
    </p>
  </div>
);

export default BreederDashboard;
