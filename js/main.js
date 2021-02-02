const form = document.querySelector('form')
const title = document.getElementById('title');
const year = document.getElementById('releaseYear');
const genre = document.getElementById('genre');
const plot = document.getElementById('plot');
const actors = document.getElementById("actors");
const poster = document.getElementById('poster');
const movieList = document.getElementById('movies');
const rating = document.getElementById('rating')
const button = document.createElement('button');
const instructions = document.querySelector('#instructions')
let pageNumber = 2;

let jsonReturns = null;
let gitPages = "https://cors-anywhere.herokuapp.com/"

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
    // instructions.innerHTML = 'Please click on title for more details!';
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
                instructions.innerHTML = 'Please click on title for more details!';
                let movie = jsonData.Search
                // console.log(jsonData.Search)
                movie.forEach(addMovie)
                button.setAttribute('id', 'loadMore');
                button.innerHTML = 'click for more!'
                movieList.appendChild(button);
                button.onclick = (evt) => {
                    evt.preventDefault();
                    fetch(requestUrlTitle +(input.value.toLowerCase() +'&page='+pageNumber))
                    // http://www.omdbapi.com/?apikey=b749840a&s=mulan&page=2
                    .then((reponse2Data) => {
                        return reponse2Data.json();
                    })
                    .then((json2Data) => {
                        jsonReturns = json2Data;
                        let movie2 = json2Data.Search
                        movie2.forEach(addMovie);
                        button.remove();
                        pageNumber++
                    })
                    .catch((e) => {
                        let errorMessage = document.createElement('div');
                        errorMessage.setAttribute('id', 'error');
                        errorMessage.textContent = (e, `No more results!`);
                        movieList.appendChild(errorMessage)
                        clearMovieData();
                        button.remove();
                    })
                }
        })
            .catch((error) => {
                instructions.innerHTML = null;
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
            // let button = document.createElement('button');
            // button.setAttribute('src', 'loadMore');
            // document.querySelector('p').appendChild(button);
    })
//     const loadMore = (evt) => {
//         evt.preventDefault();
//         fetch(requestUrlTitle +(input.value.toLowerCase() +'&page='+pageNumber))
//         // http://www.omdbapi.com/?apikey=b749840a&s=mulan&page=2
//         .then((reponse2Data) => {
//             return reponse2Data.json();
//         })
//         .then((json2Data) => {
//             jsonReturns = json2Data;
//             let movie2 = json2Data.Search
//             movie2.forEach(addMovie);
//             button.remove();
//             pageNumber++
//         })
//         .catch((e) => {
//             let errorMessage = document.createElement('div');
//             errorMessage.setAttribute('id', 'error');
//             errorMessage.textContent = (e, `No more results!`);
//             movieList.appendChild(errorMessage)
//             clearMovieData();
//             button.remove();
//         })
// }
form.addEventListener('submit', getMovieData)