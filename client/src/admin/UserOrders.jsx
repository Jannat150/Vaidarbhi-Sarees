import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await API.get(`/users/${id}/orders`);
    setOrders(data);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] p-10">

        <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">
          User Orders
        </h1>

        {orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
              >

                <div>

                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>

                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>

                  <p>
                    <strong>Status:</strong> {order.orderStatus}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(`/admin/orders/${order._id}`)
                  }
                  className="bg-[#8B1E3F] text-white px-6 py-2 rounded-lg"
                >
                  View Details
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

      <Footer />
    </>
  );
};

export default UserOrders;