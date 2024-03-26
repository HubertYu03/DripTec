// importing libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";

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

  return <div>Checkout</div>;
};

export default CartCheckout;
