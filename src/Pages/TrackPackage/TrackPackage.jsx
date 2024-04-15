// importing dependencies
import { useState } from "react";
import { supabase } from "../../Client";

// importing styles
import "./TrackPackage.css";

const TrackPackage = () => {
  const [orderNum, setOrderNum] = useState("");
  const [orderExists, setOrderExists] = useState(false);
  const [order, setOrder] = useState({});

  const handleSubmit = async () => {
    let { data: Orders, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("trackingNumber", orderNum);
    if (Orders.length > 0) {
      console.log("Order exists");
      setOrderNum("");
      setOrder(Orders[0]);
    } else {
      console.log("Order does not exist");
    }
  };

  return (
    <div className="track-package-page-container">
      <div className="track-package-title">Track Your Order</div>
      <input
        type="text"
        placeholder="Your order number..."
        className="track-number-input"
        value={orderNum}
        onChange={(event) => setOrderNum(event.target.value)}
      />
      <button className="track-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TrackPackage;
