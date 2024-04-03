import React from "react";

import "./SummaryCard.css";

const SummaryCard = ({ itemData }) => {
  return (
    <div className="summary-card-container">
      <img
        src={itemData.imageURL}
        alt="productImage"
        className="summary-card-image"
      />
      <div className="summary-card-info-container">
        <div
          style={{
            fontSize: "20px",
            fontWeight: "200",
          }}
        >
          {itemData.productName}
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "gray",
            fontWeight: "200",
          }}
        >
          {itemData.size}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
