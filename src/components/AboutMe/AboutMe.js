import React from "react";
import "./AboutMe.css";
import Avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__heading">Студент</h3>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__name">Роза</h2>
          <p className="about-me__profession">Фронтенд-разработчик</p>
          <p className="about-me__description">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
            фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a
            href="https://github.com/Sariolka"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          alt="моя фотография"
          src={Avatar}
        ></img>
      </div>
    </section>
  );
}
export default AboutMe;
