import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-3">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 mb-8">
            Last Updated: July 2026
          </p>

          <div className="space-y-8 text-gray-700 leading-8">

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing or using the Vaidarbhi Sarees website, you agree
                to comply with these Terms & Conditions. If you do not agree
                with these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                2. Products
              </h2>

              <p>
                We strive to display product colors, designs, and descriptions
                as accurately as possible. However, slight variations may occur
                due to photography, lighting, or screen settings.
              </p>

              <p className="mt-2">
                Product availability is subject to stock. We reserve the right
                to discontinue or modify products without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                3. Pricing
              </h2>

              <p>
                All prices are displayed in Indian Rupees (₹) and include
                applicable taxes unless stated otherwise.
              </p>

              <p className="mt-2">
                We reserve the right to change prices, offers, or discounts
                without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                4. Orders
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>All orders are subject to acceptance and availability.</li>
                <li>
                  We reserve the right to cancel any order due to pricing
                  errors, stock issues, or suspected fraudulent activity.
                </li>
                <li>
                  Customers will receive confirmation after placing an order.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                5. Shipping
              </h2>

              <p>
                Orders are processed within 1–3 business days. Delivery times
                may vary depending on the customer's location and courier
                services.
              </p>

              <p className="mt-2">
                Delays due to natural disasters, strikes, or unforeseen
                circumstances are beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                6. Returns & Refunds
              </h2>

              <p>
                Returns and refunds are governed by our Return & Refund Policy.
                Products must be unused, unwashed, and returned in their
                original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                7. User Responsibilities
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate account information.</li>
                <li>Maintain the confidentiality of your login credentials.</li>
                <li>
                  Do not misuse or attempt to disrupt the website or services.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                8. Intellectual Property
              </h2>

              <p>
                All content on this website, including logos, product images,
                text, graphics, and designs, is the property of Vaidarbhi
                Sarees and is protected by applicable copyright and trademark
                laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                9. Limitation of Liability
              </h2>

              <p>
                Vaidarbhi Sarees shall not be liable for any indirect,
                incidental, or consequential damages arising from the use of
                our website or products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                10. Changes to Terms
              </h2>

              <p>
                We reserve the right to update or modify these Terms &
                Conditions at any time. Continued use of the website after
                changes are posted constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
                11. Contact Us
              </h2>

              <p>
                If you have any questions regarding these Terms & Conditions,
                please contact us:
              </p>

              <div className="mt-3">
                <p>
                  <strong>Vaidarbhi Sarees</strong>
                </p>

                <p>Email: support@vaidarbhisarees.com</p>

                <p>Phone: +91 XXXXXXXXXX</p>
              </div>
            </section>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsAndConditions;