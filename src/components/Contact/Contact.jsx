import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(contact.id));
  return (
    <li>
      <div className={css.contactCard}>
        <div>
          <p className={css.cardText}>
            <BsFillPersonFill className={css.cardIcon} />
            {contact.name}
          </p>

          <p className={css.cardText}>
            <BsFillTelephoneFill className={css.cardIcon} />
            {contact.number}
          </p>
        </div>
        <button className={css.contactCardBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;
