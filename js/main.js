const form = document.querySelector('form')
const title = document.getElementById('title');
const year = document.getElementById('releaseYear');
const genre = document.getElementById('genre');
const plot = document.getElementById('plot');
const actors = document.getElementById("actors");
const poster = document.getElementById('poster');
const movieList = document.getElementById("movies")

let requestUrlTitle = "http://www.omdbapi.com/?apikey=b749840a&s=";
let requestUrlName = "http://www.omdbapi.com/?apikey=b749840a&t="
let input = document.querySelector('#input')
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // console.log("fired")
    // console.log(input.value)
})
// document.addEventListener("DOMContentLoaded", () => {
const getMovieDetails = (movie) => {
    fetch(requestUrlName + (movie.target.innerHTML.toLowerCase()))
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        title.textContent = responseJson.Title;
        year.innerHTML = `This movie was released in ${responseJson.Year}`;
        genre.innerHTML = `Genre: ${responseJson.Genre}`;
        plot.innerHTML = `Brief plot: ${responseJson.Plot}`;
        actors.innerHTML = `Actors: ${responseJson.Actors}`;
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
                // console.log(jsonData)
                let movie = jsonData.Search
                movie.forEach(addMovie)
                // title.textContent = jsonData.Title;
                // year.innerHTML = `This movie was released in ${jsonData.Year}`;
                // genre.innerHTML = `Genre: ${jsonData.Genre}`;
                // plot.innerHTML = `Brief plot: ${jsonData.Plot}`;
                // actors.innerHTML = `Actors: ${jsonData.Actors}`;
                // poster.src = jsonData.Poster
            })
            .catch((error) => {
                console.log("errorrrr:", error)
            })
            const addMovie = (movie) => {
                let li = document.createElement('li');
                li.innerHTML = movie.Title;
                movieList.appendChild(li);
                li.onclick = getMovieDetails
            }
    })

form.addEventListener('submit', getMovieData)