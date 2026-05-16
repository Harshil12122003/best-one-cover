import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import Password from "components/atoms/Password";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "schemas/Validation";
import { authActions } from "redux/Auth/action";
import styles from "./SignInForm.module.scss";

const SigninForm = () => {
  const signin  = useSelector(state => state.auth.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("ADMIN_TOKEN");
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  
  const handleMouseDownPassword = () => {
    setShowPassword((newShow) => !newShow);
  };
  const handleClickShowNewPassword = (event) => {
    event.preventDefault();
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: signIn,
    validationSchema: loginSchema,

    onChange: (event) => {
      const { name, value } = event.target;
      setSignIn({ ...signIn, [name]: value });
    },

    onSubmit: () => {
      dispatch(authActions.adminLogin(values));
    },
  });

  useEffect(() => {
    if (token && signin.token) {
      navigate("/");
    }
  },[token,signin.token]);

  return (
    <div className={styles.signInForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <Input
            variant="outlined"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
        </div>

        <div className={styles.PasswordField} style={{width: "100%", marginTop: "10px"}}>
          <Password
            label="Password"
            name="password"
            showPassword={showPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleClickShowPassword={handleClickShowNewPassword}
            value={values.password}
            onChange={handleChange}
            error={errors.password ? true : false}
            helperText={errors.password}
          />
        </div>

        <div className={styles.forgotPassword}>
          <NavLink to={"/forgot-password"}>forgot password?</NavLink>
        </div>

        <div className={styles.signInBtn} style={{width: "100%"}}>
          <BaseButton variant="contained" type="submit">
            Sign In
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
