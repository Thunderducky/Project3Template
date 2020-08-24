import React, { useEffect, useState, useContext } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import SqlAPI from "../utils/SQL-API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import DeleteBtnDisplay from "../components/DisplayDeleteBtn";
import {NavContext} from "../../src/UserContext";
import "./style.css";



function Saved() {
  // Setting our component's initial state
const [movies, setMovies] = useState([]);

// const NavStat = () => {
//   const contextVal = useContext(NavContext);
//   return contextVal;

// }
//   const navStatus = NavStat();
//   console.log(navStatus)

  // Load all movies and store them with setMovies
  useEffect( () => {
      //navStatus.setStatus("lib");
    //   console.log(navStatus.status);
      getMovies().then(res => {
        console.log(res);
        setMovies(res);
      })
  }, [])

  // Loads all books and sets them to books
  async function getMovies() {
    try{
      let res = await SqlAPI.getMovies()
      return res.data;
    }
    catch(err){
        throw err;
    }
}

async function handleDelete(id, title) {
  
  try{
    
      await SqlAPI.deleteMovie(id);
      const res = await getMovies();
      setMovies(res);
      alert(title + " has been deleted from your library.")
  }
    catch(err){
        throw err;
  }
}

    return ( 
      <div>
      <Jumbotron>
        <h1 className = "hdr">My Personal Library</h1>
      </Jumbotron>
      <Container fluid>
          <Row>
          <Col size = "12">
           
            {movies.length !== undefined ? (
              <div>
                <label className = "label"> Click "{<DeleteBtnDisplay />}" to remove movie from library!</label>
              <List>
                {movies.map(movie => {
                  return (
                    <ListItem key={movie.id}>
                      {(movie.Poster) ? (
  
                      <img className = "movie-img pr-2" src = {movie.Poster} />
                      ) : (<h3>Poster Unavailable</h3>)}
                        <strong>
                          {movie.Title}
                        </strong>
                        <DeleteBtn onClick = {() => handleDelete(movie.id, movie.title)}/>
                        <hr></hr>
                    </ListItem>
                  );
                })}
              </List>
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }


export default MyLibrary;
