// importing dependencies
import { supabase } from "../../Client";
import { useEffect, useState } from "react";

// importing components
import ArrivalCard from "../../Components/ArrivalCard/ArrivalCard";

// importing styles
import "./HomePage.css";
import ReviewCard from "../../Components/ReviewsCard/ReviewCard";

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const arrivalCategory = "Shirts";

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
    <div
      style={{
        marginBottom: "100px",
      }}
    >
      {/* Model image container  */}
      <div className="model-image-backgound">
        <button className="shop-now-button">Shop Now</button>
      </div>
      {/* New arrivals card container */}
      <div className="new-arrivals-center-container">
        <div className="new-arrivals-container">
          <div className="new-arrival-title-container">
            <div className="new-arrival-title">New Arrivals</div>
            <div className="new-arrival-subtitle">
              Take a look at our newest arrivals before they run out of stock
            </div>
          </div>

          <div className="arrival-cards-container">
            {newArrivals.map((item, index) => (
              <ArrivalCard
                itemData={item}
                category={arrivalCategory}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Container */}
      <div className="new-arrivals-center-container">
        <div className="new-arrivals-container">
          <div className="new-arrival-title-container">
            <div className="new-arrival-title">Reviews</div>
            <div className="new-arrival-subtitle">
              Check out some recent reviews from our customers
            </div>
          </div>

          <div className="arrival-cards-container">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
