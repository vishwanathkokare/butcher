import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Reload from "./components/ui/Reload";
import Loading from "./components/ui/Loading";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/ui/Navbar";
import Header from "./components/ui/Header";
import SlotTime from "./components/ui/SlotTime";

const Home = lazy(() => import("./Home"));
const ProductPage = lazy(() => import("./ProductPage"));
const CartPage = lazy(() => import("./CartPage"));
const NotFound = lazy(() => import("./NotFound"));

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <SlotTime />
        <Header />
        {!isOnline && <Reload />}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:name" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Navbar />
      </Router>
    </CartProvider>
  );
};

export default App;
