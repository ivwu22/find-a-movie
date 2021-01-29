const form = document.querySelector('form')
const info = document.querySelector('p');

let requestUrlTitle = "http://www.omdbapi.com/?apikey=b749840a&t=";
let input = document.querySelector('#input')
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // console.log("fired")
    // console.log(input.value)
})
// document.addEventListener("DOMContentLoaded", () => {
    
const getJoke = ('submit', (e) => {
        // e.preventDefault();
        fetch(requestUrlTitle+input.value)
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                // console.log(jsonData)
                let runtime = jsonData.Runtime
                info.innerHTML = runtime;
            })
            .catch((error) => {
                console.log("errorrrr:", error)
            });
    })
form.addEventListener('submit', getJoke)
