import {
  FiArrowRight,
} from "react-icons/fi";

const categories = [
  {
    name: "Silk Sarees",
    image:
      "https://www.kollybollyethnics.com/image/catalog/data/07Oct2022/Silk-Saree-with-blouse-in-Light-green-colour-1465.jpg",
  },
  {
    name: "Cotton Sarees",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.DfSHyM23JjTzqesEQyoK5AHaKd?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Banarasi Sarees",
    image:
      "https://media.urbanwomania.com/wp-content/uploads/2023/05/Japanese-Violet-Banarasi-Saree.webp",
  },
  {
    name: "Kanjivaram",
    image:
      "https://i.pinimg.com/originals/4a/ed/d6/4aedd6e771a5ab94d026740498c94fb2.jpg",
  },
  {
    name: "Organza",
    image:
      "https://i.pinimg.com/originals/5d/2c/03/5d2c03f53e720be28a31fc2fa6c3dd76.jpg",
  },
  {
    name: "Chiffon",
    image:
      "https://cdn.shopify.com/s/files/1/1760/4649/products/chiffon-saree-blue-dual-tone-chiffon-saree-silk-saree-online-32030640963777_450x@2x.jpg?v=1651304826",
  },
  {
    name: "Linen",
    image:
      "https://th.bing.com/th/id/OIP.U3Ob0lW4S5Z5IiCsJcd1EwHaJS?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Party Wear",
    image:
      "https://ik.imagekit.io/ldqsn9vvwgg/images/1873409.jpg?tr=w-800,h-800,fo-auto",
  },
];

const Categories = () => {
  return (
    <section className="bg-[#FFF8F0] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#C9A227] uppercase tracking-[4px] font-semibold">
            Collections
          </p>

          <h2 className="text-5xl font-bold text-[#2B2B2B] mt-3">
            Shop by Category
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover timeless sarees crafted for every celebration,
            tradition, and unforgettable moment.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>

                <button className="bg-[#8B1E3F] text-white p-3 rounded-full hover:bg-[#701632] transition">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;