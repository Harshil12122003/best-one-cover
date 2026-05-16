import React, { useState } from "react";
import Password from "components/atoms/Password";
import styles from "./ChangePassword.module.scss";
import BaseButton from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { userActions } from "redux/User/action";
import { fieldValidation, validation } from "utils/validations";
import { authActions } from "redux/Auth/action";

const ChangePassword = (props) => {
  // const changePwd = useSelector(state => state.user.changePassword)
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [allFieldsError, SetAllFieldsError] = useState("");

  const dispatch = useDispatch();

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  });

  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    setChangePassword({ ...changePassword, [name]: value });
    fieldValidation(error, name, value);

    setError({ ...error });
  };
  const handleResetPassword = (e) => {
    setChangePassword({
      oldPassword: "",
      newPassword: "",
      cPassword: "",
    });
    SetAllFieldsError("")

  };
  const handleSetPassword = (e) => {
    e.preventDefault();

    if (validation(error, changePassword)) {
      if (changePassword.newPassword === changePassword.cPassword) {
        dispatch(userActions.ChangePassword({ ...changePassword }));
        // dispatch(authActions.userLogout());
        setChangePassword({
          oldPassword: "",
          newPassword: "",
          cPassword: "",
        });
        SetAllFieldsError("")
      } else {
        SetAllFieldsError("Password does't match!");
      }
    } else {
      SetAllFieldsError("All fields are required!");
    }
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
  
  return (
    <div className={styles.ChangePassword}>
       <div className={styles.ChangePasswordHeader}>reset password</div>
      <form
        className={styles.ChangePasswordContainer}
        onSubmit={handleSetPassword}
        >
        <div className={styles.passwordWrapper}>
          <div className={styles.password}>
            <Password
              name="oldPassword"
              label="OldPassword"
              value={changePassword.oldPassword}
              showPassword={showPassword}
              onChange={handleChangePassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowPassword={handleClickShowOldPassword}
              required
              error={error.oldPassword ? true : false}
              helperText={error.oldPassword}
            />
          </div>
          <div className={styles.password}>
            <Password
              name="newPassword"
              label="New Password"
              value={changePassword.newPassword}
              showPassword={showNewPassword}
              onChange={handleChangePassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowPassword={handleClickShowNewPassword}
              required
              error={error.newPassword ? true : false}
              helperText={error.newPassword}
            />
          </div>
          <div className={styles.password}>
            <Password
              name="cPassword"
              label="Confirm New Password"
              value={changePassword.cPassword}
              onChange={handleChangePassword}
              showPassword={showConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowPassword={handleClickShowConfirmPassword}
              required
              error={error.cPassword ? true : false}
              helperText={error.cPassword}
            />
          </div>
        </div>

        {allFieldsError && (
          <div className={styles.errorMsg}>
            <p>{allFieldsError}</p>
          </div>
        )}

        <div className={styles.setButton}>
          <BaseButton variant="contained" type="submit">
            Update Password
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
