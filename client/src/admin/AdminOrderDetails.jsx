import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminOrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const { data } = await API.get(`/orders/${id}`);

    setOrder(data);
    setStatus(data.orderStatus);
  };

  const updateStatus = async () => {
    await API.put(`/orders/${id}/status`, {
      orderStatus: status,
    });

    alert("Status Updated");

    fetchOrder();
  };

  if (!order) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] p-10">

        <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">
          Order Details
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Ordered Products
          </h2>

          {order.items.map((item) => (

            <div
              key={item._id}
              className="flex items-center gap-6 border-b py-5"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-36 rounded-lg object-cover"
              />

              <div>

                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p>₹{item.price}</p>

                <p>Quantity : {item.quantity}</p>

              </div>

            </div>

          ))}

          <div className="mt-8">

            <h3 className="font-bold mb-3">
              Shipping Address
            </h3>

            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.pincode}</p>
            <p>{order.shippingAddress.phone}</p>

          </div>

          <div className="mt-8">

            <label className="font-bold">
              Order Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border p-3 rounded-xl mt-3"
            >
              <option value="placed">Placed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out for delivery">
                Out for Delivery
              </option>
              <option value="delivered">
                Delivered
              </option>
              <option value="cancelled">
                Cancelled
              </option>
            </select>

            <button
              onClick={updateStatus}
              className="mt-6 bg-[#8B1E3F] text-white px-8 py-3 rounded-xl"
            >
              Update Status
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default AdminOrderDetails;