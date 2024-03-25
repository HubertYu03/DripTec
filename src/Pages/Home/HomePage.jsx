// importing dependencies
import { supabase } from "../../Client";
import { useEffect, useState } from "react";

// importing styles
import "./HomePage.css";
import ArrivalCard from "../../Components/ArrivalCard/ArrivalCard";

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  const fetchNewArrivals = async () => {
    let { data, error } = await supabase
      .from("Shirts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      let newArrivalsList = [];
      for (let i = 0; i < 3; i++) {
        newArrivalsList.push(data[i]);
      }
      setNewArrivals(newArrivalsList);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div>
      <div>Model Images</div>
      <div className="new-arrival-title-container">
        <div className="new-arrival-title">New Arrivals</div>
        <div className="new-arrival-subtitle">
          Take a look at our newest arrivals before they run out of stock
        </div>
      </div>

      <div className="arrival-cards-container">
        {newArrivals.map((item, index) => (
          <ArrivalCard itemData={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
