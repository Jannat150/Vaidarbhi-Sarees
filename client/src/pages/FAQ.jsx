import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQs = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our collection, add your favorite sarees to the cart, proceed to checkout, enter your shipping details, and place your order using Cash on Delivery (COD).",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Currently, we accept Cash on Delivery (COD). Online payment options will be available soon.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can view your order status from the 'My Orders' section in your profile after logging into your account.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes. Orders can be cancelled before they are shipped. Once shipped or delivered, cancellation is not possible.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 3–7 business days depending on your location.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes. We offer free shipping on orders above ₹999. Orders below ₹999 are charged a shipping fee.",
    },
    {
      question: "Can I return or exchange a saree?",
      answer:
        "Returns or exchanges are accepted only for damaged, defective, or incorrect products. Please refer to our Return & Refund Policy for complete details.",
    },
    {
      question: "Will the saree color match exactly?",
      answer:
        "We try our best to display accurate colors. However, slight variations may occur due to lighting and different screen settings.",
    },
    {
      question: "Can I save multiple addresses?",
      answer:
        "Yes. You can save multiple shipping addresses from your Profile and choose or update them whenever needed.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes. We value your privacy and protect your personal information according to our Privacy Policy.",
    },
    {
      question: "What should I do if I receive a damaged product?",
      answer:
        "Contact our support team within 48 hours of delivery with photos of the damaged product. We will review your request and provide a suitable resolution.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach us through the Contact Us page, email us at support@vaidarbhisarees.com, or call our customer support number during business hours.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-3">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-500 mb-10">
            Find answers to the most commonly asked questions about shopping at
            Vaidarbhi Sarees.
          </p>

          <div className="space-y-5">

            {faqs.map((faq, index) => (
              <details
                key={index}
                className="border rounded-2xl p-5 group"
              >
                <summary className="cursor-pointer font-semibold text-lg text-[#8B1E3F] flex justify-between">
                  {faq.question}
                </summary>

                <p className="mt-4 text-gray-600 leading-7">
                  {faq.answer}
                </p>
              </details>
            ))}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default FAQs;