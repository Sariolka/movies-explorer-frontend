import React from "react";
import "./ButtonProfile.css";
import { useLocation } from "react-router-dom";
import user from "../../images/icon__COLOR_icon-main(1).svg";
import circle from "../../images/back__COLOR_special-1.svg";

function ButtonProfile({ isOpenNavMenu }) {
  const location = useLocation();

  return (
    <button
      className={` ${location.pathname === "/" ? `btn` : `btn btn_grey`} ${
        isOpenNavMenu && `btn_show btn_grey`
      }`}
    >
      Аккаунт
      <img className="btn__img" src={user} alt="иконка пользователя"></img>
      <img className="btn__circle" src={circle} alt="круг для иконки"></img>
    </button>
  );
}

export default ButtonProfile;
