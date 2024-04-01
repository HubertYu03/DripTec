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
  const [sortPreference, setSortPreference] = useState({
    bestSelling: false,
    aToZ: false,
    zToA: false,
    lowToHigh: false,
    highToLow: false,
    oldToNew: false,
    newToOld: false,
  });

  // checkbox fieldset onClick
  const handleTypePreferences = (event) => {
    const { id, checked } = event.target;
    setTypePreferences({ ...typePreferences, [id]: checked });
  };

  // radio fieldset onClick
  const handleSortPreference = (event) => {
    const { id, checked } = event.target;
    setSortPreference({ [id]: checked });
  };

  // fetch selected products
  const fetchNewShoppingCategories = async () => {
    let newShoppingCategoriesList = [];

    // product type
    if (typePreferences.shirts) {
      await fetchShirts(newShoppingCategoriesList);
    }

    if (typePreferences.hoodies) {
      await fetchHoodies(newShoppingCategoriesList);
    }

    if (typePreferences.pants) {
      await fetchPants(newShoppingCategoriesList);
    }

    // sort by
    if (sortPreference.bestSelling) {
      await newShoppingCategoriesList.sort(
        (a, b) => b.total_ordered - a.total_ordered
      );
    } else if (sortPreference.aToZ) {
      await newShoppingCategoriesList.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    } else if (sortPreference.zToA) {
      await newShoppingCategoriesList.sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
    } else if (sortPreference.lowToHigh) {
      await newShoppingCategoriesList.sort((a, b) => a.price - b.price);
    } else if (sortPreference.highToLow) {
      // newShoppingCategoriesList.order("price", {ascending: false});
      await newShoppingCategoriesList.sort((a, b) => b.price - a.price);
    } else if (sortPreference.oldToNew) {
      await newShoppingCategoriesList.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (sortPreference.newToOld) {
      await newShoppingCategoriesList.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
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
  }, [sortPreference, typePreferences]);

  return (
    <div className="shopping-categories-body">
      <div className="shopping-categories-container">
        <div className="fieldsets">
          <p>Product Type</p>
          <fieldset className="product-type">
            <input
              id="shirts"
              type="checkbox"
              name="clothingType"
              value="shirts"
              className="shopping-categories-input"
              onClick={handleTypePreferences}
            />
            <label for="shirts">Shirts</label>
            <input
              id="hoodies"
              type="checkbox"
              name="clothingType"
              value="hoodies"
              className="shopping-categories-input"
              onClick={handleTypePreferences}
            />
            <label for="hoodies">Hoodies</label>
            <input
              id="pants"
              type="checkbox"
              name="clothingType"
              value="pants"
              className="shopping-categories-input"
              onClick={handleTypePreferences}
            />
            <label for="pants">Pants</label>
          </fieldset>
          <p>Sort By</p>
          <fieldset className="sortBy">
            <input
              id="bestSelling"
              type="radio"
              name="sort"
              value="bestSelling"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="bestSelling">Best Selling</label>
            <input
              id="aToZ"
              type="radio"
              name="sort"
              value="aToZ"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="aToZ">Alphabetically, A-Z</label>
            <input
              id="zToA"
              type="radio"
              name="sort"
              value="zToA"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="zToA">Alphabetically, Z-A</label>
            <input
              id="lowToHigh"
              type="radio"
              name="sort"
              value="lowToHigh"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="lowToHigh">Price, Low to High</label>
            <input
              id="highToLow"
              type="radio"
              name="sort"
              value="highToLow"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="highToLow">Price, High to Low</label>
            <input
              id="oldToNew"
              type="radio"
              name="sort"
              value="oldToNew"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="oldToNew">Date, Old to New</label>
            <input
              id="newToOld"
              type="radio"
              name="sort"
              value="newToOld"
              className="shopping-categories-input"
              onClick={handleSortPreference}
            />
            <label for="newToOld">Date, New to Old</label>
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
    </div>
  );
};

export default HomePage;
