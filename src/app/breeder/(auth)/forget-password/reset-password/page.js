"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import BASE_URL from '../../../../utils/constant'
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Image from "next/image";
const ResetPassword = () => {

  const [passworrd, setPassword] = useState(null);
  const [cPassworrd, setCPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState()

  const router = useRouter();

  const email = Cookies.get('email');
  // console.log(email);

  const SubmitForm = async (e) =>{
    e.preventDefault();
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!(passwordRegex.test(passworrd))) {
      setErrorMessage("Password must contain at least 6 characters, including uppercase letters, lowercase letters, numbers, and special characters.");
      return;
    }

    if(passworrd===cPassworrd){
      const formData = new FormData();
      if (email) {
        formData.append("email", email);
        
      } else {
          console.error("Error: Email cookie is not set or has expired.");
          toast.error("Email Cookie Expired");
          return;
      }
      
      formData.append("password", passworrd);
      formData.append("conform_password", cPassworrd);
      
      try {
        await axios.post(`${BASE_URL}/api/password_create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        toast.success("Password Updated!");
        router.push('/breeder/sign-in')
      } catch (error) {
        console.error("Error during password update:", error); 
        toast.error("Error updating password. Please try again.");
      }  
    }
    else{
      toast.error("Passwords NOT match");
      return;
    }
  }
  
  return (
    <>
     <main>
        <div className="breeder-signinflow-wrap">
          <div className="breeder-signinflow-inner">
            <div className="breeder-signin-leftsec">
              <Image src="/images/Nextpet-imgs/big-logo.svg" alt="" loading="lazy" width={270}
            height={306}/>
            </div>
            <div className="breeder-signin-rightsec">
              <form onSubmit={SubmitForm}>
                <h1>Reset Password</h1>
                <label className="login-lbl">
                  <Image src="/images/Nextpet-imgs/breeder-signin-imgs/pass-icon.svg"  alt={"Password"} className="login-lbl-img" width={20} height={20}/>
                  <input type={showPassword ? "text":"password"} className="login-txt" id="password" value={passworrd} onChange={(e)=>setPassword(e.target.value)} placeholder="New Password" required/>

                  <Image src={showPassword ? "/images/Nextpet-imgs/breeder-signin-imgs/eye-open.svg" : "/images/Nextpet-imgs/breeder-signin-imgs/eye-close.svg"} alt="Password" width={20} height={20} style={{ position: 'absolute', zIndex: 200, right: '10px', width: '50px',height: '14px', top: '17px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}/> 

                </label>
                <label className="login-lbl">
                  <Image src="/images/Nextpet-imgs/breeder-signin-imgs/pass-icon.svg" alt="" className="login-lbl-img" width={20} height={20}/>
                  <input type={showPassword2 ? "text":"password"} className="login-txt" id="password2" value={cPassworrd} onChange={(e)=>setCPassword(e.target.value)} placeholder="Confirm New Password" required/>

                  <Image src={showPassword2 ? "/images/Nextpet-imgs/breeder-signin-imgs/eye-open.svg" : "/images/Nextpet-imgs/breeder-signin-imgs/eye-close.svg"} alt="Password" width={20} height={20} style={{ position: 'absolute', zIndex: 200, right: '10px', width: '50px',height: '14px', top: '17px', cursor: 'pointer' }} onClick={() => setShowPassword2(!showPassword2)}/>

                </label>

                { errorMessage && <p style={{ color: 'red'}}> {errorMessage} </p>}
                <input type="submit" className="login-btn" value="Reset Password"/>
              </form>
            </div>
          </div>
        </div>
    </main>
    </>
  )
}

export default ResetPassword;