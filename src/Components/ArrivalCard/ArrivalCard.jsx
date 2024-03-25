import React from "react";

import { IoStar } from "react-icons/io5";
import "./ArrivalCard.css";

const ArrivalCard = ({ itemData }) => {
  return (
    <div className="arrival-card-container">
      <img
        src={itemData.imageURL}
        alt="arrivalCardImage"
        className="arrival-card-image"
      />
      <div className="arrival-card-info">
        <div className="arrival-card-info-item-name">
          {itemData.productName}
        </div>
        <div className="arrival-card-info-item-reviews">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
        <div className="arrival-card-info-item-price">${itemData.price}</div>
      </div>
    </div>
  );
};

export default ArrivalCard;
