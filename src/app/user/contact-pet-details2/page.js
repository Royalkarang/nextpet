//Trending Pets Trending Pets

"use client";
import { React, useState, useEffect } from "react";
import Carousel from "../../../components/Carousel";

const ContactPetDetails2 = () => {
  const [viewMore, setViewMore] = useState(false);
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
    <>
      <div className="breedeerdasboard-createpost-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="breedeerdasboard-createpost-inner">
              <div className="breedeerdasboard-createpost-left">
                <div
                  className="show-big-image"
                  data-bs-target="#contact-coach"
                  data-bs-toggle="modal"
                >
                  <div className="">
                    <Carousel previousPostImage={previousPostImage} />
                  </div>
                </div>
              </div>
              <div className="breedeerdasboard-createpost-right">
                <div className="postcreate-heading">
                  <h3>Anna B....</h3>
                  <div className="edit-heartpost">
                    <div className="inner-heartt">
                      <a href="#">
                        <img
                          src="/images/Nextpet-imgs/newyear-cats-imgs/mail.svg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="heart-icon-wrap">
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/heart-border2.svg"
                        alt=""
                        className="active"
                      />
                      <img
                        src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                        alt=""
                      />
                    </div>
                    <div className="inner-heartt">
                      <a href="#" style={{ padding: "7px 4px" }}>
                        <img
                          src="/images/Nextpet-imgs/dashboard-imgs/share.svg"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <form>
                  <label>
                    <p>
                      {`There are of Lorem Ipsum available, but the majority have
                      su alteration in some form, by injected oir which don't
                      look even slightly believable. There are of Lorem Ipsum
                      available, but the majority have su alteration in some
                      form, by injected oir which don't look even slightly
                      believable.There are of Lorem Ipsum available, but the
                      majority have su alteration in some form, by injected oir
                      which don't look even slightly believable.`}
                    </p>
                  </label>
                  {/* {console.log("viewMore",viewMore)} */}
                  <div className="vewmore-show">
                    <a
                      href="#"
                      onClick={() => setViewMore(!viewMore)}
                      className="viewmore"
                    >
                      View More&nbsp;<i className="fas fa-angle-down"></i>
                    </a>
                  </div>
                  {viewMore && (
                    <div>
                      <h4>Attributes</h4>
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
                        <div className="formdata-wrap">
                          <p>Delivery date</p>
                          <input type="text" id="datepicker3" placeholder="" />
                        </div>
                      </div>
                      <div className="vewmore-show d-flex justify-content-center pt-4">
                        <a
                          href="#"
                          onClick={() => setViewMore(!viewMore)}
                          className="viewmore-hide"
                        >
                          View Less&nbsp;<i className="fas fa-angle-down"></i>
                        </a>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-2 col-md-12">
                <div className="breeder-info-left">
                  <img
                    src="/images/Nextpet-imgs/dashboard-imgs/brreder-info-img.png"
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-lg-10 col-md-12">
                <div className="breeder-info-right">
                  <div className="postcreate-heading">
                    <h3>Breeder Info</h3>
                  </div>
                  <h3>Anna B....</h3>
                  <p>
                    {`There are of Lorem Ipsum available, but the majority have su
                    alteration in some form, by injected oir which don't look
                    even slightly believable. There are of Lorem Ipsum
                    available, but the majority have su alteration in some form,
                    by injected oir which don't look even slightly
                    believable.There are of Lorem Ipsum available, but the
                    majority have su alteration in some form, by injected oir
                    which don't look even slightly believable.`}
                  </p>
                  <div className="contact-details-wrap">
                    <ul>
                      <li>
                        <img
                          src="/images/Nextpet-imgs/all-icons/lo-icon.png"
                          alt=""
                        />
                        <a href="#">Colorado Springs, CO(state), USA</a>
                      </li>
                      <li>
                        <img
                          src="/images/Nextpet-imgs/all-icons/mail-icon.png"
                          alt=""
                        />
                        <a href="#">richardbrown78@gmail.com</a>
                      </li>
                      <li>
                        <img
                          src="/images/Nextpet-imgs/all-icons/call-icon.png"
                          alt=""
                        />
                        <a href="#">+1 617-496-5841</a>
                      </li>
                      <li>
                        <img
                          src="/images/Nextpet-imgs/all-icons/web-icon.png"
                          alt=""
                        />
                        <a href="#">www.annabrown.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="contacted-breeder-inner">
                  <div className="col-lg-12 col-md-12">
                    <div className="experience-user-wrap">
                      <div className="experience-heading">
                        <h3>
                          How was your experience with the breeder for this pet?
                        </h3>
                      </div>
                      <div className="expreience-btn-ratingwrap">
                        <div className="inner-btns-rating">
                          <button type="button" value="Submit">
                            Politeness
                          </button>
                          <div className="star-ratings-coming">
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="inner-btns-rating">
                          <button type="button" value="Submit">
                            Responsive
                          </button>
                          <div className="star-ratings-coming">
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="inner-btns-rating">
                          <button type="button" value="Submit">
                            Communication
                          </button>
                          <div className="star-ratings-coming">
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                            <img
                              src="/images/Nextpet-imgs/contacted-imgs/star.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="experience-user-wrap">
                  <div className="experience-heading">
                    <h3>What would you like to do now with this pet post?</h3>
                    <div className="tooltip">
                      <img
                        src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
                        alt=""
                        loading="lazy"
                      />
                      <span className="tooltiptext">
                        <div className="tooltip-inner-content">
                          <h4>Shortlist</h4>
                          <p>
                            Use this list to identify the pets you are most
                            interested in.
                          </p>
                        </div>
                        <div className="tooltip-inner-content">
                          <h4>Archive</h4>
                          <p>Remove this pet from your active list.</p>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="updatedstatus-btn-ratingwrap">
                    <div className="updatedstatus-btns-rating">
                      <button type="button" className="active" value="Submit">
                        Shortlist
                      </button>
                    </div>
                    <div className="updatedstatus-btns-rating">
                      <button type="button" className="danger" value="Submit">
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
                <div className="contacted-breeder-inner">
                  <div className="col-lg-12 col-md-12">
                    <div className="experience-user-wrap">
                      <div className="experience-heading">
                        <h3>Notes</h3>
                      </div>
                      <label>
                        <textarea
                          name=""
                          id=""
                          placeholder="You can add a personal memo here.."
                        ></textarea>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="contucted-btn-wrap pt-4">
                  <button type="button" value="Submit">
                    Add Note
                  </button>
                </div>
                <div className="contacted-breeder-inner">
                  <div className="col-lg-12 col-md-12">
                    <div className="experience-user-wrap">
                      <div className="calender-warp">
                        <span>July 18</span>
                        <p>I loved the pet on the video call.</p>
                      </div>
                    </div>
                    <div className="experience-user-wrap">
                      <div className="calender-warp">
                        <span>July 17</span>
                        <p>
                          I contacted this breeder, he will show me the pet on
                          video call tomorrow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPetDetails2;
