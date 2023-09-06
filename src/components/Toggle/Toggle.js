import React from "react";
import "./Toggle.css";

function Toggle({ handleToggle, isOn }) {
  return (
    <div className="toggle">
      <label className="toggle__label" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          name="chechbox"
          className="toggle__checkbox"
          onChange={handleToggle}
          checked={isOn}
        />

        <span className="toggle__position" />
      </label>
      <span className="toggle__text">Короткометражки</span>
    </div>
  );
}

export default Toggle;
