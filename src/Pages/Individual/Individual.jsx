import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../Client";

import "./Individual.css";

const Individual = () => {
  const [clothingData, setClothingData] = useState({});
  const [details, setDetails] = useState([]);
  const [currentSize, setCurrentSize] = useState("");

  const sizes = ["Small", "Medium", "Large"];

  let { Category, id } = useParams();

  const fetchClothingItem = async () => {
    let { data, error } = await supabase
      .from(Category)
      .select("*")
      .eq("id", id);
    setClothingData(data[0]);
    setDetails(data[0].details);
  };

  const selectSize = (selection) => {
    setCurrentSize(selection);
    console.log("Current selected size: " + selection);
  };

  const addToBag = () => {
    if (currentSize == "") {
      alert("Please select a size");
    } else {
      const data = {
        productName: clothingData.productName,
        price: clothingData.price,
        sessionID: localStorage.getItem("sessionID"),
        imageURL: clothingData.imageURL,
        itemID: clothingData.id,
        category: Category,
        size: currentSize,
      };

      console.log(data);
    }
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
            <div className="General-info-header">
              <div>{clothingData.productName}</div>
              <div className="Cost">${clothingData.price}</div>
              <div className="Details-container">
                {details.map((detail, index) => (
                  <div className="detail" key={index}>
                    - {detail}
                  </div>
                ))}
              </div>
            </div>
            <div className="Order-parameters">
              {/* size buttons */}
              <div className="Sizes">
                {sizes.map((size, index) => (
                  <button
                    className={`${
                      size == currentSize
                        ? "size-button-selected"
                        : "size-button"
                    }`}
                    key={index}
                    onClick={() => selectSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Add to cart buttons */}
              <button className="Cart" onClick={addToBag}>
                Add to Cart
              </button>
              {/* successfully added to cart message */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
