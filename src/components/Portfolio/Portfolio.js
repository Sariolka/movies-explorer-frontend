import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/Sariolka/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <span>↗</span>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/Sariolka/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <span>↗</span>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/Sariolka/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <span>↗</span>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
