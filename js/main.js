const form = document.querySelector('form')
const title = document.getElementById('title');
const year = document.getElementById('releaseYear');
const genre = document.getElementById('genre');
const plot = document.getElementById('plot');
const actors = document.getElementById("actors");
const poster = document.getElementById('poster');
const movieList = document.getElementById('movies');
const rating = document.getElementById('rating')

let jsonReturns = null;

let requestUrlTitle = "http://www.omdbapi.com/?apikey=b749840a&s=";
let requestUrlImDbId = "http://www.omdbapi.com/?apikey=b749840a&i="
let input = document.querySelector('#input')
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // console.log("fired")
    // console.log(input.value)
})
// document.addEventListener("DOMContentLoaded", () => {
const getMovieDetails = (movie) => {
    //fetch with ImDbID instead of name becauseif movies has repeated names (mulan) it will just search mulan and return same results for bother
    fetch(requestUrlImDbId + (movie.target.id))
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        title.textContent = responseJson.Title;
        year.innerHTML = `This movie was released in ${responseJson.Year}`;
        genre.innerHTML = `Genre: ${responseJson.Genre}`;
        plot.innerHTML = `Brief plot: ${responseJson.Plot}`;
        actors.innerHTML = `Actors: ${responseJson.Actors}`;
        rating.innerHTML = `IMDb Rating: ${responseJson.imdbRating}`
        poster.src = responseJson.Poster
    })
}
    
const getMovieData = ('submit', (e) => {
        e.preventDefault();
        while (movieList.firstChild) {
            movieList.removeChild(movieList.firstChild)
        }
        fetch(requestUrlTitle+(input.value.toLowerCase()))
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                jsonReturns = jsonData;
                // console.log(jsonData)
                let movie = jsonData.Search
                // console.log(jsonData.Search)
                movie.forEach(addMovie)
            })
            .catch((error) => {
                let errorMessage = document.createElement('div');
                errorMessage.setAttribute('id', 'error');
                errorMessage.innerHTML = (error, `Please try again. Reason: ${jsonReturns.Error}`);
                movieList.appendChild(errorMessage)
                title.textContent = null;
                year.innerHTML = null;
                genre.innerHTML = null;
                plot.innerHTML = null;
                actors.innerHTML = null;
                poster.src = "";
            })
            const addMovie = (movie) => {
                let li = document.createElement('li');
                li.setAttribute('id', movie.imdbID)
                li.innerHTML = movie.Title;
                // console.log(movie.Title)
                movieList.appendChild(li);
                li.onclick = getMovieDetails
            }
    })

form.addEventListener('submit', getMovieData)