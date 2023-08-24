import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({buttonTitle}) {
  return (
    <section className="movies-cards" aria-label="Список фильмов">
      <ul className="movies-cards__list">
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
        <li>
          {" "}
          <MoviesCard buttonTitle = {buttonTitle}/>
        </li>
      </ul>
      <button className="movies-cards__button-more">Ещё</button>
    </section>
  );
}
export default MoviesCardList;
