import React from "react";
import BASE_URL from "../app/utils/constant";
const Homeabout = ({ homePageData }) => {
  return (
    <>
      {/* NEXTPET ABOUTUS */}
      <div className="about-bg">
        <div className="container-fluid">
          <div className="aboutus-wrap">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="aboutus-wrap-in">
                  <div className="aboutus-wrap-in-image">
                    <img
                      src={`${BASE_URL}${"/"}${
                        homePageData?.section_two_about_image ||
                        "/images/Nextpet-imgs/Aboutus-imgs/about-img.png"
                      }`}
                      alt="About Us"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="aboutus-wrap-in">
                  <span>About Us</span>
                  <h2>{homePageData?.section_two_about_heading_one}</h2>
                  <p>{homePageData?.section_two_about_heading_two}</p>
                  <p>{homePageData?.section_two_about_text}</p>
                  <a href="/about-us">Know More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NEXTPET ABOUTUS */}
    </>
  );
};

export default Homeabout;
