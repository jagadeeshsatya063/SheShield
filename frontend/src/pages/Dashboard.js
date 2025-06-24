import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContacts, addContact, deleteContact, sendSOS } from '../services/api';
import ContactList from '../components/ContactList';
import SOSButton from '../components/SOSButton';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await getContacts(token);
      setContacts(res.data);
    } catch (err) {
      setError('Failed to load contacts');
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      await addContact(contactForm, token);
      setContactForm({ name: '', phone: '', email: '' });
      setSuccess('Contact added!');
      fetchContacts();
    } catch (err) {
      setError('Failed to add contact');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id, token);
      fetchContacts();
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {name}</h2>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Emergency Contacts</h3>
      <ContactList contacts={contacts} onDelete={handleDeleteContact} />
      <form onSubmit={handleAddContact} className="add-contact-form">
        <input type="text" placeholder="Name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} required />
        <input type="text" placeholder="Phone" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} required />
        <input type="email" placeholder="Email (optional)" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
        <button type="submit">Add Contact</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <SOSButton token={token} />
    </div>
  );
}

export default Dashboard; 