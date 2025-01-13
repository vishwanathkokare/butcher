import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./ProductPage";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./CartPage";
import Navbar from "@/components/ui/Navbar"

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:name" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Navbar />
      </Router>
    </CartProvider>
  );
};

export default App;
