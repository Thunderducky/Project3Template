import axios from "axios";


export default {
    
  // Gets all books
  searchMovies: function(title) {
      title = title.split(" ").join("+").trim().toLowerCase();
      const key = "930b635d";
      var query;

      if(title){
        query = `https://www.omdbapi.com/?apikey=${key}&s=${title}`;
      }
    console.log(query);
    return axios.get(query)
  },

  getMovieByID: function(id) {
    const key = "930b635d";
    query = `https://www.omdbapi.com/?apikey=${key}&i=${id}`;
    console.log(query);
    return axios.get(query);
  }
           
}

//https://www.omdbapi.com/?apikey=930b635d&t=saw

