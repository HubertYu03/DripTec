// importing dependencies
import { supabase } from "../../Client";
import { useEffect, useState } from "react";

// importing components
import ProductCard from "../../Components/ProductCard/ProductCard";

// importing styles
import "./ShoppingCategories.css";

const HomePage = () => {
  const [newShoppingCategories, setNewShoppingCategories] = useState([]);
  const [typePreferences, setTypePreferences] = useState({
    shirts: false,
    hoodies: false,
    pants: false,
  });

  // checkbox fieldset onClick
  const handleTypePreferences = (event) => {
    const { id, checked } = event.target;
    setTypePreferences({ ...typePreferences, [id]: checked });
  };

  // fetch selected products
  const fetchNewShoppingCategories = async () => {
    let newShoppingCategoriesList = [];

    if (typePreferences.shirts) {
      await fetchShirts(newShoppingCategoriesList);
    }

    if (typePreferences.hoodies) {
      await fetchHoodies(newShoppingCategoriesList);
    }

    if (typePreferences.pants) {
      await fetchPants(newShoppingCategoriesList);
    }

    setNewShoppingCategories(newShoppingCategoriesList);
  };

  const fetchShirts = async (newShoppingCategoriesList) => {
    let { data, error } = await supabase.from("Shirts").select("*");
    if (error) {
      console.error(error);
    } else {
      for (let i = 0; i < data.length; i++) {
        newShoppingCategoriesList.push(data[i]);
      }
    }
  };

  const fetchHoodies = async (newShoppingCategoriesList) => {
    let { data, error } = await supabase.from("Hoodies").select("*");
    if (error) {
      console.error(error);
    } else {
      for (let i = 0; i < data.length; i++) {
        newShoppingCategoriesList.push(data[i]);
      }
    }
  };

  const fetchPants = async (newShoppingCategoriesList) => {
    let { data, error } = await supabase.from("Pants").select("*");
    if (error) {
      console.error(error);
    } else {
      for (let i = 0; i < data.length; i++) {
        newShoppingCategoriesList.push(data[i]);
      }
    }
  };

  useEffect(() => {
    fetchNewShoppingCategories();
  }, [typePreferences]);

  return (
    <div>
      <div className="fieldsets">
        <p>Product Type</p>
        <fieldset className="product-type">
          <input
            id="shirts"
            type="checkbox"
            name="clothingType"
            value="shirts"
            onClick={handleTypePreferences}
          />
          <label for="shirts">Shirts</label>
          <input
            id="hoodies"
            type="checkbox"
            name="clothingType"
            value="hoodies"
            onClick={handleTypePreferences}
          />
          <label for="hoodies">Hoodies</label>
          <input
            id="pants"
            type="checkbox"
            name="clothingType"
            value="pants"
            onClick={handleTypePreferences}
          />
          <label for="pants">Pants</label>
        </fieldset>
        <p>Sort By</p>
        <fieldset className="sortBy">
          <input
            id="best-selling"
            type="radio"
            name="sort"
            value="best-selling"
          />
          <label for="best-selling">Best Selling</label>
          <input id="a-z" type="radio" name="sort" value="a-z" />
          <label for="a-z">Alphabetically, A-Z</label>
          <input id="z-a" type="radio" name="sort" value="z-a" />
          <label for="z-a">Alphabetically, Z-A</label>
          <input
            id="low-to-high"
            type="radio"
            name="sort"
            value="low-to-high"
          />
          <label for="low-to-high">Price, Low to High</label>
          <input
            id="high-to-low"
            type="radio"
            name="sort"
            value="high-to-low"
          />
          <label for="high-to-low">Price, High to Low</label>
          <input id="old-to-new" type="radio" name="sort" value="old-to-new" />
          <label for="old-to-new">Date, Old to New</label>
          <input id="new-to-old" type="radio" name="sort" value="new-to-old" />
          <label for="new-to-old">Date, New to Old</label>
        </fieldset>
      </div>

      <div className="top-right">
        <button>1</button>
        <button>n</button>
        <p>n product</p>
      </div>

      {/* New arrivals card container */}
      <div className="new-products-center-container">
        <div className="new-products-container">
          <div className="product-cards-container">
            {newShoppingCategories.map((item, index) => (
              <ProductCard itemData={item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-right">
        <button>1</button>
        <button>n</button>
        <p>n product</p>
      </div>
    </div>
  );
};

export default HomePage;
