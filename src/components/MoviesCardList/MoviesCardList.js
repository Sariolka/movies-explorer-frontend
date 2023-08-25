import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies-cards" aria-label="Список фильмов">
      <ul className="movies-cards__list">
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
        <li>
          {" "}
          <MoviesCard />
        </li>
      </ul>
      <button className="movies-cards__button-more">Ещё</button>
    </section>
  );
}
export default MoviesCardList;
