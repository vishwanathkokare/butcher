import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import Loading from "./components/ui/Loading";
import { toast } from "react-hot-toast";

const ProductPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const { dispatch } = useCart();
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
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
        const response = await axios.get(
          `https://butcher-jtol.onrender.com/api/v1/market/prices/${name}`
        );
        setPrice(response.data.price);
      } catch (error) {
        console.error("Error fetching product price:", error);
      } finally {
        setLoading(false);
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
      setLoading(true);
      setTimeout(
        () =>
          dispatch({
            type: "ADD_TO_CART",
            payload: {
              name: name || "",
              quantity: Number(quantity),
              image,
              price,
            },
          }),
        2000
      );
      setLoading(false);
      toast.success("Added to cart");
    }
  };

  const totalPrice = price * Number(quantity);

  if (loading) return <Loading />;

  return (
    <div className="text-black dark:text-white bg-gray-200 dark:bg-zinc-900 h-screen">
      <div className="container p-4 mx-auto pb-24 gap-6 ">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-contain mb-4"
          />
        )}
        <form className="flex flex-col gap-4">
          <div className="w-full">
            kg:
            <Input
              className="rounded"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
          </div>
          {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
          {name && name.toLowerCase() !== "eggs" && (
            <div className="flex gap-4 flex-wrap">
              {name && name.toLowerCase() === "mutton" && (
                <p
                  className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                  onClick={() => setQuantity(0.25)}
                >
                  250g
                </p>
              )}
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(0.5)}
              >
                500g
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(1)}
              >
                1kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(1.5)}
              >
                1.5kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(2)}
              >
                2kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(2.5)}
              >
                2.5kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(3)}
              >
                3kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(3.5)}
              >
                3.5kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(4)}
              >
                4kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(4.5)}
              >
                4.5kg
              </p>
              <p
                className="border border-black dark:border-white rounded cursor-pointer py-1 px-3"
                onClick={() => setQuantity(5)}
              >
                5kg
              </p>
            </div>
          )}
          <div className="text-lg font-semibold">
            Total Price: ₹{totalPrice.toFixed(2)}
          </div>
          <Button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-blue-700 text-black dark:text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding to Cart" : "Add to Cart"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
