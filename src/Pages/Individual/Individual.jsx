import React from "react";
import { FiAlignJustify } from "react-icons/fi";


const Individual = () => {
  return (
    <div className="header-container">
      <FiAlignJustify className="Menu-icon" />
      <div className="Title">PANDORA</div>
      <div className="search-bag-container">
        {/* <FaSearch />
        <MdOutlineShoppingBag /> */}
      </div>
    </div>
  );
};

export default Individual;
