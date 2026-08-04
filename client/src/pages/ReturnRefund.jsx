import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReturnRefundPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">
            Return & Refund Policy
          </h1>

          <p className="text-gray-600 mb-8 leading-8">
            At <strong>Vaidarbhi Sarees</strong>, customer satisfaction is our
            priority. If you are not completely satisfied with your purchase,
            please review our return and refund policy below.
          </p>

          {/* Return Eligibility */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Return Eligibility
            </h2>

            <p className="text-gray-700 leading-8">
              • Returns can be requested within <strong>7 days</strong> of
              receiving your order.
              <br />
              • The product must be unused, unwashed, and in its original
              condition with all tags and packaging intact.
              <br />
              • Products showing signs of use, damage, or alteration will not
              be eligible for return.
            </p>
          </div>

          {/* Non Returnable */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Non-Returnable Items
            </h2>

            <p className="text-gray-700 leading-8">
              The following products cannot be returned:
              <br />
              • Customized or altered sarees.
              <br />
              • Sarees with fall and pico already completed.
              <br />
              • Products purchased during clearance or final sale.
              <br />
              • Gift cards or promotional items.
            </p>
          </div>

          {/* Damaged */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Damaged or Incorrect Products
            </h2>

            <p className="text-gray-700 leading-8">
              If you receive a damaged, defective, or incorrect product,
              please contact us within <strong>48 hours</strong> of delivery
              with clear photos of the product and packaging.
            </p>
          </div>

          {/* Refund */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Refund Process
            </h2>

            <p className="text-gray-700 leading-8">
              • Once the returned product is received and inspected, we will
              notify you regarding the approval of your refund.
              <br />
              • Approved refunds will be processed within
              <strong> 5–7 business days</strong>.
              <br />
              • Refunds will be credited to the original payment method.
              <br />
              • For Cash on Delivery orders, refunds will be processed through
              bank transfer after verification.
            </p>
          </div>

          {/* Exchange */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Exchange Policy
            </h2>

            <p className="text-gray-700 leading-8">
              Exchanges are available only for defective or damaged products,
              subject to stock availability. If the same product is unavailable,
              a refund or store credit may be offered.
            </p>
          </div>

          {/* Cancellation */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Order Cancellation
            </h2>

            <p className="text-gray-700 leading-8">
              Orders can be cancelled before they are shipped. Once an order has
              been dispatched, it cannot be cancelled and must follow the return
              process after delivery.
            </p>
          </div>

          {/* Return Shipping */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Return Shipping
            </h2>

            <p className="text-gray-700 leading-8">
              Return shipping charges may be borne by the customer unless the
              return is due to a damaged, defective, or incorrect product sent
              by us.
            </p>
          </div>

          {/* Contact */}

          <div>
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Contact Us
            </h2>

            <p className="text-gray-700 leading-8">
              For any return or refund-related queries, feel free to contact us.
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

export default ReturnRefundPolicy;