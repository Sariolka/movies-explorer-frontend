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
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

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
    //вход
    mainApi
      .authorize({ email, password })
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          localStorage.setItem("token", user.token);
          setCurrentUser(user);
          console.log(user);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleCheckToken() {
    // проверка токена
    mainApi
      .getUserInfo()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setCurrentUser(null);
      });
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleSignOut() {
    //выход
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  useEffect(() => {
    navigate(JSON.parse(window.sessionStorage.getItem("lastRoute")));
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
  }, []);

  function editUserProfile({ name, email }) {
    //редактирование профиля
    mainApi
      .editUserProfile({ name, email })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSaveMovie(card) {
    const isLiked = savedMovies.some((card) => card.movieId === card.id);
    mainApi
      .saveMovie(card, isLiked)
      .then((card) => {
        const newSavedMovies = [card, ...savedMovies];
        setSavedMovies(newSavedMovies);
        localStorage.setItem("lastSavedMovies", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    mainApi
      .deleteMovie(card)
      .then(() => {
        setSavedMovies(savedMovies.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
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
                onCardLike={handleSaveMovie}
                onCardDelete={handleCardDelete}
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
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
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
