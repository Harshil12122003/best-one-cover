import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import Password from "components/atoms/Password";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from "./SignInForm.module.scss";
import axios from "axios";
import { Toast } from "utils/toast";

const ResetPasswordForm = () => {
  const signin = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("ADMIN_TOKEN");
  const [showPassword, setShowPassword] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId, token: passwordToken } = useParams();
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    cPassword: "",
  });
  const [error, setError] = useState({
    newPassword: "",
    cPassword: "",
  });
  const [errorData, setErrorData] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === "" || passwordData.cPassword === "") {
      passwordData.newPassword === "" &&
        setError({ ...error, newPassword: "Password Is Required!" });
      passwordData.cPassword === "" &&
        setError({ ...error, cPassword: "Confirm Password Is Required!" });
    } else {
      if (passwordData?.cPassword === passwordData?.newPassword) {
        delete !passwordData?.cPassword;
        axios
          .post(`/password-reset/${userId}/${passwordToken}`, passwordData)
          .then((res) => {
            if (!res.data.error)
              Toast("success", "Password Reset Successfully!");
              navigate("/signin");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {  
        setError("Password does't match!");
      }
    }
  };

  // const { values, errors, handleChange, handleSubmit } = useFormik({
  //   initialValues: signIn,
  //   validationSchema: loginSchema,

  //   onChange: (event) => {
  //     const { name, value } = event.target;
  //     setSignIn({ ...signIn, [name]: value });
  //   },

  // });

  const handleMouseDownPassword = () => {
    setShowPassword((newShow) => !newShow);
  };
  const handleClickShowNewPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   if (token && signin.token) {
  //     navigate("/");
  //   }
    
  // }, [token, signin.token]);

  return (
    <div className={styles.signInForm}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.PasswordField}>
          <Password
            label="New Password"
            name="newPassword"
            showPassword={showPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleClickShowPassword={handleClickShowNewPassword}
            value={passwordData.newPassword}
            onChange={onChange}
            error={error.newPassword ? true : false}
            helperText={error.newPassword}
          />
        </div>
        <div className={styles.PasswordField}>
          <Password
            label="Confirm Password"
            name="cPassword"
            showPassword={showPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleClickShowPassword={handleClickShowNewPassword}
            value={passwordData.cPassword}
            onChange={onChange}
            error={error.cPassword ? true : false}
            helperText={error.cPassword}
          />
        </div>
        <p>{errorData}</p>
        <div className={styles.signInBtn}>
          <BaseButton variant="contained" type="submit" style={{background:"#1e1e2d"}}>
            Reset Password
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
