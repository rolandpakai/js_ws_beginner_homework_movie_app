const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()
    showMovies(respData.results)
}

function showMovies(movies) {
    
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `<img src="${IMG_PATH + poster_path}"alt="${title}"/>
                <div class="movie-info">
                    <h3>${title}</h3>
                        <div class="res-circle">
                            <div class="circle-txt">${vote_average}</div>
                        </div>
                </div>
            <div class="overview">
                <h3>Overview:</h3>
                    ${overview}
            </div>`;

        main.appendChild(movieElement);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const param = search.value
    if (param == '')  getMovies(API_URL)
    else getMovies(SEARCH_API + param)
})