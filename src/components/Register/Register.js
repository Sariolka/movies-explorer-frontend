import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";
import useValidation from "../../hooks/useValidation";

function Register() {
  const link = (
    <p className="form__span">
      Уже зарегистрированы?
      <Link className="form__link" to="/signin">
        Войти
      </Link>
    </p>
  );
  const {
    formValues,
    handleChange,
    setFormValues,
    isValid,
    resetForm,
    setIsValid,
    showErrors,
  } = useValidation({});

  return (
    <section className="register">
      <LogoHeader />
      <Form
        name="register"
        title="Добро пожаловать!"
        buttonTitle="Зарегистрироваться"
        link={link}
      >
        <fieldset className="form__fieldset">
          <label className="form__label" for="name">
            Имя
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={`form__input ${
              showErrors.name && "form__input_type_invalid"
            }`}
            placeholder="Введите имя"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="form__error">Что-то пошло не так...</span>
          <label className="form__label" for="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="form__input"
            name="email"
            required
            placeholder="Введите Email"
            minLength={2}
            maxLength={200}
          />
          <span className="form__error">Что-то пошло не так...</span>
          <label className="form__label" for="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form__input"
            placeholder="Придумайте пароль"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="form__error">Что-то пошло не так...</span>
        </fieldset>
      </Form>
    </section>
  );
}
export default Register;
