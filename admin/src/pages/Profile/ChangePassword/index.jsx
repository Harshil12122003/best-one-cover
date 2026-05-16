import React, { useState } from "react";
import Password from "components/atoms/Password";
import styles from "./ChangePassword.module.scss";
import BaseButton from "components/atoms/Button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { adminActions } from "redux/Admin/action";
import { passwordSchema } from "schemas/Validation";

const ChangePassword = (props) => {
  // const changePwd = useSelector(state => state.user.changePassword)
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  });


  const handleResetPassword = (e) => {
    setChangePassword({
      oldPassword: "",
      newPassword: "",
      cPassword: "",
    });
  };

  const handleClickShowOldPassword = () => {
    setShowPassword((oldShow) => !oldShow);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((newShow) => !newShow);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((confirmShow) => !confirmShow);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useFormik({
    initialValues: changePassword,
    validationSchema : passwordSchema,

    onChange: (event) => {
      const { name, value } = event.target;
      setChangePassword({ ...changePassword, [name]: value });
    },

    onSubmit: () => {
      dispatch(adminActions.adminChangePassword(values))
    },
  });

  return (
    <div className={styles.ChangePassword}>
      <div className={styles.ChangePasswordHeader}>reset password</div>
      <form className={styles.ChangePasswordContainer} onSubmit={handleSubmit}>
        <div className={styles.passwordWrapper}>
          <div className={styles.password}>
            <Password
              name="oldPassword"
              label="OldPassword"
              value={values.oldPassword}
              showPassword={showPassword}
              onChange={handleChange}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowPassword={handleClickShowOldPassword}
              required
              error={errors.oldPassword ? true : false}
              helperText={errors.oldPassword}
            />
          </div>
          <div className={styles.password}>
            <Password
              name="newPassword"
              label="New Password"
              value={values.newPassword}
              showPassword={showNewPassword}
              onChange={handleChange}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowPassword={handleClickShowNewPassword}
              required
              error={errors.newPassword ? true : false}
              helperText={errors.newPassword}
            />
          </div>
          <div className={styles.password}>
            <Password
              name="cPassword"
              label="Confirm New Password"
              value={values.cPassword}
              onChange={handleChange}
              showPassword={showConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowPassword={handleClickShowConfirmPassword}
              required
              error={errors.cPassword ? true : false}
              helperText={errors.cPassword}
            />
          </div>
        </div>

        <div className={styles.setButton}>
          <BaseButton variant="contained" type="submit">
            update Password
          </BaseButton>
          <BaseButton
            variant="outlined"
            type="reset"
            onClick={handleResetPassword}
          >
            Reset
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
