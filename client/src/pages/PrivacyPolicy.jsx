import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">
            Privacy Policy
          </h1>

          <p className="text-gray-600 leading-8 mb-8">
            At <strong>Vaidarbhi Sarees</strong>, we respect your privacy and
            are committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, store, and protect your
            information when you use our website.
          </p>

          {/* Information We Collect */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Information We Collect
            </h2>

            <p className="text-gray-700 leading-8">
              We may collect the following information:
              <br />
              • Name
              <br />
              • Email Address
              <br />
              • Phone Number
              <br />
              • Shipping & Billing Address
              <br />
              • Order History
              <br />
              • Payment Information (processed securely through payment
              providers)
              <br />
              • Device and browser information for website analytics
            </p>
          </div>

          {/* How We Use Information */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              How We Use Your Information
            </h2>

            <p className="text-gray-700 leading-8">
              Your information is used to:
              <br />
              • Process and deliver your orders.
              <br />
              • Provide customer support.
              <br />
              • Send order updates and notifications.
              <br />
              • Improve our website and shopping experience.
              <br />
              • Prevent fraud and maintain website security.
              <br />
              • Respond to your inquiries and feedback.
            </p>
          </div>

          {/* Data Protection */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Data Protection
            </h2>

            <p className="text-gray-700 leading-8">
              We implement appropriate security measures to safeguard your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of internet
              transmission is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </div>

          {/* Cookies */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Cookies
            </h2>

            <p className="text-gray-700 leading-8">
              Our website may use cookies to improve your browsing experience,
              remember your preferences, and analyze website traffic. You may
              disable cookies in your browser settings, although some features
              of the website may not function properly.
            </p>
          </div>

          {/* Sharing */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Sharing of Information
            </h2>

            <p className="text-gray-700 leading-8">
              We do not sell, rent, or trade your personal information. Your
              information may only be shared with trusted delivery partners,
              payment gateways, or legal authorities when required by law.
            </p>
          </div>

          {/* User Rights */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Your Rights
            </h2>

            <p className="text-gray-700 leading-8">
              You have the right to:
              <br />
              • Access your personal information.
              <br />
              • Update your profile information.
              <br />
              • Request correction of inaccurate information.
              <br />
              • Request deletion of your account, subject to applicable laws.
            </p>
          </div>

          {/* Third Party */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Third-Party Services
            </h2>

            <p className="text-gray-700 leading-8">
              Our website may contain links to third-party websites or use
              third-party services such as payment gateways. We are not
              responsible for the privacy practices of these external services.
            </p>
          </div>

          {/* Policy Updates */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Changes to This Privacy Policy
            </h2>

            <p className="text-gray-700 leading-8">
              We reserve the right to update this Privacy Policy at any time.
              Any changes will be posted on this page with the updated effective
              date.
            </p>
          </div>

          {/* Contact */}

          <div>
            <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-3">
              Contact Us
            </h2>

            <p className="text-gray-700 leading-8">
              If you have any questions regarding this Privacy Policy, please
              contact us.
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

export default PrivacyPolicy;