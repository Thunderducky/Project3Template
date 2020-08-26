import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Members from "./pages/Members";
import Library from "./pages/Library";
import { useStoreContext } from './utils/GlobalStore';
import API from './utils/API';
import { AUTH_SET_LOGGED_IN, AUTH_SET_LOGGED_OUT } from "./utils/actions";
import NavTab from "../src/components/NavTabs";
import {MovieProvider} from "./utils/movieContext";
import MovieDetail from "./pages/MovieDetail";

function App() {
    // Our provider is setup in index.js so we can use the GlobalStore here easily.

    // Something we want to do at the beginning of the application is check if the user is logged in or not, if the user is, we'll
    // dispatch an action 
    const [state, dispatch] = useStoreContext();
    useEffect(() => {
        // Try getting our user-data, if the user is logged in, we will update our GlobalStore to refelct that
        API.checkUserInfo().then(response => {
            const { email, username } = response.data;

            dispatch({
                type: AUTH_SET_LOGGED_IN,
                data: {
                    email,
                    username
                }
            })
        }).catch(err => {
            // Not able to be logged in, leave us logged out
            console.log("error", err);
            dispatch({
                type: AUTH_SET_LOGGED_OUT
            })
        })
    }, []);


    return (

        <Router>
            <div>
                {/* Need to get render username on NavTab  */}
                <div>
                        {!state.userLoggedIn ? (
                            // if the user is Logged out
                            <div className="container-fluid">
                                <div className="row text-center">
                                    <div className="col-md-12 welcome">
                                <h1>Welcome to the Virtual Movie Library!</h1> &nbsp;&nbsp;&nbsp;
                                <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // If the user is Logged In
                            <>
                               <NavTab/> 
                            </>
                        )
                        }
                </div>
                <Switch>
                    {
                        
                        !state.userLoggedIn ? (
                            // These routes are only avaialable to LOGGED OUT users
                            <>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={Signup} />
                            </>
                        ) : (
                            // These routes are only available to LOGGED IN users
                            <>
                            <MovieProvider>
                              
                                <Route exact path={["/login","/signup"]}>
                                    {/* If you are logged in, going to the login/signup page will take you to the members page */}
                                    <Redirect to="/" />
                                </Route>
                                <Route exact path="/" component={Members} />
                                <Route exact path="/library" component={Library} />
                                <Route exact path="/movieDetail" component={MovieDetail} />
                            </MovieProvider>
                            </>
                            )
                    }
                    {
                        /* These routes are ALWAYS available */
                    }
                    <Route>
                        { /*If none of the other pages match, redirect them to the main page */}
                        <Redirect to="/" />
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

export default App;
