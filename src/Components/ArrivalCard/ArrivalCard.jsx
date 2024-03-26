// importing dependencies
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// importing styles
import "./ArrivalCard.css";

const ArrivalCard = ({ itemData, category }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/individualProduct/${category}/${itemData.id}`);
  };

  return (
    <motion.div
      className="arrival-card-container"
      onClick={handleClick}
      whileTap={{
        scale: 0.95,
      }}
    >
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
    </motion.div>
  );
};

export default ArrivalCard;
