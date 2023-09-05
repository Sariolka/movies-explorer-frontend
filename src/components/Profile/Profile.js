import React from "react";
import "./Profile.css";
import LogoHeader from "../LogoHeader/LogoHeader";
import Navigation from "../Navigation/Navigation";
import useValidation from "../../hooks/useValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ loggedIn, onChange, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    formValues,
    isValid,
    handleChange,
    showErrors,
    resetForm,
    setFormValues,
  } = useValidation({});
  const [isChanged, setIsChanged] = React.useState(false);
  const notValid = !isValid;

  React.useEffect(() => {
    
      resetForm();
      setFormValues({ name: currentUser.name, email: currentUser.email });
    
  }, [currentUser, loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    onChange({
      name: formValues.name,
      email: formValues.email,
    });
    setIsChanged(false);
  }

  const handleChangeProfile = (e) => {
    e.preventDefault();
    setIsChanged(true);
  };

  return (
    <section className="profile">
      <nav className="profile__nav">
        <LogoHeader />
        <Navigation loggedIn={loggedIn} />
      </nav>
      <div className="profile__container">
        <h2 className="profile__title">
          {`Привет, ${currentUser &&  currentUser.name}!`}{" "}
        </h2>
        <form
          className="profile__form"
          isValid={!isValid}
          onSubmit={handleSubmit}
        >
          <div className="profile__value">
            <label className="profile__label">
              Имя
              <input
                className={`profile__input ${
                  showErrors.name && "profile__input_type_invalid"
                }`}
                type="text"
                name="name"
                minLength="2"
                maxLength="40"
                required
                placeholder="Имя"
                value={formValues.name || ""}
                onChange={handleChange}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                className={`profile__input ${
                  showErrors.email && "profile__input_type_invalid"
                }`}
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formValues.email || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="profile__buttons">
            {!isChanged ? (
              <>
                <button
                  className="profile__button-edit"
                  onClick={handleChangeProfile}
                >
                  Редактировать
                </button>
                <button className="profile__button-logout" onClick={onSignOut}>
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                className={`profile__button-submit ${
                  !isValid && "profile__button-submit_inactive"
                }`}
                onClick={handleSubmit}
                disabled={notValid}
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
