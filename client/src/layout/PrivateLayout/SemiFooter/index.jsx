import { Divider } from "@mui/material";
import React from "react";
import styles from "./SemiFooter.module.scss";
import { NavLink } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import white_logo from '../../../assets/images/white_logo.svg'

const Footer = () => {

  return (
    // <div className={styles.semiFooter}>
    //     <Divider />
    //     <div className={styles.semiFooterContainer}>
    //         <div className={styles.aboutUs}>
    //             <NavLink to="/aboutus" className={styles.aboutUs}>
    //                 About us
    //             </NavLink>
    //         </div>|
    //         <div className={styles.contactUs}>
    //             <NavLink to="/contactus" className={styles.ContactUs}>
    //                 Contact us
    //             </NavLink>
    //         </div>
    //     </div>
    // </div>
    <div className={styles.semiFooter}>
      <div className="row mt-4 mb-3">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <div className={styles.socialMedia}>

            <div className="d-flex">
              <NavLink className={styles.navLink} to={"/"}>
                <img src={white_logo} height={40} width={90} alt="Best-1 Logo" />
              </NavLink>
            </div>
            <p className="pt-3 w-75">102, Rachana Shopping Center, Rachana Circle, Kapodara, Surat, Gujarat, 395006.</p>
            <div className={styles.mediaIcon}>

              <a target="_blank" href="https://www.facebook.com/mobilecasecovershop/">
                <FacebookRoundedIcon className={styles.faceBook} />
              </a>
              <a target="_blank" href="https://www.instagram.com/best_1_cover_house/">
                <InstagramIcon className={styles.instagram} />
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-2 col-sm-4 col-xs-12">
          <h5 className={styles.footerTitle}>About</h5>
          <ul className="footer-link">
            <li>
              <NavLink className={styles.navLink} to={"/aboutus"}>
                About Us
              </NavLink>
              <li>
                <NavLink className={styles.navLink} to={"/contactus"}>
                  Contact Us
                </NavLink>
              </li>
            </li>
            {/* <li><a>Join the Team</a></li> */}

          </ul>
        </div>

        <div className="col-md-2 col-sm-4 col-xs-12">
          <h5 className={styles.footerTitle}>Consumer Policy</h5>
          <ul className="footer-link">
            <li>
              <NavLink className={styles.navLink} to={"/privacy-policy"}>Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink className={styles.navLink} to={"/terms-conditions"}>Terms & Condition</NavLink>
            </li>

            <li>
              <NavLink className={styles.navLink} to={"/shipping-policy"}>Shipping Policy</NavLink>
            </li>
          </ul>
        </div>

        <div className="col-md-2 col-sm-4 col-xs-12">
          <h5 className={styles.footerTitle}>My Account</h5>
          <ul className="footer-link">
            <li>
              <NavLink className={styles.navLink} to={"/profile"}>
                My Account
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.navLink} to={"/orders"}>
                Order History
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.navLink} to={"/cart"}>
                Cartlist
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
