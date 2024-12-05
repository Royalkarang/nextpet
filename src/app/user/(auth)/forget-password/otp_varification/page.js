// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// // import { useRouter } from "next/navigation";
// import axios from "axios";
// import OtpInput from 'react-otp-input';
// import Cookies from 'js-cookie';
// import BASE_URL from '../../../../utils/constant'
// //css
// // import styles from './OtpInput.module.css'; 

// const VerificationCode = () => {
//   const savedOtp = Cookies.get('otp_email');
//   const saved_otp_email_25_min = Cookies.get('otp_email_25_min');
//   console.log(savedOtp);

//   const [otp, setOtp] = useState('');
//   // const [error, setError] = useState('');
//   // const [success, setSuccess] = useState('');
//   const [otp_error, setOtpError] = useState('');

//   // console.log(Cookies.get('email'));
//   // console.log(Cookies.get('otp_email'));

//   const formData = new FormData();
//   formData.append("email", Cookies.get('email'));
//   formData.append("otp", Cookies.get('otp_email'));

//   useEffect(() => {
//     // setError('');
//     // setSuccess('');
//   }, [otp]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(saved_otp_email_25_min !== otp){
//       setOtpError("Please Enter Correct Otp");
//     }
//     else if(savedOtp==null){
//       setOtpError("Your Otp Is Expire");
//     }
//     else if(otp!==savedOtp){
//       setOtpError("Please Enter Correct Otp");
//     }
//     if(savedOtp!==null && otp==savedOtp){
//       try {
//           console.log("I am inside try");

//           const resp_verify_unique_email = await axios.post(`${BASE_URL}/api/breeder_verify_otp`, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           console.log(resp_verify_unique_email);
//           console.log("Otp Verify Successfully Fully");

//           ////Write Code Here to redirect on New forgot Passwort page that take new Password
//           //route.push();

//         } catch (error) {
//           console.log("I am inside catch");
//           console.error("Error verifying OTP", error);
//         }
//     }
//   };

//   return (
//     <div className="breeder-signinflow-wrap">
//       <div className="breeder-signinflow-inner">
//         <div className="breeder-signin-leftsec">
//           <Image src="/images/Nextpet-imgs/big-logo.svg" alt="Logo" width={150} height={150} />
//         </div>
//         <div className="breeder-signin-rightsec">
//           <form onSubmit={handleSubmit}>
//             <h1>Verification Code</h1>
//             <p>Enter the verification code sent to your registered email/phone</p>
//             <div className="otp-verification-input">

//             {/* <OtpInput
//               className={styles_otp.inputs}
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               renderSeparator={<span>-</span>}
//               renderInput={(props) => <input {...props} />}
//             /> */}
//             <OtpInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               renderSeparator={<span>&nbsp;</span>}
//               renderInput={(props) => (
//                 <input
//                   {...props}
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     padding: '0',
//                     borderRadius: '6px',
//                     border: '2px solid #E69E01',
//                     background: '#FFF',
//                     color: '#E69E01',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     textAlign: 'center',
//                   }}
//                 />
//               )}
//             />
//             </div>
//             <spam>{otp_error}</spam>
//             <input type="submit" className="login-btn" value="Verify & Proceed" />
//             <div className="terms-condition-paragraph">
//               <p className="pb-2">
//                 Didn&apos;t receive the verification code? <br />
//                 <a href="#" style={{ color: "#FFC21A", fontWeight: 600 }}>RESEND</a>
//               </p>
//               <p>Resend OTP in <span>01:59</span> sec</p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerificationCode;


"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import axios from "axios";
import OtpInput from 'react-otp-input';
import Cookies from 'js-cookie';
// import BASE_URL from '../../../../utils/constant'
// import SignUpSuccessPopUp from '../../../../../components/ModelSignUpSuccess';
import { toast } from "react-toastify";
//css
// import styles from './OtpInput.module.css'; 

