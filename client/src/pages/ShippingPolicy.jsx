import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">
            Shipping Policy
          </h1>

          <p className="text-gray-600 mb-8">
            At <strong>Vaidarbhi Sarees</strong>, we are committed to delivering
            your order safely and on time. Please read our shipping policy below.
          </p>

          {/* Processing Time */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Order Processing
            </h2>

            <p className="text-gray-700 leading-8">
              • Orders are processed within <strong>1–2 business days</strong>.
              <br />
              • Orders placed on Sundays or public holidays will be processed on
              the next working day.
              <br />
              • You will receive an order confirmation email once your order is
              successfully placed.
            </p>
          </div>

          {/* Delivery */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Delivery Timeline
            </h2>

            <p className="text-gray-700 leading-8">
              • Metro Cities: <strong>3–5 business days</strong>.
              <br />
              • Other Cities & Towns: <strong>5–7 business days</strong>.
              <br />
              • Remote Locations: <strong>7–10 business days</strong>.
              <br />
              • Delivery timelines may vary due to weather conditions, public
              holidays, or courier delays.
            </p>
          </div>

          {/* Shipping Charges */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Shipping Charges
            </h2>

            <p className="text-gray-700 leading-8">
              • Free Shipping on orders above <strong>₹999</strong>.
              <br />
              • A flat shipping charge of <strong>₹99</strong> applies to
              orders below ₹999.
            </p>
          </div>

          {/* Tracking */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Order Tracking
            </h2>

            <p className="text-gray-700 leading-8">
              Once your order is shipped, you will receive tracking details via
              email or SMS (if applicable). You can also check your order status
              from the <strong>My Orders</strong> section of your account.
            </p>
          </div>

          {/* Delivery */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Delivery Information
            </h2>

            <p className="text-gray-700 leading-8">
              Please ensure that your shipping address and phone number are
              correct while placing your order. Vaidarbhi Sarees is not
              responsible for delays caused due to incorrect address details.
            </p>
          </div>

          {/* Delays */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Shipping Delays
            </h2>

            <p className="text-gray-700 leading-8">
              Although we strive to deliver all orders on time, unforeseen
              circumstances such as natural disasters, strikes, courier issues,
              or government restrictions may cause delays.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Contact Us
            </h2>

            <p className="text-gray-700 leading-8">
              If you have any questions regarding shipping or your order,
              please contact our support team.
              <br />
              <strong>Email:</strong> support@vaidarbhisarees.com
              <br />
              <strong>Phone:</strong> +91 XXXXXXXXXX
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShippingPolicy;