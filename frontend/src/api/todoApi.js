import axios from "axios";

const API_URL = "http://localhost:3000/api/todos";

const api = {
  getAll: () => axios.get(API_URL).then((r) => r.data),

  create: (description) =>
    axios.post(API_URL, { description }).then((r) => r.data),

  update: (id, description, completed) =>
    axios
      .put(`${API_URL}/${id}`, { description, completed })
      .then((r) => r.data),

  toggle: (id) => axios.patch(`${API_URL}/${id}/toggle`).then((r) => r.data),

  delete: (id) => axios.delete(`${API_URL}/${id}`),
};

export default api;
