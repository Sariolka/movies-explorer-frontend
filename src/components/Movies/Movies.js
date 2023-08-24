import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

function Movies() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <main className="movies">
      <Header />
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList buttonTitle={"Сохранить"}/>}
      <Footer />
    </main>
  );
}
export default Movies;
