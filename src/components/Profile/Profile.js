import React from "react";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");

  return (
    <section className="profile">
      <Header />
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
            <button className="profile__button-submit">Редактировать</button>
            <button className="profile__button-logout">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Profile;
