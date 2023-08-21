import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";
import useValidation from "../../hooks/useValidation";

function Login() {
  const link = (
    <p className="form__span">
      Ещё не зарегистрированы?
      <Link className="form__link" to="/signup">
        Регистрация
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
    <section className="login">
      <LogoHeader />
      <Form name="login" title="Рады видеть!" buttonTitle="Войти" link={link}>
        <fieldset className={`form__fieldset form__fieldset-log`}>
          <label className="form__label" for="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form__input ${
              showErrors.name && "form__input_type_invalid"
            }`}
            placeholder="Введите Email"
            minLength={2}
            maxLength={200}
            required
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
            placeholder="Введите пароль"
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

export default Login;
