"use client";
import { React, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import moment from "moment";

import { Rating } from "react-simple-star-rating";
import {
  ShowNotes,
  AddNotes,
  StatusNotesLeadsUpdate,
  GetRatting,
  SetRatting,
  StatusLeadsBreederDetails,
} from "../../../services/breeder";

const Contacted = () => {
  const [addNotes, setAddNotes] = useState();
  const [showBreederNotes, setBreederShowNotes] = useState();
  const [rattinData, setRatingData] = useState({});
  const [pageData, setPageData] = useState({});

  const [rating, setRating] = useState(3);

  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id");
  const post_id = searchParams.get("post_id");
  const breeder_id = searchParams.get("breeder_id");

  const [bidrAllRate, setBidrAllRate] = useState([]);
  // console.log(bidrAllRate, "bidder rate data");

  // useEffect(() => {
  //   console.log("user_id, post_id, breeder_id", user_id, post_id, breeder_id);
  // }, [user_id, post_id, breeder_id]);

  useEffect(() => {
    ShowNotesFunction();
    GetRattingFunction();
    StatusLeadsBreederDetailsFunction();
  }, []);

  const StatusLeadsBreederDetailsFunction = async () => {
    try {
      const payload = {
        user_id: user_id,
        post_id: post_id,
        breeder_id: breeder_id,
      };

      // Call the API and await the response
      const res = await StatusLeadsBreederDetails(payload);

      if (res?.data?.code === 200) {
        setPageData(res.data);

        // console.log("Success:", res);
      } else {
        console.error("Error in response:", res);
      }
    } catch (error) {
      console.error("Error in StatusLeadsBreederDetailsFunction:", error);
    }
  };

  const ShowNotesFunction = async () => {
    const payload = {
      post_id: post_id,
      breeder_id: breeder_id,
    };
    const response = await ShowNotes(payload);
    // console.log("responseresponseresponse", response);
    if (response.data.code === 200) {
      // console.log("response.data.data : Response New", response.data.data);
      setBreederShowNotes(response.data.data);
    }
  };

  const AddNotesSave = async () => {
    const payload = {
      user_id: user_id,
      post_id: post_id,
      breeder_id: breeder_id,
      notes: addNotes,
    };

    const response = await AddNotes(payload);
    if (response.data.code === 200) {
      // console.log("response.data.data : Response New", response.data.data);
      setAddNotes(null);
      ShowNotesFunction();
    }
  };

  const handleUserStatusNotesLeadsUpdate = async (val) => {
    try {
      const payload = {
        user_id: user_id,
        post_id: post_id,
        status_leads: val,
        user_breeder_id: breeder_id,
      };

      // console.log("payload", payload);

      const response = await StatusNotesLeadsUpdate(payload);
      // console.log("StatusNotesLeadsUpdate", response);

      if (response.data.code === 200) {
        toast.success("Status Update!");
      }
    } catch (error) {
      console.error("Error in handleUserStatusNotesLeadsUpdate:", error);
      // You can also set an error state or show an error message to the user here if needed.
    }
  };

  const GetRattingFunction = async () => {
    const payload = {
      breeder_id: breeder_id,
      user_id: user_id,
      post_id: post_id,
    };
    const response = await GetRatting(payload);
    if (response.data.code === 200) {
      // console.log("GetRatting GetRatting", response.data.data[0]);
      setRatingData(response.data.data[0]);
    }
  };

  const SetRattingFunction = async (num, ret) => {
    const payload = {
      breeder_id: breeder_id,
      user_id: user_id,
      post_id: post_id,
    };
    const allReatingResponse = await GetRatting(payload);

    // console.log(allReatingResponse.data.data[0]);
    // return;

    if (allReatingResponse.data.code == 200) {
      // console.log("True ::", allReatingResponse.data.data[0]);
      let res = allReatingResponse.data.data[0];
      const payloadTwo = {
        breeder_id: 429,
        user_id: 356,
        post_id: 540,
        politeness_rating: num == 1 ? ret : res.politeness_rating,
        responsive_rating: num == 2 ? ret : res.responsive_rating,
        communication_rating: num == 3 ? ret : res.communication_rating,
      };
      await SetRatting(payloadTwo);
      GetRattingFunction();
    } else {
      // const payloadTwo = {
      //   breeder_id: 429,
      //   user_id: 356,
      //   post_id: 540,
      //   politeness_rating: num == 1 ? ret : 0,
      //   responsive_rating: num == 2 ? ret : 0,
      //   communication_rating: num == 3 ? ret : 0,
      // };

      await SetRatting(payload);
      GetRattingFunction();
    }
  };

  let communication_rating = [];
  for (let i = 1; i <= 5; i++) {
    const starSrc =
      i <= rattinData.communication_rating
        ? "/images/Nextpet-imgs/contacted-imgs/star.svg"
        : "/images/Nextpet-imgs/contacted-imgs/mail.svg"; // Adjust empty star path

    communication_rating.push(
      <img
        key={i} // Add a unique key for each element
        onClick={() => SetRattingFunction(3, i)}
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
        key={i} // Add a unique key for each element
        onClick={() => SetRattingFunction(1, i)}
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
        : "/images/Nextpet-imgs/contacted-imgs/mail.svg"; // Adjust empty star path

    responsive_rating.push(
      <img
        key={i} // Add a unique key for each element
        onClick={() => SetRattingFunction(2, i)}
        src={starSrc}
        alt="Star"
      />
    );
  }

  // console.log("pageDatapageDatapageData", pageData?.pet_breeder_details?.[0]);

  /// code writeen by rajan

  // get rating
  useEffect(() => {
    async function getAllBidderRatting() {
      const payload = {
        breeder_id: breeder_id,
        user_id: user_id,
        post_id: post_id,
      };
      const getBidderRes = await GetRatting(payload);
      setBidrAllRate(getBidderRes?.data?.data[0]);
    }

    getAllBidderRatting();
  }, [rating]);

  const handleRating = async (rate, type) => {
    setRating(rate);

    //
    const res = await SetRatting({
      breeder_id: breeder_id,
      user_id: user_id,
      post_id: post_id,
      politeness_rating:
        type == "Politeness" && rate !== null
          ? rate
          : bidrAllRate?.politeness_rating,
      responsive_rating:
        type == "Responsive" && rate !== null
          ? rate
          : bidrAllRate?.responsive_rating,
      communication_rating:
        type == "Communication" && rate !== null
          ? rate
          : bidrAllRate?.communication_rating,
    });

    console.log(res.data, "show the data comes");
  };

  return (
    <>
      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-5 col-md-6">
                <div className="contacted-breeder-img">
                  <Image
                    src={
                      pageData.data?.[0].user_image
                        ? pageData.data?.[0].user_image
                        : ""
                    }
                    alt=""
                    width={444}
                    height={232}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-6">
                <div className="contacted-breeder-content">
                  <h2>
                    {pageData.data?.[0].user_name
                      ? pageData.data?.[0].user_name
                      : ""}
                  </h2>
                  <ul>
                    <li>
                      <Image
                        width={15}
                        height={15}
                        src="/images/Nextpet-imgs/contacted-imgs/location-icon.svg"
                        alt=""
                        loading="lazy"
                      />
                      &nbsp;
                      {pageData.data?.[0].user_address
                        ? pageData.data?.[0].user_address
                        : ""}
                    </li>
                    <li>
                      <Image
                        width={15}
                        height={15}
                        src="/images/Nextpet-imgs/contacted-imgs/mail.svg"
                        alt=""
                      />
                      &nbsp;
                      <Link href="#" style={{ textDecoration: "underline" }}>
                        {pageData.data?.[0].user_email
                          ? pageData.data?.[0].user_email
                          : ""}
                      </Link>
                    </li>
                    <li>
                      <Image
                        width={15}
                        height={15}
                        src="/images/Nextpet-imgs/contacted-imgs/phone.svg"
                        alt=""
                      />
                      &nbsp;
                      <a href="#">
                        +1{" "}
                        {pageData.data?.[0].user_phone
                          ? pageData.data?.[0].user_phone
                          : ""}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-5 col-md-6">
                <div className="contacted-breeder-img">
                  <Image
                    src={
                      pageData?.pet_breeder_details?.[0].image[0]
                        ? pageData?.pet_breeder_details?.[0].image[0]
                        : ""
                    }
                    alt=""
                    loading="lazy"
                    width={444}
                    height={232}
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-6">
                <div className="contacted-breeder-content">
                  <div className="contacted-heading">
                    <h3>Pet Info111</h3>
                    <div className="heart-icon-wrap">
                      <Image
                        width={15}
                        height={15}
                        src="/images/Nextpet-imgs/dashboard-imgs/heart-fill.svg"
                        alt=""
                        className="active"
                      />
                      <span>
                        {pageData?.pet_breeder_details?.[0].total_like
                          ? pageData?.pet_breeder_details?.[0].total_like
                          : "0"}
                      </span>
                    </div>
                  </div>
                  <p>
                    {pageData?.pet_breeder_details?.[0].breeder_bio
                      ? pageData?.pet_breeder_details?.[0].breeder_bio
                      : ""}
                  </p>

                  <div className="viewmore-wrap">
                    <h4>
                      $
                      {pageData?.pet_breeder_details?.[0].price
                        ? pageData?.pet_breeder_details?.[0].price
                        : ""}
                    </h4>
                    <div className="action-wrap">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        View More&nbsp;<i className="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-12 col-md-12">
                <div className="experience-user-wrap">
                  <div className="experience-heading">
                    <h3>How was your experience with the User?</h3>
                    <div className="tooltip">
                      <Image
                        width={15}
                        height={15}
                        src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
                        alt=""
                        loading="lazy"
                      />
                      <span className="tooltiptext">
                        <div className="tooltip-inner-content">
                          <h4>Adopted</h4>
                          <p>
                            Pet is not available because it has found a home.
                          </p>
                        </div>
                        <div className="tooltip-inner-content">
                          <h4>Lost</h4>
                          <p>You do not want to connect with this lead</p>
                        </div>
                        <div className="tooltip-inner-content">
                          <h4>Contacted</h4>
                          <p>You have connected to this lead.</p>
                        </div>
                        <div className="tooltip-inner-content">
                          <h4>Pending</h4>
                          <p>Lead is waiting for you to contact them.</p>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="expreience-btn-ratingwrap">
                    <div className="inner-btns-rating">
                      <button type="button" value="Submit">
                        Politeness
                      </button>
                      <div className="star-ratings-coming">
                        <Rating
                          onClick={(rate) => handleRating(rate, "Politeness")}
                          allowHover={false}
                          initialValue={bidrAllRate?.politeness_rating}
                        />
                      </div>
                    </div>
                    <div className="inner-btns-rating">
                      <button type="button" value="Submit">
                        Responsive
                      </button>
                      <div className="star-ratings-coming">
                        <Rating
                          onClick={(rate) => handleRating(rate, "Responsive")}
                          allowHover={false}
                          initialValue={bidrAllRate?.responsive_rating}
                        />
                      </div>
                    </div>
                    <div className="inner-btns-rating">
                      <button type="button" value="Submit">
                        Communication
                      </button>
                      <div className="star-ratings-coming">
                        <Rating
                          onClick={(rate) =>
                            handleRating(rate, "Communication")
                          }
                          allowHover={false}
                          initialValue={bidrAllRate?.communication_rating}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-12 col-md-12">
                <div className="experience-user-wrap">
                  <div className="experience-heading">
                    <h3>What is the updated status of this pet post?</h3>
                    <div className="tooltip">
                      <Image
                        width={15}
                        height={15}
                        src="/images/Nextpet-imgs/profile-page-imgs/i-icon.svg"
                        alt=""
                        loading="lazy"
                      />
                      <span className="tooltiptext">
                        <p>Pet is not available because it has found a home.</p>
                      </span>
                    </div>
                  </div>

                  <div className="updatedstatus-btn-ratingwrap">
                    <div className="updatedstatus-btns-rating">
                      <button
                        type="button"
                        className="active"
                        onClick={() =>
                          handleUserStatusNotesLeadsUpdate("Adopted")
                        }
                        value="Submit"
                      >
                        Adopted
                      </button>
                    </div>
                    <div className="updatedstatus-btns-rating">
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleUserStatusNotesLeadsUpdate("Lost")}
                        value="Submit"
                      >
                        Lost
                      </button>
                    </div>
                    <div className="updatedstatus-btns-rating">
                      <button
                        type="button"
                        className="pending"
                        onClick={() =>
                          handleUserStatusNotesLeadsUpdate("Contacted")
                        }
                        value="Submit"
                      >
                        Contacted
                      </button>
                    </div>
                    <div className="updatedstatus-btns-rating">
                      <button
                        type="button"
                        className="warning"
                        onClick={() =>
                          handleUserStatusNotesLeadsUpdate("Pending")
                        }
                        value="Submit"
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-12 col-md-12">
                <div className="experience-user-wrap">
                  <div className="experience-heading">
                    <h3>Notes</h3>
                  </div>

                  <label>
                    <textarea
                      name=""
                      placeholder="You can add a personal memo here.."
                      onChange={(e) => setAddNotes(e.target.value)}
                    ></textarea>
                  </label>

                  <p>These notes are only visible to you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contucted-btn-wrap">
          <button type="button" value="Submit" onClick={AddNotesSave}>
            Add Note
          </button>
        </div>
      </div>

      <div className="contacted-breeder-wrap">
        <div className="container">
          <div className="col-lg-12">
            <div className="contacted-breeder-inner">
              <div className="col-lg-12 col-md-12">
                {showBreederNotes &&
                  showBreederNotes.map((note, index) => (
                    <div key={index}>
                      <div className="experience-user-wrap">
                        <div className="calender-warp">
                          <span>
                            {note.date && moment(note.date).format("MMMM D")}
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
    </>
  );
};

export default Contacted;
