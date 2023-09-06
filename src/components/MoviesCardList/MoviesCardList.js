import { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  filteredCheckboxMovies,
  onCardLike,
  onCardDelete,
  savedMovies,
}) {
  const [renderedMovies, setRenderedMovies] = useState(0);

  function handleResizeMovies() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      setRenderedMovies(16);
    } else if (windowWidth < 1280 && windowWidth >= 900) {
      setRenderedMovies(9);
    } else if (windowWidth < 900 && windowWidth >= 710) {
      setRenderedMovies(8);
    } else if (windowWidth < 710) {
      setRenderedMovies(5);
    }
  }

  function handleClickMoreMovies() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
      setRenderedMovies(renderedMovies + 4);
    } else if (windowWidth < 1280 && windowWidth >= 900) {
      setRenderedMovies(renderedMovies + 3);
    } else if (windowWidth < 900 && windowWidth >= 710) {
      setRenderedMovies(renderedMovies + 3);
    } else if (windowWidth < 710) {
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

  const cardsList = filteredCheckboxMovies
    .slice(0, renderedMovies)
    .map((card) => (
      <MoviesCard
        key={card.id || card._id}
        card={card}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        savedMovies={savedMovies}
      />
    ));

  return (
    <section className="movies-cards" aria-label="Список фильмов">
      <ul className="movies-cards__list">{cardsList}</ul>
      <button
        className={
          filteredCheckboxMovies.length > renderedMovies
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
