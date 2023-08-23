import React from "react";
import "./Toggle.css";

function Toggle() {
  const [isChecked, SetIsChecked] = React.useState(false);

  function handleCheck() {
    SetIsChecked(!isChecked);
  }

  return (
    <div className="toggle">
      <input
        type="checkbox"
        id="checkbox"
        className="toggle__checkbox"
        onChange={handleCheck}
        checked={isChecked}
      />
      <div className="toggle__checkbox-visible">
        <div className="toggle__checkbox-circle"></div>
      </div>
      <label className="toggle__label" for="checkbox">
        {" "}
        Короткометражки
      </label>
    </div>
  );
}

export default Toggle;
