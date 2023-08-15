import { getData, search } from "../script/ApiServices/apiService.js";

async function fetchData() {
  try {
    const resMovies = await getData("/movie/popular");
    const dataMovies = resMovies.data.results;
    console.log("Popular:", dataMovies);

    const resTopMovies = await getData("/movie/top_rated");
    const dataTopMovies = resTopMovies.data.results;
    console.log("Top movies:", dataTopMovies);

    const resUpcomingMovies = await getData("/movie/upcoming");
    const dataUpcomingMovies = resUpcomingMovies.data.results;
    console.log("Upcoming:", dataUpcomingMovies);

    const resImg = await getData("/configuration")
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
   <div class="col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 movieCard" data-movie-id="${movie.id}">
      <img src="${imgUrl + movie.poster_path}" alt="IMG">
      <div class="pb-4 px-2 mt-2">
        <p>${movie.title}</p>
        <footer class="d-flex justify-content-between col-12">
          <small>${movie.release_date}</small>
        </footer>
        <span>
          <i class="fa-solid fa-star"></i>   ${movie.vote_average}
          </span>
      </div>
   </div>
  `).join('');

  const upcomingMovies = document.querySelector('#upcomingMovies');
  upcomingMovies.innerHTML = dataUpcomingMovies.map((movie) => `
  <div class="col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 movieCard" data-movie-id="${movie.id}">
  <img src="${imgUrl + movie.poster_path}" alt="IMG">
  <div class="pb-4 px-2 mt-2">
    <p>${movie.title}</p>
    <footer class="d-flex justify-content-between col-12">
      <small>${movie.release_date}</small>
    </footer>
    <span>
      <i class="fa-solid fa-star"></i>   ${movie.vote_average}
      </span>
  </div>
</div>
  `).join('');

  const topMovies = document.querySelector('#topMovies');
  topMovies.innerHTML = dataTopMovies.map((movie) => `
  <div class="col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 movieCard" data-movie-id="${movie.id}">
  <img src="${imgUrl + movie.poster_path}" alt="IMG">
  <div class="pb-4 px-2 mt-2">
    <p>${movie.title}</p>
    <footer class="d-flex justify-content-between col-12">
      <small>${movie.release_date}</small>
    </footer>
    <span>
          <i class="fa-solid fa-star"></i>   ${movie.vote_average}
          </span>
  </div>
</div>
  `).join('');

const movieCards = document.querySelectorAll('.movieCard');
movieCards.forEach((card) => {
  card.addEventListener('click', () => {
    const movieId = card.getAttribute('data-movie-id')
    localStorage.setItem('movieId', movieId)
    window.location.href = 'moviePage.html';
  });
});
}

fetchData();

async function performSearch() {
  try {
    const searchInput = document.getElementById('searchInput').value
    const resSearch = await search('/search/movie', searchInput);
    const dataSearch = resSearch.data.results;
    console.log('search', dataSearch);

    const resImg = await getData("/configuration");
    const dataImg = resImg.data.images;

    searchItems(dataSearch, dataImg)
  } catch (error) {
    console.error("Error:", error);
  }
}

function searchItems(dataSearch , dataImg) {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = dataSearch.filter(item => item.title.toLowerCase().includes(searchInput));
  const imgUrl = dataImg.base_url + "original"
  const searchDiv = document.getElementById('searchDiv');
  if(searchInput.length > 0){
    console.log(filteredData)
    searchDiv.classList.remove('display')
    searchDiv.innerHTML = filteredData.map(
      (item) => `
        <div class="searchResult col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 my-3 d-flex align-items-center" data-movie-id="${item.id}">
          <img src="${imgUrl + item.poster_path}" alt="IMG">
          <div class="col-8 mx-2">
            <p>${item.title}</p>
          </div>
        </div>
      `
    ).join('');
  } else if (searchInput.length === 0) {
    searchDiv.classList.add('display')
    searchDiv.innerHTML = '';
  } 
   if (filteredData.length === 0) { 
    searchDiv.innerHTML= `<h1>No results</h1>`
  }

  const searchResult = document.querySelectorAll('.searchResult');
  searchResult.forEach((card) => {
    const searchMovieId = card.getAttribute('data-movie-id')
    card.addEventListener('click', () => {
      window.location.href = 'moviePage.html';
      localStorage.setItem('movieId', searchMovieId)
    });
  });

}

document.getElementById('searchInput').addEventListener('input', () => {
  performSearch(); 
});


const burgerMenu = document.getElementById('burgerMenu')
let isMenuOpen = false;
burgerMenu.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen
  if(isMenuOpen){
    menu.classList.add('show');
    menu.classList.remove('display');
  } else {
    menu.classList.remove('show');
    menu.classList.add('display');
  } 
})

const logo = document.getElementById ('logo')
logo.addEventListener('click', () => {
  window.location.href = 'index.html';
})