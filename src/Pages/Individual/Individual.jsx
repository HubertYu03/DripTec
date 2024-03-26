import { FaRegStar } from "react-icons/fa";

import "./Individual.css";

const Individual = () => {
  return (
    <div>
      <div className="Page-Container">
        <div className="Image-Container">
          <div className="Big-Pic"></div>
        </div>
        <div className="Info-Container">
          <div className="General-Info">
            Title of Shirt
            <div className="Stars">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div>
            <div className="Cost">[Cost]</div>
            <div className="Sizes">
              <div className="Small">Small</div>
              <div className="Medium">Medium</div>
              <div className="Large">Large</div>
            </div>
            <div className="Cart">Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
