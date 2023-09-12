import React from "react";
import "./Form.css";

function Form({
  name,
  title,
  children,
  buttonTitle,
  link,
  onSubmit,
  isDisabled,
  span,
}) {
  return (
    <form
      className={`form form_type_${name}`}
      name={`form-${name}`}
      onSubmit={onSubmit}
    >
      <h2 className="form__title">{title}</h2>
      {children}
      <div className="form__container">
        {span}
        <button
          type="submit"
          className={`form__button-submit ${
            !isDisabled ? "form__button-submit" : "form__button-submit_inactive"
          }`}
          disabled={isDisabled}
        >
          {buttonTitle}
        </button>
        {link}
      </div>
    </form>
  );
}

export default Form;
