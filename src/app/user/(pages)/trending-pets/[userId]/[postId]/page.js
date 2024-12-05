//Trending Pets Trending Pets

"use client";
import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Carousel from "../../../../../../components/Carousel";
import { useParams } from "next/navigation";
import {
  PostDetail,
  UserShowNotes,
  UserAddNotes,
  UserStatusNotesLeadsUpdate,
  GetRattingTrendingPost,
  SetRattingTrendingPost,
} from "../../../../../services/user/post";
import moment from "moment";
import ProtectedRoute from "../../../../../context/ProtectedRoute";

const ContactPetDetails2 = () => {
  const { postId, userId } = useParams();
  const [viewMore, setViewMore] = useState(false);
  const [previousPostImage, setPreviousPostImage] = useState([]);
  const [showUserNotes, setUserNotes] = useState();
  const [addNotes, setAddNotes] = useState();
  const [rattinData, setRatingData] = useState({});
  // const [userStatusNotesLeadsUpdateData, setUserStatusNotesLeadsUpdateData] = useState();

  // const [bidrAllRate, setBidrAllRate] = useState([]);
  // console.log(bidrAllRate, "bidder rate data");

  const [postData, setPostData] = useState("");
  useEffect(() => {
    PostDetailGet();
    UserShowNotesFun();
    getAllRattingTrandingPost();
  }, []);

  const PostDetailGet = async () => {
    console.log("id", postId);
    console.log("user_id", userId);

    const payload = {
      user_id: userId,
      id: postId,
    };

    const response = await PostDetail(payload);
    if (response.data.code === 200) {
      console.log("response.data 121", response.data.data[0]);
      setPostData(response.data.data[0]);
      setPreviousPostImage(response.data.data[0].image);
    }
  };

  const UserShowNotesFun = async () => {
    const payload = {
      user_id: userId,
      post_id: postId,
    };

    const response = await UserShowNotes(payload);

    if (response.data.code === 200) {
      console.log("response.data.data : Response New", response.data.data);
      setUserNotes(response.data.data);
    }
  };

  //   console.log("Response New userAddNotes",showUserNotes);

  const submitAddNotesForm = async () => {
    const payload = {
      user_id: userId,
      post_id: postId,
      notes: addNotes,
    };

    const response = await UserAddNotes(payload);
    if (response.data.code === 200) {
      UserShowNotesFun();
    }
  };

  const handleUserStatusNotesLeadsUpdate = async (val) => {
    try {
      const payload = {
        user_id: localStorage.getItem("user_user_id"),
        post_id: postId,
        status_leads: val,
        user_breeder_id: userId,
      };

      console.log("payload", payload);

      const response = await UserStatusNotesLeadsUpdate(payload);
      console.log("handleUserStatusNotesLeadsUpdate", response);

      if (response.data.code === 200) {
        toast.success(" Updated!");
        //    alert("Done");
      }
    } catch (error) {
      console.error("Error in handleUserStatusNotesLeadsUpdate:", error);
      // You can also set an error state or show an error message to the user here if needed.
    }
  };

  const PolitenessRaTing = async (num, ret) => {
    console.log(num);
    console.log(ret);

    const payload = {
      breeder_id: userId,
      user_id: localStorage.getItem("user_user_id"),
      post_id: postId,
    };

    const allReatingResponse = await GetRattingTrendingPost(payload);

    console.log("allReatingResponse", allReatingResponse);

    if (allReatingResponse.data.code == 200) {
      console.log("True ::", allReatingResponse.data.data[0]);
      let res = allReatingResponse.data.data[0];
      const payloadTwo = {
        breeder_id: userId,
        user_id: localStorage.getItem("user_user_id"),
        post_id: postId,
        politeness_rating: num == 1 ? ret : res.politeness_rating,
        responsive_rating: num == 2 ? ret : res.responsive_rating,
        communication_rating: num == 3 ? ret : res.communication_rating,
      };

      const setRes = await SetRattingTrendingPost(payloadTwo);
      console.log("setRes.data :", setRes);
      // console.log(payloadTwo);

      getAllRattingTrandingPost();
    } else {
      const payloadTwo = {
        breeder_id: userId,
        user_id: localStorage.getItem("user_user_id"),
        post_id: postId,
        politeness_rating: num == 1 ? ret : 0,
        responsive_rating: num == 2 ? ret : 0,
        communication_rating: num == 3 ? ret : 0,
      };

      const setRes = await SetRattingTrendingPost(payloadTwo);
      console.log("setRes.data :", setRes);
      getAllRattingTrandingPost();
    }
  };

  const getAllRattingTrandingPost = async () => {
    const payload = {
      breeder_id: userId,
      user_id: localStorage.getItem("user_user_id"),
      post_id: postId,
    };

    const response = await GetRattingTrendingPost(payload);
    if (response.data.code === 200) {
      console.log(
        "ratting response.data.data : Response ratting New",
        response.data.data[0]
      );
      setRatingData(response.data.data[0]);
    }
  };

  console.log("rattinData", rattinData.communication_rating);

  let communication_rating = [];
  for (let i = 1; i <= 5; i++) {
    const starSrc =
      i <= rattinData.communication_rating
        ? "/images/Nextpet-imgs/contacted-imgs/star.svg"
        : "/images/Nextpet-imgs/contacted-imgs/mail.svg"; // Adjust empty star path

    communication_rating.push(
      <img
        key={i} // Add a unique key for each element
        onClick={() => PolitenessRaTing(3, i)}
        src={starSrc}
        alt="Star"
      />
    );
  }

  let politeness_rating = [];
  for (let i = 1; i <= 5; i++) {
    const starSrc =
      i <= rattinData.politeness_rating
        ? "/images/Nextpet-imgs/contacted-imgs/star.svg"
        : "/images/Nextpet-imgs/contacted-imgs/mail.svg"; // Adjust empty star path

    politeness_rating.push(
      <img
        key={i}
        onClick={() => PolitenessRaTing(1, i)}
        src={starSrc}
        alt="Star"
      />
    );
  }

  let responsive_rating = [];
  for (let i = 1; i <= 5; i++) {
    const starSrc =
      i <= rattinData.responsive_rating
        ? "/images/Nextpet-imgs/contacted-imgs/star.svg"
        : "/images/Nextpet-imgs/contacted-imgs/mail.svg";

    responsive_rating.push(
      <img
        key={i}
        onClick={() => PolitenessRaTing(2, i)}
        src={starSrc}
        alt="Star"
      />
    );
  }

  console.log(communication_rating);

  //

  //
  // code written by rajan
  // get rating
  //  useEffect(() => {
  //   async function getAllBidderRatting() {
  //     const payload = {
  // breeder_id: userId,
  //   user_id: localStorage.getItem("user_user_id"),
  //   post_id: postId,
  //     };
  //     const getBidderRes = await GetRatting(payload);
  //     setBidrAllRate(getBidderRes.data.data[0]);
  //   }

  //   getAllBidderRatting();
  // }, [rating]);

  // const handleRating = async (rate, type) => {
  //   setRating(rate);

  //   //
  //   const res = await SetRatting({
  //     breeder_id: breeder_id,
  //     user_id: user_id,
  //     post_id: post_id,
  //     politeness_rating:
  //       type == "Politeness" && rate !== null
  //         ? rate
  //         : bidrAllRate?.politeness_rating,
  //     responsive_rating:
  //       type == "Responsive" && rate !== null
  //         ? rate
  //         : bidrAllRate?.responsive_rating,
  //     communication_rating:
  //       type == "Communication" && rate !== null
  //         ? rate
  //         : bidrAllRate?.communication_rating,
  //   });

  //   console.log(res.data, "show the data comes");
  // };

  //

  //
  return (
    <>
      <ProtectedRoute>
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
                    <h3>{postData.name ? postData.name : "Animal"}</h3>
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
                        {postData.description ? postData.description : "Animal"}
                      </p>
                    </label>
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
                            <input
                              type="text"
                              placeholder=""
                              value={postData.type ? postData.type : "Type"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Breed</p>
                            <input
                              type="text"
                              placeholder=""
                              value={postData.breed ? postData.breed : "Breed"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Price</p>
                            <input
                              type="text"
                              placeholder=""
                              value={postData.price ? postData.price : "Price"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>General Size</p>
                            <input
                              type="text"
                              placeholder=""
                              value={
                                postData.size ? postData.size : "General Size"
                              }
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Anticipated Weight</p>
                            <input
                              type="text"
                              placeholder=""
                              value={
                                postData.weight
                                  ? postData.weight
                                  : "Anticipated Weight"
                              }
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Birthdate</p>
                            <input
                              type="text"
                              id="datepicker"
                              placeholder=""
                              value={
                                postData.birthdate
                                  ? postData.birthdate
                                  : "Birthdate"
                              }
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Date Available</p>
                            <input
                              type="text"
                              id="datepicker2"
                              placeholder=""
                              value={
                                postData.avialable
                                  ? postData.avialable
                                  : "Date Available"
                              }
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Health guarantee</p>
                            <input
                              type="text"
                              placeholder=""
                              value={postData.health ? "Yes" : "No"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Certifications</p>
                            <input
                              type="text"
                              placeholder=""
                              value={
                                postData.certification
                                  ? postData.certification
                                  : "Certifications"
                              }
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Delivery availability</p>
                            <input
                              type="text"
                              placeholder=""
                              value={postData.delivery ? "Yes" : "No"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Boarding availability</p>
                            <input
                              type="text"
                              placeholder=""
                              value={postData.boarding ? "Yes" : "No"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Flying availability</p>
                            <input
                              type="text"
                              placeholder=""
                              value={postData.flying ? "Yes" : "No"}
                            />
                          </div>
                          <div className="formdata-wrap">
                            <p>Delivery date</p>
                            <input
                              type="text"
                              id="datepicker3"
                              placeholder=""
                              value="..."
                            />
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
                      <h3>Breeder Info112</h3>
                    </div>
                    <h3>
                      {postData.breeder_name
                        ? postData.breeder_name
                        : "breeder Name"}
                    </h3>
                    <p>
                      {postData.breeder_bio
                        ? postData.breeder_bio
                        : "breeder Bio"}
                    </p>
                    <div className="contact-details-wrap">
                      <ul>
                        <li>
                          <img
                            src="/images/Nextpet-imgs/all-icons/lo-icon.png"
                            alt=""
                          />
                          <a href="#">
                            {postData.breeder_email
                              ? postData.breeder_email
                              : "breeder Email"}
                          </a>
                        </li>
                        <li>
                          <img
                            src="/images/Nextpet-imgs/all-icons/mail-icon.png"
                            alt=""
                          />
                          <a href="#">
                            {postData.breeder_location
                              ? postData.breeder_location
                              : "breeder Location"}
                          </a>
                        </li>
                        <li>
                          <img
                            src="/images/Nextpet-imgs/all-icons/call-icon.png"
                            alt=""
                          />
                          <a href="#">
                            +1
                            {postData.breeder_phone
                              ? postData.breeder_phone
                              : "breeder Phone"}
                          </a>
                        </li>
                        <li>
                          <img
                            src="/images/Nextpet-imgs/all-icons/web-icon.png"
                            alt=""
                          />
                          <a href="#">
                            {postData.website
                              ? postData.website
                              : "breeder Website"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="contacted-breeder-inner">
                    <div className="col-lg-12 col-md-12">
                      <div className="experience-user-wrap">
                        <div className="experience-heading">
                          <h3>
                            How was your experience with the breeder for this
                            pet?
                          </h3>
                        </div>
                        <div className="expreience-btn-ratingwrap">
                          <div className="inner-btns-rating">
                            <button type="button" value="Submit">
                              Politeness
                            </button>
                            <div className="star-ratings-coming">
                              {politeness_rating}
                            </div>
                          </div>
                          <div className="inner-btns-rating">
                            <button type="button" value="Submit">
                              Responsive
                            </button>
                            <div className="star-ratings-coming">
                              {console.log(
                                responsive_rating,
                                "hello rating data comes"
                              )}
                              {responsive_rating}

                              {/* <img onClick={()=>ResponsiveRaTing(1)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>ResponsiveRaTing(2)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>ResponsiveRaTing(3)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>ResponsiveRaTing(4)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>ResponsiveRaTing(5)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/> */}
                            </div>
                          </div>
                          <div className="inner-btns-rating">
                            <button type="button" value="Submit">
                              Communication
                            </button>
                            <div className="star-ratings-coming">
                              {communication_rating}
                              {/* <img onClick={()=>CommunicationRaTing(1)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>CommunicationRaTing(2)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>CommunicationRaTing(3)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>CommunicationRaTing(4)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/>
                                            <img onClick={()=>CommunicationRaTing(5)} src="/images/Nextpet-imgs/contacted-imgs/star.svg" alt=""/> */}
                              {}
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
                            <h4>Shortlist </h4>
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
                        <button
                          type="button"
                          className="active"
                          onClick={() =>
                            handleUserStatusNotesLeadsUpdate("Shortlist")
                          }
                          value="Submit"
                        >
                          Shortlist
                        </button>
                      </div>
                      <div className="updatedstatus-btns-rating">
                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            handleUserStatusNotesLeadsUpdate("Archive")
                          }
                          value="Submit"
                        >
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
                            onChange={(e) => setAddNotes(e.target.value)}
                            placeholder="You can add a personal memo here..."
                          ></textarea>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="contucted-btn-wrap pt-4">
                    <button
                      type="button"
                      value="Submit"
                      onClick={submitAddNotesForm}
                    >
                      Add Note
                    </button>
                  </div>

                  <div className="contacted-breeder-inner">
                    <div className="col-lg-12 col-md-12">
                      {showUserNotes &&
                        showUserNotes.map((note, index) => (
                          <div key={index}>
                            <div className="experience-user-wrap">
                              <div className="calender-warp">
                                {/* {note.date && moment(note.date).format("MMMM D")} */}
                                <span>
                                  {note.date &&
                                    moment(note.date).format("MMMM D")}
                                </span>
                                <p>{note.notes ? note.notes : ""}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default ContactPetDetails2;
