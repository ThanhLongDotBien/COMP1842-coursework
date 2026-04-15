import axios from 'axios'

const BASE = 'http://localhost:3000/api'

export const api = {
  getAllEntries: async () => {
    const res = await axios.get(`${BASE}/entries`)
    return res.data
  },
  getEntry: async (id) => {
    const res = await axios.get(`${BASE}/entries/${id}`)
    return res.data
  },
  createEntry: async (data) => {
    const res = await axios.post(`${BASE}/entries`, data)
    return res.data
  },
  updateEntry: async (data) => {
    const res = await axios.put(`${BASE}/entries/${data._id}`, data)
    return res.data
  },
  deleteEntry: async (id) => {
    const res = await axios.delete(`${BASE}/entries/${id}`)
    return res.data
  },
}
