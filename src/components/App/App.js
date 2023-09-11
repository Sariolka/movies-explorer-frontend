import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PageNotFound from "../PageNotFound/PageNotFound";
import { mainApi } from "../../utils/MainApi";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  /*  USER*/

  function handleRegister({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleLogin({ email, password }) {
    mainApi
      .authorize({ email, password })
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem("token", user.token);
        setCurrentUser(user);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .getContent(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser({ name: user.name, email: user.email });
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    handleCheckToken();
    PageNotFound
      ? navigate()
      : navigate(
          JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}")
        );
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
  }, [navigate]);

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  function editUserProfile({ name, email }) {
    mainApi
      .editUserProfile({ name, email })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* Movies */

  function handleMovieSave(card) {
    const isLiked = savedMovies.some(
      (savedMovie) => savedMovie.movieId === card.id
    );

    mainApi
      .saveMovie(card, isLiked)
      .then((newMovie) => {
        loadSavedMovies();
        console.log(newMovie);
        setSavedMovies([newMovie, ...savedMovies]);

        console.log(newMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(card) {
    console.log(card);
    mainApi
      .deleteMovie(card._id)
      .then(() => {
        loadSavedMovies();
        setSavedMovies((savedMovies) =>
          savedMovies.filter((i) => i.movieId !== card.movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      loadSavedMovies();
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onCardLike={handleMovieSave}
                onCardDelete={handleMovieDelete}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onCardDelete={handleMovieDelete}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onSignOut={handleSignOut}
                onChange={editUserProfile}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
