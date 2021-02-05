const form = document.querySelector('form');
const title = document.getElementById('title');
const year = document.getElementById('releaseYear');
const genre = document.getElementById('genre');
const plot = document.getElementById('plot');
const actors = document.getElementById('actors');
const poster = document.getElementById('poster');
const movieList = document.getElementById('movies');
const rating = document.getElementById('rating');
const button = document.createElement('button');
const instructions = document.querySelector('#instructions');
let pageNumber = 2;

let jsonReturns = null;

let gitPages = "https://cors-anywhere.herokuapp.com/"

// const apiKey = process.env.API_KEY

// let requestUrlTitle = "https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey="+ apiKey + "a&s=";
// let requestUrlImDbId = "https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey="+ apiKey + "a&i=";

let requestUrlTitle = "https://www.omdbapi.com/?apikey="+key.apikey + "a&s=";
let requestUrlImDbId = "https://www.omdbapi.com/?apikey=" + key.apikey + "a&i="
let input = document.querySelector('#input')

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
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

const getMovieDetails = (movie) => {
    //fetch with ImDbID instead of name becauseif movies has repeated names (mulan) it will just search mulan and return same results for bother
    fetch(requestUrlImDbId + (movie.target.id))
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        title.textContent = `${responseJson.Title} (${responseJson.Year})`;
        genre.innerHTML = `<span class='type'> Genre </span>: ${responseJson.Genre}`;
        plot.innerHTML = `<span class='type'> Brief Plot </span>: ${responseJson.Plot}`;
        actors.innerHTML = `<span class='type'> Actors </span>: ${responseJson.Actors}`;
        rating.innerHTML = `<span class='type'> IMDb rating </span>: ${responseJson.imdbRating}`;
        poster.src = responseJson.Poster;
    })
}

    
const getMovieData = ('submit', (e) => {
        e.preventDefault();
        while (movieList.firstChild) {
            movieList.removeChild(movieList.firstChild)
        }
        clearMovieData();
        pageNumber = 2;
        fetch(requestUrlTitle+(input.value.toLowerCase()))
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                jsonReturns = jsonData;
                instructions.innerHTML = 'Please click on title for more details shown below!';
                let movie = jsonData.Search
                movie.forEach(addMovie)
                button.setAttribute('id', 'loadMore');
                button.innerHTML = 'click for more!'
                movieList.appendChild(button);
                button.onclick = loadMore;
            })
            .catch((error) => {
                instructions.innerHTML = null;
                let errorMessage = document.createElement('div');
                errorMessage.setAttribute('id', 'error');
                errorMessage.textContent = (error, `Please try again. Reason: ${jsonReturns.Error}`);
                movieList.appendChild(errorMessage)
                clearMovieData();
            })
            function addMovie (movie) {
                let li = document.createElement('li');
                li.setAttribute('id', movie.imdbID)
                li.innerHTML = `${movie.Title} (${movie.Year})`;
                movieList.appendChild(li);
                li.onclick = getMovieDetails;
            }
            const loadMore = (evt) => {
                evt.preventDefault();
                fetch(requestUrlTitle +(input.value.toLowerCase() +'&page='+pageNumber))
                .then((reponse2Data) => {
                    return reponse2Data.json();
                })
                .then((json2Data) => {
                    jsonReturns = json2Data;
                    let movie2 = json2Data.Search
                    movie2.forEach(addMovie);
                    button.remove();
                    pageNumber++
                    movieList.appendChild(button);
                })
                .catch((e) => {
                    let errorMessage = document.createElement('div');
                    errorMessage.setAttribute('id', 'error');
                    errorMessage.textContent = (e, `No more results!`);
                    movieList.appendChild(errorMessage)
                    button.remove();
                })
    }
})

form.addEventListener('submit', getMovieData)