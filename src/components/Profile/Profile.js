import { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import LogoHeader from "../LogoHeader/LogoHeader";
import Navigation from "../Navigation/Navigation";
import useValidation from "../../hooks/useValidation";



function Profile({ loggedIn, onChange, onSignOut, errorMessage, isSuccess, setFalse}) {
  const currentUser = useContext(CurrentUserContext);
  const { formValues, isValid, handleChange, showErrors, setFormValues } =
    useValidation({});
  const [isChanged, setIsChanged] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      setFormValues({name: currentUser.name, email: currentUser.email});
    }
  }, [currentUser, setFormValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onChange({
      name: formValues.name,
      email: formValues.email,
    });
    setIsChanged(!isChanged);
  }

  //useEffect(() => {setFalse()}
//,[])


  function handleChangeProfile() {
    setIsChanged(isChanged);
    //setFalse()
  }

 /* function handleCheckValues() {
    const isSame =
      currentUser.name === formValues.name &&
      currentUser.email === formValues.email;
    return isSame;
  }
*/
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
          isValid={isValid}
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
                value={formValues.name || ''}
                onChange={handleChange}
                disabled={!isChanged}
                defaultValue={currentUser.name}
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
                value={formValues.email || ''} 
                onChange={handleChange}
                disabled={!isChanged}
                defaultValue={currentUser.email}
              />
              {showErrors.email && (
                <span className="profile__error">{showErrors.email}</span>
              )}
            </label>
          </div>
          <div className="profile__buttons">
            span={<span className="profile__input-error">{errorMessage}</span>}
            span={<span className="profile__text-success">{isSuccess}</span>}
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
                  !isValid || (currentUser.name === formValues.name &&
                  currentUser.email === formValues.email) //handleCheckValues() 
                    ? "profile__button-submit_inactive"
                    : "profile__button-submit"
                }`}
                onClick={handleSubmit}
                disabled={!isValid || (currentUser.name === formValues.name &&
                  currentUser.email === formValues.email)/*handleCheckValues()*/}
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
