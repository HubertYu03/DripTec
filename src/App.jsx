// importing libraries
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

// importing components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// importing pages
import HomePage from "./Pages/Home/HomePage";
import ShoppingCategories from "./Pages/ShoppingCategories/ShoppingCategories";
import Individiual from "./Pages/Individual/Individual";
import CartCheckout from "./Pages/Checkout/CartCheckout";

// importing styles
import "./App.css";
import { supabase } from "./Client";

function App() {
  // Adding unique session id for each user
  useEffect(() => {
    if (localStorage.getItem("sessionID") != null) {
      console.log("Welcome Back");
    } else {
      localStorage.setItem("sessionID", uuid());
    }
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shoppingCategories" element={<ShoppingCategories />} />
          <Route
            path="/individualProduct/:Category/:id"
            element={<Individiual />}
          />
          <Route path="/checkout" element={<CartCheckout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
