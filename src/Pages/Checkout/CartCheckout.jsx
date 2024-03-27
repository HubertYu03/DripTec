// importing libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";
import { motion } from "framer-motion";

// importing styles
import "./CartCheckout.css";
import CartCard from "../../Components/CartCard/CartCard";

const CartCheckout = () => {
  const [cart, setCart] = useState([]);
  const [preTax, setPreTax] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const fetchShoppingCartData = async () => {
    let { data: Cart, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", sessionStorage.getItem("sessionID"))
      .order("created_at", { ascending: false });

    setCart(Cart);

    // Calculating price data

    // Pretax price
    let totalPreTax = 0;
    for (let i = 0; i < Cart.length; i++) {
      totalPreTax += Cart[i].price;
    }
    setPreTax(totalPreTax);

    // 3% sales tax
    let tax = Math.round(0.03 * totalPreTax * 100) / 100;
    setTax(tax);

    // setting total price
    setPriceTotal(totalPreTax + tax);
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
