import * as React from "react";
import styles from "./SignUp.module.scss";
// import faceBookIcon from "assets/images/facebook.svg";
// import googleIcon from "assets/images/google.svg";
import SignUpForm from "./SignUpForm";
import AutoHero from "../Autohero";

const SignUp = () => {

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpWrapper}>
        <div className={styles.signUpContent}>
          <h3 style={{marginBottom: '20px', fontWeight: '700' }}>sign up</h3>

          {/* <div className={styles.socialMedia}>
            <div className={styles.google}>
              <p 
                <img src={googleIcon} alt="google" /> sign in with google
              </p>
            </div>
            <div className={styles.facebook}>
              <p onClick=>
                <img src={faceBookIcon} alt="facebook" /> sign in with facebook
              </p>
            </div>
          </div> */}

          <div className={styles.otherSignUp}>
            {/* <h2>
              <span>or continue email</span>
            </h2> */}
          </div>  
          <SignUpForm />
        </div>
      </div>

      <div className={styles.signUpPoster}>
        <AutoHero />
      </div>
    </div>
  );
};

export default SignUp;
