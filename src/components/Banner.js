import React from "react";
import BASE_URL from "../app/utils/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Banner({ homePageData }) {
  const router = useRouter()

  function handleSubmit(e){
    e.preventDefault();
    if(!e.target.SearchBtn.value){
      alert("Please enter a search term");
      return;
    }
    console.log(e.target.SearchBtn.value)
    router.push(`/pets?searchItem=${encodeURIComponent(e.target.SearchBtn.value)}`)
  }
  return (
    <>
      <div className="banner-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="banner-inner">
                <h1>{homePageData?.section_one_heading_one}</h1>
                <p>{homePageData?.section_one_heading_two}</p>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="search-input">
                    <input
                      id="search-input"
                      type="text" name="SearchBtn"
                      placeholder="Search by Animal Type, Breed or Location"
                    />
                    <button type="submit">
                      <Image
                        src="/images/Nextpet-imgs/all-icons/arrow.png"
                        alt="Search"
                        width={20}
                        height={20}
                      />
                    </button>
                  </label>
                </form>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="dog-right-banner">
                <Image
                  // src={"/images/Nextpet-imgs/banner-imgs/dog.png"}
                  src={`${BASE_URL}${"/"}${
                    homePageData?.section_one_image_banner ||
                    "/images/Nextpet-imgs/banner-imgs/dog.png"
                  }`}
                  alt="Dog"
                  width={500}
                  height={400} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
