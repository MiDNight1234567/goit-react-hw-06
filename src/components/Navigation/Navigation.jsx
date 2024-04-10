import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

const Navigation = () => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={getNavLinkClassNames} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/movies" end>
          Movies
        </NavLink>
      </header>
    </div>
  );
};

export default Navigation;
