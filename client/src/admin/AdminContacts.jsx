import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminContacts,
  updateContact,
  deleteContact,
  replyToContact,
  updateReply,
  deleteReply,
} from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", subject: "", message: "" });

  const [replyTexts, setReplyTexts] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyText, setEditReplyText] = useState("");

  const [replying, setReplying] = useState({});
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getAdminContacts();
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserKey = (contact) => {
    if (contact.userId && contact.userId._id) return contact.userId._id;
    return contact.email || contact.name || "guest";
  };

  const getUserLabel = (contact) => {
    if (contact.userId && contact.userId.name) return contact.userId.name;
    return contact.name || "Guest User";
  };

  const getUserEmail = (contact) => {
    if (contact.userId && contact.userId.email) return contact.userId.email;
    return contact.email || "-";
  };

  const groupedContacts = contacts.reduce((groups, contact) => {
    const key = getUserKey(contact);
    if (!groups[key]) {
      groups[key] = {
        userLabel: getUserLabel(contact),
        userEmail: getUserEmail(contact),
        messages: [],
      };
    }
    groups[key].messages.push(contact);
    return groups;
  }, {});

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    });
  };

  const handleUpdate = async (id) => {
    try {
      setUpdating({ ...updating, [id]: true });
      await updateContact(id, editForm);
      setEditingId(null);
      fetchContacts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update message");
    } finally {
      setUpdating({ ...updating, [id]: false });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete message");
    }
  };

  const handleReply = async (id) => {
    const reply = replyTexts[id]?.trim();
    if (!reply) return;
    try {
      setReplying({ ...replying, [id]: true });
      await replyToContact(id, reply);
      setReplyTexts({ ...replyTexts, [id]: "" });
      fetchContacts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to send reply");
    } finally {
      setReplying({ ...replying, [id]: false });
    }
  };

  const handleEditReply = (contact) => {
    setEditingReplyId(contact._id);
    setEditReplyText(contact.reply || "");
  };

  const handleUpdateReply = async (id) => {
    try {
      setUpdating({ ...updating, [id]: true });
      await updateReply(id, editReplyText);
      setEditingReplyId(null);
      fetchContacts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update reply");
    } finally {
      setUpdating({ ...updating, [id]: false });
    }
  };

  const handleDeleteReply = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;
    try {
      await deleteReply(id);
      fetchContacts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete reply");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#8B1E3F]">
              Messages
            </h1>

            <button
              onClick={() => navigate("/admin")}
              className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]"
            >
              Back to Dashboard
            </button>
          </div>

          {contacts.length === 0 ? (
            <p className="text-gray-600 text-center py-10 text-lg">
              No messages yet
            </p>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedContacts).map(([userId, group]) => (
                <div
                  key={userId}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="mb-6 pb-4 border-b">
                    <h2 className="text-2xl font-bold text-[#8B1E3F]">
                      {group.userLabel}
                    </h2>
                    <p className="text-gray-600">{group.userEmail}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {group.messages.length} message{group.messages.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {group.messages.map((contact) => (
                      <div
                        key={contact._id}
                        className="bg-gray-50 rounded-xl p-5"
                      >
                        {editingId === contact._id ? (
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              placeholder="Name"
                              className="w-full border p-3 rounded-xl"
                            />
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              placeholder="Email"
                              className="w-full border p-3 rounded-xl"
                            />
                            <input
                              type="text"
                              value={editForm.subject}
                              onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                              placeholder="Subject"
                              className="w-full border p-3 rounded-xl"
                            />
                            <textarea
                              rows="4"
                              value={editForm.message}
                              onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                              placeholder="Message"
                              className="w-full border p-3 rounded-xl"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleUpdate(contact._id)}
                                disabled={updating[contact._id]}
                                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                              >
                                {updating[contact._id] ? "Saving..." : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-[#8B1E3F]">
                                  {contact.subject}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(contact.createdAt).toLocaleString()}
                                </p>
                              </div>

                              <div className="flex gap-2 flex-wrap">
                                <button
                                  onClick={() => handleEdit(contact)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(contact._id)}
                                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition text-sm"
                                >
                                  Delete
                                </button>
                                {contact.reply && (
                                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                                    Replied
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 mb-4">
                              <p className="text-gray-700 whitespace-pre-wrap">
                                {contact.message}
                              </p>
                            </div>

                            {contact.reply && (
                              <div className="bg-[#8B1E3F] text-white rounded-xl p-4 mb-4">
                                {editingReplyId === contact._id ? (
                                  <div className="space-y-3">
                                    <textarea
                                      rows="3"
                                      value={editReplyText}
                                      onChange={(e) => setEditReplyText(e.target.value)}
                                      className="w-full border p-3 rounded-xl text-gray-800"
                                    />
                                    <div className="flex gap-3">
                                      <button
                                        onClick={() => handleUpdateReply(contact._id)}
                                        disabled={updating[contact._id]}
                                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                                      >
                                        {updating[contact._id] ? "Saving..." : "Save Reply"}
                                      </button>
                                      <button
                                        onClick={() => setEditingReplyId(null)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-semibold mb-2">Your Reply:</p>
                                        <p className="whitespace-pre-wrap">{contact.reply}</p>
                                        <p className="text-sm mt-2 opacity-80">
                                          {contact.repliedAt
                                            ? new Date(contact.repliedAt).toLocaleString()
                                            : ""}
                                        </p>
                                      </div>
                                      <div className="flex gap-2 ml-4">
                                        <button
                                          onClick={() => handleEditReply(contact)}
                                          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition text-sm"
                                        >
                                          Edit Reply
                                        </button>
                                        <button
                                          onClick={() => handleDeleteReply(contact._id)}
                                          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition text-sm"
                                        >
                                          Delete Reply
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            {!contact.reply && (
                              <div className="flex gap-3">
                                <input
                                  type="text"
                                  placeholder="Write your reply..."
                                  value={replyTexts[contact._id] || ""}
                                  onChange={(e) =>
                                    setReplyTexts({
                                      ...replyTexts,
                                      [contact._id]: e.target.value,
                                    })
                                  }
                                  className="flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                                />

                                <button
                                  onClick={() => handleReply(contact._id)}
                                  disabled={replying[contact._id] || !replyTexts[contact._id]?.trim()}
                                  className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732] transition disabled:opacity-50"
                                >
                                  {replying[contact._id] ? "Sending..." : "Send Reply"}
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
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

export default AdminContacts;