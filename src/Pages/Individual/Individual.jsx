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
            {/* <div className="Stars">
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div> */}
            <div className="Cost">[Cost]</div>
            <div className="Sizes">
              <div className="Small">Small</div>
              <div className="Medium">Medium</div>
              <div className="Large">Large</div>
            </div>
            <div className="Cart">Add to Cart</div>
            <div className="Details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              iusto dolores repellendus quisquam reprehenderit laboriosam sint
              dolorum praesentium maxime amet nemo maiores dolorem, eveniet
              itaque eligendi repellat temporibus aperiam. Ab?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
