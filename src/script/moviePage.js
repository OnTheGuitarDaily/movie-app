import { getMovies } from "../script/ApiServices/apiService.js";

async function fetchData() {
    try {
        const id = localStorage.getItem('id')

        const resMovie = await getMovies(`/movie/${id}`);
        const dataMovie  = resMovie.data;
        console.log('movie',dataMovie);

        const resCast = await getMovies(`/movie/${id}/credits`);
        const dataCast  = resCast.data.cast;
        console.log('cast',dataCast);
  
        const resImg = await getMovies("/configuration")
        const dataImg = resImg.data.images
        console.log(dataImg)
      
        displayMovie(dataMovie,dataCast,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayMovie(dataMovie, dataCast, dataImg){
    const infoDiv = document.querySelector('main')
    const imgUrl = dataImg.base_url + "original"
    infoDiv.innerHTML = `
    <div class="col-12 movieCard">
        <img src="${imgUrl + dataMovie.poster_path}">
    </div>
    <div class="text col-12 pt-4 px-3">
            <h1>${dataMovie.title}</h1>
            <small>${dataMovie.release_date}</small><br>
            <i>"${dataMovie.tagline}"</i>
            <h2 class="my-3">Overview</h2>
            <p>${dataMovie.overview}</p>
            <h2>Cast</h2>
            <div id="cast" class="d-flex gap-2 col-12 my-3 px-2"></div>
     </div>
     
    `
    const popularActors = dataCast.filter(item => item.popularity > 10)
    console.log(popularActors)
    const castDiv = infoDiv.querySelector('#cast')
    castDiv.innerHTML = popularActors.map((actor) => `
    
    <div class="actorCard col-5">
        <img src="${imgUrl + actor.profile_path}">
        <p>${actor.name}</p>
        <small>${actor.character}</small>
    </div>
    `).join('')

    const actorDiv = castDiv.querySelectorAll('.actorCard')
    actorDiv.forEach(actor => {
        actor.addEventListener('click', () => {
          window.location.href = 'actorPage.html'
        });
      });
}


  fetchData()
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

