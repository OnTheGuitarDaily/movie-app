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

        const resMovieTrailer = await getData(`/tv/${id}/videos`);
        const dataTvTrailer  = resMovieTrailer.data.results;
        console.log('TvTrailer', dataTvTrailer);
  
        const resImg = await getData("/configuration")
        const dataImg = resImg.data.images
        console.log(dataImg)
      
        displayMovie(dataTv,dataCast,dataTvTrailer,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayMovie(dataTv, dataCast, dataTvTrailer, dataImg){
    const infoDiv = document.querySelector('main')
    const imgUrl = dataImg.base_url + "original"
    infoDiv.innerHTML = `
    <div class="col-12 col-sm-8  movieCard d-sm-flex justify-content-center align-items-center gap-5 py-4 mx-auto">
        <div class="col-sm-6 col-md-6 col-lg-6">
          <img src="${imgUrl + dataTv.poster_path}" alt="IMG">
        </div>
        <div class="col-12 col-sm-6 px-2">
                  <h1>${dataTv.name}</h1>
                  <small>${dataTv.first_air_date
                  }</small><br>
                  <div>
                    <button class="my-3" id="trailerBtn"><i class="fa-solid fa-play"></i>   Watch trailer</button>
                  </div>
        </div>
    </div>  
    <div class="col-12 px-3 my-3">
                  <h2 class="my-3">Overview</h2>
                  <p>${dataTv.overview}</p>
          </div>  
    <div class="col-12 px-3 my-3">
        <h2>Cast</h2>
        <div id="cast" class="d-flex gap-2 my-3 px-2"></div>
    </div>
     
    `

    const castDiv = infoDiv.querySelector('#cast')
    castDiv.innerHTML = dataCast.map((actor) => `
    
    <div class="actorCard col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2" data-actor-id="${actor.id}">
        <img src="${imgUrl + actor.profile_path}" alt="IMG">
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
      
      const trailerBtn = document.getElementById('trailerBtn')
      trailerBtn.addEventListener('click', () => {
        const newDiv = document.createElement('div');
        newDiv.className = 'trailerDiv';
        document.body.appendChild(newDiv);
      
        const trailer = dataTvTrailer.find(item => item.type === 'Trailer');
        console.log(trailer)
        if (trailer) {
          const videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
          newDiv.innerHTML = `
            <div id="trailer" class="col-10 p-3">
              <div class="d-flex justify-content-between">
                <h1>Watch Trailer</h1>
                <button id="closeTrailer"><i class="fa-solid fa-xmark fa-2x"></i></button>
              </div>
              <hr>
              <div class="mx-auto col-12 mt-3">
                <iframe src="${videoUrl}" width="100%" height="400px" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          `;
      
         
          const closeBtn = newDiv.querySelector('#closeTrailer');
          closeBtn.addEventListener('click', () => {
            document.body.removeChild(newDiv); 
          });
        }else{
          Swal.fire(
            'Video not found'
          )
          document.body.removeChild(newDiv); 
        }
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
const logo = document.getElementById ('logo')
logo.addEventListener('click', () => {
  window.location.href = 'index.html';
})
