import { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { searchMovies } from "../../utils/utils";
import { filterDuration } from "../../utils/utils";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ loggedIn, onCardLike, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);

  const [foundInputMovies, setFoundInputMovies] = useState([]); //найденные по ключевому слову фильмы
  const [filteredCheckboxMovies, setFilteredCheckboxMovies] = useState([]); //фильмы, отфильтрованные чекбоксом

  const [input, setInput] = useState(""); // стейт инпута
  const [isOn, setIsOn] = useState(false); //стейт чекбокса

  useEffect(() => {
    const foundMovies = localStorage.getItem("foundMovies");
    const checkbox = localStorage.getItem("shortMovies");
    const inputSearch = localStorage.getItem("inputSearch");
    if (foundMovies) {
      setFilteredCheckboxMovies(JSON.parse(foundMovies));
    } else if (checkbox) {
      setIsOn(true);
    } else if (inputSearch) {
      setInput(inputSearch);
      console.log(input);
    }
  }, []);

  useEffect(() => {
    //загрузка фильмов с сервера при входе в приложение
    if (loggedIn) {
      moviesApi
        .getMovies()
        .then((allMovies) => {
          localStorage.setItem("allMovies", JSON.stringify(allMovies));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      localStorage.setItem("allMovies", JSON.stringify([]));
    }
  }, [loggedIn]);

  function handleSearchMovies(keyWord, isOn) {
    if (!keyWord) return;
    console.log(keyWord);
    const allMovies = JSON.parse(localStorage.getItem("allMovies")); //достаем весь массив фильмов
    const moviesList = searchMovies(allMovies, keyWord, isOn); //ищем в нем фильмы по ключевому слову

    setFoundInputMovies(moviesList); // выводим на страницу найденное

    setFilteredCheckboxMovies(isOn ? filterDuration(moviesList) : moviesList); //фильтруем по чекбоксу найденное
    localStorage.setItem("foundMovies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(allMovies));
    localStorage.setItem("inputSearch", keyWord);
    localStorage.setItem("shortMovies", !isOn);
  }

  function handleFilterMovies() {
    setIsOn(!isOn);

    if (!isOn) {
      if (filterDuration(foundInputMovies).length === 0) {
        setFilteredCheckboxMovies(filterDuration(foundInputMovies));
      } else {
        setFilteredCheckboxMovies(filterDuration(foundInputMovies));
      }
    } else {
      setFilteredCheckboxMovies(foundInputMovies);
    }
    localStorage.setItem("shortMovies", !isOn);
  }

  return (
    <main className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={handleSearchMovies}
        handleToggle={handleFilterMovies}
        input={input}
        isOn={isOn}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          buttonTitle={"Сохранить"}
          filteredCheckboxMovies={filteredCheckboxMovies}
          onCardLike={onCardLike}
          savedMovies={savedMovies}
        />
      )}

      <Footer />
    </main>
  );
}
export default Movies;
