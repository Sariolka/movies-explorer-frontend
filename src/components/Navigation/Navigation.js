import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import user from "../../images/icon__COLOR_icon-main(1).svg";
import circle from "../../images/back__COLOR_special-1.svg";

function Navigation({ loggedIn }) {
  const location = useLocation();
  return (
    <nav className="nav">
      {loggedIn ? (
        <>
          <div className="nav__movies">
            <Link
              to="/movies"
              className={
                location.pathname === "/"
                  ? "nav__link-movies"
                  : `nav__link-movies nav__link-movies_black`
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                location.pathname === "/"
                  ? "nav__link-saved-movies"
                  : `nav__link-saved-movies nav__link-saved-movies_black`
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <button
                className={
                  location.pathname === "/"
                    ? "nav__btn-account"
                    : `nav__btn-account nav__btn-account_grey`
                }
              >
                Аккаунт
                <img
                  className="nav__btn-img"
                  src={user}
                  alt="иконка пользователя"
                ></img>
                <img
                  className="nav__btn-circle"
                  src={circle}
                  alt="круг для иконки"
                ></img>
              </button>
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
