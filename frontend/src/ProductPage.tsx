import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "react-hot-toast";

const ProductPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const { dispatch } = useCart();
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [errors, setErrors] = useState({
    quantity: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const imageUrl = params.get("image");
    if (imageUrl) {
      setImage(imageUrl);
    }

    if (name && name.toLowerCase() === "eggs" && quantity < 12) {
      setQuantity(12);
      setErrors((prevErrors) => ({
        ...prevErrors,
        quantity: "Minimum quantity for eggs is 12",
      }));
    }

    const fetchProductPrice = async () => {
      try {
        const response = await axios.get(`/api/v1/market/prices/${name}`);
        setPrice(response.data.price);
      } catch (error) {
        console.error("Error fetching product price:", error);
      }
    };

    fetchProductPrice();
  }, [location.search, name, quantity]);

  const validate = () => {
    let valid = true;
    const newErrors = { quantity: "" };

    if (!quantity) {
      newErrors.quantity = "Quantity is required";
      valid = false;
    } else if (Number(quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than zero";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddToCart = () => {
    if (validate()) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          name: name || "",
          quantity: Number(quantity),
          image,
          price,
        },
      }),
        toast.success("Added to cart");
    }
  };

  const totalPrice = price * Number(quantity);

  return (
    <div className="text-black dark:text-white bg-gray-200 dark:bg-zinc-800 min-h-screen p-4 pb-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Image */}
          <div className="flex justify-center items-center">
            {image && (
              <img
                src={image}
                alt={name}
                className="w-full max-w-md h-auto object-contain rounded-lg"
              />
            )}
          </div>

          {/* Right Section - Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">{name}</h1>

            {/* Quantity Input */}
            <div className="w-full">
              <label htmlFor="quantity" className="block text-lg font-medium">
                Quantity (kg):
              </label>
              <Input
                id="quantity"
                className="rounded mt-2"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Quick Quantity Selectors */}
            {name && name.toLowerCase() !== "eggs" && (
              <div className="flex flex-wrap gap-2">
                {name && name.toLowerCase() === "mutton" && (
                  <Button variant="outline" onClick={() => setQuantity(0.25)}>
                    250g
                  </Button>
                )}
                {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((qty) => (
                  <Button
                    key={qty}
                    variant="outline"
                    onClick={() => setQuantity(qty)}
                  >
                    {qty}kg
                  </Button>
                ))}
              </div>
            )}

            {/* Total Price */}
            <div className="text-2xl font-semibold">
              Total Price: ₹{totalPrice.toFixed(2)}
            </div>

            {/* Add to Cart Button */}
            <Button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
