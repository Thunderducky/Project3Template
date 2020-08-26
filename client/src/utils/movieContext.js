import React, {createContext, useContext, useReducer} from "react";
import {MOVIE_ID} from "./actions";

const MovieContext = createContext();
const {Provider} = MovieContext;

const reducer = (state, action) => {
    switch(action.type){
        case MOVIE_ID:
            return {
                ...state,
                Title: action.data.Title,
                imdbID: action.data.imdbID
            }
        default:
            return state;
    }
}

const MovieProvider = ({value, ...props}) => {
    const initialState = value || {
        Title: "",
        imdbID: ""
    };
    const [movieState, movieDispatch] = useReducer(reducer, initialState);
    return <Provider value={[movieState, movieDispatch]} {...props} />
}

const useMovieContext = () => {
    return useContext(MovieContext);
}

export {MovieProvider, useMovieContext};