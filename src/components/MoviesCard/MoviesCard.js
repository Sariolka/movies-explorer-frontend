import React from "react";
import cardImg from "../../images/card__img.png";

function MoviesCard() {
  return (
    <div className="movie">
      <img className="movie__image" src={cardImg} alt="Постер фильма" />
      <h2 className="movie__title">33 слова о дизайне</h2>
      <button className="movie__like movie__like_active" />
      <p className="movie__duration">1ч 47м</p>
    </div>
  );
}
export default MoviesCard;
