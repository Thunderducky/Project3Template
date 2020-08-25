import React, {createContext, useState} from "react";

const MovieContext = createContext();

const MovieProvider = ({children}) => {
const [movieID, setMovieID] = useState({title: "", id: ""});

return (
    <MovieContext.Provider value = {{movieID, setMovieID}} >
        {children}
    </MovieContext.Provider>
)
}

export {MovieProvider, MovieContext};