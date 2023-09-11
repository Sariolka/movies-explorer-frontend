import { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { filterDuration, searchKeyWord } from "../../utils/utils";

function SavedMovies({ loggedIn, savedMovies, onCardDelete, error }) {
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  // const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleFilterMovies() {
    setIsOn((i) => !i);
  }

  function onSearchMovies(keyWord) {
    setSearchedSavedMovies(searchKeyWord(savedMovies, keyWord));
  }

  useEffect(() => {
    setSearchedSavedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (!isOn) {
      setSearchedSavedMovies(filterDuration(savedMovies));
    } else {
      setSearchedSavedMovies(savedMovies);
    }
  }, [isOn]);

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
          savedMovies={savedMovies}
          error={error}
          onCardDelete={onCardDelete}
        />
      )}
      <Footer />
    </main>
  );
}
export default SavedMovies;
