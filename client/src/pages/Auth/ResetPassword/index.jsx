import React, { useEffect, useState } from "react";
import styles from "./SignIn.module.scss";
import AutoHero from "../Autohero";
import faceBookIcon from "assets/images/facebook.svg";
import googleIcon from "assets/images/google.svg";
import ResetPasswordForm from "./ResetPasswordForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Button } from "@material-ui/core";
// import { auth } from "../../../config/firebase-config";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  // const navigate = useNavigate()

  // const provider = new GoogleAuthProvider();
  // const handleSocialAuth = async (provider) => {
  //   try {
  //     const response = await signInWithPopup(auth, provider);
  //     if (response) {
  //       const credential = await GoogleAuthProvider.credentialFromResult(
  //         response
  //       );
  //       const token = credential.idToken;
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
  const { userId, token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`/password-reset/token/valid/${userId}/${token}`)
      .then((res) => {
        if (!res.data.error) {
          setValidToken(true);
          setLoading(false);
        } else {
          setValidToken(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setValidToken(false);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.signIn}>
      {validToken && !loading && (
        <div className={styles.signInWrapper}>
          <div className={styles.signInContent}>
            <h3>Reset Password</h3>

            <p>Reset Password</p>
            <ResetPasswordForm />
          </div>
        </div>
      )}
      {!validToken && !loading &&  <div className={styles.signInWrapper}>
        <div className={styles.signInContent}>
          
            <div >
              <h3>Reset Password</h3>
              <p>
                Sorry, your reset password link has been expired. You can
                request another one below.
              </p>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/forgot-password");
                }}
                color="primary"
              >
                Reset Password
              </Button>
            </div>
         
        </div>
      </div>
       }
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className={styles.signInPoster}>
        <AutoHero />
      </div>
    </div>
  );
};

export default ResetPassword;
