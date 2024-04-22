import "./Header.css";

//Icons
import { MdOutlineShoppingBag } from "react-icons/md";

//Navigate
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();

  const loggedIn = true;

  //   const handleClick = () => {
  // 	navigate("/");
  //   };

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <div className="header-container">
        {loggedIn ? (
          <div className="UserName">John Doe</div>
        ) : (
          <div className="UserName">Guest</div>
        )}
        <div className="Title" onClick={() => handleClick("/")}>
          DRIPTEC
        </div>
        <div
          className="search-bag-container"
          onClick={() => handleClick("checkout")}
        >
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
