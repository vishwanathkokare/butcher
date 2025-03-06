import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";

interface ProductPrice {
  _id: string;
  product: string;
  price: number;
}

const ProductManagementPage: React.FC = () => {
  const [productPrices, setProductPrices] = useState<ProductPrice[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductPrice | null>(
    null
  );
  const [newPrice, setNewPrice] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdatePriceLoading, setIsUpdatePriceLoading] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchProductPrices = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/v1/market/prices", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        setProductPrices(response.data); // Set the fetched product prices
      } catch (error) {
        console.error("Error fetching product prices:", error);
        toast.error("Failed to fetch product prices. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductPrices();
  }, []);

  const handleProductSelect = (product: ProductPrice) => {
    setSelectedProduct(product);
    setNewPrice(product.price);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(Number(e.target.value));
  };

  const handleUpdatePrice = async () => {
    if (selectedProduct && newPrice !== "") {
      setIsUpdatePriceLoading(true);
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.put(
          `/api/v1/market/prices/${selectedProduct._id}`,
          { price: newPrice },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );

        setProductPrices(
          productPrices.map((p) =>
            p._id === selectedProduct._id ? response.data : p
          )
        );
        setSelectedProduct(null);
        setNewPrice("");
        toast.success("Product price updated successfully!");
      } catch (error) {
        console.error("Error updating product price:", error);
        toast.error("Failed to update product price. Please try again.");
      } finally {
        setIsUpdatePriceLoading(false);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto py-10 px-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Prices</h2>
          <ul>
            {productPrices.map((product) => (
              <li key={product._id} className="mb-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleProductSelect(product)}
                >
                  {product.product}: {product.price}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedProduct && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Update Price for {selectedProduct.product}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdatePrice();
                }}
                className="flex flex-col gap-4"
              >
                <label className="block">
                  <span className="text-gray-700">New Price</span>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={handlePriceChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isUpdatePriceLoading ? "Updating..." : "Update Price"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
