"use client"
import UserProfileLeft from "../../../components/UserProfileLeft";
import Image from "next/image";
import { useState } from "react";

const UserDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add form submission logic here
  //   console.log("Form submitted:", formData);
  // };

  return (
    <div className="breedeerdasboard-profile-wrap">
      <div className="container">
        <div className="col-lg-12">
          <div className="breedeerdasboard-profile-inner">
            <UserProfileLeft />
            <div className="breedeerdasboard-profile-right">
              <div className="profile-pic-wrap">
                {/* <form onSubmit={handleSubmit}> */}
                  <h1>Profile</h1>
                  <div className="profile-right-img">
                    <div
                      className="profile-right-img-prev"
                      style={{
                        backgroundImage: `url('/images/Nextpet-imgs/all-icons/user.svg')`,
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
                      <input type="file" accept="image/*" />
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
                        name="name"
                        placeholder="Your Name*"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                        type="tel"
                        name="phone"
                        placeholder="Phone Number*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
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
                        name="location"
                        placeholder="Location*"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <div className="profile-btn-wrap">
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
