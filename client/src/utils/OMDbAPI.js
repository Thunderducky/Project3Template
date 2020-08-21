import axios from "axios";


export default {
   
  // Gets all books
  getMovies: function(title) {
      title = title.split(" ").join("+").trim().toLowerCase();
      var key = "930b635d";
      var query;

      if(title){
        query = `https://www.omdbapi.com/?apikey=${key}&t=${title}`;
      }
    console.log(query);
    return axios.get(query)
  }
           
}

//https://www.omdbapi.com/?apikey=930b635d&t=saw