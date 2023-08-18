import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";

function Header({ loggedIn }) {
  const location = useLocation();
  return (
    <header
      className={location.pathname === "/" ? `header header_dark` : "header"}
    >
     <LogoHeader />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
