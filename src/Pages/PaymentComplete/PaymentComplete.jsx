// Importing Libraries
import { useEffect, useState } from "react";
import { supabase } from "../../Client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// importing styles
import "./PaymentComplete.css";

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
        setOrder(Orders[0]);
        console.log(Orders[0]);
      } else {
        console.log("This order does not exist");
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="payment-complete-page-container">
      {orderTrue && (
        <div className="order-complete-info-container">
          <div className="order-complete-title">
            Thank you for your order {order.firstName + " " + order.lastName}!
          </div>
          <div className="order-complete-text">
            Your order number is{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {order.trackingNumber}
            </span>
            .
          </div>
          <div className="order-complete-text">
            You can track your order <Link to={"/trackYourPackage"}>here</Link>.
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentComplete;
