import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import Toggle from "../Toggle/Toggle";

function SearchForm({ onSearchMovies, handleToggle, isOn }) {
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("inputSearch")
    ) {
      const keyWord = localStorage.getItem("inputSearch");
      setInput(keyWord);
    }
  }, [location]);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim().length === 0) {
      setError(true);
    } else {
      setError(false);
      onSearchMovies(input);
    }
  }

  return (
    <div className="search">
      <form className="search__form">
        <div className="search__container">
          <input
            className="search__input"
            name="search"
            type="text"
            placeholder="Фильм"
            value={input || ""}
            onChange={handleChange}
            minLength={2}
            maxLength={100}
            required
          ></input>{" "}
          <button className="search__btn-submit" onClick={handleSubmit}>
            Найти
          </button>
        </div>
        <Toggle handleToggle={handleToggle} isOn={isOn} />{" "}
        {error && (
          <span className="search__text-error">
            {"Нужно ввести ключевое слово"}
          </span>
        )}
      </form>
    </div>
  );
}
export default SearchForm;
