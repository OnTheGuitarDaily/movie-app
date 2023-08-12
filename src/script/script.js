import { getMovies, generateImageUrl } from "../script/ApiServices/apiService.js";

async function fetchData() {
  try {
    const resMovies = await getMovies("/movie/popular");
    const dataMovies = resMovies.data.results;
    console.log("Popular:", dataMovies);

    const resTopMovies = await getMovies("/movie/top_rated");
    const dataTopMovies = resTopMovies.data.results;
    console.log("Top movies:", dataTopMovies);

    const resUpcomingMovies = await getMovies("/movie/upcoming");
    const dataUpcomingMovies = resUpcomingMovies.data.results;
    console.log("Upcoming:", dataUpcomingMovies);
    
    displayMovies(dataMovies, dataTopMovies, dataUpcomingMovies);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayMovies(dataMovies, dataTopMovies, dataUpcomingMovies) {
  const popularMoviesDiv = document.querySelector('#popularMovies');
  const imgUrl = generateImageUrl("/movie/popular");
  const topImgUrl = generateImageUrl("/movie/top_rated");
  const upcomingImgUrl = generateImageUrl("/movie/upcoming")

  popularMoviesDiv.innerHTML = dataMovies.map((movie) => `
   <div>
      <img src="${imgUrl + movie.poster_path}">
   </div>
  `).join('');
  

}

fetchData();
