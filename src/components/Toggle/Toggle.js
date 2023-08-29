import React from "react";
import "./Toggle.css";

function Toggle() {
  const [isChecked, SetIsChecked] = React.useState(false);

  function handleCheck() {
    SetIsChecked(!isChecked);
  }

  return (
    <div className="toggle">
      <label className="toggle__label" for="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          name="chechbox"
          className="toggle__checkbox"
          onChange={handleCheck}
          checked={isChecked}
        />

        <span className="toggle__position" />
      </label>
      <span className="toggle__text">Короткометражки</span>
    </div>
  );
}

export default Toggle;
