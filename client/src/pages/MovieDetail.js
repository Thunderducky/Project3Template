import React, { useState, useEffect } from "react";
import {  
  Media,
  Button
} from "reactstrap";
import classnames from "classnames";
import SqlAPI from "../utils/SQL-API";
import OMDbAPI from "../utils/OMDbAPI";

function MovieDetail(props) {
  const [movie] = useState(props);

  useEffect(() => {
    retrieveMovie(movie);
  }) 
      
  

  const retrieveMovie = async (movie) => {
    try {
        let res = await OMDbAPI.getMovieByID(movie.imdbID);
        console.log(res.data);
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
          synopsis: movie.synopsis,
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
          data-src={movie.Poster}
          alt={movie.Title}
        />
      </Media>
      <Media body>
        <Media heading>{movie.Title}</Media>
        {movie.Synopsis}
        <br />
        <h3>Own it? Click the formats you own</h3>
        <br />
        <Button left color="success" ref="DVD" onclick={handleSave}>DVD</Button>
        <Button left color="primary" ref="BluRay" onclick={handleSave}>Blu-Ray</Button>
        <Button left color="warning" ref="VOD" onclick={handleSave}>VOD</Button>
      </Media>
    </Media>
  );
}
export default MovieDetail;