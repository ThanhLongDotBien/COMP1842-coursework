import axios from 'axios'

const baseURL = 'http://localhost:3000/entries/'

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    console.log(error)
  })

export const api = {
  getEntry:    handleError(async id      => { const res = await axios.get(baseURL + id);           return res.data }),
  getEntries:  handleError(async ()     => { const res = await axios.get(baseURL);                return res.data }),
  deleteEntry: handleError(async id     => { const res = await axios.delete(baseURL + id);         return res.data }),
  createEntry: handleError(async payload=> { const res = await axios.post(baseURL, payload);       return res.data }),
  updateEntry: handleError(async payload=> { const res = await axios.put(baseURL + payload._id, payload); return res.data }),
}