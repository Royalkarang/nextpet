"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import routes from "../../../../config/routes";
import Cookies from "js-cookie";
import { signUpUser } from "../../../services/authService"; // Import the API service

const SignUp = () => {
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_user_id");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;

    if (!(emailRegex.test(email))) {
      setErrorMessage("Invalid email Address ");
      return;
    } else if (!(passwordRegex.test(password))) {
      setErrorMessage("Password must contain at least 6 characters, including uppercase letters, lowercase letters, numbers, and special characters.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await signUpUser(formData); // Call the API service

      if (response.data.msg_type === "false") {
        setErrorMessage(response.data.msg || "Validation error");
        setSuccessMessage("");
      } else {
        const expireDate = new Date(new Date().getTime() + 190 * 1000);
        Cookies.set("name", name, { expires: expireDate });
        Cookies.set("email", email, { expires: expireDate });
        Cookies.set("password", password, { expires: expireDate });
        Cookies.set("otp_email", response.data.otp, { expires: expireDate });

        setSuccessMessage(response.data.msg || "Registration successful");
        setErrorMessage("");
        router.push(routes.breeder_varification_code);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="breeder-signinflow-wrap">
      <div className="breeder-signinflow-inner">
        <div className="breeder-signin-leftsec">
          <Image
            src="/images/Nextpet-imgs/big-logo.svg"
            alt="Logo"
            width={270}
            height={306}
          />
        </div>
        <div className="breeder-signin-rightsec">
          <form onSubmit={handleSignUp}>
            <h1>Breeder Sign Up</h1>
            <label className="login-lbl">
              <Image
                src="/images/Nextpet-imgs/breeder-signin-imgs/user.svg"
                alt="User Icon"
                width={20}
                height={20} className="login-lbl-img"
              />
              <input
                type="text"
                className="login-txt"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="login-lbl">
              <Image
                src="/images/Nextpet-imgs/breeder-signin-imgs/mail-icon.svg"
                alt="Email Icon"
                width={20}
                height={20} className="login-lbl-img"
              />
              <input
                type="email"
                className="login-txt"
                placeholder="Email/Phone"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="login-lbl">
              <Image
                src="/images/Nextpet-imgs/breeder-signin-imgs/pass-icon.svg"
                alt="Password Icon"
                width={20}
                height={20} className="login-lbl-img"
              />
              <input
                type={showPassword ? "text":"password"}
                className="login-txt"
                id="password"
                placeholder="Create Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Image src={showPassword ? "/images/Nextpet-imgs/breeder-signin-imgs/eye-open.svg" : "/images/Nextpet-imgs/breeder-signin-imgs/eye-close.svg"} alt="Password" width={20} height={20} style={{ position: 'absolute', zIndex: 200, right: '10px', width: '50px',height: '14px', top: '17px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}/>
            </label>

            {/* Error and Success Messages */}
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div style={{ color: "green", marginTop: "10px" }}>
                {successMessage}
              </div>
            )}

            <input type="submit" className="login-btn" value="Sign Up" />

            <div className="terms-condition-paragraph">
              <p>
                By signing up, you agree to our <a href="#">Privacy Policy</a>{" "}
                and <a href="#">Terms and Conditions</a>.
              </p>
            </div>
            <div className="or-sec-wrap">
              <h3>Or Sign Up using</h3>
            </div>

            {/* Social Login */}
            <div className="social-login-wrap">
              <a href="#">
                <Image
                  src="/images/Nextpet-imgs/breeder-signin-imgs/socail1.png"
                  alt="Social 1"
                  width={30}
                  height={30}
                />
              </a>
              <a href="#">
                <Image
                  src="/images/Nextpet-imgs/breeder-signin-imgs/social2.png"
                  alt="Social 2"
                  width={30}
                  height={30}
                />
              </a>
              <a href="#">
                <Image
                  src="/images/Nextpet-imgs/breeder-signin-imgs/social3.png"
                  alt="Social 3"
                  width={30}
                  height={30}
                />
              </a>
            </div>

            <div className="dont-have-accountwrap">
              <p>
                Already have an account?{" "}
                <Link href={routes.breeder_sign_in}>Sign In</Link>
              </p>
              <p>
                Not a Breeder? <a href="/user/sign-up">Sign Up</a> as a User?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
