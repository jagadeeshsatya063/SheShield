import React from 'react';

function ContactList({ contacts, onDelete }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact._id}>
          <span>{contact.name} - {contact.phone} {contact.email && `(${contact.email})`}</span>
          <button onClick={() => onDelete(contact._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList; 