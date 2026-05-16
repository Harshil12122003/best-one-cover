import React, { useState } from "react";
import styles from "./ContactUs.module.scss";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import SendIcon from "@mui/icons-material/Send";
import Input from "components/atoms/Input";
import BaseButton from "components/atoms/Button";
// import GoogleMapReact from "google-map-react";
// import Marker from "components/Marker";
import { useDispatch } from "react-redux";
import { userActions } from "redux/User/action";
import { fieldValidation, validation } from "utils/validations";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [allFieldsError, SetAllFieldsError] = useState("");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    message: "",
  });

  // const defaultProps = {
  //   center: {
  //     lat: 21.212980493986112,
  //     lng: 72.86788316285737,
  //   },
  //   zoom: 15,
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setContact({ ...contact, [name]: value });

    fieldValidation(error, name, value);
    // var dataError = fieldValidation(error, name, value);
    setError({ ...error });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation(error, contact)) {
      dispatch(userActions.contactUs(contact));
      setContact({
        name: "",
        email: "",
        message: "",
      });

      SetAllFieldsError("");
    } else {
      SetAllFieldsError("All fields are required!");
    }
  };

  return (
    <div className={styles.contactUs}>
      <div className={styles.contactUsContainer}>
        <div className={styles.contactInfo}>
          <div className={styles.address}>
            <div className={styles.addIcon}>
              <PlaceIcon />
            </div>
            <h5>
              102, Rachana Shopping Center, Kapodra, Surat
            </h5>
          </div>
          <div className={styles.mobile}>
            <div className={styles.phoneIcon}>
              <CallIcon />
            </div>

            <h5>+91 94284 51559</h5>
          </div>
          <div className={styles.email}>
            <div className={styles.emailIcon}>
              <SendIcon />
            </div>

            <h5>best1cover@gmail.com</h5>
          </div>
        </div>
        <div className={styles.contactForm}>
          <div className={styles.form}>
            <div className={styles.headerContact}>
              <h5>Contact Us</h5>
            </div>
            <form
              className={styles.fieldContent}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className={styles.name}>
                <Input
                  variant="standard"
                  label="Your Name"
                  name="name"
                  value={contact.name}
                  onChange={handleChange}
                  required
                  error={error.name ? true : false}
                  helperText={error.name}
                />
              </div>
              <div className={styles.email}>
                <Input
                  variant="standard"
                  label="Email Address"
                  name="email"
                  value={contact.email}
                  onChange={handleChange}
                  required
                  error={error.email ? true : false}
                  helperText={error.email}
                />
              </div>
              <div className={styles.message}>
                <Input
                  variant="standard"
                  label="Message"
                  name="message"
                  value={contact.message}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  required
                  error={error.message ? true : false}
                  helperText={error.message}
                />
              </div>

              {allFieldsError && (
                <div className="text-danger">
                  <p>{allFieldsError}</p>
                </div>
              )}
              <div className={styles.sendBtn}>
                <BaseButton
                  variant="contained"
                  type="submit"
                >
                  submit
                </BaseButton>
              </div>
            </form>
          </div>
          <div className={styles.mapParent}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d353.66292977504656!2d72.86775094894399!3d21.21279958284329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f71fc73fc7b%3A0x780be180559aab8d!2sBestOne%20Cover%20House!5e0!3m2!1sen!2sin!4v1681724259710!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
            {/* <GoogleMapReact
              bootstrapURLKeys={
                {
                  key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
                }
              }
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <Marker
                lat={21.212980493986112}
                lng={72.86788316285737}
                text="My Marker"
              />
            </GoogleMapReact> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
