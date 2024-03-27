// importing libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";

// importing styles
import "./CartCheckout.css";
import CartCard from "../../Components/CartCard/CartCard";

const CartCheckout = () => {
  const [cart, setCart] = useState([]);

  const fetchShoppingCart = async () => {
    let { data: Cart, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", sessionStorage.getItem("sessionID"))
      .order("created_at", { ascending: false });

    setCart(Cart);
  };

  useEffect(() => {
    fetchShoppingCart();
  }, []);

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
      <div className="checkout-details-container">Checkout Details</div>
    </div>
  );
};

export default CartCheckout;
