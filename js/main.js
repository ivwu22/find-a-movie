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
let gitPages = "https://cors-anywhere.herokuapp.com/http://"

let requestUrlTitle = "https://www.omdbapi.com/?apikey="+key.apikey + "a&s=";
let requestUrlImDbId = "https://www.omdbapi.com/?apikey=" + key.apikey + "a&i="
let input = document.querySelector('#input')
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // console.log("fired")
    // console.log(input.value)
})

const clearMovieData = () => {
    title.textContent = null;
    year.innerHTML = null;
    genre.innerHTML = null;
    plot.innerHTML = null;
    actors.innerHTML = null;
    rating.innerHTML = null;
    poster.src = "";
}

// const addMovieData = () => {
//     title.textContent = responseJson.Title;
//     year.innerHTML = `This was released in ${responseJson.Year}`;
//     genre.innerHTML = `Genre: ${responseJson.Genre}`;
//     plot.innerHTML = `Brief plot: ${responseJson.Plot}`;
//     actors.innerHTML = `Actors: ${responseJson.Actors}`;
//     rating.innerHTML = `IMDb Rating: ${responseJson.imdbRating}`;
//     poster.src = responseJson.Poster;
// }

// document.addEventListener("DOMContentLoaded", () => {
const getMovieDetails = (movie) => {
    //fetch with ImDbID instead of name becauseif movies has repeated names (mulan) it will just search mulan and return same results for bother
    fetch(requestUrlImDbId + (movie.target.id))
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        title.textContent = responseJson.Title;
        genre.innerHTML = `Genre: ${responseJson.Genre}`;
        plot.innerHTML = `Brief plot: ${responseJson.Plot}`;
        actors.innerHTML = `Actors: ${responseJson.Actors}`;
        rating.innerHTML = `IMDb Rating: ${responseJson.imdbRating}`;
        poster.src = responseJson.Poster;
        
    })
}
    
const getMovieData = ('submit', (e) => {
        e.preventDefault();
        while (movieList.firstChild) {
            movieList.removeChild(movieList.firstChild)
        }
        clearMovieData();
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
                errorMessage.textContent = (error, `Please try again. Reason: ${jsonReturns.Error}`);
                movieList.appendChild(errorMessage)
                clearMovieData();
            })
            const addMovie = (movie) => {
                let li = document.createElement('li');
                li.setAttribute('id', movie.imdbID)
                li.innerHTML = `${movie.Title} (${movie.Year})`;
                // console.log(movie.Title)
                movieList.appendChild(li);
                li.onclick = getMovieDetails
            }
    })

form.addEventListener('submit', getMovieData)