// Importing Libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { supabase } from "../../Client";
import { InputMask } from "primereact/inputmask";

import Cards from "react-credit-cards-2";
import axios from "axios";

// importing styles
import "./Payment.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import SummaryCard from "./SummaryCard";

const Payment = () => {
  // Constant varables
  const URL = "https://api.exchangerate-api.com/v4/latest/usd";
  const [order, setOrder] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(false);
  const [creditCardInfo, setCreditCardinfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [focus, setFocus] = useState("");
  const [validCardNumber, setValidCardNumber] = useState(false);

  const cvcEx = /[0-9]{3}/;
  const creditCardEx = /[0-9]/;
  const nameEx = /[a-z]/;
  const validThruex = /[0-9]{4}/;

  let navigate = useNavigate();

  const handleNoConfirmedOrders = () => {
    navigate("/checkout");
  };

  // Fetching user order
  const fetchOrder = async () => {
    let { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("sessionID", localStorage.getItem("sessionID"));
    if (error == null) {
      // Checking if there are any confirmed orders
      if (data[0] != null) {
        setConfirmedOrder(true);
        // console.log(data[0].itemsData[0].productName);
        setOrder(data[0]);
      }
    } else {
      console.error(error);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCreditCardinfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardNumber = (evt) => {
    const { name, value } = evt.target;
    setCreditCardinfo((prev) => ({ ...prev, [name]: value }));
    if (!creditCardEx.test(evt.target.value)) {
      console.log("InvalidCard");
    } else {
      console.log("Valid Card");
    }
  };

  const handleCVCFocus = () => {
    setFocus("cvc");
  };

  const handleNormalFocus = () => {
    setFocus("");
  };

  const handleSubmit = () => {
    console.log(creditCardInfo);
  };

  // Edit order button
  const editOrder = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    axios.get(URL).then((res) => {
      console.log(res.data.rates);
    });

    fetchOrder();
  }, []);

  return (
    <>
      {!confirmedOrder ? (
        <div className="payment-page-no-confirmation">
          <div className="no-orders-message">You have no confirmed orders.</div>
          <button
            className="return-checkout-button"
            onClick={handleNoConfirmedOrders}
          >
            <div className="button-text-icon-container">
              <IoArrowBack />
              <div>Confirm Your Order</div>
            </div>
          </button>
        </div>
      ) : (
        <div className="payment-page-container">
          <div className="your-order-container">
            <div className="your-order-title">Your Order</div>
            <div className="your-order-price">Total Price: ${order.cost}</div>
            <button className="your-order-edit-button" onClick={editOrder}>
              Edit
            </button>
            <div className="your-order-products-container">
              {order.itemsData.map((item, index) => (
                <SummaryCard itemData={item} key={index} />
              ))}
              <div>
                <hr
                  style={{
                    marginTop: "20px",
                  }}
                />
              </div>
            </div>
            <div className="payment-info-title">Payment Info</div>
            <div className="payment-input-container">
              <div className="payment-card-image-container">
                <Cards
                  number={creditCardInfo.number}
                  expiry={creditCardInfo.expiry}
                  cvc={creditCardInfo.cvc}
                  name={creditCardInfo.name}
                  focused={focus}
                />
              </div>
              <div className="payment-input-fields-container">
                <input
                  type="text"
                  inputMode="numeric"
                  name="number"
                  placeholder="Card Number"
                  className="input-field-large"
                  value={creditCardInfo.number}
                  onChange={handleCardNumber}
                  onFocus={handleNormalFocus}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input-field-large"
                  value={creditCardInfo.name}
                  onChange={handleInputChange}
                  onFocus={handleNormalFocus}
                  autoComplete="off"
                />
                <div className="payment-short-input-container">
                  <InputMask
                    mask="99/99"
                    slotChar=""
                    type="tel"
                    name="expiry"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    className="input-field-small"
                    required
                    onChange={handleInputChange}
                    onFocus={handleNormalFocus}
                  />
                  <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    className="input-field-small"
                    required
                    maxLength={3}
                    onChange={handleInputChange}
                    onFocus={handleCVCFocus}
                  />
                </div>
              </div>
            </div>
            <button className="your-order-edit-button" onClick={handleSubmit}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
