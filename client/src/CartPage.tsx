import React, { useState } from "react";
import { useCart } from "./contexts/CartContext";
import axios from "axios";
import Modal from "./components/ui/Modal";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/ui/Navbar";
import Loading from "./components/ui/Loading";
import toast from "react-hot-toast";

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      (total, item) => total + item.quantity * item.price,
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
      items: state.items,
    };

    try {
      const response = await axios.post(
        "https://butcher-jtol.onrender.comhttps://butcher-jtol.onrender.comhttps://butcher-jtol.onrender.comhttps://butcher-jtol.onrender.com/api/v1/order/create",
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
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 pb-24">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <div className="cart-items">
              {state.items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                state.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-evenly border-b py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecrement(item.name)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
                        >
                          -
                        </button>
                        <span className="mx-4">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.name)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
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
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="md:w-1/3 md:ml-8 mb-[14vh]">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Delivery Charges:</span>
                <span>We Will Contact You</span>
              </div>
              <hr />
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
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Submit
            </Button>
          </form>
        </Modal>
      </div>
      <Navbar />
    </>
  );
};

export default CartPage;
