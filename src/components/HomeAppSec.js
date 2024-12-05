"use client";
import React from "react";
import BASE_URL from "../app/utils/constant";
import Image from "next/image";

function HomeAppSec({ homePageData }) {
  return (
    <>
      <div className="nextpet-app-bg">
        <div className="container-fluid">
          <div className="nextpet-app-wrap">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="nextpet-app-wrap-in">
                  <div className="nextpet-app-wrap-in-image">
                    <Image
                      src={
                        homePageData?.section_three_app_image
                          ? `${BASE_URL}${"/"}${
                              homePageData?.section_three_app_image
                            }`
                          : "/images/Nextpet-imgs/download-app-imgs/app-img.svg"
                      }
                      alt=""
                      width={446}
                      height={446}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="nextpet-app-wrap-in">
                  <span>
                    {homePageData?.section_three_app_heading_one
                      ? homePageData?.section_three_app_heading_one
                      : "Get It Now"}
                  </span>
                  <h2>{homePageData?.section_three_app_heading_two}</h2>
                  <p>{homePageData?.section_three_app_text}</p>
                  <div className="download-app-btns">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <Image
                        src="/images/Nextpet-imgs/download-app-imgs/appstore.png"
                        alt=""
                        width={200}
                        height={20}
                      />
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <Image
                        src="/images/Nextpet-imgs/download-app-imgs/googleplay.png"
                        alt=""
                        width={200}
                        height={20}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAppSec;
