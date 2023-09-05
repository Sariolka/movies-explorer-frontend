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

  //const [films, setFilms] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  //useEffect(() => {
  // moviesApi.getMovies()
   //.then((res) => localStorage.setItem("films", )
// )}, []);

 

  function handleRegister(user) {
    mainApi
      .register({ name: user.name, email: user.email, password: user.password })
      .then(() => {
        handleLogin(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(user) {
    mainApi
      .authorize(user)
      .then((user) => {
        if (user) {
          localStorage.setItem("token", user.token);
          handleCheckToken();

          setLoggedIn(true);
         // handleGetMovies();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckToken() {
    mainApi
      .checkToken()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setCurrentUser({});
      });
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/", { replace: true });
  }
  useEffect(() => {
    navigate(JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}"));
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
  }, []);

  function editUserProfile(value) {
    mainApi
      .editUserProfile(value)
      .then((user) => {
        setCurrentUser(user);
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
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} savedMovies={ savedMovies }/>}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onSignOut={onSignOut}
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
