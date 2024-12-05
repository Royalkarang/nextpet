"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserProfileLeft from "../../../components/UserProfileLeft";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../utils/constant";
import ProtectedRoute from "../../context/ProtectedRoute";

const UserDashboard = () => {
  const [userId, setUserId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [makeEditable, setMakeEditable] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_user_id");
      setUserId(storedUserId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const loadUser = async () => {
      await axios
        .post(
          `${BASE_URL}/api/user-get`,
          { user_id: userId },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setFormData(response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log("Latitude ::", latitude, "Longitude ::", longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      setLatitude(35.1258);
      setLongitude(17.9859);
      console.log("Not Allow location");
    }

    loadUser();
  }, [userId]);

  const handleSubmit = async () => {
    console.log("Form Submitted:", formData);
    const { name, email, phone, location, image } = formData;
    let finalLatitude = latitude === null ? 35.1258 : latitude;
    let finalLongitude = longitude === null ? 17.9859 : longitude;

    console.log(
      "Final Latitude ::",
      finalLatitude,
      "Final Longitude ::",
      finalLongitude
    );

    console.log(
      "name, email, phone,location, image",
      name,
      email,
      phone,
      location,
      image
    );
    try {
      const response = await axios.post(
        `${BASE_URL}/api/profile_update`,
        {
          user_id: userId,
          name: name,
          email: email,
          phone: phone,
          location: location,
          latitude: finalLatitude,
          longitude: finalLongitude,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error config:", error);
    }

    toast.success("Profile Updated Successfully");
    setMakeEditable(false);
  };

  const userPages = {
    page: "profile",
  };

  return (
    <ProtectedRoute>
      <div className="breedeerdasboard-profile-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-profile-inner">
              <UserProfileLeft userPages={userPages} />
              <div className="breedeerdasboard-profile-right">
                <div className="profile-pic-wrap">
                  <form>
                    {!makeEditable && (
                      <div className="edit-profile-icon">
                        <Link href="#" onClick={() => setMakeEditable(true)}>
                          <Image
                            src="/images/Nextpet-imgs/dashboard-imgs/edit-profile-icon.svg"
                            alt="Edit Profile"
                            width={50}
                            height={50}
                          />
                        </Link>
                      </div>
                    )}

                    {makeEditable ? <h1>Edit Profile</h1> : <h1>Profile</h1>}

                    <div className="profile-right-img">
                      <div
                        className="profile-right-img-prev"
                        style={{
                          backgroundImage: imagePreview
                            ? `url(${imagePreview})`
                            : `url(${formData?.image || '/images/Nextpet-imgs/contact-default.webp'})`,
                        }}
                        id="imagePreview"
                      />
                      {makeEditable && <label className="upload-icon">
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/breeder-img.svg"
                          alt="Upload Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="file"
                          disabled={!makeEditable}
                          onChange={handleImageChange}
                        />
                      </label>}
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
                          name="name"
                          defaultValue={formData?.name || ""}
                          onChange={handleChange}
                          placeholder="Your Name*"
                          disabled={!makeEditable}
                          required
                        />
                      </label>

                      {formData?.login_with === "Email" ? (
                        <label>
                          <Image
                            src="/images/Nextpet-imgs/breeder-signin-imgs/mail-icon.svg"
                            alt="Email Icon"
                            width={15}
                            height={15}
                          />
                          <input
                            type="email"
                            name="email"
                            defaultValue={formData?.email || ""}
                            onChange={handleChange}
                            placeholder="Email*"
                            disabled
                            required
                          />
                        </label>
                      ) : (
                        <label>
                          <Image
                            src="/images/Nextpet-imgs/breeder-signin-imgs/mail-icon.svg"
                            alt="Email Icon"
                            width={15}
                            height={15}
                          />
                          <input
                            type="email"
                            name="email"
                            defaultValue={formData?.email || ""}
                            onChange={handleChange}
                            placeholder="Email*"
                            disabled={!makeEditable}
                            required
                          />
                        </label>
                      )}
                      {formData?.login_with === "Phone" ? (
                        <label>
                          <Image
                            src="/images/Nextpet-imgs/profile-page-imgs/call.svg"
                            alt="Phone Icon"
                            width={15}
                            height={15}
                          />
                          <input
                            type="number"
                            name="phone"
                            onChange={handleChange}
                            defaultValue={formData?.phone || ""}
                            placeholder="Phone Number*"
                            maxLength="10"
                            minLength="10"
                            disabled
                            required
                          />
                        </label>
                      ) : (
                        <label>
                          <Image
                            src="/images/Nextpet-imgs/profile-page-imgs/call.svg"
                            alt="Phone Icon"
                            width={15}
                            height={15}
                          />
                          <input
                            type="number"
                            name="phone"
                            defaultValue={formData?.phone || ""}
                            onChange={handleChange}
                            placeholder="Phone Number*"
                            maxLength="10"
                            minLength="10"
                            disabled={!makeEditable}
                            required
                          />
                        </label>
                      )}

                      <label>
                        <Image
                          src="/images/Nextpet-imgs/profile-page-imgs/location.svg"
                          alt="Location Icon"
                          width={15}
                          height={15}
                        />
                        <input
                          type="text"
                          name="location"
                          defaultValue={formData?.location || ""}
                          onChange={handleChange}
                          placeholder="Location*"
                          disabled={!makeEditable}
                          required
                        />
                      </label>

                      {makeEditable && (
                        <div className="profile-btn-wrap">
                          <button type="button" onClick={handleSubmit}>
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboard;
