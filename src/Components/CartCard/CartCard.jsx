// importing styles
import "./CartCard.css";

const CartCard = ({ itemData }) => {
  const imageURL = itemData.imageURL;

  return (
    <div className="cart-card-container">
      <img src={imageURL} alt="cartCardImg" className="card-card-img" />
      <div className="cart-card-container-right">
        <div className="cart-card-info-container">
          <div className="cart-card-title">{itemData.productName}</div>
          <div className="cart-card-price">${itemData.price}</div>
        </div>
        <button className="cart-card-delete-btn">Remove Item</button>
      </div>
    </div>
  );
};

export default CartCard;
