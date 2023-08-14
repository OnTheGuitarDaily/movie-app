import { getData } from "../script/ApiServices/apiService.js";


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

        displayTvShow(dataActor,dataImg)

    } catch (error) {
      console.error("Error:", error);
    }
  }

function displayTvShow(dataActor,dataImg){
    const tvShowDiv = document.querySelector('main');
    const imgUrl = dataImg.base_url + "original"
    tvShowDiv.innerHTML = dataActor.map((actor) => `
    
    <div class="col-5 movieCard" data-actor-id="${actor.id}">
      <img src="${imgUrl + actor.profile_path}">
      <div class="pb-4 px-2 mt-2">
        <p>${actor.name}</p>
        <footer class="d-flex justify-content-between col-11">
          <span style="color: white">
          <i class="fa-solid fa-star"></i>   ${actor.popularity}
          </span>
        </footer>
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

