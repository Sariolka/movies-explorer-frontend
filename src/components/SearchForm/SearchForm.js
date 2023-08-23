import React from "react";
import "./SearchForm.css";
import Toggle from "../Toggle/Toggle";

function SearchForm() {
  return (
    <form className="search">
      <input
        className="search__input"
        name="search"
        type="text"
        placeholder="Фильм"
        minLength={2}
        maxLength={200}
        required
      ></input>{" "}
      <button className="search__btn-submit"></button>
      <Toggle />{" "}
    </form>
  );
}
export default SearchForm;
