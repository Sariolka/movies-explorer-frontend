import React from 'react';
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <section className="page-notfound">
          <h2 className="page-notfound__title">404</h2>
          <p className="page-notfound__info">Страница не найдена</p>
          <Link className="page-notfound__link" to="/"> Назад</Link>
        </section>
    )
}

export default PageNotFound;
