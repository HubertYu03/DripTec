// importing libraries
import { useEffect } from "react";
import { supabase } from "../../Client";

const CartCheckout = () => {
  const fetchShoppingCart = async () => {
    let { data, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", sessionStorage.getItem("sessionID"));
  };

  useEffect(() => {}, []);

  return <div></div>;
};

export default CartCheckout;
