import { useSelector } from "react-redux";
import { selectContacts, selectNameFilter } from "../../redux/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const getVisibleContacts = (contacts, filter) => {
  if (filter.length > 0) {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  } else {
    return contacts;
  }
};

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const filterContacts = getVisibleContacts(contacts, filter);
  return (
    <>
      {filterContacts && filterContacts.length > 0 ? (
        <ul className={css.contactList}>
          {filterContacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </ul>
      ) : (
        <p className={css.contactInfo}>Contact list is empty!</p>
      )}
    </>
  );
};

export default ContactList;
