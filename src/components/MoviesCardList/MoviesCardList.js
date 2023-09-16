import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  filteredCheckboxMovies,
  onCardLike,
  onCardDelete,
  savedMovies,
  error,
}) {
  const [renderedMovies, setRenderedMovies] = useState(0);
  const [addedMovies, setAddedMovies] = useState([]);
  const location = useLocation();

  function handleResizeMovies() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      setRenderedMovies(16);
    } else if (windowWidth < 1280 && windowWidth >= 981) {
      setRenderedMovies(9);
    } else if (windowWidth < 981 && windowWidth >= 711) {
      setRenderedMovies(8);
    } else if (windowWidth < 711) {
      setRenderedMovies(5);
    }
  }

  function handleClickMoreMovies() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      setRenderedMovies(renderedMovies + 4);
    } else if (windowWidth < 1280 && windowWidth >= 981) {
      setRenderedMovies(renderedMovies + 3);
    } else if (windowWidth < 981 && windowWidth >= 711) {
      setRenderedMovies(renderedMovies + 2);
    } else if (windowWidth < 711) {
      setRenderedMovies(renderedMovies + 1);
    }
  }

  useEffect(() => {
    handleResizeMovies();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResizeMovies);
    return () => {
      window.removeEventListener("resize", handleResizeMovies);
    };
  }, []);

  const cardsList = addedMovies.map((card) => (
    <MoviesCard
      key={card.id || card._id}
      card={card}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      savedMovies={savedMovies}
    />
  ));

  useEffect(() => {
    if (location.pathname === "/movies") {
      setAddedMovies(filteredCheckboxMovies.slice(0, renderedMovies));
    }
  }, [filteredCheckboxMovies, renderedMovies]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setAddedMovies(savedMovies.slice(0, renderedMovies));
    }
  }, [savedMovies, renderedMovies]);

  return (
    <section className="movies-cards" aria-label="Список фильмов">
      {error && (
        <span className="movies-cards__error">{error}</span>
      )}
      {location.pathname === "/saved-movies" && savedMovies.length === 0 && (
        <span className="movies-cards__error">{"Нет сохраненных фильмов"}</span>
      )}
      <ul className="movies-cards__list">{cardsList}</ul>
      <button
        className={
          location.pathname === "/movies"
            ? filteredCheckboxMovies.length > renderedMovies
              ? "movies-cards__button-more"
              : "movies-cards__button-more_hidden"
            : savedMovies.length > renderedMovies
            ? "movies-cards__button-more"
            : "movies-cards__button-more_hidden"
        }
        onClick={handleClickMoreMovies}
      >
        Ещё
      </button>
    </section>
  );
}
export default MoviesCardList;
