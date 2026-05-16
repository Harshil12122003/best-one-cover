import  React from "react";
import styles from "./SignIn.module.scss";
import SignInForm from "./SignInForm";
import AutoHero from "../Autohero";
import faceBookIcon from "assets/images/facebook.svg";
import googleIcon from "assets/images/google.svg";
// import { auth } from "../../../config/firebase-config";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
          <h3>signin</h3>

          {/* <div className={styles.socialMedia}>
            <div className={styles.google}>
              <p >
                <img src={googleIcon} alt="google" /> <span>sign in with google</span> 
              </p>
            </div>
            <div className={styles.facebook}>
              <p>
                <img src={faceBookIcon} alt="facebook" /> sign in with facebook
              </p>
            </div>
          </div> */}

          {/* <div className={styles.otherSignIn}>
            <h2>
              <span>or continue email</span>
            </h2>
          </div> */}
          <SignInForm />
        </div>
      </div>

      <div className={styles.signInPoster}>
        <AutoHero />
      </div>
    </div>
  );
};

export default SignIn;
