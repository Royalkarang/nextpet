import { useState,useEffect } from "react";
import Modal from "react-modal";
import Link from "next/link";

const SignUpSuccessPopUp = ({ redirectUrl }) => {
  const [isOpen, setIsOpen] = useState(true);  // Custom styles for the modal
  const customStyles = {
    content: {
      top: "0%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      borderRadius: "15px",
      transition: "transform 0.5s ease-out",
      padding: "20px", // Add some padding
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      overflow: "hidden", // Prevent background scroll
    },
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Sign Up Success Modal"
      onRequestClose={() => {
        console.log("Modal closed");
      }}
      onAfterOpen={() => {
        document.querySelector(".ReactModal__Content").style.transform =
          "translate(-50%, 20%)";
      }}
    >
      <div className="modal-dialog modal-dialog-edit" role="document">
        <div className="modal-content">
          <div className="modal-heading">
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="congratulation-popup-wrap">
                <img
                  src="/images/Nextpet-imgs/breeder-signin-imgs/congratu-icon.svg"
                  alt="Success"
                />
                <h1>Congratulations!</h1>
                <p>You have successfully created your account on NextPet.</p>
              </div>
            </form>
            <Link href={redirectUrl} className="btn btn-warning"> OK </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpSuccessPopUp;
