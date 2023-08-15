import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header header_dark">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Логотип сайта" />
      </Link>
      <nav className="header__nav">
        <Link className="header__link_reg">Регистрация</Link>
        <Link className="header__link_login">Войти</Link>
      </nav>
    </header>
  );
}

export default Header;
