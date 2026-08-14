import axios from "axios";

const API = axios.create({
  baseURL: "https://vaidarbhi-sarees-2.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createContact = async (data) => {
  const res = await API.post("/contacts", data);
  return res.data;
};

export const getAdminContacts = async () => {
  const res = await API.get("/contacts");
  return res.data;
};

export const getMyContacts = async () => {
  const res = await API.get("/contacts/my");
  return res.data;
};

export const getContactById = async (id) => {
  const res = await API.get(`/contacts/${id}`);
  return res.data;
};

export const updateContact = async (id, data) => {
  const res = await API.put(`/contacts/${id}`, data);
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await API.delete(`/contacts/${id}`);
  return res.data;
};

export const replyToContact = async (id, reply) => {
  const res = await API.put(`/contacts/${id}/reply`, { reply });
  return res.data;
};

export const updateReply = async (id, reply) => {
  const res = await API.put(`/contacts/${id}/reply/update`, { reply });
  return res.data;
};

export const deleteReply = async (id) => {
  const res = await API.delete(`/contacts/${id}/reply`);
  return res.data;
};

export default API;
