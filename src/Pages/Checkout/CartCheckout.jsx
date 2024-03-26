// importing libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";

// importing styles
import "./CartCheckout.css";

const CartCheckout = () => {
  const [cart, setCart] = useState([]);

  const fetchShoppingCart = async () => {
    let { data, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", sessionStorage.getItem("sessionID"));
    if (error != null) {
      console.error("Could not fetch current cart");
    } else {
      setCart(data);
    }
  };

  useEffect(() => {
    fetchShoppingCart();
  }, []);

  return (
    <div className="checkout-page-container">
      <div className="checkout-cart-list-container">
        <div>Your Cart:</div>
      </div>
      <div>Checkout Details</div>
    </div>
  );
};

export default CartCheckout;
