import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { handleCalculateDuration } from "../../utils/utils";

function MoviesCard({ card, onCardLike, onCardDelete, savedMovies }) {
  const location = useLocation();
  const isLiked = savedMovies.some((i) => i.movieId === card.id);
  const cardLikeButtonClassName = `movie__like ${
    isLiked && "movie__like_active"
  }`;

  const handleSaveMovie = () => {
    onCardLike(card);
  };

  const handleDeleteMovie = () => {
    onCardDelete(card);
  };

  return (
    <li className="movie">
      <a
        className="movie__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie__image"
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co${card.image.url}`
              : card.image
          }
          alt={card.nameRU}
        />
      </a>
      <div className="movie__header">
        <h2 className="movie__title">{`${card.nameRU}`}</h2>
        {location.pathname === "/movies" ? (
          <button
            type="button"
            aria-label="Сохранить фильм"
            onClick={handleSaveMovie}
            className={cardLikeButtonClassName}
          >
            {" "}
          </button>
        ) : (
          <button
            type="button"
            aria-label="Удалить фильм"
            onClick={handleDeleteMovie}
            className="movie__like movie__like_inactive"
          />
        )}
      </div>{" "}
      <p className="movie__duration">
        {handleCalculateDuration(card.duration)}
      </p>
    </li>
  );
}

export default MoviesCard;
