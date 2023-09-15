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
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const navigate = useNavigate();

  /*  USER*/
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([res, savedMovies]) => {
          setCurrentUser(res);
          console.log(res, "user");
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    mainApi
      .authorize({ email, password })
      .then((user) => {
        localStorage.setItem("token", user.token);
        console.log(user.name);
        console.log(user.email);
        handleCheckToken();
        //  setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 401") {
          setErrorMessage("Вы ввели неправильный логин или пароль.");
        }
        if (err === "Ошибка: 500") {
          setErrorMessage(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        }
      });
  }

  function handleCheckToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .checkToken(token)
        .then((user) => {
          if (user) {
            console.log(user.name);
            setCurrentUser({ name: user.name, email: user.email });
            setLoggedIn(true);
          }
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

  function editUserProfile({ name, email }) {
    if (email === currentUser.email && name === currentUser.name) {
      return;
    } else {
      return mainApi
        .editUserProfile({ name, email })
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email });
          console.log(res);
          setErrorMessage("");
          setIsSuccess("Данные успешно обновлены");
        })

        .catch((err) => {
          setIsSuccess(" ");
          console.log(err);
          if (!err === "Ошибка: 409") {
            setErrorMessage("Пользователь с таким email уже существует.");
          }
          if (err === "Ошибка: 500") {
            setErrorMessage("При обновлении профиля произошла ошибка.");
          }
        });
    }
  }

  useEffect(() => {
    setErrorMessage("");
  }, [navigate]);

  function handleRegister({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setErrorMessage("Пользователь с таким email уже существует.");
        }
        if (err === "Ошибка: 500") {
          setErrorMessage("При регистрации пользователя произошла ошибка.");
        }
      });
  }

  useEffect(() => {
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
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  function setFalse() {
    setIsSuccess("");
  }

  /* Movies */

  function toggleMovieLike(card) {
    const isLiked = savedMovies.some(
      (savedMovie) => savedMovie.movieId === card.id
    );
    if (!isLiked) {
      mainApi
        .saveMovie(card)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const isLikedMovie = savedMovies.find((i) => i.movieId === card.id)._id;
      mainApi
        .deleteMovie(isLikedMovie)
        .then(() => {
          setSavedMovies((state) => state.filter((i) => i.movieId !== card.id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleMovieDelete(card) {
    mainApi
      .deleteMovie(card._id)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((i) => i.movieId !== card.movieId)
        );
      })
      .catch((err) => {
        console.log(err);
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
                onCardLike={toggleMovieLike}
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
                errorMessage={errorMessage}
                isSuccess={isSuccess}
                setFalse={setFalse}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} errorMessage={errorMessage} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  onRegister={handleRegister}
                  errorMessage={errorMessage}
                />
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
