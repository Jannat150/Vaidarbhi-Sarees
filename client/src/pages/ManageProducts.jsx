import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ManageProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete product"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-10">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-[#8B1E3F]">
                Manage Products
              </h1>

              <p className="text-gray-500 mt-2">
                View, Edit and Delete Sarees
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/admin/products/add")
              }
              className="bg-[#8B1E3F] hover:bg-[#6f1732] text-white px-6 py-3 rounded-xl"
            >
              + Add Product
            </button>

          </div>

          {loading ? (
            <div className="text-center py-20 text-xl">
              Loading Products...
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

              <h2 className="text-2xl font-semibold">
                No Products Found
              </h2>

            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <table className="w-full">

                <thead className="bg-[#8B1E3F] text-white">

                  <tr>

                    <th className="p-4">
                      Image
                    </th>

                    <th>Name</th>

                    <th>Price</th>

                    <th>Discount</th>

                    <th>Stock</th>

                    <th>Featured</th>

                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-20 h-24 object-cover rounded-lg"
                        />

                      </td>

                      <td className="font-semibold">
                        {product.name}
                      </td>

                      <td>
                        ₹{product.price}
                      </td>

                      <td>

                        {product.discountPrice
                          ? `₹${product.discountPrice}`
                          : "-"}

                      </td>

                      <td>

                        {product.stock > 0 ? (
                          <span className="text-green-600 font-semibold">
                            {product.stock}
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Out of Stock
                          </span>
                        )}

                      </td>

                      <td>

                        {product.isFeatured ? (
                          <span className="text-green-600">
                            ⭐ Yes
                          </span>
                        ) : (
                          "No"
                        )}

                      </td>

                      <td>

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/products/edit/${product._id}`
                              )
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteHandler(product._id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ManageProducts;