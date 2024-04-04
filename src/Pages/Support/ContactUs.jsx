import { React } from "react";

import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <div className="contact-us-header">Contact Us</div>
      <form method="post" action="">
        <fieldset className="contact-us-fieldset">
          <input
            className="contact-us-info"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
          ></input>
          <input
            className="contact-us-info"
            id="order-num"
            name="order-num"
            type="number"
            placeholder="Order #"
            required
          ></input>
          <input
            className="contact-us-info"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          ></input>
          <textarea
            className="contact-us-info"
            id="message"
            name="message"
            rows="5"
            cols="50"
            placeholder="Message"
          ></textarea>
        </fieldset>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default ContactUs;
