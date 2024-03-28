import React from "react";

import { IoStar } from "react-icons/io5";
import "./ProductCard.css";

const ProductCard = ({ itemData }) => {
  return (
    <div className="product-card-container">
      <img
        src={itemData.imageURL}
        alt="productCardImage"
        className="product-card-image"
      />
      <div className="product-card-info">
        <div className="product-card-info-item-name">
          {itemData.productName}
        </div>
        <div className="product-card-info-item-reviews">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
        <div className="product-card-info-item-price">${itemData.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
