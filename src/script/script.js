import instance, { getMovies } from "../../ApiServices/apiService.js";

async function fetchData() {
  try {
    const resMovies = await getMovies();
    const dataMovies = resMovies.data;
    console.log("Popular:", dataMovies);

    const resTopMovies = await instance.get("/3/movie/top_rated");
    const dataTopMovies = resTopMovies.data;
    console.log("Top movies:", dataTopMovies);

    const resUpcomingMovies = await instance.get("/3/movie/upcoming");
    const dataUpcomingMovies = resUpcomingMovies.data;
    console.log("Upcoming:", dataUpcomingMovies);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchData();
