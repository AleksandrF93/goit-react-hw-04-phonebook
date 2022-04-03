import {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactsList from 'components/ContactsList';
import ContactFilter from 'components/ContactFilter';
import data from '../contacts/contacts.json';
import useLocalStorage from '../hook/useLocalStorage'


export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', data);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    };
  }, [setContacts]);

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId)
    )
  };

  const addContact = data => {
    const sameName = contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase());
    const sameNumber = contacts.find(contact => contact.number.toLowerCase() === data.number.toLowerCase());
    const message = `${data.name} is alredy in contacts`;

    if (sameName || sameNumber) {
      alert(message);
      return
    };

    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number
    };

    setContacts( prevState => [...prevState, newContact])
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()));
  }
    
  return (
    <section>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <ContactFilter
        value={filter}
        onChange={changeFilter}
      />
      <ContactsList
        contacts={filterContacts()}
        onDeleteContact={deleteContact} />
    </section>
  )
};



 

// class App extends Component {
//   state = {
//     contacts: [
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//     ],
//     filter: '',
//   };

//   deleteContact = contactId => { 
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId)
//     }))
//   };

//   addContact = contactData => {
//     const sameName = this.state.contacts.find(contact => contact.name.toLowerCase() === contactData.name.toLowerCase());
//     const sameNumber = this.state.contacts.find(contact => contact.number.toLowerCase() === contactData.number.toLowerCase());
//     const message = `${contactData.name} is alredy in contacts`;

//     if (sameName || sameNumber) {
//       alert(message);
//       return
//     };

//     const newContact = {
//       id: nanoid(),
//       name: contactData.name,
//       number: contactData.number
//     };

//     this.setState(({contacts}) => ({
//       contacts: [newContact, ...contacts],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({filter: e.currentTarget.value})
//   }

//   componentDidMount()  {
//     const contacts = localStorage.getItem('contacts');
//     const parsedConatcts = JSON.parse(contacts);
//     if (parsedConatcts) {
//       this.setState({ contacts: parsedConatcts });
//     }
    
// };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
// };

//   render() {
//     const { contacts, filter } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     const filterContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
//     return (
//       <section>
//         <h1>PhoneBook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         <ContactFilter
//           value={filter}
//           onChange={this.changeFilter}
//         />
//         <ContactsList
//         contacts={filterContacts}
//         onDeleteContact={this.deleteContact}/>
//         </section>
//     );
//   }
// };


// export default App;