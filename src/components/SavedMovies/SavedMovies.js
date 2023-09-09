import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn }) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <main className="movies-saved">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        handleToggle={handleFilterMovies}
        isOn={isOn}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          filteredCheckboxMovies={filteredCheckboxMovies}
          onCardLike={onCardLike}
          savedMovies={savedMovies}
          error={error}
        />
      )}
      <Footer />
    </main>
  );
}
export default SavedMovies;
