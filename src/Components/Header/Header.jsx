import "./Header.css";

//Icons
import { FiMenu } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

//Navigate
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();

  //   const handleClick = () => {
  // 	navigate("/");
  //   };

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <div className="header-container">
        {/* <FiMenu className="Menu-icon" /> */}
        <div className="Title" onClick={() => handleClick("/")}>
          DRIPTEC
        </div>
        <div
          className="search-bag-container"
          onClick={() => handleClick("checkout")}
        >
          {/* <FaSearch /> */}
          <MdOutlineShoppingBag />
        </div>
      </div>
      <div className="secondheader-container">
        <div
          className="Shirts"
          onClick={() => handleClick("/shoppingCategories")}
        >
          SHIRTS
        </div>
        <div
          className="Hoodies"
          onClick={() => handleClick("/shoppingCategories")}
        >
          HOODIES
        </div>
        <div
          className="Pants"
          onClick={() => handleClick("/shoppingCategories")}
        >
          PANTS
        </div>
      </div>
    </div>
  );
};

export default Header;
