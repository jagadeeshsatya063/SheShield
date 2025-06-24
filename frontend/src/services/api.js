import axios from 'axios';

const API_URL = 'https://sheshield-h0ou.onrender.com/api'; // Change if deploying

const api = axios.create({
  baseURL: API_URL,
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Contacts
export const getContacts = (token) => api.get('/contacts', { headers: { Authorization: `Bearer ${token}` } });
export const addContact = (data, token) => api.post('/contacts', data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteContact = (id, token) => api.delete(`/contacts/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// SOS
export const sendSOS = (data, token) => api.post('/sos', data, { headers: { Authorization: `Bearer ${token}` } });

export default api; 