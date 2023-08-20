import React from "react";
import "./ButtonProfile.css";
import { useLocation } from "react-router-dom";
import user from "../../images/icon__COLOR_icon-main(1).svg";
import circle from "../../images/back__COLOR_special-1.svg";

function ButtonProfile({loggedIn, isOpenNavMenu}) {
  const location = useLocation();

  return (
    <button
      className={` ${
        !loggedIn && location.pathname === "/"
          ? `btn__account`
          : `btn__account btn__account_grey`
       } ${isOpenNavMenu && `btn__account_show btn__account_grey`}`}
    >
      Аккаунт
      <img className="btn__img" src={user} alt="иконка пользователя"></img>
      <img className="btn__circle" src={circle} alt="круг для иконки"></img>
    </button>
  );
}

export default ButtonProfile;
