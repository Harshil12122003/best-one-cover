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
import axios from "axios";
import { Toast } from "utils/toast";

const ForgotPasswordForm = () => {
  const signin = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("ADMIN_TOKEN");
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState({
    email: "",
  });
  const [error, setError] = useState({
    email: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setSignIn({ ...signIn, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (signIn.email === "") {
      setError({ email: "Email Is Required!" });
    } else {
      console.log(signIn);
      axios
        .post("/admin/password-reset", signIn)
        .then((res) => {
          if (res.data) Toast("success", "Send a link to your email!");
          setSignIn({ ...signIn, email: "" });
          setError({ email: "" });
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
        });
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

  useEffect(() => {
    if (token && signin.token) {
      navigate("/");
    }
  }, [token, signin.token]);

  return (
    <div className={styles.signInForm}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputField}>
          <Input
            variant="outlined"
            name="email"
            label="Email"
            value={signIn.email}
            onChange={onChange}
            error={error.email ? true : false}
            helperText={error.email}
            sx={{ my: 2 }}
          />
        </div>

        <div className={styles.signInBtn}>
          <BaseButton variant="contained" type="submit">
            Send Request
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
