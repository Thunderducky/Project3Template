import React, { useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Container,
  Media,
  Badge
} from "reactstrap";
import classnames from "classnames";
import SqlAPI from "../utils/SQL-API";
import "./wishlist.css";


const WishlistTab = () => {
  const [movieList, setMovieList] = useState(moviesArray);
  var moviesArray = [];

  useEffect(() => {
    retrieveMovies();
  }, []);

  const retrieveMovies = async (tab) => {
    try {
        moviesArray = [];
        const movieObject = await SqlAPI.getWishList();
        const allMovies = movieObject.data;
        allMovies.forEach((movie) => moviesArray.push(movie));
        setMovieList(moviesArray);
        }
    catch (err) {
      throw err;
    }
  };
  const renderBadges = function(movieObject) {
    switch (movieObject.format) {
      case "DVD":
        return <Badge color="success" pill>DVD</Badge>
      case "BluRay":
        return <Badge color="primary" pill>BluRay</Badge>
      case "VOD":
        return <Badge color="warning" pill>VOD</Badge>
      default:
        break;
    }
  }

  const handleDelete = function() {
    const id = this.id;
    SqlAPI.deleteMovie(id)
    const newList = movieList.filter(item => item.id !== id)
    setMovieList(newList);
  }

  return (
    <div>
      <Jumbotron fluid className="jumbotronWishlist">
        <Container fluid>
          <h1 className="display-3">Your Shelf</h1>
        </Container>
      </Jumbotron>

     
      <Row>
        <Col className="header" sm="12">
            <h4>Your Wishlist</h4>
          </Col>
        </Row>
        <Row>
          <Col className="wishList" sm="8">
            <ListGroup>
              {(movieList) ? movieList.map((movie) => (
                <Row>
                  <ListGroupItem className="movieItem" key={movie.id}>
                    <Media>
                      <Media left href={movie.poster}>
                        <Media className="poster"
                          object
                          src={movie.poster}
                          alt={movie.title}
                        />
                      </Media>
                      <Media body className="movieBody">
                        <Media heading><strong>{movie.title} {'\('+movie.year+'\)'} {renderBadges(movie)}</strong></Media>
                        {movie.synopsis}
                        <br />
                        <Button className="deleteBtn" outline color="danger" size="sm" id={movie.id} onClick={handleDelete}>Remove from Wishlist</Button>
                      </Media>
                    </Media>
                  </ListGroupItem>
                </Row>
              )): <h3> You do not have any movies saved to your wishlist!</h3>}
  
            </ListGroup>
          </Col>
        </Row>
    </div>
  );
};

export default WishlistTab;