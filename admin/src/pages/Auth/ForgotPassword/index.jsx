import  React from "react";
import styles from "./SignIn.module.scss";
import AutoHero from "../Autohero";
import faceBookIcon from "assets/images/facebook.svg";
import googleIcon from "assets/images/google.svg";
import ForgotPasswordForm from "./ForgotPasswordForm";
// import { auth } from "../../../config/firebase-config";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // const navigate = useNavigate()
  // const provider = new GoogleAuthProvider();
  // const handleSocialAuth = async (provider) => {
  //   try {
  //     const response = await signInWithPopup(auth, provider);
  //     if (response) {
  //       // console.log("response", response);
  //       const credential = await GoogleAuthProvider.credentialFromResult(
  //         response
  //       );
  //       const token = credential.idToken;
  //       // console.log('token', token)
  //       localStorage.setItem("TOKEN", token);
  //       // const tokenData = localStorage.getItem('TOKEN')
  //       //   if(tokenData){
  //       //     navigate("/")
  //       //   }
        

  //     }
  //   } catch (error) {
  //     // const errorCode = error.code;
  //     // const errorMessage = error.message;
  //     // const email = error.customData.email;
  //     // const credential = GoogleAuthProvider.credentialFromError(error);
  //     console.log("error", error);
  //   }
  // };

  return (
    <div className={styles.signIn}>
      <div className={styles.signInWrapper}>
        <div className={styles.signInContent}>
          <h3>Forgot Password</h3>

          <p>We will a send request to your email for reset password</p>
          <ForgotPasswordForm />
        </div>
      </div>

      <div className={styles.signInPoster}>
        <AutoHero />
      </div>
    </div>
  );
};

export default ForgotPassword;
