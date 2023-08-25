import React from "react";
import "./SearchForm.css";
import Toggle from "../Toggle/Toggle";

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <div className="search__container">
          <input
            className="search__input"
            name="search"
            type="text"
            placeholder="Фильм"
            minLength={2}
            maxLength={100}
            required
          ></input>{" "}
          <button className="search__btn-submit">Найти</button>
        </div>
        <Toggle />{" "}
      </form>
    </div>
  );
}
export default SearchForm;
