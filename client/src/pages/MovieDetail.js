import React, { useState, useEffect, useRef } from "react";
import { Media, Button } from "reactstrap";
import classnames from "classnames";
import SqlAPI from "../utils/SQL-API";
import OMDbAPI from "../utils/OMDbAPI";
import { useMovieContext } from "../utils/movieContext";
import {MOVIE_ID} from "../utils/actions";

function MovieDetail(props) {
  const [movieState, dispatchMovie] = useMovieContext();
  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    year: "",
    synopsis: "",
    format: "",
    wishlist: false,
  });

  useEffect(() => {
 
    if(movieState.Title){
      localStorage.setItem("movie", JSON.stringify(movieState));
      console.log(movieState);
      retrieveMovie(movieState).then((res) => {
      console.log(res);
      setMovie(res); 
      })
    }
    else if(localStorage.getItem("movie")){
      const getStor = JSON.parse(localStorage.getItem("movie"));
      console.log(getStor);  
      retrieveMovie(getStor).then((res) => {
      console.log(res);
      setMovie(res);  
      })
    }        
  }, []);

  const retrieveMovie = async (movie) => {
    try {
      let res = await OMDbAPI.getMovieByID(movie.imdbID);
      //console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const saveMovieToDB = async (movieData) => {
    try {
      await SqlAPI.saveMovie(movieData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = function (e) {
    e.preventDefault();
    const movieObject = {
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      synopsis: movie.Plot,
      format: this.value,
      wishlist: false,
    };
    if (this.wish === "wishlist") {
      movieObject.wishlist = true;
    }
    console.log(movieObject);
    saveMovieToDB(movieObject);
  };

  const handleImg = function (string) {
    if (string !== "N/A") {
      return string;
    } else {
      return "https://bit.ly/3hxWg5k";
    }
  };

  const handleSynopsis = function (string) {
    if (string !== "N/A") {
      return string;
    } else {
      return "No synopsis available";
    }
  };

  const handleHide = function (e) {};

  return (
    <div>
      <h1 className="detailHeader"><strong>Movie Details</strong></h1>
      <Media className="movieDetail">
        <Media left>
          <Media
            className="largePoster"
            object
            src={handleImg(movie.Poster)}
            alt={movie.Title}
          />
        </Media>
        <Media body className="movieBody">
          <Media heading className="title"><h2><strong>{movie.Title} {'\('+ movie.Year + '\)'}</strong></h2></Media>
          {handleSynopsis(movie.Plot)}
          <hr />
          <h3>Own it? Click the formats you own</h3>
          <Button
            className="formatBtn"
            left="true"
            color="success"
            value="DVD"
            onClick={handleSave}
          >
            DVD
          </Button>
          <Button
            className="formatBtn"
            left="true"
            color="primary"
            value="BluRay"
            onClick={handleSave}
          >
            Blu-Ray
          </Button>
          <Button
            className="formatBtn"
            left="true"
            color="warning"
            value="VOD"
            onClick={handleSave}
          >
            VOD
          </Button>
          <hr />
          <h3>Want to own it?</h3>
          <Button
            className="formatBtn"
            left="true"
            outline 
            color="primary"
            wish="wishlist"
            onClick={handleSave}
          >
            Add to Wishlist
          </Button>
        </Media>
      </Media>
    </div>
  );
}
export default MovieDetail;
