// Importing Libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";
import { useParams } from "react-router";

const PaymentComplete = () => {
  const { orderNumber } = useParams();

  const [order, setOrder] = useState({});
  const [orderTrue, setOrderTrue] = useState(false);

  // Fetching user order
  const fetchOrder = async () => {
    let { data: Orders, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("trackingNumber", orderNumber)
      .eq("sessionID", localStorage.getItem("sessionID"));
    if (error == null) {
      // Check if order exists
      if (Orders.length != 0) {
        setOrderTrue(true);
      }
      setOrder(Orders[0]);
      console.log(Orders[0]);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      {orderTrue && (
        <div>
          <div>
            Thank you for your order {order.firstName + " " + order.lastName}!
          </div>
          <div>Your order number is {order.trackingNumber}</div>
          <div>
            You can track your order <a href="">here.</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentComplete;
