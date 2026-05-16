import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import Password from "components/atoms/Password";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SignUpForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "redux/Auth/action";
import { fieldValidation, validation } from "utils/validations";
import { loaderAction } from "redux/Loader/action";
import { Box, CircularProgress } from "@mui/material";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { networkProgressDialog } = useSelector((state) => state.loader);

  const [signUp, setSignUp] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [allFieldsError, SetAllFieldsError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
    fieldValidation(error, name, value)
    // var dataError = fieldValidation(error, name, value);
    setError({ ...error });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filedsError = signUp.fname === '' && signUp.lname === '' && signUp.email === '' && signUp.mobile === '' && signUp.password === '' && signUp.cpassword === '';
    if (validation(error, signUp) && !filedsError) {
      if (signUp.password === signUp.cpassword) {
        dispatch(loaderAction.startLoader())
        dispatch(authActions.Registration(signUp, navigate));
        setSignUp({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });

        // navigate("/signIn");
        SetAllFieldsError("");
      } else {
        SetAllFieldsError("Password does't match!");
      }
    } else {
      SetAllFieldsError("All fields are required!");
    }
  };

  const handleClickShowNewPassword = () => {
    setShowPassword((newShow) => !newShow);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((conShow) => !conShow);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.signUpForm}>
      <form
        className={styles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={styles.nameField} >
          <Input
            name="fname"
            label="First Name"
            value={signUp.fname}
            onChange={handleChange}
            required
            error={error?.fname ? true : false}
            helperText={error.fname}
          />
          <Input
            name="lname"
            label="Last Name"
            value={signUp.lname}
            onChange={handleChange}
            required
            error={error.lname ? true : false}
            helperText={error.lname}
          />
        </div>

        <div className={styles.inputField}>
          <Input
            name="email"
            label="Email"
            value={signUp.email}
            onChange={handleChange}
            required
            error={error.email ? true : false}
            helperText={error.email}
          />
        </div>

        <div className={styles.inputField}>
          <Input
            name="mobile"
            label="Mobile"
            value={signUp.mobile}
            onChange={handleChange}
            required
            error={error.mobile ? true : false}
            helperText={error.mobile}
            type="number"
            max={10}
          />
        </div>

        <div className={styles.PasswordField}>
          <Password
            // id="password"
            name="password"
            label="Password"
            value={signUp.password}
            onChange={handleChange}
            showPassword={showPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleClickShowPassword={handleClickShowNewPassword}
            required
            error={error.password ? true : false}
            helperText={error.password}
          />
        </div>
        <div className={styles.PasswordField}>
          <Password
            required
            name="cpassword"
            label="Confirm Password"
            value={signUp.cpassword}
            onChange={handleChange}
            showPassword={showConfirmPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleClickShowPassword={handleClickShowConfirmPassword}
            error={error.cpassword}
            helperText={error.cpassword}
          />
        </div>

        {allFieldsError && (
          <div className="text-danger">
            <p>{allFieldsError}</p>
          </div>
        )}

        <div className={styles.signUpBtn}>
          {!networkProgressDialog ?
            <BaseButton variant="contained" type="submit" >
              Sign up
            </BaseButton> : <Box sx={{ display: "grid", width: "100%", placeItems: "center", }}>
              <CircularProgress />
            </Box>
          }

        </div>
      </form>
      <div className={styles.NavigatingSignIn}>
        <p>
          already have an account?&nbsp;{" "}
          <NavLink to="/signIn" className={styles.signIn} style={{ color: '#1972D2', fontWeight: '500' }} >
            SignIn
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
