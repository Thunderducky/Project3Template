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
} from "reactstrap";
import classnames from "classnames";
import SqlAPI from "../utils/SQL-API";
import "./library.css";

const LibraryTab = () => {
  const [activeTab, setActiveTab] = useState("All");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  var moviesArray = [];

  useEffect(() => {
    retrieveMovies(activeTab);
  }, [activeTab]);

  const retrieveMovies = async (tab) => {
    try {
      switch (tab) {
        case "All":
          moviesArray = [];
          const allMovies = await SqlAPI.getMovies();
          allMovies.forEach((movie) => moviesArray.push(movie));
          break;
        case "DVD":
          moviesArray = [];
          const dvdMovies = await SqlAPI.getMoviesByFormat("DVD");
          dvdMovies.forEach((movie) => moviesArray.push(movie));
          break;
        case "Blu-Ray":
          moviesArray = [];
          const brMovies = await SqlAPI.getMoviesByFormat("BluRay");
          brMovies.forEach((movie) => moviesArray.push(movie));
          break;
        case "VOD":
          moviesArray = [];
          const vodMovies = await SqlAPI.getMoviesByFormat("VOD");
          vodMovies.forEach((movie) => moviesArray.push(movie));
          break;
        default:
          break;
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <Jumbotron fluid className="jumbotronLibrary">
        <Container fluid>
          <h1 className="display-3">Your Shelf</h1>
        </Container>
      </Jumbotron>

      <Row>
        <Col className="libraryTabs" sm="8">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "All" })}
                onClick={() => {
                  toggle("All");
                }}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "DVD" })}
                onClick={() => {
                  toggle("DVD");
                }}
              >
                DVD
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "Blu-Ray" })}
                onClick={() => {
                  toggle("Blu-Ray");
                }}
              >
                Blu-Ray
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "VOD" })}
                onClick={() => {
                  toggle("VOD");
                }}
              >
                VOD
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="All">
              <Row>
                <Col className="header" sm="12">
                  <h4>Your Library</h4>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <ListGroup>
                    {moviesArray.map((movie) => (
                      <Row>
                        <ListGroupItem key={movie.id}>
                          <Media>
                            <Media left>
                              <Media
                                object
                                data-src={movie.poster}
                                alt={movie.title}
                              />
                            </Media>
                            <Media body>
                              <Media heading>{movie.title}</Media>
                              {movie.synopsis}
                              <Button outline color="danger" size="sm">Remove from Shelf</Button>
                            </Media>
                          </Media>
                        </ListGroupItem>
                      </Row>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="DVD">
              <Row>
                <Col className="header" sm="12">
                  <h4>Your DVDs</h4>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <ListGroup>
                    {moviesArray.map((movie) => (
                      <Row>
                        <ListGroupItem key={movie.id}>
                          <Media>
                            <Media left>
                              <Media
                                object
                                data-src={movie.poster}
                                alt={movie.title}
                              />
                            </Media>
                            <Media body>
                              <Media heading>{movie.title}</Media>
                              {movie.synopsis}
                              <Button outline color="danger" size="sm">Remove from Shelf</Button>
                            </Media>
                          </Media>
                        </ListGroupItem>
                      </Row>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="Blu-Ray">
              <Row>
                <Col className="header" sm="12">
                  <h4>Your Blu-Rays</h4>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <ListGroup>
                    {moviesArray.map((movie) => (
                      <Row>
                        <ListGroupItem key={movie.id}>
                          <Media>
                            <Media left>
                              <Media
                                object
                                data-src={movie.poster}
                                alt={movie.title}
                              />
                            </Media>
                            <Media body>
                              <Media heading>{movie.title}</Media>
                              {movie.synopsis}
                              <Button outline color="danger" size="sm">Remove from Shelf</Button>
                            </Media>
                          </Media>
                        </ListGroupItem>
                      </Row>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="VOD">
              <Row>
                <Col className="header" sm="12">
                  <h4>Your VOD Purchases</h4>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <ListGroup>
                    {moviesArray.map((movie) => (
                      <Row>
                        <ListGroupItem key={movie.id}>
                          <Media>
                            <Media left>
                              <Media
                                object
                                data-src={movie.poster}
                                alt={movie.title}
                              />
                            </Media>
                            <Media body>
                              <Media heading>{movie.title}</Media>
                              {movie.synopsis}
                              <Button outline color="danger" size="sm">Remove from Shelf</Button>
                            </Media>
                          </Media>
                        </ListGroupItem>
                      </Row>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
};

export default LibraryTab;
