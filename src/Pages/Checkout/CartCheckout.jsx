// importing libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";
import { motion } from "framer-motion";

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
  const shippingFee = 6.99;

  const fetchShoppingCartData = async () => {
    let { data: Cart, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", localStorage.getItem("sessionID"))
      .order("created_at", { ascending: false });

    setCart(Cart);

    // Calculating price data
    // Pretax price
    let totalPreTax = 0;
    for (let i = 0; i < Cart.length; i++) {
      totalPreTax += Cart[i].price;
    }
    setPreTax(totalPreTax);

    // Apply shipping fee if the order is over 50 dollars
    if (totalPreTax >= 50) {
      setApplyShippingFee(false);
    }

    // 3% sales tax
    let tax = Math.round(0.03 * totalPreTax * 100) / 100;
    setTax(tax);

    // setting total price depending on if applying shipping fee
    if (applyShippingFee) {
      setPriceTotal(totalPreTax + shippingFee + tax);
    } else {
      setPriceTotal(totalPreTax + tax);
    }
  };

  const priceDisplay = (price, desc) => {
    return (
      <div className="price-display-container">
        <div>${price}</div>
        <div className="price-display-desc">{desc}</div>
      </div>
    );
  };

  useEffect(() => {
    fetchShoppingCartData();
  }, [cart]);

  return (
    <div className="checkout-page-container">
      <div className="checkout-cart-list-container">
        <div className="checkout-cart-list-title">Your Cart:</div>
        <div>
          {cart > 0
            ? cart.map((item, index) => (
                <CartCard itemData={item} key={index} />
              ))
            : "Nothing in cart"}
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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
