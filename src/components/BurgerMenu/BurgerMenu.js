import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./BurgerMenu.css";
import ButtonProfile from "../ButtonProfile/ButtonProfile";
import { usePopupClose } from "../../hooks/usePopupClose";
function BurgerMenu({onClose, loggedIn, isOpenNavMenu}) {
  usePopupClose(isOpenNavMenu, onClose);
  return (
    <section className="burger">
      <div className="burger__overlay">
        <div className="burger__container">
          <button className="burger__btn-close" onClick={onClose}></button>
          <nav className="burger__menu">
            <NavLink to="/" className="burger__link">
              Главная
            </NavLink>
            <NavLink to="/movies" className="burger__link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="burger__link">
              Сохранённые фильмы
            </NavLink>
            <Link to="/profile">
            <ButtonProfile loggedIn={loggedIn} isOpenNavMenu={isOpenNavMenu} />
          </Link>
          </nav>
          
        </div>
      </div>
    </section>
  );
}

export default BurgerMenu;
