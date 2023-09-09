import { useState, useEffect, useContext } from "react";
import "./Profile.css";
import LogoHeader from "../LogoHeader/LogoHeader";
import Navigation from "../Navigation/Navigation";
import useValidation from "../../hooks/useValidation";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ loggedIn, onChange, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    formValues,
    isValid,
    handleChange,
    showErrors,
    // resetForm,
    setFormValues,
  } = useValidation({});
  const [isChanged, setIsChanged] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (currentUser)
      setFormValues({ name: currentUser.name, email: currentUser.email });
  }, [loggedIn, currentUser, setFormValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onChange({
      name: formValues.name,
      email: formValues.email,
    });
    setIsChanged(!isChanged);
    setShowText(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowText();
    }, 9000);
  }, [handleSubmit]);

  function handleCheckValues() {
    const isSame =
      currentUser.name === formValues.name &&
      currentUser.email === formValues.email;
    return isSame;
  }

  function handleChangeProfile() {
    setIsChanged(isChanged);
    setShowText(false);
  }

  return (
    <section className="profile">
      <nav className="profile__nav">
        <LogoHeader />
        <Navigation loggedIn={loggedIn} />
      </nav>
      <div className="profile__container">
        <h2 className="profile__title">
          {`Привет, ${currentUser && currentUser.name}!`}{" "}
        </h2>
        <form
          className="profile__form"
          isValid={!isValid}
          onSubmit={handleSubmit}
        >
          <div className="profile__value">
            <label className="profile__label" htmlFor="name">
              Имя
              <input
                className={`profile__input ${
                  !isValid && showErrors.name && "profile__input_type_invalid"
                }`}
                type="text"
                name="name"
                minLength="2"
                maxLength="40"
                required
                placeholder="Имя"
                value={formValues.name || ""}
                onChange={handleChange}
                disabled={!isChanged}
              />
              {showErrors.name && (
                <span className="profile__error">{showErrors.name}</span>
              )}
            </label>
            <label className="profile__label" htmlFor="email">
              E-mail
              <input
                className={`profile__input ${
                  !isValid && showErrors.email && "profile__input_type_invalid"
                }`}
                type="email"
                name="email"
                required
                placeholder="Email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                value={formValues.email || ""}
                onChange={handleChange}
                disabled={!isChanged}
              />
              {showErrors.email && (
                <span className="profile__error">{showErrors.email}</span>
              )}
            </label>
          </div>
          <div className="profile__buttons">
            {!isChanged ? (
              <>
                <button
                  className="profile__button-edit"
                  onClick={handleChangeProfile}
                >
                  {showText ? "Данные успешно изменены" : "Редактировать"}
                </button>

                <button className="profile__button-logout" onClick={onSignOut}>
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                className={`profile__button-submit ${
                  !isValid || handleCheckValues()
                    ? "profile__button-submit_inactive"
                    : "profile__button-submit"
                }`}
                onClick={handleSubmit}
                disabled={!isValid || handleCheckValues()}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
export default Profile;
