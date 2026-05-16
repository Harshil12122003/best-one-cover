import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import Password from "components/atoms/Password";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "redux/Auth/action";
import { fieldValidation, validation } from "utils/validations";
import styles from "./SignInForm.module.scss";
import { loaderAction } from "redux/Loader/action";
import { Box, CircularProgress } from "@mui/material";

const SigninForm = () => {
  // const token = useSelector((state) => state.auth.auth.token);
  const { networkProgressDialog } = useSelector((state) => state.loader);

  const token = localStorage.getItem('TOKEN')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log("networkProgressDialog", networkProgressDialog)

  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [allFieldsError, SetAllFieldsError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
    fieldValidation(error, name, value)
    setError({ ...error });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validation(error, signIn)) {
      dispatch(loaderAction.startLoader())
      dispatch(authActions.Login(signIn, navigate));

      setSignIn({
        email: "",
        password: "",
      });

      SetAllFieldsError("");
    } else {
      SetAllFieldsError("All fields are required!");
    }
  };

  const handleMouseDownPassword = () => {
    setShowPassword((newShow) => !newShow);
  };
  const handleClickShowNewPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // dispatch.
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <div className={styles.signInForm}>
      <div className={styles.form}>
        <div className={styles.inputField}>
          <Input
            variant="outlined"
            name="email"
            label="Email"
            value={signIn.email}
            onChange={handleChange}
            error={error.email ? true : false}
            helperText={error.email}
          />
        </div>

        <div className={styles.PasswordField}>
          <Password
            label="Password"
            name="password"
            showPassword={showPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleClickShowPassword={handleClickShowNewPassword}
            value={signIn.password}
            onChange={handleChange}
            error={error.password ? true : false}
            helperText={error.password}
          />
        </div>

        <div className={styles.forgotPassword}>
          <NavLink style={{ color: '#1972D2', fontWeight: '500' }} to="/forgot-password">Forgot Password ?</NavLink>
        </div>


        {allFieldsError && (
          <div className="text-danger">
            <p>{allFieldsError}</p>
          </div>
        )}

        <div className={styles.signInBtn}>
          {!networkProgressDialog ? <BaseButton variant="contained" onClick={handleSubmit} style={{ background: "#1976D2" }}>
            Sign In
          </BaseButton> : <Box sx={{ display: "grid",  width: "100%", placeItems: "center", }}>

            <CircularProgress />
          </Box>
          }

        </div>

        <div className={styles.NavigatesignUp}>
          <p>
            Not a Member yet?&nbsp;{" "}
            <NavLink to="/signUp" className={styles.signIn} style={{ color: '#1972D2', fontWeight: '500' }}>
              SignUp
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
