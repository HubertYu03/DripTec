// importing dependencies
import { supabase } from "../../Client";

// importing styles
import "./CartCard.css";

const CartCard = ({ itemData }) => {
  const imageURL = itemData.imageURL;

  const removeItemFromCart = async () => {
    const { error } = await supabase
      .from("Cart")
      .delete()
      .eq("id", itemData.id);

    window.location.reload();
  };

  return (
    <div className="cart-card-container">
      <img src={imageURL} alt="cartCardImg" className="card-card-img" />
      <div className="cart-card-container-right">
        <div className="cart-card-info-container">
          <div className="cart-card-title">{itemData.productName}</div>
          <div className="cart-card-price">${itemData.price}</div>
          <div className="cart-card-size">{itemData.size}</div>
        </div>
        <button className="cart-card-delete-btn" onClick={removeItemFromCart}>
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default CartCard;
