import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import cardImg from "../../images/card__img.png";

function MoviesCard({ card }) {
  const location = useLocation();
  const [isLiked, setIsLiked] = React.useState(false);

  const cardLikeButtonClassName = `movie__like ${
    isLiked && "movie__like_active"
  }`;

  function handleSaveMovies() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="movie">
      <div className="movie__header">
        <h2 className="movie__title">33 слова о дизайне</h2>
        <p className="movie__duration">1ч 47м</p>
      </div>
      <img className="movie__image" src={cardImg} alt="Постер фильма" />

      <button
        type="button"
        aria-label="Сохранить фильм"
        className={cardLikeButtonClassName}
        onClick={handleSaveMovies}
      />
    </li>
  );
}

export default MoviesCard;
