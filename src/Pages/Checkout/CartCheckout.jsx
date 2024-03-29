// importing libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";

// importing styles
import "./CartCheckout.css";
import CartCard from "../../Components/CartCard/CartCard";

const CartCheckout = () => {
  // State for the current shopping cart
  const [cart, setCart] = useState([]);

  // States for calculating price
  const [preTax, setPreTax] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [applyShippingFee, setApplyShippingFee] = useState(true);
  const shippingFee = 3.99;

  // Payment form intormation
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const [validEmail, setValidEmail] = useState();
  const [userEmail, setUserEmail] = useState("");

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
    if (!emailRegex.test(event.target.value)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const calcuatePrice = (pretotal) => {
    setPreTax(pretotal);

    // Apply shipping fee if the order is over 50 dollars
    if (pretotal >= 50) {
      setApplyShippingFee(false);
    }

    // 3% sales tax
    let tax = Math.round(0.03 * pretotal * 100) / 100;
    setTax(tax.toFixed(2));

    // setting total price depending on if applying shipping fee
    if (applyShippingFee) {
      setPriceTotal(
        Math.round((pretotal + shippingFee + tax + Number.EPSILON) * 100) / 100
      );
    } else {
      Math.round((pretotal + tax + Number.EPSILON) * 100) / 100;
    }
  };

  const fetchShoppingCartData = async () => {
    let { data: Cart, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", localStorage.getItem("sessionID"))
      .order("created_at", { ascending: false });

    if (error == null) {
      setCart(Cart);

      // Calculating price data
      // Pretax price
      let totalPreTax = 0;
      for (let i = 0; i < Cart.length; i++) {
        totalPreTax += Cart[i].price;
      }

      // accurate rounding
      totalPreTax = Math.round((totalPreTax + Number.EPSILON) * 100) / 100;

      calcuatePrice(totalPreTax);
    } else {
      console.error(error);
    }
  };

  // Small component that displays the prife
  const priceDisplay = (price, desc) => {
    return (
      <div className="price-display-container">
        <div>${price}</div>
        <div className="price-display-desc">{desc}</div>
      </div>
    );
  };

  // Update cart info based on changes to the cart database
  useEffect(() => {
    fetchShoppingCartData();
  }, [cart]);

  return (
    <div className="checkout-page-container">
      {cart != 0 ? (
        <>
          <div className="checkout-cart-list-container">
            <div className="checkout-cart-list-title">Your Cart:</div>
            <div>
              {cart.map((item, index) => (
                <CartCard itemData={item} key={index} />
              ))}
            </div>
          </div>
          <div className="checkout-details-container">
            <div className="order-summary-title">Order Summary</div>
            <div className="order-summary-container">
              <div className="order-summary-total-price">Price Total</div>
              {priceDisplay(preTax, "Subtotal")}
              {priceDisplay(tax, "Tax")}
              {applyShippingFee
                ? priceDisplay(shippingFee, "Shipping")
                : priceDisplay(0, "Shipping")}
              <hr
                style={{
                  marginBottom: "10px",
                }}
              />
              {priceDisplay(priceTotal, "Total")}
              <div className="payment-container">
                <div className="form-section-title">Delivery Information</div>
                <div className="email-form-container">
                  {/* Customer Email */}
                  <label>Email</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="input-field"
                    onChange={(event) => handleEmail(event)}
                  />
                  {!validEmail && userEmail != "" && (
                    <div className="invalid-email">Not a valid email!</div>
                  )}
                </div>
                <hr
                  style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                  }}
                />
                {/* Address input */}
                <div className="address-form-container">
                  <div className="form-section-text">Delivery Address</div>
                  <div className="form-names-input-container">
                    <div className="name-input-container">
                      <div>First Name</div>
                      <input type="text" className="input-field" />
                    </div>
                    <div className="name-input-container">
                      <div>Last Name</div>
                      <input type="text" className="input-field" />
                    </div>
                  </div>
                  <div className="street-input-container">
                    <div>Street Address</div>
                    <input type="text" className="input-field-address" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart-container">
          <div className="empty-cart-title">No items in Cart</div>
          <div className="empty-cart-subtext">Fill that cart up!</div>
          <button className="continue-shopping-button">Coninue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default CartCheckout;
