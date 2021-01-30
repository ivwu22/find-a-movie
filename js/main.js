const form = document.querySelector('form')
const title = document.getElementById('title');
const year = document.getElementById('releaseYear');
const genre = document.getElementById('genre');
const plot = document.getElementById('plot');
const actors = document.getElementById("actors");
const poster = document.getElementById('poster');

let requestUrlTitle = "http://www.omdbapi.com/?apikey=b749840a&t=";
let input = document.querySelector('#input')
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // console.log("fired")
    // console.log(input.value)
})
// document.addEventListener("DOMContentLoaded", () => {
    
const getMovieData = ('submit', (e) => {
        e.preventDefault();
        fetch(requestUrlTitle+(input.value.toLowerCase()))
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                // console.log(jsonData)
                title.textContent = jsonData.Title;
                year.innerHTML = `This movie was released in ${jsonData.Year}`;
                genre.innerHTML = `Genre: ${jsonData.Genre}`;
                plot.innerHTML = `Brief plot: ${jsonData.Plot}`;
                actors.innerHTML = `Actors: ${jsonData.Actors}`;
                poster.src = jsonData.Poster
            })
            .catch((error) => {
                console.log("errorrrr:", error)
            })
    })

form.addEventListener('submit', getMovieData)