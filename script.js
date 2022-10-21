const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

let swiper;

window.addEventListener("load", load(API_URL, true));

function load(url, initSwiper) {
	toggleSwiper();
	toggleLoader();
	clearSwiper();

	setTimeout(() => {
		fetchData(url).then((result) => {
			data = result.results;
			initializeSlides(data).then(() => {
				toggleLoader();
				toggleSwiper();
				if (initSwiper){
					initializeSwiper();
				}
			}).catch(error => {
			  console.log(error.name + ' ' + error.message)
			})
		})
	}, 1500);
}

function toggleLoader() {
	document.querySelector('.loader').classList.toggle("hide");
}

function toggleSwiper() {
	document.querySelector('.swiper-container').classList.toggle("hide");
}

function clearSwiper() {
	document.querySelector('.swiper-wrapper').innerHTML = '';
}

function fetchData(url) {
	return fetch(url).then((res) => {
		return res.json();
	})
}
			  
function initializeSlides(itemsObject) {
  let items = "";
		  
  return new Promise((resolve, reject) => {
	   clearSwiper();
	  
	  itemsObject.forEach((item) => {
		if(item.poster_path != null) {
		items += `<div class="swiper-slide">
					<div class="movie">
						<img src="https://image.tmdb.org/t/p/w1280${item.poster_path}" alt="${item.title}">
						<div class="movie-info">
							<h3>${item.title}</h3>
							<div class="res-circle">
								<div class="circle-txt">${item.vote_average}</div>
							</div>
						</div>
						<div class="overview">
							<h3>Overview</h3>
							${item.overview}
						</div>
					</div>
				</div>`;
		}
	  });
	  
	  if (items != "") {
		  document.querySelector('.swiper-wrapper').innerHTML = items;
		  resolve();
	  } else {
		 reject({
			name: 'empty',
			message: 'Empty items.' 
		 });
	  }
  })
};

function initializeSwiper() {

	swiper = new Swiper(".swiper-container", {
		effect: "coverflow",
		slidesPerView: 1,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		loop: true,
		fade: true,
		navigation: {
		  nextEl: ".swiper-button-next",
		  prevEl: ".swiper-button-prev",
		},
		coverflowEffect: {
		  rotate: 20,
		  stretch: 0,
		  depth: 100,
		  modifier: 1,
		  slideShadows: true,
		},
	});
}



document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = document.querySelector('.search').value;

    if(searchTerm && searchTerm !== '') {	
		load(SEARCH_API + searchTerm, false);
        search.value = ''
    } else {
        window.location.reload()
    }
});