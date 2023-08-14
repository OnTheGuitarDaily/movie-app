import { getData } from "../script/ApiServices/apiService.js";

async function fetchData() {
    try {
        const id = localStorage.getItem('tvId')

        const resMovie = await getData(`/tv/${id}`);
        const dataTv  = resMovie.data;
        console.log('tv',dataTv);

        const resCast = await getData(`/tv/${id}/credits`);
        const dataCast  = resCast.data.cast;
        console.log('cast',dataCast);
  
        const resImg = await getData("/configuration")
        const dataImg = resImg.data.images
        console.log(dataImg)
      
        displayMovie(dataTv,dataCast,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayMovie(dataTv, dataCast, dataImg){
    const infoDiv = document.querySelector('main')
    const imgUrl = dataImg.base_url + "original"
    infoDiv.innerHTML = `
    <div class="col-12 movieCard">
        <img src="${imgUrl + dataTv.poster_path}">
    </div>
    <div class="text col-12 pt-4 px-3">
            <h1>${dataTv.name}</h1>
            <small>${dataTv.first_air_date}</small><br>
            <i>"${dataTv.tagline}"</i>
            <h2 class="my-3">Overview</h2>
            <p>${dataTv.overview}</p>
            <small>Seasons: ${dataTv.number_of_seasons}</small>
            <h2 class="my-3">Cast</h2>
            <div id="cast" class="d-flex gap-2 col-12 my-3 px-2"></div>
     </div>
     
    `

    const castDiv = infoDiv.querySelector('#cast')
    castDiv.innerHTML = dataCast.map((actor) => `
    
    <div class="actorCard col-5" data-actor-id="${actor.id}">
        <img src="${imgUrl + actor.profile_path}">
        <p>${actor.name}</p>
        <small>${actor.character}</small>
    </div>
    `).join('')

    const actorDiv = castDiv.querySelectorAll('.actorCard')
    actorDiv.forEach(actor => {
      const actorId = actor.getAttribute('data-actor-id')
        actor.addEventListener('click', () => {
          window.location.href = 'actorPage.html'
          localStorage.setItem('actorId', actorId)
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

