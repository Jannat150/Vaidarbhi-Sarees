import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

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
    images: [],
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/id/${id}`);

      setProduct({
        ...data,
        tags: data.tags?.join(", ") || "",
      });
    } catch (err) {
      console.log(err);
      alert("Unable to load product");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const uploadImages = async () => {
    if (images.length === 0) {
      return product.images;
    }

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img);
    });

    const { data } = await API.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data.urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const imageUrls =
        await uploadImages();

      await API.put(`/products/${id}`, {
        ...product,
        images: imageUrls,
        tags: product.tags
          .split(",")
          .map((tag) => tag.trim()),
      });

      alert("Product Updated");

      navigate("/admin/products");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="number"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            placeholder="Discount Price"
            className="border p-3 rounded-xl"
          />

          <input
            name="fabric"
            value={product.fabric}
            onChange={handleChange}
            placeholder="Fabric"
            className="border p-3 rounded-xl"
          />

          <input
            name="occasion"
            value={product.occasion}
            onChange={handleChange}
            placeholder="Occasion"
            className="border p-3 rounded-xl"
          />

          <input
            name="workType"
            value={product.workType}
            onChange={handleChange}
            placeholder="Work Type"
            className="border p-3 rounded-xl"
          />

          <input
            name="color"
            value={product.color}
            onChange={handleChange}
            placeholder="Color"
            className="border p-3 rounded-xl"
          />

          <input
            name="region"
            value={product.region}
            onChange={handleChange}
            placeholder="Region"
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-3 rounded-xl"
          />

          <select
            name="blouseType"
            value={product.blouseType}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="none">
              No Blouse
            </option>
            <option value="stitched">
              Stitched
            </option>
            <option value="unstitched">
              Unstitched
            </option>
          </select>

          <textarea
            rows="5"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-xl md:col-span-2"
          />

          <input
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Tags"
            className="border p-3 rounded-xl md:col-span-2"
          />

          <div className="md:col-span-2">

            <p className="font-semibold mb-3">
              Current Images
            </p>

            <div className="flex gap-4 flex-wrap">

              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-28 h-32 object-cover rounded-lg"
                />
              ))}

            </div>

          </div>

          <input
            type="file"
            multiple
            onChange={(e) =>
              setImages([...e.target.files])
            }
            className="md:col-span-2"
          />

          <label className="flex gap-3 md:col-span-2">

            <input
              type="checkbox"
              name="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
            />

            Featured Product

          </label>

          <button
            disabled={loading}
            className="bg-[#8B1E3F] text-white py-3 rounded-xl md:col-span-2"
          >
            {loading
              ? "Updating..."
              : "Update Product"}
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
};

export default EditProduct;