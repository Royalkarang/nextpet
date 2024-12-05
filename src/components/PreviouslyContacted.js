//////////////////////////////////////Here Required Another Api ///////////////////////////
import React, {  useRef } from "react";
import Modal from "react-modal";
import axios from 'axios';
import BASE_URL from '../app/utils/constant'
import { toast } from "react-toastify";

const customStyles = {
  overlay: {
    zIndex: 100000,
    backgroundColor: "rgba(0, 0, 0, 0.75)"
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
    maxWidth: "500px"
  },
};

const PreviouslyContacted = ({ modalIsOpen, closeModal, modalDetails }) => {
  const subtitleRef = useRef(null);


  const afterOpenModal = () => {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  };
  const submitPreviouslyContacted = async () =>{


    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_user_id"));
    formData.append("post_id", modalDetails.post_id);
    formData.append("breeder_id", modalDetails.breeder_id);
    formData.append("do_not_show_me", 1);

    try {

      //////////////////////////////////////Here Required Another Api ///////////////////////////


      //////////////////////////////////////
      const response = await axios.post(`${BASE_URL}/api/contact_breeder`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      closeModal()
      console.log("Success response submitPreviouslyContacted1111",response);
      // setSuccessModalIsOpen(true); // Open the Success Modal

      toast.success("Contact Successfully");
     
    } catch (error) {
      console.error("Error during password update:", error); 
      toast.error("Error updating password. Please try again.");
    } 
    closeModal();
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Contact Breeder Modal"
      ariaHideApp={false} // Optional: allows usage outside the root element
    >
      <form>
        <div className="breederform-popup-wrap">
            <img src="/images/Nextpet-imgs/green-envelope.svg" alt=""/>
            <h6 className="pt-4">Previously Contacted
              on August 8, 2022</h6>
            <p>You have already contacted this breeder, please check contacted list.</p>
            <div className="userpopup-btn-wrap">
              <button type="button" className="" value="Submit" onClick={submitPreviouslyContacted}>Contact Breeder Again</button>
            </div>
          </div>
      </form>
    </Modal>
  );
};

export default PreviouslyContacted;
