import React from "react";
import "./Form.css";

function Form({ name, title, children, buttonTitle, link }) {
  return (
    <form className={`form form_type_${name}`} name={`form-${name}`}>
      <h2 className="form__title">{title}</h2>
      {children}
      <button type="submit" className="form__button-submit">
        {buttonTitle}
      </button>
      {link}
    </form>
  );
}

export default Form;
