import React from "react";
import "./Promo.css";
import promoLogo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
            создателя.
          </p>
          <a href="#" className="promo__link">
            Узнать больше
          </a>
        </div>
        <img className="promo__image" src={promoLogo} alt="логотип Земли" />
      </div>
    </section>
  );
}
export default Promo;
