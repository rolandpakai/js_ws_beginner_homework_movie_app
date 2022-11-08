const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function showItems(data){
    for(const item of data[`results`]){
        main.innerHTML+= `
        <div class="movie">
        <img src="https://image.tmdb.org/t/p/w1280${item['poster_path']}" alt="${item['original_title']}">
        <div class="movie-info">
            <h3>${item['original_title']}</h3>
            <div class="res-circle">
                <div class="circle-txt">${item['vote_average']}</div>
            </div>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${item['overview']}
        </div>
        </div> `;
    }
}

fetch (API_URL)
    .then(res => res.json())
    .then(data => {
        showItems(data)
    
    })
    .catch(err => console.log(`ERROOOOOR`))

function searchEvent(e){
    e.preventDefault();

    const text = search.value;

    fetch (SEARCH_API+text)
    .then(res => res.json())
    .then(data => {
        main.innerHTML='';
        showItems(data)   
    })
    .catch(err => console.log(`ERROOOOOR`))
}

form.addEventListener('submit', searchEvent);