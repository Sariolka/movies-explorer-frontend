import { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filterDuration, searchKeyWord } from "../../utils/utils";

function SavedMovies({ loggedIn, savedMovies, onCardDelete, error }) {
  const [isOn, setIsOn] = useState(false);
  const [filterSavedMovies, setFilterSavedMovies] = useState(savedMovies);
  const [keyWord, setKeyWord] = useState("");

  function handleSearchMovies(keyWord) {
    setKeyWord(keyWord);
  }

  function handleFilterMovies() {
    setIsOn(!isOn);
  }

  useEffect(() => {
    const moviesSavedList = searchKeyWord(savedMovies, keyWord);
    setFilterSavedMovies(
      isOn ? filterDuration(moviesSavedList) : moviesSavedList
    );
  }, [savedMovies, keyWord, isOn]);

  return (
    <main className="movies-saved">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={handleSearchMovies}
        handleToggle={handleFilterMovies}
        isOn={isOn}
      />
      <MoviesCardList
        savedMovies={filterSavedMovies}
        error={error}
        onCardDelete={onCardDelete}
      />
      <Footer />
    </main>
  );
}
export default SavedMovies;
