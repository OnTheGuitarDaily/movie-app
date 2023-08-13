import { getMovies, search } from "../script/ApiServices/apiService.js";

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

async function performSearch() {
  try {
    const searchInput = document.getElementById('searchInput').value
    const resSearch = await search('/search/movie', searchInput);
    const dataSearch = resSearch.data.results;
    console.log('search', dataSearch);

    const resImg = await getMovies("/configuration");
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
        <div class="searchResult col-11 my-3 d-flex align-items-center">
          <img src="${imgUrl + item.poster_path}" alt="oster">
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
    searchDiv.style.height = 'auto'
  }

  const searchResult = document.querySelectorAll('.searchResult');
  searchResult.forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = 'moviePage.html';
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

