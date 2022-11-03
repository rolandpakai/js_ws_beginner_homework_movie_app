const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

// Selecting the DOM elements
const main = document.querySelector('#main');
const searchField = document.querySelector('#search-field');
const searchValue = document.querySelector('#search-value');

// Loading movie cards with fetched data
fetchingData(API_URL);

// Adding event listener to check if a search value is submitted, then execute search function
searchField.addEventListener('submit', (event) => {

    event.preventDefault();
    const inputText = searchValue.value;
    // DEBUG
    // console.log(inputText);
    // console.log(SEARCH_API + inputText);

    if (inputText && inputText !== '') {
        const searchUrl = SEARCH_API + inputText;
        fetchingData(searchUrl);
    }

});

// Clearing search results and reload content
function clearSearch() {
    location.reload();
    searchValue.value = '';
};

async function fetchingData(sourceUrl) {
    const response = await fetch(sourceUrl);
    // DEBUG
    // console.log(response);

    const movieData = await response.json();
    // DEBUG
    // console.log(movieData);

    const movieList = movieData.results;
    // DEBUG
    // console.log(movieList);

    loadMovies(movieList);
};


function loadMovies(movies) {    

    main.innerHTML = '';
    
    for (let index = 0; index < movies.length; index++) {
        const path = movies[index].poster_path;
        const title = movies[index].title;
        const vote = movies[index].vote_average;
        const overview = movies[index].overview;

        // DEBUG:
        // console.log(movies[index].poster_path);
        // console.log(movies[index].title);
        // console.log(movies[index].vote_average);
        // console.log(movies[index].overview);

        // Creating the movie card element in the DOM, which will contain the data about the movies
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');

        // Card layout: Set how to represent the fetched movie data
        movieCard.innerHTML = `
        <img src="${IMG_PATH + path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <div class="res-circle">
                <div class="circle-txt">${vote}</div>
            </div>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `;

        // Add movie card node into the main element of the page
        main.append(movieCard);

    } 

};