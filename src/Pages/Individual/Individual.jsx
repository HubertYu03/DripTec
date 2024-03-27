import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../Client";

import "./Individual.css";

const Individual = () => {
  const [clothingData, setClothingData] = useState({});
  const [details, setDetails] = useState([]);

  let { Category, id } = useParams();

  const fetchClothingItem = async () => {
    let { data, error } = await supabase
      .from(Category)
      .select("*")
      .eq("id", id);
    setClothingData(data[0]);
    setDetails(data[0].details);
  };

  useEffect(() => {
    fetchClothingItem();
  }, []);

  return (
    <div>
      <div className="Page-Container">
        <div className="Image-Container">
          <img
            src={clothingData.imageURL}
            alt="productImage"
            className="Big-Pic"
          />
        </div>
        <div className="Info-Container">
          <div className="General-Info">
            {clothingData.productName}
            {/* <div className="Stars">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div> */}
            <div className="Cost">${clothingData.price}</div>
            <div className="Sizes">
              <div className="Small">Small</div>
              <div className="Medium">Medium</div>
              <div className="Large">Large</div>
            </div>
            <div className="Cart">Add to Cart</div>
            <div className="Details-container">
              {details.map((detail, index) => (
                <div className="detail">- {detail}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
