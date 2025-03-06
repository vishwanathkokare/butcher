import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/admin/table";

interface Order {
  _id: string;
  name: string;
  quantity: number;
  address: string;
  phone: string;
  items: { name: string; quantity: number; price: number; image: string }[];
  createdAt: string;
}

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

        if (!token) {
          toast.error("No authentication token found");
          throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/v1/order", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        const resOrders = response.data.orders.reverse();

        setOrders(resOrders); // Reverse the order of the fetched orders
        orders.length !== 0 &&
          orders !== resOrders &&
          toast.success("Orders fetched successfully!");
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again.");
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <a href={`tel:${order.phone}`}>{order.phone}</a>
              </TableCell>
              <TableCell>
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.name} - {item.quantity} x RS: {item.price.toFixed(2)}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
