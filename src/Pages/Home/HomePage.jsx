// importing dependencies
import { supabase } from "../../Client";
import { useEffect, useState } from "react";

// importing styles
import "./HomePage.css";

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
      {newArrivals.map((item, index) => (
        <div key={index}>{item.productName}</div>
      ))}
    </div>
  );
};

export default HomePage;
