import { getData, search } from "../script/ApiServices/apiService.js";


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

async function fetchData() {
    try { 
      const resTvShow = await getData('/tv/top_rated')
      const dataTvShow = resTvShow.data.results
      console.log(dataTvShow)

      const resImg = await getData("/configuration")
      const dataImg = resImg.data.images
      console.log(dataImg)

        displayTvShow(dataTvShow,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayTvShow(dataTvShow,dataImg){
    const tvShowDiv = document.querySelector('main');
    const imgUrl = dataImg.base_url + "original"
    tvShowDiv.innerHTML = dataTvShow.map((tvShow) => `
    
    <div class="col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 movieCard" data-tvShow-id="${tvShow.id}">
      <img src="${imgUrl + tvShow.poster_path}" alt="IMG">
      <div class="pb-4 px-2 mt-2">
        <p>${tvShow.name}</p>
        <footer class="d-flex justify-content-between col-12">
          <small>${tvShow.first_air_date}</small>
        </footer>
        <span>
          <i class="fa-solid fa-star"></i>   ${tvShow.vote_average}
          </span>
      </div>
   </div>
    `).join('')

    const movieCards = document.querySelectorAll('.movieCard');
movieCards.forEach((card) => {
  card.addEventListener('click', () => {
    const tvShowId = card.getAttribute('data-tvShow-id')
    localStorage.setItem('tvId', tvShowId)
    window.location.href = 'tvShowPage.html';
  });
});
}

  fetchData()

  async function performSearch() {
    try {
      const searchInput = document.getElementById('searchInput').value
      const resSearch = await search('/search/tv', searchInput);
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
    const filteredData = dataSearch.filter(item => item.name.toLowerCase().includes(searchInput));
    const imgUrl = dataImg.base_url + "original"
    const searchDiv = document.getElementById('searchDiv');
    if(searchInput.length > 0){
      console.log(filteredData)
      searchDiv.classList.remove('display')
      searchDiv.innerHTML = filteredData.map(
        (item) => `
          <div class="searchResult col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 my-3 d-flex align-items-center" data-movie-id="${item.id}">
            <img src="${imgUrl + item.poster_path}" alt="oster">
            <div class="col-8 mx-2">
              <p>${item.name}</p>
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

