import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "User name must be at least 3 characters long!")
    .max(50, "User name must be less 50 characters long!")
    .required("Please, enter your name! This field is required!"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, {
      message: "Please, enter the correct phone number: 999-99-99!",
      excludeEmptyString: false,
    })
    .required("Please, enter your phone number! This field is required!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.label}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="Jack Wilson"
            id={nameFieldId}
          />
          <ErrorMessage className={css.error} name="name" component="div" />
        </div>

        <div className={css.label}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            placeholder="999-99-99"
            id={numberFieldId}
          />
          <ErrorMessage className={css.error} name="number" component="div" />
        </div>
        <button className={css.btn} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
