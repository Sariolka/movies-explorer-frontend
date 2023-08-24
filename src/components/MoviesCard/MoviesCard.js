import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import cardImg from "../../images/card__img.png";

function MoviesCard({ buttonTitle }) {
  const location = useLocation();
  const [isLiked, setIsLiked] = React.useState(false);

  const cardLikeButtonClassName = `movie__like ${
    isLiked && "movie__like_active"
  }`;


  function handleSaveMovie() {
    setIsLiked(!isLiked);
  }

  function handleDeleteMovie() {
    setIsLiked(!isLiked);
    alert("Фильм удален!");
  }

  return (
    <li className="movie">
      <div className="movie__header">
        <h2 className="movie__title">33 слова о дизайне</h2>
        <p className="movie__duration">1ч 47м</p>
      </div>
      <img className="movie__image" src={cardImg} alt="Постер фильма" />

      {location.pathname === "/movies" ? (
        <button
          type="button"
          aria-label="Сохранить фильм"
          onClick={handleSaveMovie}
          className={cardLikeButtonClassName}
        >
          {" "}
          {!isLiked ? buttonTitle : null}
        </button>
      ) : (
        <button
          type="button"
          aria-label="Удалить фильм"
          onClick={handleDeleteMovie}
          className="movie__like movie__like_inactive"
        />
      )}
    </li>
  );
}

export default MoviesCard;
