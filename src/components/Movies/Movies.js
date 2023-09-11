import { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { searchKeyWord, filterDuration } from "../../utils/utils";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ loggedIn, onCardLike, savedMovies, onCardDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundInputMovies, setFoundInputMovies] = useState([]);
  const [filteredCheckboxMovies, setFilteredCheckboxMovies] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((allMovies) => {
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [loggedIn]);

  function handleSearchMovies(movies, keyWord, short) {
    const moviesList = searchKeyWord(movies, keyWord);
    setFoundInputMovies(moviesList);
    setFilteredCheckboxMovies(short ? filterDuration(moviesList) : moviesList);

    localStorage.setItem("foundMovies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
    localStorage.setItem("inputSearch", keyWord);
    localStorage.setItem("shortMovies", isOn);
  }

  function handleFilterMovies() {
    setIsOn(!isOn);
    !isOn
      ? setFilteredCheckboxMovies(filterDuration(foundInputMovies))
      : setFilteredCheckboxMovies(foundInputMovies);

    localStorage.setItem("shortMovies", !isOn);
  }

  function onSearchMovies(keyWord) {
    if (localStorage.getItem("allMovies")) {
      const allMovies = JSON.parse(localStorage.getItem("allMovies"));
      handleSearchMovies(allMovies, keyWord, isOn);
    } else {
      moviesApi
        .getMovies()
        .then((allMovies) => {
          handleSearchMovies(allMovies, keyWord, isOn);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      const foundInputMovies = JSON.parse(localStorage.getItem("foundMovies"));
      setFoundInputMovies(foundInputMovies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredCheckboxMovies(filterDuration(foundInputMovies));
      } else {
        setFilteredCheckboxMovies(foundInputMovies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("inputSearch")) {
      if (filteredCheckboxMovies.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setError(false);
    }
  }, [filteredCheckboxMovies]);

  return (
    <main className="movies">
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
          onCardDelete={onCardDelete}
        />
      )}
      <Footer />
    </main>
  );
}

export default Movies;
