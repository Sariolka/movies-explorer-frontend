import React from "react";
import "./Promo.css";
import promoLogo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
            создателя.
          </p>
          <a href="#about-project" className="promo__link">
            Узнать больше
          </a>
        </div>
        <img className="promo__image" src={promoLogo} alt="логотип Земли" />
      </div>
    </section>
  );
}
export default Promo;
