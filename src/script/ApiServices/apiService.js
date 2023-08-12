const apiKey = "325af8d6e4b91e2f374e02a26776548c"; // Replace with your actual API key

// create axios instance
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer 325af8d6e4b91e2f374e02a26776548c"}
});

// Define api endpoints
export const getMovies = (endpoint) => instance.get(endpoint);
export const getActors = () => instance.get("/person/popular");
export const getTvShows = () => instance.get("/trending/movie/day");

export const generateImageUrl = (path) => instance.defaults.baseURL + path;
