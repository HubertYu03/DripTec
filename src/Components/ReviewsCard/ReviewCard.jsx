// import dependencies
import { IoStar } from "react-icons/io5";

// importing styles
import "./ReviewCard.css";

const ReviewCard = ({ ReviewData }) => {
  return (
    <div className="review-card-container">
      <div className="review-card-contents-container">
        <div className="review-card-header-container">
          <div className="review-card-review-container">
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </div>
          <div className="review-card-product-title">Anime Printed Hoodie</div>
          <div className="review-card-user">Jane Doe</div>
        </div>
        <div className="review-card-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto dolore
          inventore ab quibusdam optio blanditiis, iste eligendi eius adipisci,
          nisi deserunt nulla omnis voluptatum velit ratione, sequi ipsa itaque
          veniam?
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
