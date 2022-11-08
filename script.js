const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById('main')
initMoviesApp(API_URL)

async function initMoviesApp(url){
    const response = await fetch(url)
    const movies = await response.json()
    appendMovies(movies.results)
}

function appendMovies(movies){
    main.innerHTML = ''
    movies.forEach(element => {
        const {poster_path, title, vote_average, overview} = element
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        movieDiv.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${title}">
                  <div class="movie-info">
                      <h3>${title}</h3>
                      <div class="res-circle">
                          <div class="circle-txt">${vote_average}</div>
                      </div>
                  </div>
                  <div class="overview">
                      <h3>Overview</h3>
                      ${overview}
                  </div>
              </div>`;
        main.appendChild(movieDiv)
    });
}

const search = document.getElementById('search')
const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const param = search.value
    if (param == '')  initMoviesApp(API_URL)
    else initMoviesApp(SEARCH_API + param)
})