const VerificationCode = () => {
  const router = useRouter();
  const savedOtp = Cookies.get('otp_email');

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otp_error, setOtpError] = useState('');
  // const [showModal, setShowModal] = useState(false);
  const initialCountdown = 180; 
  const [countdown, setCountdown] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Check if the otp_email cookie exists
    if (Cookies.get('otp_email')) {
      const savedStartTime = localStorage.getItem('verificationStartTime');
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

      if (savedStartTime) {
        const elapsedTime = currentTime - parseInt(savedStartTime, 10);
        const timeLeft = initialCountdown - elapsedTime;
        if (timeLeft > 0) {
          setCountdown(timeLeft);
        } else {
          setCountdown(0); // If time is up, set countdown to 0
          setIsExpired(true); // Mark as expired if time is zero
        }
      } else {
        // If there's no start time, set it now
        localStorage.setItem('verificationStartTime', currentTime);
        setCountdown(initialCountdown); // Start countdown from the initial value
      }

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem('verificationStartTime'); // Clear saved start time
            setIsExpired(true); // Set expired flag
            return 0; // Stops at 0
          }
          return prev - 1; // Decrement the countdown
        });
      }, 1000);

      return () => {
        clearInterval(timer); // Cleanup on component unmount
      };
    } else {
      // If otp_email cookie is not present, set countdown and expired flag accordingly
      setCountdown(0);
      setIsExpired(false); // Ensure it is not marked as expired if no countdown starts
    }
  }, []);
 
  
  // const formData = new FormData();
  // formData.append("email", Cookies.get('email'));
  // formData.append("otp", Cookies.get('otp_email'));

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(otp);

    if(savedOtp==null){
      setError("Your Otp Is Expire")
      toast.error("Your Otp Is Expire");
      setOtpError("Your Otp Is Expire");
    }
    else if(otp!==savedOtp){
      toast.error("Please Enter Correct Otp");
      setOtpError("Please Enter Correct Otp");
    }
    if(savedOtp!==null && otp==savedOtp){

      //Redirect to new page if otp verify not present...
      router.push('/user/forget-password/reset-password')

      // try {
      //     const formDataBreederSignUp = new FormData();
      //     formDataBreederSignUp.append("email", Cookies.get('email'));
      //     //Api Call For New 
      //     const response = await axios.post(`${BASE_URL}/`, formDataBreederSignUp, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     });

      //     if(response.data.code==200){
      //       console.log("response response",response);
      //       const expireDate = new Date(new Date().getTime() + 15000 * 1000);
      //       // Cookies.set('user_id', response.data.user_id, { expires: expireDate });
      //       localStorage.setItem('breeder_user_id', response.data.user_id);
            
      //       route.push('/');

      //       console.log("Success fully Register!");
      //     }
          
      //     console.log("SignUp SuccessFully");

      //   } catch (error) {
      //     console.log("I am inside catch");
      //     console.error("Error verifying OTP", error);
      //   }
    }
  };

  return (
    <div className="breeder-signinflow-wrap">
      <div className="breeder-signinflow-inner">
        <div className="breeder-signin-leftsec">
          <Image src="/images/Nextpet-imgs/big-logo.svg" alt="Logo" width={270}
            height={306} />
        </div>
        <div className="breeder-signin-rightsec">
          <form onSubmit={handleSubmit}>
            <h1> Verification Code</h1>
            <p>Enter the verification code sent to your registered email/phone</p>
            {/* Build Error */}
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            {/* Build Error */}
            <div className="otp-verification-input">

            
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>&nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: '50px',
                    height: '50px',
                    padding: '0',
                    borderRadius: '6px',
                    border: '2px solid #E69E01',
                    background: '#FFF',
                    color: '#E69E01',
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                />
              )}
            />
            </div>
            <spam>{otp_error}</spam>
            <input type="submit" className="login-btn" value="Verify & Proceed"/>
            <div className="terms-condition-paragraph">
              {isExpired ? (
                <p className="pb-2">
                Didn&apos;t receive the verification code? <br />
                <a href="#" style={{ color: "#FFC21A", fontWeight: 600 }}>RESEND</a>
              </p>
              ) : (
                <p> Resend OTP in <span>{Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</span> sec</p>
              )}

              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;


