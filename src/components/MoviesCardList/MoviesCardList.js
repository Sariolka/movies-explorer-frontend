import {useState, useEffect} from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ cards, onCardLike, onCardDelete, savedMovies }) {
 //const [ addedMovies, setAddedMovies ] = useState([]);
 // const [ countMovies, setCountMovies ] = useState(0);
//const [addMoreMovies, setAddMoreMovies]= useState(0);


//function handleResize(e) {
  //setTimeout(() => {
      //setWidth(e.target.innerWidth)
 // }, 1000)
//}

//useEffect(() => {
  //function changeQuantityMovies() {
   // if (window.innerWidth > 1280) {
    //  setCountMovies(16);
     // setAddMoreMovies(4);
  // } else if (window.innerWidth > 981) {
    //  setCountMovies(12);
     // setAddMoreMovies(3);
  // } else if (window.innerWidth > 671) {
    //  setCountMovies(8);
     // setAddMoreMovies(2);
   // } else if (window.innerWidth < 671) {
    //  setCountMovies(5);
     // setAddMoreMovies(1);
  // }
 // }
  // changeQuantityMovies(); 
 // }, [window.innerWidth]);

 //useEffect(() => {
   // changeQuantityMovies();
   // window.addEventListener('resize',changeQuantityMovies);
   // return () => window.removeEventListener('resize', changeQuantityMovies);
 // }, []);

 //function handleAddMoreMovies() {
//setCountMovies(countMovies + addMoreMovies);
//}
  
  const cardsList = cards.map((card) => ( //фильмы, которые будет рендериться на странице
    <MoviesCard 
    key={card.id || card._id}
    card={card}
    onCardLike={onCardLike}
    onCardDelete={onCardDelete}
    savedMovies={savedMovies}
    />
  ));

  return (
    <section className="movies-cards" aria-label="Список фильмов">
      <ul className="movies-cards__list">
        {cardsList}
      </ul>
      <button className={ "movies-cards__button-more"} >Ещё</button>
    </section>
  );
}
export default MoviesCardList;
