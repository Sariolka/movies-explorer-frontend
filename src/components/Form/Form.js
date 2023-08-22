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
}) {
  return (
    <form
      className={`form form_type_${name}`}
      name={`form-${name}`}
      onSubmit={onSubmit}
    >
      <h2 className="form__title">{title}</h2>
      {children}
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
    </form>
  );
}

export default Form;
