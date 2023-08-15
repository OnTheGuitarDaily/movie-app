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

async function fetchData() {
    try { 
      const resTvShow = await getData('/person/popular')
      const dataActor = resTvShow.data.results
      console.log(dataActor)

      const resImg = await getData("/configuration")
      const dataImg = resImg.data.images
      console.log(dataImg)

      displayActos(dataActor,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayActos(dataActor,dataImg){
    const tvShowDiv = document.querySelector('main');
    const imgUrl = dataImg.base_url + "original"
    tvShowDiv.innerHTML = dataActor.map((actor) => `
    
    <div class="col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 movieCard" data-actor-id="${actor.id}">
      <img src="${imgUrl + actor.profile_path}" alt="IMG">
      <div class="pb-4 px-2 mt-2">
        <p>${actor.name}</p>
      </div>
   </div>
    `).join('')

    const movieCards = document.querySelectorAll('.movieCard');
movieCards.forEach((card) => {
  card.addEventListener('click', () => {
    const actorId = card.getAttribute('data-actor-id')
    localStorage.setItem('actorId', actorId)
    window.location.href = 'actorPage.html';
  });
});
}

  fetchData()

  const logo = document.getElementById ('logo')
  logo.addEventListener('click', () => {
    window.location.href = 'index.html';
  })

  async function performSearch() {
    try {
      const searchInput = document.getElementById('searchInput').value
      const resSearch = await search('/search/person', searchInput);
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
            <img src="${imgUrl + item.profile_path}" alt="IMG">
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