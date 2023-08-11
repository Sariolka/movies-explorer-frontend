import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
