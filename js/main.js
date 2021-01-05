console.log('Test');
function run(){
}
const SEARCH_BY_KEY_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';
const SEARCH_FILM_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films';
const OPTIONS = {
  headers: {
    'X-API-KEY': '63a0ce3b-be16-4dd7-aa4b-f3c8b18ef808'
  }
}
function getRandomNumberFromServer(){
	fetch('http://localhost/simple_prj/backend/')
  		.then(response => response.json())
  		.then(json => console.log(json))
		.catch(err=>console.log(`Error ->${err}`));
}
function getInfoByKeyword(keyword){
		fetch(`${SEARCH_BY_KEY_URL}?keyword=${keyword}&page=1`, OPTIONS )
  		.then(response => response.json())
  		.then(json => {
  			console.log(json);
  			showResult(json.films);
  		})
		.catch(err=>console.log(`Error ->${err}`));
}
function getFilmyId(id){
	fetch(`${SEARCH_FILM_URL}/${id}`, OPTIONS )
  		.then(response => response.json())
  		.then(json => {
  			console.log(json);
  			document.location.href = `${json.data.webUrl}`;
  		})
		.catch(err=>console.log(`Error ->${err}`));
}

function getInfo(event){
	const filmName = document.getElementById('film-name').value;
	getInfoByKeyword(filmName);
	console.log('filmName,filmName');
}
function showResult(films){
	let result = document.getElementById('result');
	result.innerHTML = '';
	if(!Array.isArray(films) || films.length === 0){
		console.log('films',films);
		let notFoundEl =  document.createElement('span');
		notFoundEl.className = 'not-found';
		notFoundEl.innerHTML = 'Фильмы не были найдены'
		result.prepend(notFoundEl);
	}
	else{
		for(let film of films){
			let container = document.createElement('div');
			container.className = 'poster';
			let fimItem= document.createElement('img');
			let rating = document.createElement('div');
			rating.className = 'raiting';
			rating.innerHTML = `Рейтинг:${film.rating ? film.rating : 'отсутствует'}`;
			fimItem.setAttribute("src", film.posterUrl);
			fimItem.setAttribute("title", film.nameRu ? film.nameRu : film.nameEn);
			fimItem.setAttribute("onclick", `getFilmyId(${film.filmId})`);
			container.prepend(rating);
			container.append(fimItem);
			result.prepend(container);
		}

	}

}
run();