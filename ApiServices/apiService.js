// create axios instance
const instance = axios.create({
  method: "GET",
  baseURL: "https://api.themoviedb.org",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjVhZjhkNmU0YjkxZTJmMzc0ZTAyYTI2Nzc2NTQ4YyIsInN1YiI6IjY0ZDYxNjVkZGI0ZWQ2MDBlMmI2NTY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thha-OnxEpkeBWXagT8NzGQNjpV9_9OUKGeQp5v_GXk",
  },
});

// Define api endpoints
export const getMovies = () => instance.get("/3/movie/popular");
export const getActors = () => instance.get("/3/person/popular");
export const getTvShows = () => instance.get("/3/trending/movie/day");

export default instance;
