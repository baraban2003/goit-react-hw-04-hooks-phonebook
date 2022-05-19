import { useState, useEffect } from 'react';
import Container from './Container';
import ContactList from './ContactList';
import SearchForm from './SearchForm';
import ContactForm from './ContactForm';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleEl = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log(contacts);
    return contacts.filter(e =>
      e.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteEl = elem => {
    setContacts(contacts.filter(e => e.id !== elem));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} arrayContact={contacts} />

        <h2>Contacts</h2>
        <SearchForm onChange={changeFilter} />
        <ContactList contactArrey={getVisibleEl()} onDeleteEl={deleteEl} />
      </Container>
    </div>
  );
}
