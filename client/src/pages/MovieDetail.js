import React, { useState, useEffect, useRef } from "react";
import {  
  Media,
  Button
} from "reactstrap";
import classnames from "classnames";
import SqlAPI from "../utils/SQL-API";
import OMDbAPI from "../utils/OMDbAPI";
import {useMovieContext} from "../utils/movieContext";

function MovieDetail(props) {
  const [movieState, dispatchMovie] = useMovieContext();
  const[movie, setMovie] = useState({
    title: "",
    poster: "",
    year: "",
    synopsis: "",
    format: "",
    wishlist: false
  });
  
  


  useEffect(() => {
    console.log(movieState);
    retrieveMovie(movieState).then(res => {
      console.log(res);
      setMovie(res);
      console.log(movie);
      
    });
    
    
  }, [])

      

  const retrieveMovie = async (movie) => {
    try {
        let res = await OMDbAPI.getMovieByID(movie.imdbID);
        //console.log(res.data);
        return res.data;
    } catch(err) {
        throw err;
    }
  }

  const saveMovie = async (movieData) => {
      SqlAPI.saveMovie(movieData)
  }

  const handleSave = function(e) {
      e.preventDefault();
      const movieObject = {
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
          synopsis: movie.Plot,
          format: this.ref,
          wishlist: true
      }

      saveMovie(movieObject);
  }

  const handleHide = function(e) {
      
  }

  return (
    <Media>
      <Media left>
        <Media
          object
          src={movie.Poster}
          alt={movie.Title}
        />
      </Media>
      <Media body>
        <Media heading>{movie.Title}</Media>
        {movie.Plot}
        <br />
        <h3>Own it? Click the formats you own</h3>
        <br />
        <Button left="true" color="success" ref= {useRef("DVD")} onClick={handleSave}>DVD</Button>
        <Button left="true" color="primary" ref= {useRef("BluRay")} onClick={handleSave}>Blu-Ray</Button>
        <Button left="true" color="warning" ref= {useRef("VOD")} onClick={handleSave}>VOD</Button>
      </Media>
    </Media>
  );
}
export default MovieDetail;