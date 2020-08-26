import React, { useEffect, useState, useContext } from "react";
import SqlAPI from "../utils/SQL-API";
import SaveBtn from "../components/SaveBtn";
// import {NavContext} from "../../src/UserContext";
import "./style.css";
import OMDbAPI from "../utils/OMDbAPI";
import useDebounce from "../utils/debounceHook";
import {
  TabContent,
  TabPane,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
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
const [formObject, setFormObject] = useState({
  title: ""
})

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
      <h1 className ="hdr text-center">SEARCH FOR MOVIES!</h1>
    </Jumbotron>
    
      <Container>
        <Row>
          <Col className="text-center" size = "6">
            <label className = "label">Search by title </label>
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
          <Col md="12">
            {movies.length ? (
              <div>
              <label className = "label">Click "🔍" to see detail!</label>
              
              <ListGroup>
                {movies.map(movie => {
                  return (
                    <ListGroupItem key={movie.id}>
                      {(movie.Poster) ? (
                      <img className = "movie-img pr-2" src = {movie.Poster } />) : 
                     (<h3>Image Unavailable</h3>)}
                        <strong>
                          {movie.Title} 
                        </strong>
                        {!movie.saved ? (
                        <SaveBtn onClick={() => saveClick(movie)} />
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
