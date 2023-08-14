import { getTvShows } from "../script/ApiServices/apiService.js";


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

async function fetchData() {
    try { 
      const resTvShow = await getTvShows('/tv/top_rated')
      const dataTvShow = resTvShow.data.results
      console.log(dataTvShow)

      const resImg = await getTvShows("/configuration")
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
    
    <div class="col-5 movieCard" data-tvShow-id="${tvShow.id}">
      <img src="${imgUrl + tvShow.poster_path}">
      <div class="pb-4 px-2 mt-2">
        <p>${tvShow.name}</p>
        <footer class="d-flex justify-content-between col-12">
          <small>${tvShow.first_air_date}</small>
          <span style="color: white">
          <i class="fa-solid fa-star"></i>   ${tvShow.vote_average}
          </span>
        </footer>
      </div>
   </div>
    `).join('')

    const movieCards = document.querySelectorAll('.movieCard');
movieCards.forEach((card) => {
  card.addEventListener('click', () => {
    const tvShowId = card.getAttribute('data-tvShow-id')
    localStorage.setItem('id', tvShowId)
    window.location.href = 'tvShowPage.html';
  });
});
}

  fetchData()

