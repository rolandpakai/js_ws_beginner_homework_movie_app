const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

function movieTemplate(movie) {
    return `
    <div class="swiper-slide">
        <div class="movie">
          <img src="${IMG_PATH}/${movie.poster_path}" alt="${movie.original_title}">
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <div class="res-circle">
              <div class="circle-txt">${movie.vote_average}</div>
            </div>
          </div>
        <div class="overview">
          <h3>Overview</h3>
          ${movie.overview}
        </div>
        </div> 
      </div> 
    </div>  
    `;
  }

  async function loadimages(P_API_URL) {
	const response = await fetch(P_API_URL,
		{
			method: 'GET'
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();

    document.getElementById("sw").innerHTML = `
    ${data.results.map(movieTemplate).join("")}
    `;
}

function loadDefaultImages() {
    loadimages(API_URL);
}

function loadSearchImages(svalue) {
    loadimages(SEARCH_API+ svalue + '"');
}



