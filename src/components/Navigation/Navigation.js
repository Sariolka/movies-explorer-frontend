import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import ButtonProfile from "../ButtonProfile/ButtonProfile";


function Navigation({ loggedIn }) {
  const location = useLocation();
  const [isOpenNavMenu, setIsOpenNavMenu] = React.useState(false);

  function togglePopupMenu() {
    setIsOpenNavMenu(!isOpenNavMenu);
  }

  return (
    <nav className={"nav"}>
      {!loggedIn ? (
        <>
          <div className="nav__movies">
            <Link
              to="/movies"
              className={`${
                location.pathname === "/"
                  ? "nav__link-movies"
                  : `nav__link-movies nav__link-movies_black`
              } ${
                location.pathname === "/movies" && "nav__link-movies_active"
              }`}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={`${
                location.pathname === "/"
                  ? "nav__link-saved-movies"
                  : `nav__link-saved-movies nav__link-saved-movies_black`
              } ${
                location.pathname === "/saved-movies" &&
                "nav__link-saved-movies_active"
              }`}
            >
              Сохранённые фильмы
            </Link>
            {!isOpenNavMenu  ? (
            <button
              type="button"
              aria-label="Открыть меню"
              className={`${
                !isOpenNavMenu 
                  ? "nav__btn-burger"
                  : `nav__btn-burger nav__btn-close`
              } ${
                location.pathname === "/"
                  ? `nav__btn-burger`
                  : `nav__btn-burger nav__btn-burger_dark`
              }`}
              onClick={togglePopupMenu}
            ></button>) : <BurgerMenu onClose={togglePopupMenu} loggedIn={loggedIn} isOpenNavMenu = {isOpenNavMenu}/>}
          </div>
          <div>
            <Link to="/profile">
             <ButtonProfile />
            </Link>
          </div>
        </>
      ) : (
        <div className="nav__links">
          <Link to="/signup" className="nav__link-reg">
            Регистрация
          </Link>
          <Link to="/signin" className="nav__link-login">
            Войти
          </Link>
        </div>
      )}
    </nav>
  );
}
export default Navigation;
