import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get("/contacts/my");
      setMessages(data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#8B1E3F]">
              My Messages
            </h1>

            <button
              onClick={() => navigate("/contact")}
              className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]"
            >
              + New Message
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="text-gray-600 text-center py-10 text-lg">
              You haven't sent any messages yet.
            </p>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-[#8B1E3F]">
                        {msg.subject}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {msg.reply ? (
                      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                        Replied
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold">
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>

                  {msg.reply && (
                    <div className="bg-[#8B1E3F] text-white rounded-xl p-4">
                      <p className="font-semibold mb-2">Admin Reply:</p>
                      <p className="whitespace-pre-wrap">{msg.reply}</p>
                      {msg.repliedAt && (
                        <p className="text-sm mt-2 opacity-80">
                          {new Date(msg.repliedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyMessages;
