import { Field, Form, Formik } from "formik";
import { FiSearch } from "react-icons/fi";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSetSearchQuery, searchQuery }) => {
  return (
    <Formik
      initialValues={{ query: searchQuery ?? "" }}
      onSubmit={(values) => {
        onSetSearchQuery(values.query);
      }}
    >
      <Form className={css.form}>
        <Field
          className={css.formField}
          placeholder="Input your movie"
          type="text"
          name="query"
        />
        <button className={css.searchBtn} type="submit">
          <FiSearch size={18} />
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
