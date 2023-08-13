import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__items">
        <li className="about__item">
          <h3 className="about__item-title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="about__item-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="about__item">
          <h3 className="about__item-title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="about__item-subtitle">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__time">
        <div className="about__time-back">
          <h4 className="about__time-weeks about__time-weeks_green">
            1 неделя
          </h4>
          <p className="about__time-text">Back-end</p>
        </div>
        <div className="about__time-front">
          <h4 className="about__time-weeks">4 недели</h4>
          <p className="about__time-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
