import { getData } from "../script/ApiServices/apiService.js";

async function fetchData() {
    try {
        const id = localStorage.getItem('actorId')

        const resActor = await getData(`/person/${id}`);
        const dataActor  = resActor.data;
        console.log('actor',dataActor);

        const resMovieCredits = await getData(`/person/${id}/movie_credits`);
        const dataMovieCredits  = resMovieCredits.data.cast;

        const resTvCredits = await getData(`/person/${id}/tv_credits`);
        const dataTvCredits  = resTvCredits.data.cast;
  
        const resImg = await getData("/configuration")
        const dataImg = resImg.data.images
        console.log(dataImg)
      
        displayMovie(dataActor,dataMovieCredits,dataTvCredits,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayMovie(dataActor, dataMovieCredits, dataTvCredits, dataImg){
    const infoDiv = document.querySelector('main')
    const imgUrl = dataImg.base_url + "original"
    infoDiv.innerHTML = `
    <div class="col-12 col-sm-8  movieCard d-sm-flex justify-content-center align-items-center gap-5 py-4 mx-auto">
        <div class="col-sm-6 col-md-6 col-lg-6">
            <img src="${imgUrl + dataActor.profile_path}" alt="IMG">
        </div>
        <div class="col-12 pt-4 px-3">
                <h1>${dataActor.name}</h1>
                <small>Born: ${dataActor.place_of_birth}<br>${dataActor.birthday}</small><br>
        </div>
    </div> 
    <div>
          <h2 class="my-3">biography</h2>
          <p>${dataActor.biography}</p>
    </div>
    <div class="my-5 col-12">
        <h2 class="my-3">Credits</h2>
        <hr>
        <h4>Movies:</h4>
        <list id="movie"></list>
        <hr>
        <h4>Tv Shows:</h4>
        <list id="tv"></list>
    </div> 

    
     
    `
    const movieCreditDiv = infoDiv.querySelector('#movie')
    const TvCreditDiv = infoDiv.querySelector('#tv')
    const popularMovies = dataMovieCredits.filter(item => item.popularity > 40)
    const popularTv= dataTvCredits.filter(item => item.popularity > 40)
    console.log('movie',popularMovies)
    console.log('tv',popularTv)
    movieCreditDiv.innerHTML = popularMovies.map((movie) => `
    <li>
       ${movie.title}  /as/  ${movie.character}
    </li>
    `).join('')


    TvCreditDiv.innerHTML = popularTv.map((tv) => `
    <li>
       ${tv.name}  /as/  ${tv.character}
    </li>
    `).join('')

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