import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

function SavedMovies() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <main className="movies-saved">
      <Header />
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList />}
      <Footer />
    </main>
  );
}
export default SavedMovies;
