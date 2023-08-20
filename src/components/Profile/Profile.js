import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import LogoHeader from "../LogoHeader/LogoHeader";
import Navigation from "../Navigation/Navigation";

function Profile({loggedIn}) {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const [isChanged, setIsChanged] = React.useState(false);

  return (
    <section className="profile">
      <nav className="profile__nav">
        <LogoHeader />
        <Navigation loggedIn={loggedIn} />
      </nav>
      <div className="profile__container">
        <h2 className="profile__title">Привет, {name}! </h2>
        <form className="profile__form">
          <div className="profile__value">
            <label className="profile__label">
              <p className="profile__name">Имя</p>
              <input
                className="profile__input"
                type="text"
                name="name"
                minLength="2"
                maxLength="40"
                required
                placeholder="Имя"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              />
            </label>
            <label className="profile__label">
              <p className="profile__name">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                required
                placeholder="Email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </label>
          </div>
          <div className="profile__buttons">
            {!isChanged ? (
              <>
                <button className="profile__button-edit">Редактировать</button>
                <Link className="profile__button-logout" to="/signin">
                  Выйти из аккаунта
                </Link>
              </>
            ) : (
              <button className="profile__button-submit">Сохранить</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
export default Profile;
