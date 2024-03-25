// importing libraries
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// importing components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// importing pages
import HomePage from "./Pages/Home/HomePage";
import ShoppingCategories from "./Pages/ShoppingCategories/ShoppingCategories";
import Individiual from "./Pages/Individual/Individual";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shoppingCategories" element={<ShoppingCategories />} />
          <Route path="/individualProduct" element={<Individiual />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
