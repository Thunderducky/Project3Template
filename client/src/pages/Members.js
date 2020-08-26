import React, { useEffect, useState, useContext } from "react";
import SaveBtn from "../components/SaveBtn";
import { useHistory } from 'react-router-dom';
// import {NavContext} from "../../src/UserContext";
import "./style.css";
import OMDbAPI from "../utils/OMDbAPI";
import useDebounce from "../utils/debounceHook";
import {useMovieContext} from "../utils/movieContext";
import {MOVIE_ID} from "../utils/actions";
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

const [state, dispatch] = useMovieContext();
const history = useHistory();

const debouncedSearchTerm = useDebounce(formObject, 800);
  // Load all movies and store them with setMovies
  useEffect( () => {
    console.log(state);
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
  }, [debouncedSearchTerm, state])

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

const handleClick = (movie) => {
  if(movie.imdbID && movie.Title){
  dispatch({
    type: MOVIE_ID,
    data: {
      Title: movie.Title, 
      imdbID: movie.imdbID
    }
  })
  history.push("/movieDetail");
  
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
            </Form>
            </Col>
          </Row>
          
          <Row>
          <Col size = "12">
            {movies.length ? (
              <div>
              <label className = "label">Click "View Info" to view details and save the respecitive movie to your movie shelf!</label>
              
              <ListGroup>
                {movies.map(movie => {
                  return (
                    <ListGroupItem key={movie.imdbID}>
                      {(movie.Poster) ? (
                      <img className = "movie-img pr-2" src = {movie.Poster } />) : 
                     (<h3>Image Unavailable</h3>)}
                        <strong>
                          {movie.Title}
                        </strong>
                        {!movie.saved ? (
                        <SaveBtn onClick={() => handleClick(movie)} />
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