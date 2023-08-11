import { getMovies } from "../script/ApiServices/apiService.js";

async function fetchData() {
  try {
    const resMovies = await getMovies("/movie/popular");
    const dataMovies = resMovies.data;
    console.log("Popular:", dataMovies);

    const resTopMovies = await getMovies("/movie/top_rated");
    const dataTopMovies = resTopMovies.data;
    console.log("Top movies:", dataTopMovies);

    const resUpcomingMovies = await getMovies("/movie/upcoming");
    const dataUpcomingMovies = resUpcomingMovies.data;
    console.log("Upcoming:", dataUpcomingMovies);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchData();
