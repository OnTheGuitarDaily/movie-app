import { getMovies } from "../script/ApiServices/apiService.js";

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

    const resImg = await getMovies("/configuration")
    const dataImg = resImg.data.images
    console.log(dataImg)
    
    displayMovies(dataMovies, dataTopMovies, dataUpcomingMovies, dataImg);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayMovies(dataMovies, dataTopMovies, dataUpcomingMovies, dataImg) {
  const popularMoviesDiv = document.querySelector('#popularMovies');
  const imgUrl = dataImg.base_url + "original"
  popularMoviesDiv.innerHTML = dataMovies.map((movie) => `
   <div class="col-8 movieCard">
      <img src="${imgUrl + movie.poster_path}">
      <div class="pb-4 px-2 mt-2">
        <p>${movie.title}</p>
        <footer class="d-flex justify-content-between col-11">
          <small>${movie.release_date}</small>
          <span style="color: white">
          <i class="fa-solid fa-star"></i>   ${movie.vote_average}
          </span>
        </footer>
      </div>
   </div>
  `).join('');

  const upcomingMovies = document.querySelector('#upcomingMovies');
  upcomingMovies.innerHTML = dataUpcomingMovies.map((movie) => `
  <div class="col-8 movieCard">
  <img src="${imgUrl + movie.poster_path}">
  <div class="pb-4 px-2 mt-2">
    <p>${movie.title}</p>
    <footer class="d-flex justify-content-between col-11">
      <small>${movie.release_date}</small>
      <span style="color: white">
      <i class="fa-solid fa-star"></i>   ${movie.vote_average}
      </span>
    </footer>
  </div>
</div>
  `).join('');

  const topMovies = document.querySelector('#topMovies');
  topMovies.innerHTML = dataTopMovies.map((movie) => `
  <div class="col-8 movieCard">
  <img src="${imgUrl + movie.poster_path}">
  <div class="pb-4 px-2 mt-2">
    <p>${movie.title}</p>
    <footer class="d-flex justify-content-between col-11">
      <small>${movie.release_date}</small>
      <span style="color: white">
      <i class="fa-solid fa-star"></i>   ${movie.vote_average}
      </span>
    </footer>
  </div>
</div>
  `).join('');

const movieCards = document.querySelectorAll('.movieCard');
movieCards.forEach((card) => {
  card.addEventListener('click', () => {
    window.location.href = 'moviePage.html';
  });
});
}

fetchData();

const burgerMenu = document.getElementById('burgerMenu')
let isMenuOpen = false;
burgerMenu.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen
  if(isMenuOpen){
    menu.classList.add('show');
    menu.classList.remove('hide');
  } else {
    menu.classList.remove('show');
    menu.classList.add('hide');
  } 
})

