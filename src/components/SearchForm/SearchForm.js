import { useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import "./SearchForm.css";
import Toggle from "../Toggle/Toggle";

function SearchForm({ onSearchMovies, handleToggle, input, isOn }) {
  const { formValues, handleChange, setFormValues } = useValidation({});

  useEffect(() => {
    setFormValues({ search: input });
  }, [input, setFormValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(formValues.search);
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
            value={formValues.search || ""}
            onChange={handleChange}
            minLength={2}
            maxLength={100}
            required
          ></input>{" "}
          <button className="search__btn-submit" onClick={handleSubmit}>
            Найти
          </button>
        </div>
        <Toggle handleToggle={handleToggle} isChecked={isOn} />{" "}
      </form>
    </div>
  );
}
export default SearchForm;
