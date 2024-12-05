"use client";
import { React, useState, useEffect } from "react";
import Image from "next/image";
// import Carousel from '../../../components/Carousel'
import Carousel from "../../../components/Carousel";

const ContactPetDetails = () => {
  const [previousPostImage, setPreviousPostImage] = useState([]);

  useEffect(() => {
    const imgagesArr = [
      "/images/Nextpet-imgs/all-icons/user.svg", // Replace with your image paths
      "/images/Nextpet-imgs/dashboard-imgs/brreder-info-img.png",
      "/images/Nextpet-imgs/dashboard-imgs/dog-slide.png",
      "/images/Nextpet-imgs/dashboard-imgs/brreder-info-img.png",
    ];
    setPreviousPostImage(imgagesArr);
  }, []);

  return (
    <div className="breedeerdasboard-createpost-wrap">
      <div className="container">
        <div className="col-lg-12">
          <div className="breedeerdasboard-createpost-inner">
            <div className="breedeerdasboard-createpost-left">
              {/* <div className="edit-uploadpost-wrap">
                            
                                <div id="uploaded-post-imgs" className="owl-carousel">
                                
                                <div className="uploded-post-wrap">
                                    <Image src="/images/Nextpet-imgs/dashboard-imgs/dog-slide.png" alt="" width={37} height={31}/>
                                </div>
                                
                                
                                <div className="uploded-post-wrap">
                                    <Image src="/images/Nextpet-imgs/dashboard-imgs/dog-slide.png" alt="" width={37} height={31}/>
                                </div>
                                
                                
                                <div className="uploded-post-wrap">
                                    <Image src="/images/Nextpet-imgs/dashboard-imgs/dog-slide.png" alt="" width={37} height={31}/>
                                </div>
                                
                                
                                <div className="uploded-post-wrap">
                                    <Image src="/images/Nextpet-imgs/dashboard-imgs/dog-slide.png" alt="" width={37} height={31}/>
                                </div>
                                
                                </div>
                            </div> */}
              <Carousel previousPostImage={previousPostImage} />
            </div>

            <div className="breedeerdasboard-createpost-right">
              <div className="postcreate-heading">
                <h3>Tommy</h3>
                <div className="edit-heartpost">
                  <div className="inner-heartt">
                    <a href="#">
                      <Image
                        src="/images/Nextpet-imgs/dashboard-imgs/yellow-mail-letter.svg"
                        alt=""
                        width={37}
                        height={31}
                      />
                    </a>
                  </div>
                  <div className="heart-icon-wrap">
                    <Image
                      src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                      alt=""
                      class="active"
                      width={39}
                      height={39}
                    />
                    <Image
                      src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                      alt=""
                      width={37}
                      height={31}
                    />
                  </div>
                  <div className="inner-heartt">
                    <a href="#" style={{ padding: "7px 4px" }}>
                      <Image
                        src="/images/Nextpet-imgs/dashboard-imgs/share.svg"
                        alt=""
                        width={37}
                        height={31}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <form>
                <label>
                  <p>
                    There are of Lorem Ipsum available, but the majority have su
                    alteration in some form, by injected oir which don&apos;t
                    look even slightly believable. There are of Lorem Ipsum
                    available, but the majority have su alteration in some form,
                    by injected oir which don&apos;t look even slightly
                    believable.There are of Lorem Ipsum available, but the
                    majority have su alteration in some form, by injected oir
                    which don&apos;t look even slightly believable.
                  </p>
                </label>

                <h4>About Tommy</h4>
                <div className="list-post-form">
                  <div className="formdata-wrap">
                    <p>Type</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Breed</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Price</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>General Size</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Anticipated Weight</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Gender</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Birthdate</p>
                    <input type="text" id="datepicker" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Date Available</p>
                    <input type="text" id="datepicker2" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Health guarantee</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Certifications</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Delivery availability</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Boarding availability</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="formdata-wrap">
                    <p>Flying availability</p>
                    <input type="text" placeholder="" />
                  </div>

                  <div className="posts-btn-wrap">
                    <button
                      type="button"
                      value="Submit"
                      data-bs-target="#breeder-guide2"
                      data-bs-toggle="modal"
                    >
                      Contact Breeder
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPetDetails;
