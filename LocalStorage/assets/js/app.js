//@ts-check

//variables
const listaTweets = document.querySelector("#lista-tweets");




// Event Listeners
eventListener();

function eventListener() {
    //Cuando se envíe el formulario
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener("click", borrarTweet)

    // Cargar Contenido
    document.addEventListener("DOMContentLoaded", localStorageListo)

}


// Funciones

//Añadir tweet de formulario

function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector("#tweet").value;

    const botonBorrar = document.createElement("a");
    botonBorrar.classList.add("borrar-tweet");
    botonBorrar.innerText = "X"

    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(botonBorrar);

    listaTweets.appendChild(li);

    // Añadir a localStorage
    agregarTweetLocalStorage(tweet);
}


// Elimina el Tweet del DOM
function borrarTweet(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar-tweet")) {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText)
    }

}

// Agrega tweet a localStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    console.log(typeof tweets);

    // Añadir el nuevo tweet
    tweets.push(tweet);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function obtenerTweetsLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(String(localStorage.getItem('tweets')));
    }
    return tweets;
}


// Cargar datos de localstorage a la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage()

    tweets.forEach(function (tweet) {

        const botonBorrar = document.createElement("a");
        botonBorrar.classList.add("borrar-tweet");
        botonBorrar.innerText = "X"

        const li = document.createElement("li");
        li.innerText = tweet;
        li.appendChild(botonBorrar);

        listaTweets.appendChild(li);
    })
}


// Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet) {
    console.log(tweet);

    let tweets, tweetABorrar;
    tweetABorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach((tweet, index) => {
        if (tweet === tweetABorrar)
            tweets.splice(index, 1);
    });
    localStorage.setItem("tweets", JSON.stringify(tweets));
}