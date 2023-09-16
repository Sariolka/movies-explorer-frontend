import "./Register.css";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";
import useValidation from "../../hooks/useValidation";

function Register({ onRegister, errorMessage }) {
  const { formValues, handleChange, isValid, showErrors } = useValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
  }

  const link = (
    <p className="form__span">
      Уже зарегистрированы?
      <Link className="form__link" to="/signin">
        Войти
      </Link>
    </p>
  );

  return (
    <section className="register">
      <LogoHeader />
      <Form
        name="register"
        title="Добро пожаловать!"
        buttonTitle="Зарегистрироваться"
        link={link}
        isValid={isValid}
        onSubmit={handleSubmit}
        isDisabled={!isValid}
        span={<span className="form__input-error">{errorMessage}</span>}
      >
        <fieldset className={`form__fieldset form__fieldset-reg`}>
          <div className="form__value">
            <label className="form__label" htmlFor="name">
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
              onChange={handleChange}
            />
            {showErrors.name && (
              <span className="form__error">{showErrors.name}</span>
            )}
          </div>
          <div className="form__value">
            <label className="form__label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              name="email"
              required
              placeholder="Введите Email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              minLength={4}
              maxLength={200}
              onChange={handleChange}
            />
            {showErrors.email && (
              <span className="form__error">{showErrors.email}</span>
            )}
          </div>
          <div className="form__value">
            <label className="form__label" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Придумайте пароль"
              minLength={6}
              maxLength={40}
              required
              onChange={handleChange}
            />
            {showErrors.password && (
              <span className="form__error">{showErrors.password}</span>
            )}
          </div>
        </fieldset>
      </Form>
    </section>
  );
}
export default Register;
