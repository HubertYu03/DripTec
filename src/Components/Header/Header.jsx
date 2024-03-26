import "./Header.css";

//Icons
import { FiMenu } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

const Header = () => {
  return (
    <div>
      <div className="header-container">
        <FiMenu className="Menu-icon" />
        <div className="Title">DRIPTEC</div>
        <div className="search-bag-container">
          <FaSearch />
          <MdOutlineShoppingBag />
        </div>
      </div>
      <div className="secondheader-container">
        <div>SHIRTS</div>
        <div>HOODIES</div>
        <div>PANTS</div>
      </div>
    </div>
  );
};

export default Header;
