import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "../app/utils/constant";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";

const customStyles = {
  overlay: {
    zIndex: 100000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 100001,
    width: "80%",
    maxWidth: "500px",
  },
};

const SuccessModal = ({ modalIsOpen, closeModal, modalDetails }) => {
  const [doNotShowMe, setDoNotShowMe] = useState(false);

  const handleSuccessCheckboxChange = () => {
    setDoNotShowMe(!doNotShowMe);
  };

  const submitSuccessModal = async () => {
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_user_id"));
    formData.append("post_id", modalDetails.post_id);
    formData.append("breeder_id", modalDetails.breeder_id);
    formData.append("do_not_show_me", doNotShowMe ? 1 : "false");

    try {
      await axios.post(
        `${BASE_URL}/api/contact_breeder`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      closeModal();
      setDoNotShowMe(false);
    } catch (error) {
      console.error("Error during password update:", error);
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Success Modal"
      ariaHideApp={false}
    >
      <form action="">
        <div className="breederform-popup-wrap">
          <img src="/images/Nextpet-imgs/green-envelope.svg" alt="" />
          <p>
            This breeder has received your contact information and will reach
            out to you soon.
          </p>
          <div className="agreed-wrap">
            <input
              type="checkbox"
              checked={doNotShowMe}
              onChange={handleSuccessCheckboxChange}
            />

            <span>Do not show me this message again.</span>
          </div>
          <div className="userpopup-btn-wrap">
            <button
              type="button"
              className=""
              value="Submit"
              onClick={submitSuccessModal}
            >
              Ok
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

const PreviouslyContacted = ({ modalIsOpen, closeModal, modalDetails }) => {
  const { isAuthenticated } = useAuth(); 
  const router = useRouter();

  const subtitleRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const afterOpenModal = () => {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // console.log("checakvalueee44", modalDetails);

  const submitContactBreeder = async () => {
    console.log('okk')
      if (isAuthenticated) {
        console.log('subitm')
        const formData = new FormData();

        if (modalDetails?.breeder_do_not_show_me) {
          formData.append("user_id", localStorage.getItem("user_user_id"));
          formData.append("breeder_id", modalDetails.breeder_id);
          formData.append(
            "breeder_do_not_show_me",
            modalDetails?.breeder_do_not_show_me
          );
        } else {
          formData.append("user_id", localStorage.getItem("user_user_id"));
          formData.append("post_id", modalDetails.post_id);
          formData.append("breeder_id", modalDetails.breeder_id);
          formData.append("do_not_show_me", isChecked ? 1 : "false");
        }
    
        let apiURL =
          modalDetails?.breeder_do_not_show_me == 0 || 1 || null
            ? `${BASE_URL}/api/contact_breeder_user`
            : `${BASE_URL}/api/contact_breeder`;
    
        try {
          await axios.post(apiURL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          closeModal();
          setSuccessModalIsOpen(true);
          setIsChecked(false);
        } catch (error) {
          console.error("Error during password update:", error);
        }

      } else {
        toast.error("User must be logged in");
        setTimeout(() => {
          router.push('/user/sign-in');
        }, 1000);
      }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contact Breeder Modal"
        ariaHideApp={false}
      >
        <form>
          <div className="breederform-popup-wrap">
            <h1 className="pt-4">Contact Breeder</h1>
            <p>
              You are going to contact the breeder of this post. In doing so,
              your contact information will be shared with the breeder.
            </p>
            <h4>
              Hurry up! 21 users have already contacted the breeder for this
              pet.
            </h4>
            <div className="agreed-wrap">
              <input
                type="checkbox"
                checked={isChecked === true}
                onChange={handleCheckboxChange}
              />
              {/* <label htmlFor="myCheck">
                {isChecked ? "Checked" : "Unchecked"}
              </label> */}
              <span onClick={() => {setIsChecked(!isChecked)}}>Do not show me this message again.</span>
            </div>
            <div className="userpopup-btn-wrap">
              <button type="button" className="inactive" onClick={closeModal}>
                Not Yet
              </button>
              <button type="button" onClick={submitContactBreeder}>
                Contact Breeder
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <SuccessModal
        modalIsOpen={successModalIsOpen}
        closeModal={() => setSuccessModalIsOpen(false)}
        modalDetails={modalDetails}
      />
    </>
  );
};

export default PreviouslyContacted;
