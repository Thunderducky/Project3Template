import React, { useEffect, useState, useContext } from "react";
import {Jumbotron} from "reactstrap";
import SqlAPI from "../utils/SQL-API";
import { Col, Row, Container } from "../components/Grid";
import {List, ListItem } from "../components/List";
import {Input} from "../components/Form";
import SaveBtn from "../components/SaveBtn";
// import {NavContext} from "../../src/UserContext";
import "./style.css";
import OMDbAPI from "../utils/OMDbAPI";
import useDebounce from "../utils/debounceHook";



function Members() {
  // Setting our component's initial state
const [movies, setMovies] = useState([]);
const [formObject, setFormObject] = useState({
  title: "",
  director: "",
  year: "",
  synopsis: ""
})

const debouncedSearchTerm = useDebounce(formObject, 5000);
  // Load all movies and store them with setMovies
  useEffect( () => {
    if(!formObject.title && !formObject.director){
      return;
    }
    if(debouncedSearchTerm){
      getMovies(formObject.title, formObject.director).then(res => {
        if(res!== undefined && res.length !== 0){
          res.forEach(element => {
            element.saved = false;
          });
          console.log(res);
          setMovies(res);
        }
      })
    }
  }, [debouncedSearchTerm])

  // Loads all movies and sets state to movies that match search
  async function getMovies(title, director) {
    try{
      let res = await OMDbAPI.searchMovies(title);
      console.log(res.data);
      return res.data.Search;
    }
    catch(err){
        throw err;
    }
}

function handleInputChange(event) {
  //console.log(event.target.value)
  const { name, value } = event.target;
  setFormObject({...formObject, [name]: value})
  console.log(formObject);
};

function saveClick(movie){
  var movieDB = {
  title: movie.Title,
  poster: movie.Poster,
  year: movie.Year,
  synopsis: movie.synopsis,
  format: movie.format,
  wishlist: movie.wishlist
  }
  console.log(movieDB);
  SqlAPI.saveMovie(movieDB).then((res) => {
    hideSaveBtn(movie);
  }).catch(err => {
    throw err; 
  })
}

function hideSaveBtn(movie){
  let moviesTemp = [...movies];
  moviesTemp.forEach( item => {
    if(movie.imdbID === item.imdbID)
    {
      item.saved = true;
    }
  })
  setMovies(moviesTemp);
}



    return ( 
      <div>
    <Jumbotron>
      <h1 className ="hdr">SEARCH FOR MOVIES!</h1>
    </Jumbotron>
    
      <Container fluid>
        <Row>
          <Col size = "12">
          
           
            <label className = "label">Search by title or...: </label>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                onChange={handleInputChange}
                name="Director"
                placeholder="Director"
              />
            </form>
            </Col>
          </Row>
          
          <Row>
          <Col size = "12">
            {movies.length ? (
              <div>
              <label className = "label">Click "💾" to save movies to your library!</label>
              
              <List>
                {movies.map(movie => {
                  return (
                    <ListItem key={movie.id}>
                      {(movie.Poster) ? (
                      <img className = "movie-img pr-2" src = {movie.Poster } />) : 
                     (<h3>Image Unavailable</h3>)}
                        <strong>
                          {movie.Title} directed by {movie.Director}
                        </strong>
                        {!movie.saved ? (
                        <SaveBtn onClick={() => saveClick(movie)} />
                        ) : null }
                        <hr></hr>
                    </ListItem>
                  );
                })}
              </List>
              </div>
            ) : (
              <h3 className = "label">No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }



export default Members;
