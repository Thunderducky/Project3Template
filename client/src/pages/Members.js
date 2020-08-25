import React, { useEffect, useState, useContext } from "react";
import SaveBtn from "../components/SaveBtn";
// import {NavContext} from "../../src/UserContext";
import "./style.css";
import OMDbAPI from "../utils/OMDbAPI";
import useDebounce from "../utils/debounceHook";
import {MovieContext} from "../utils/movieContext";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Jumbotron, 
  Container
} from "reactstrap";



function Members() {
  // Setting our component's initial state
const [movies, setMovies] = useState([]);
const [formObject, setFormObject] = useState({title: ""});

const MovieContextFn = () => {
const passMovie = useContext(MovieContext);
return passMovie;
} 
const {movieID, setMovieID} = MovieContextFn()


const debouncedSearchTerm = useDebounce(formObject, 800);
  // Load all movies and store them with setMovies
  useEffect( () => {
    if(!formObject.title){
      return;
    }
    if(debouncedSearchTerm){
      getMovies(formObject.title).then(res => {
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
  async function getMovies(title) {
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

async function movieClick(movie){
  var movieDB = {
  title: movie.Title,
  id: movie.imdbID
  }
  try{
  await setMovieID(movieDB);
  console.log(movieID);
  }
  catch(err){
    console.log(err);
  }

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
            <Form>
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
            </Form>
            </Col>
          </Row>
          
          <Row>
          <Col size = "12">
            {movies.length ? (
              <div>
              <label className = "label">Click "💾" to save movies to your library!</label>
              
              <ListGroup>
                {movies.map(movie => {
                  return (
                    <ListGroupItem key={movie.id}>
                      {(movie.Poster) ? (
                      <img className = "movie-img pr-2" src = {movie.Poster } />) : 
                     (<h3>Image Unavailable</h3>)}
                        <strong>
                          {movie.Title} directed by {movie.Director}
                        </strong>
                        {!movie.saved ? (
                        <SaveBtn onClick={() => movieClick(movie)} />
                        ) : null }
                        <hr></hr>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
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
