import axios from 'axios';

const articlesQuery = "http://newsapi.org/v2/everything?q=election&apiKey=c39a9e63856d42c79939c70fc8cd30fc";


export default {
    // This function is to check if the user is logged in, and to return their info if they are not
    checkUserInfo: () => {
        return axios.get("/api/user_data");
    },
    signup: (signupData) => {
        return axios.post("/api/signup", signupData)
    },
    login: (loginData) => {
        return axios.post("/api/login", loginData)
    },
    logout: () => {
        return axios.get("/logout");
    },
    articles: function () {
        return axios.get(articlesQuery)
    }
}