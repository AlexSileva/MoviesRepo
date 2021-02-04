let movies = [];

function Movie(name, genre, description, coverImage, isWatched, isFavourite) {
    this.name = name;
    this.genre = genre;
    this.description = description;
    this.coverImage = coverImage;
    this.isFavourite = isFavourite;
    this.isWatched = isWatched;
}

var toggleForm = function () {
    let formContainer = document.getElementById("formContainer");

    if (formContainer.style.display == "flex") {
        formContainer.style.display = "none";
        cleanForm();
    } else {
        formContainer.style.display = "flex";
    }
}

function cleanForm() {
    document.getElementById("movieName").value = "";
    document.getElementById("movieGenre").value = "Other";
    document.getElementById("movieDescription").value = "";
    document.getElementById("movieCoverImage").value = "";
    document.getElementById("isWatched").checked = false;
    document.getElementById("isFavourite").checked = false;
}

renderNavMovies = function(activeNav){
    switch (activeNav) {
        case "all":
            renderMovies(movies);
            break;
        case "watched":
            var watchedMovies = [];

            for (let i = 0; i < movies.length; i++) {
                if (movies[i].isWatched) {
                    watchedMovies.push(movies[i]);
                }
            }

            renderMovies(watchedMovies);
            break;
        case "watchlist":
            var notWatched = [];

            for (let i = 0; i < movies.length; i++) {
                if (!movies[i].isWatched) {
                    notWatched.push(movies[i]);
                }
            }

            renderMovies(notWatched);
            break;
        case "favourites":
            var favourites = [];

            for (let i = 0; i < movies.length; i++) {
                if (movies[i].isFavourite) {
                    favourites.push(movies[i]);
                }
            }

            renderMovies(favourites);
            break;
        default:
            alert("this should not happen");
            break;
    }
}

toggleNavLinks = function () {
    let activeLink = document.querySelector(".nav-tabs .active");
    activeLink.className = "nav-link";
    event.target.className = "nav-link active";
    renderNavMovies(event.target.innerText.toLowerCase())
}

createMovieCard = function () {
    var movieName = document.getElementById("movieName").value;
    var movieGenre = document.getElementById("movieGenre").value;
    var movieDescription = document.getElementById("movieDescription").value;
    var movieCoverImage = document.getElementById("movieCoverImage").value;
    var isWatched = document.getElementById("isWatched").checked;
    var isFavourite = document.getElementById("isFavourite").checked;

    var movie = new Movie(movieName, movieGenre, movieDescription, movieCoverImage, isWatched, isFavourite);
    movies.push(movie);

    renderMovies(movies);
    toggleForm();
}

var initEventListeners = function () {
    let addMovieBtn = document.getElementById("addMovie");
    addMovieBtn.onclick = toggleForm;

    let navLinks = document.getElementsByClassName("nav-link");
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].onclick = toggleNavLinks;
    }

    let createMovieBtn = document.getElementById("createMovieBtn");
    createMovieBtn.onclick = createMovieCard;

    let cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.onclick = toggleForm;
}

initEventListeners();

function toggleIsFavourite(movie) {
    if (event.target.style.color == "pink") {
        event.target.style.color = "black";
        movie.isFavourite = false;

        let activeLink = document.querySelector(".nav-tabs .active");

        if(activeLink.innerText == "Favourites"){
            event.target.parentNode.parentNode.parentNode.style.display = "none";
        }
    } else {
        event.target.style.color = "pink";
        movie.isFavourite = true;
    }
}

function toggleIsWatched(movie) {
    if (event.target.style.color == "green") {
        event.target.style.color = "black";
        movie.isWatched = false;

        let activeLink = document.querySelector(".nav-tabs .active");

        if(activeLink.innerText == "Watched"){
            event.target.parentNode.parentNode.parentNode.style.display = "none";
        }
    } else {
        event.target.style.color = "green";
        movie.isWatched = true;

        let activeLink = document.querySelector(".nav-tabs .active");

        if(activeLink.innerText == "Watchlist"){
            event.target.parentNode.parentNode.parentNode.style.display = "none";
        }
    }
}
function renderMovies(moviesToRender) {
    var cardContainer = document.getElementById("cardRow");
    cardContainer.innerHTML = "";

    for (let i = 0; i < moviesToRender.length; i++) {
        var cardCol = document.createElement("div");
        cardCol.className = "col col-4";

        var card = document.createElement("div");
        card.className = "card";

        var movieImage = document.createElement("img");
        movieImage.className = "card-img-top";
        movieImage.src = movies[i].coverImage;

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        var cardTitle = document.createElement("h5");
        cardTitle.className = "card-title movie-title";
        cardTitle.innerText = movies[i].name;

        var cardGenre = document.createElement("p");
        cardGenre.className = "movie-genre";
        cardGenre.innerText = movies[i].genre

        var cardDescription = document.createElement("p");
        cardDescription.className = "card-text movie-description";
        cardDescription.innerText = movies[i].description;

        var iconContainer = document.createElement("div");
        iconContainer.className = "icon-container";

        var iconHeart = document.createElement("i");
        iconHeart.className = "fas fa-heart fa-5x";

        iconHeart.onclick = function () { toggleIsFavourite(movies[i]) };

        if (movies[i].isFavourite) {
            iconHeart.style.color = "pink"
        }

        var iconCheck = document.createElement("i");
        iconCheck.className = "fas fa-check fa-5x";
        iconCheck.onclick = function () { toggleIsWatched(movies[i]) };

        if (movies[i].isWatched) {
            iconCheck.style.color = "green";
        }

        cardCol.appendChild(card);
        card.appendChild(movieImage);
        card.appendChild(cardBody);
        card.appendChild(iconContainer);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardGenre);
        cardBody.appendChild(cardDescription);
        iconContainer.appendChild(iconHeart);
        iconContainer.appendChild(iconCheck);

        var cardRow = document.getElementById("cardRow");
        cardRow.appendChild(cardCol);
    }
}
