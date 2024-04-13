import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="inline-div">
        <h3>SOCIAL MEDIA</h3>
        <p className="SM-p-icons">
          <AiFillInstagram className="icons" />
          <AiFillFacebook className="icons" />
          <AiOutlineTwitter className="icons" />
          <AiFillYoutube className="icons" />
        </p>
        <p className="SM-p">
          <AiFillMail className="mail-icon" />
          <a className="SM-a" href="">
            hello@driptec.com
          </a>
        </p>
        <p className="SM-p">
          <AiFillPhone className="phone-icon" />
          <a className="SM-a" href="">
            (123) 456-7890
          </a>
        </p>
      </div>
      <div className="inline-div">
        <h3>ABOUT US</h3>
        <p>
          DripTec was founded in the <br />
          bottom of the Bermuda Triangle <br />
          by the last three Atlantean gods.
        </p>
        <p>
          Pray and worship us and <br />
          you will receive the <br />
          Luck of the Sea Enchantment.
        </p>
      </div>
      <div className="inline-div">
        <h3>SUPPORT</h3>
        <p className="SUPPORT-p">
          <a href="">Contact Us</a>
        </p>
        <p className="SUPPORT-p">
          <Link to={"/trackYourPackage"}>Track Your Order</Link>
        </p>
        <p className="SUPPORT-p">
          <a href="">Refund Policy</a>
        </p>
        <p className="SUPPORT-p">
          <a href="">Shipping Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
