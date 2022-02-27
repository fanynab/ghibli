const getChar = async (keyword) => {
  try {
    const response = await fetch(`https://ghibliapi.herokuapp.com/people?q=${keyword}`, {
      method: "GET",
    });
    const ghibliChar = await response.json();
    console.log(ghibliChar);

    //Message saat keyword tidak ditemukan
    if (ghibliChar == "" || ghibliChar.length >= 5) {
      const message = document.getElementById("results");
      const mesResult = document.createElement("div");
      mesResult.innerHTML = `
          <div class="alert alert-secondary" role="alert" text-center>
            Couldn't find any Studio Ghibli characters. Please try another name.
          </div>
          `;
      message.append(mesResult);
      return ghibliChar;
    }

    for (let i = 0; i < ghibliChar.length; i++) {
      const ghibli = ghibliChar[i];

      fetch(ghibli.films)
        .then((response) => response.json())
        .then((movies) => {
          const name = ghibli.name;
          const eyeColor = ghibli.eye_color;
          const hairColor = ghibli.hair_color;

          let gender;
          if (ghibli.gender == "NA" || ghibli.gender == undefined) {
            gender = "N/A";
          } else {
            gender = ghibli.gender;
          }

          let age;
          if (ghibli.age == "") {
            age = "N/A";
          } else {
            age = ghibli.age;
          }

          const id = movies.id;
          const title = movies.title;
          const oriTitle = movies.original_title;
          const movieBanner = movies.movie_banner;

          const charResult = document.getElementById("characters");
          const ghibliResult = document.createElement("div");
          ghibliResult.innerHTML = `
              <div class="card shadow" style="width: 20rem;">
                <div class="card-header" style="background-color: #D1D1D1;">
                    <h5 class="character-name">Studio Ghibli Character:<br><strong><em>${name}</em></strong></h5>
                </div>
                <div class="card-body">
                  <table cellpadding="4">
                    <tr>
                      <td>Age</td>
                      <td>:</td>
                      <td>${age}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>:</td>
                      <td>${gender}</td>
                    </tr>
                    <tr>
                      <td>Eye Color</td>
                      <td>:</td>
                      <td>${eyeColor}</td>
                    </tr>
                    <tr>
                      <td>Hair Color</td>
                      <td>:</td>
                      <td>${hairColor}</td>
                    </tr>
                  </table>
                  <p class="text-center"><br>This character appears in the movie <em>${title} (${oriTitle})</em>.</p>
                  <input id="input-id" type="hidden" value="${id}">
                  <button href="#" class="movie-details" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findMovie()">Movie Details</button>
                  <img src="${movieBanner}" width="100%">
                </div>
              </div>
              `;
          charResult.append(ghibliResult);
        });
    }
    return ghibliChar;
  } catch (error) {
    console.log(error);
    return;
  }
};

const findChar = async () => {
  const keyword = document.getElementById("character-name").value;
  const characters = await getChar(keyword);

  document.getElementById("character-name").value = "";
  document.getElementById("characters").innerHTML = "";
};

const getMovie = async function (id) {
  const response = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`, {
    method: "GET",
  });

  const movie = await response.json();
  console.log(movie);
  const title = movie.title;
  const oriTitle = movie.original_title;
  const romanised = movie.original_title_romanised;
  const image = movie.image;
  const desc = movie.description;
  const year = movie.release_date;
  const director = movie.director;
  const rtScore = movie.rt_score;
  const producer = movie.producer;

  const movieResult = document.getElementById("modal-body");
  const ghibliMovie = document.createElement("div");
  ghibliMovie.innerHTML = `
      <div class="movie-element">
        <div class="top-movie text-center">
          <img src="${image}" width="210">
          <p><strong><br>${title} / ${romanised} <br> ${oriTitle}</strong></p>
          <p>${year}<br></p>
        </div>
          <p><strong>Rotten Tomatoes Score:</strong><br>${rtScore}%</p>
          <p><strong>Director:</strong><br>${director}<br></p>
          <p><strong>Producer:</strong><br>${producer}<br></p>
          <p align="justify"><strong>Description:</strong><br>${desc}</p>
      </div>
      `;
  movieResult.append(ghibliMovie);

  return movie;
};

const findMovie = async () => {
  const id = document.getElementById("input-id").value;
  const movies = await getMovie(id);
};

const buttonClose = document.getElementById("modal-close");
buttonClose.addEventListener("click", function () {
  document.getElementById("modal-body").innerHTML = "";
});
