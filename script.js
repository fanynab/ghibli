const getChar = async (keyword) => {
  try {
    const response = await fetch(`https://ghibliapi.herokuapp.com/people?q=${keyword}`, {
      method: "GET",
    });
    const ghibliChar = await response.json();
    console.log(ghibliChar);

    for (let i = 0; i < ghibliChar.length; i++) {
      const ghibli = ghibliChar[i];

      /*const name = ghibli.name;
      const age = ghibli.age;
      const gender = ghibli.gender;
      const eyeColor = ghibli.eye_color;
      const hairColor = ghibli.hair_color;
      //const movie = ghibli.films;

      const result = document.getElementById("characters");
      const ghibliResult = document.createElement("div");
      ghibliResult.innerHTML = `
                <div class="character-element">
                    <p class="character-name">${name}</p>
                    <p>Age: ${age}</p>
                    <p>Gender: ${gender}</p>
                    <p>Eye Color: ${eyeColor}</p>
                    <p>Hair Color: ${hairColor}</p>
                </div>
                `;
      //pokeData.style.backgroundColor = "yellow";
      //pokeData.style.padding = "15px 30px";
      result.append(ghibliResult);*/

      //const film = ghibli.films;
      fetch(ghibliChar[i].films)
        .then((response) => response.json())
        .then((response) => {
          const name = ghibli.name;
          const gender = ghibli.gender;
          const eyeColor = ghibli.eye_color;
          const hairColor = ghibli.hair_color;
          const title = response.title;
          const oriTitle = response.original_title;
          const image = response.image;
          const desc = response.description;
          const year = response.release_date;
          let age;
          if (ghibli.age == "") {
            age = "NA";
          } else {
            age = ghibli.age;
          }

          const movieRes = document.getElementById("characters");
          const movieResult = document.createElement("div");
          movieResult.innerHTML = `
              <div class="result-element">
                <div class="character-element">
                  <h5 class="character-name">Studio Ghibli Character: <strong><em>${name}</em></strong></h5>
                  <table class="result-box">
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
                    <tr>
                      <td>Appears on</td>
                      <td>:</td>
                      <td>${title} (${oriTitle})</td>
                    </tr>
                  </table>
                </div>
                <div class="movie-element">
                  <img src="${image}" width="100">
                  <p>${desc}</p>                    <p>Year Release: ${year}</p>
                </div>
              </div>
              `;
          movieRes.append(movieResult);
        });
    }
    return ghibliChar;
  } catch (error) {
    console.log(error);
    return;
  }
};

/*const displayChar = (characters) => {
    const charDiv = document.getElementById("characters")

    let listOfCharElement = "";
    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];

        // melakukan validasi untuk mendapatkan valid url
        const name = character.name;
        const age = character.age;
        const gender = character.gender;
        const eyeColor = character.eye_color;
        const hairColor = character.hair_color;

        // melakukan validasi untuk menampilkan movie yang valid saja
        if (name && age && gender && eyeColor && hairColor) {
            const movieElement = `
            <div class="movie-element">
                <p class="character-name">${name}</p>
                <p>${age}</p>
                <p>${gender}</p>
                <p>${eyeColor}</p>
                <p>${hairColor}</p>
            </div>
            `

            listOfCharElement += charElement;
        }
    }

    charDiv.innerHTML = listOfCharElement;
}*/

const findChar = async () => {
  const keyword = document.getElementById("character-name").value;

  const characters = await getChar(keyword);
  //displayChar(characters);
  //displayChar(characters.results)
};

/*const displayChar = (character) => {
    const charDiv = document.getElementById("result")

    let listOfCharElement = ""
    for (let i = 0; i < character.length; i++) {
        const character = character[i]

        // melakukan validasi untuk mendapatkan valid url
        const image = character.imageUrl;
        const name = character.name;
        const film = character.films[0].film.name;
        //const year = movie.release_date;

        // melakukan validasi untuk menampilkan movie yang valid saja
        if (image && name && film) {
            const charElement = `
        <div class="char-element">
            <img src="${image}" alt="movie image">
            <p>${name}</p>
            <p>${film}</p>
        </div>
    `

            listOfCharElement += charElement
        }
    }

    charDiv.innerHTML = listOfCharElement
}

const findChar = async () => {
    const keyword = document.getElementById("search-content").value;

    const movies = await getMovies(keyword);
    /*console.log("Filtered Disney Character Result:");
    filteredDisney = movies.filter(disney => {
        return disney.character.includes(keyword);
    });
    console.log(filteredDisney);
    displayChar(character.data);
}*/
