
// create axios instance
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjVhZjhkNmU0YjkxZTJmMzc0ZTAyYTI2Nzc2NTQ4YyIsInN1YiI6IjY0ZDYxNjVkZGI0ZWQ2MDBlMmI2NTY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thha-OnxEpkeBWXagT8NzGQNjpV9_9OUKGeQp5v_GXk"}
});

// Define api endpoints
export const getMovies = (endpoint) => instance.get(endpoint);
export const getActors = () => instance.get("/person/popular");
export const getTvShows = () => instance.get("/trending/movie/day");

export const generateImageUrl = (path) => instance.defaults.baseURL + path;
