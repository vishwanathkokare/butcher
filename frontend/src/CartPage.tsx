import React, { useState, useEffect } from "react";
import { useCart } from "./contexts/CartContext";
import axios from "axios";
import Modal from "./components/ui/Modal";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "./components/ui/Loading";
import toast from "react-hot-toast";

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchDetails = localStorage.getItem("details");
  const parseFetchDetails = fetchDetails
    ? JSON.parse(fetchDetails)
    : { name: "", address: "", phone: "" };
  const [formData, setFormData] = useState({
    name: parseFetchDetails.name,
    address: parseFetchDetails.address,
    phone: parseFetchDetails.phone,
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState<{ [key: string]: number }>({}); // Store fetched prices

  // Fetch prices for all items in the cart
  useEffect(() => {
    const fetchPrices = async () => {
      const priceMap: { [key: string]: number } = {};
      for (const item of state.items) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/market/prices/${item.name}`
          );
          priceMap[item.name] = response.data.price;
        } catch (error) {
          console.error(`Error fetching price for ${item.name}:`, error);
          priceMap[item.name] = item.price; // Fallback to the price in state if API fails
        }
      }
      setPrices(priceMap);
    };

    if (state.items.length > 0) {
      fetchPrices();
    }
  }, [state.items]);

  const handleIncrement = (name: string) => {
    dispatch({
      type: "INCREMENT_QUANTITY",
      payload: { name, quantity: 0, image: "", price: 0 },
    });
  };

  const handleDecrement = (name: string) => {
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: { name, quantity: 0, image: "", price: 0 },
    });
  };

  const handleDelete = (name: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        name,
        quantity: 0,
        image: "",
        price: 0,
      },
    });
  };

  const calculateTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.quantity * (prices[item.name] || item.price),
      0
    );
  };

  const handleCheckout = () => {
    if (state.items.length > 0) {
      setIsModalOpen(true);
    } else {
      toast.error("Your cart is empty");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = { name: "", address: "", phone: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const orderData = {
      name: formData.name,
      quantity: state.items.reduce((total, item) => total + item.quantity, 0),
      address: formData.address,
      phone: formData.phone,
      items: state.items.map((item) => ({
        ...item,
        price: prices[item.name] || item.price, // Use fetched price or fallback to state price
      })),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/create`,
        orderData
      );
      if (response.data.success) {
        toast.success("Order created successfully");
        dispatch({
          type: "CLEAR_CART",
          payload: { name: "", quantity: 0, image: "", price: 0 },
        });
        window.location.href = "/";
      } else {
        toast.error("Failed to create order");
      }
      localStorage.setItem(
        "details",
        JSON.stringify({
          name: orderData.name,
          address: orderData.address,
          phone: orderData.phone,
        })
      );
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-zinc-800 text-black dark:text-white min-h-screen">
      <div className="container mx-auto p-4 pb-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <div className="cart-items">
              {state.items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                state.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between border-b border-black dark:border-white py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecrement(item.name)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 font-bold py-1 text-2xl px-4 rounded-full"
                        >
                          -
                        </button>
                        <span className="mx-4">{item.quantity}kg</span>
                        <button
                          onClick={() => handleIncrement(item.name)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 font-bold py-1 text-2xl px-4 rounded-full"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleDelete(item.name)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      <p className="ml-auto text-lg mt-2 font-semibold">
                        ₹{(
                          item.quantity * (prices[item.name] || item.price)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="md:w-1/3">
            <div className="bg-gray-100 dark:bg-zinc-700 text-black dark:text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Delivery Charges:</span>
                <span>15RS per kilometers(km) from chtrapati chowk,nanded to delivery location</span>
              </div>
              <hr className="border-gray-300 dark:border-zinc-600" />
              <div className="flex justify-between mt-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "Order Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Checkout */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
          <form className="flex flex-col gap-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
            >
              Submit
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CartPage;