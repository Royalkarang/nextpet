"use client";
import React from "react";

function page() {
  return (
    <>
      <div className="about-top-wrap text-center">
        <h1>About Us</h1>
      </div>
      <main>
        <div className="about-bg">
          <div className="container-fluid">
            <div className="aboutus-wrap">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <div className="aboutus-wrap-in">
                    <div className="aboutus-wrap-in-image">
                      <img
                        src="/images/Nextpet-imgs/Aboutus-imgs/about2-img.svg"
                        alt="About Us Image"
                        loading="lazy"
                      />
                    </div>
                    <div className="bone-img-wrap">
                      <img
                        src="../images/Nextpet-imgs/Aboutus-imgs/bone-img.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="aboutus-wrap-in">
                    <span>About Us</span>
                    <h2>
                      Breeders are reviewed and approved before posting pets.
                    </h2>
                    <p>
                      NextPet is committed to eliminating unhealthy breeding
                      environments. Before posting, each breeder submits an
                      application and is interviewed by the NextPet team to
                      determine the treatment of their pets. A videoconference
                      or a personal visit by the NextPet team is required prior
                      to approval.
                    </p>
                    <p>
                      Once approved, high quality breeders are connected to
                      loving homes that are looking for their next best friend.
                    </p>
                    {/* <!-- <a href="#">Know More</a> --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-vision-wrap">
          <div className="container">
            <div className="mission-values-inner">
              <div className="box">
                <img
                  src="images/Nextpet-imgs/Aboutus-imgs/1.svg"
                  alt=""
                  loading="lazy"
                />
                <h2>Mission</h2>
                <p>
                  NextPet is committed to eliminating unhealthy breeding
                  environments. NextPet team to determine the treatment of their
                  pets.
                </p>
              </div>
              <div className="box">
                <img
                  src="images/Nextpet-imgs/Aboutus-imgs/2.svg"
                  alt=""
                  loading="lazy"
                />
                <h2>Vision</h2>
                <p></p>
                <p>
                  NextPet is committed to eliminating unhealthy breeding
                  environments. NextPet team to determine the treatment of their
                  pets.
                </p>
                <p></p>
              </div>
              <div className="box">
                <img
                  src="images/Nextpet-imgs/Aboutus-imgs/3.svg"
                  alt=""
                  loading="lazy"
                />
                <h2>Values</h2>
                <p></p>
                <p>
                  NextPet is committed to eliminating unhealthy breeding
                  environments. NextPet team to determine the treatment of their
                  pets.
                </p>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <div className="howit-works-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-6">
                <div className="howit-wrap-in">
                  <span>Lorem Ipsum</span>
                  <h2>How It Work</h2>
                  <p>
                    PetQuest connects loving homes with high quality
                    breeders.All breeders pass an in depth PetQuest approval
                    process.Users can save, favorite and archive a pet, and when
                    ready, connect to a breeder when they find a pet they are
                    interested in
                  </p>
                  <ul>
                    <li>
                      <img
                        src="images/Nextpet-imgs/Aboutus-imgs/checklist.png"
                        alt=""
                      />
                      PetQuest connects loving homes with high quality breeders.
                    </li>
                    <li>
                      <img
                        src="images/Nextpet-imgs/Aboutus-imgs/checklist.png"
                        alt=""
                      />
                      All breeders pass an in depth PetQuest approval process.
                    </li>
                    <li>
                      <img
                        src="images/Nextpet-imgs/Aboutus-imgs/checklist.png"
                        alt=""
                      />
                      Users can save, favorite and archive a pet, and when
                      ready, connect to a breeder when they find a pet they are
                      interested in.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="howit-works-imgwrap">
                  <img
                    src="images/Nextpet-imgs/Aboutus-imgs/how-it-img.svg"
                    alt=""
                    className="w-100"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
