import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";
import useValidation from "../../hooks/useValidation";

function Login({ onLogin }) {
  const { formValues, handleChange, isValid, showErrors } = useValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: formValues.email,
      password: formValues.password,
    });
  }

  const link = (
    <p className="form__span">
      Ещё не зарегистрированы?
      <Link className="form__link" to="/signup">
        Регистрация
      </Link>
    </p>
  );

  return (
    <section className="login">
      <LogoHeader />
      <Form
        name="login"
        title="Рады видеть!"
        buttonTitle="Войти"
        link={link}
        isValid={isValid}
        onSubmit={handleSubmit}
        isDisabled={!isValid}
      >
        <fieldset className={`form__fieldset form__fieldset-log`}>
          <div className="form__value">
            <label className="form__label" for="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`form__input ${
                showErrors.email && "form__input_type_invalid"
              }`}
              placeholder="Введите Email"
              minLength={4}
              maxLength={200}
              required
              onChange={handleChange}
            />
            {showErrors.email && (
              <span className="form__error">Что-то пошло не так...</span>
            )}
          </div>
          <div className="form__value">
            <label className="form__label" for="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={`form__input ${
                showErrors.password && "form__input_type_invalid"
              }`}
              placeholder="Введите пароль"
              minLength={6}
              maxLength={40}
              required
              onChange={handleChange}
            />
            {showErrors.password && (
              <span className="form__error">Что-то пошло не так...</span>
            )}
          </div>
        </fieldset>
      </Form>
    </section>
  );
}

export default Login;
