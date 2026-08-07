import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddProduct = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    fabric: "",
    occasion: "",
    workType: "",
    color: "",
    region: "",
    blouseIncluded: false,
    blouseType: "none",
    stock: "",
    tags: "",
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img);
    });

    const { data } = await API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const imageUrls = await uploadImages();

      await API.post("/products", {
        ...product,
        images: imageUrls,
        tags: product.tags.split(","),
      });

      alert("Product Added Successfully");

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 px-6">

        <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">
          Add New Saree
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="discountPrice"
            placeholder="Discount Price"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="fabric"
            placeholder="Fabric"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="occasion"
            placeholder="Occasion"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="workType"
            placeholder="Work Type"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="color"
            placeholder="Color"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            name="region"
            placeholder="Region"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="stock"
            placeholder="Stock"
            type="number"
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <select
            name="blouseType"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="none">No Blouse</option>
            <option value="stitched">Stitched</option>
            <option value="unstitched">Unstitched</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded-xl md:col-span-2"
            rows="5"
            required
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            className="border p-3 rounded-xl md:col-span-2"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="md:col-span-2"
          />

          <label className="flex items-center gap-3 md:col-span-2">

            <input
              type="checkbox"
              name="isFeatured"
              onChange={handleChange}
            />

            Featured Product

          </label>

          <button
            disabled={loading}
            className="bg-[#8B1E3F] text-white py-3 rounded-xl md:col-span-2"
          >
            {loading ? "Saving..." : "Add Product"}
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
};

export default AddProduct;