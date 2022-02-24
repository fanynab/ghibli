const getChar = async (keyword) => {
  try {
    const response = await fetch(`https://ghibliapi.herokuapp.com/people?q=${keyword}`, {
      method: "GET",
    });
    const ghibliChar = await response.json();

    //Message saat keyword tidak ditemukan
    if (ghibliChar == "") {
      const message = document.getElementById("characters");
      const mesResult = document.createElement("div");
      mesResult.innerHTML = `
            <div class="error-message">
              <p>Couldn't find any Studio Ghibli characters. Please try another name.</p>
            </div>
          `;
      message.append(mesResult);
    }
    console.log(ghibliChar);

    //Menampilkan character
    for (let i = 0; i < ghibliChar.length; i++) {
      const ghibli = ghibliChar[i];

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
                  <p class="details-bar">Movie Details</p>
                  <table class="movie-box" cellpadding="15">
                    <tr>
                      <td valign="top"><img src="${image}" width="200"></td>
                      <td valign="top">
                        <strong>${title} (${oriTitle})</strong><br>
                        ${year}<br><br>
                        Description :<br>
                        ${desc}
                      </td>
                    </tr>
                  </table>
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
  const charDiv = document.getElementById("characters");

  let listOfCharElement = "";
  for (let i = 0; i < ghibliChar.length; i++) {
    const ghibli = ghibliChar[i];

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

        const movieResult = `
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
                  <p>${desc}</p>                    
                  <p>Year Release: ${year}</p>
                </div>
              </div>
              `;

        listOfCharElement += movieResult;
      });
  }
  charDiv.innerHTML = listOfCharElement;
};*/

const findChar = async () => {
  const keyword = document.getElementById("character-name").value;
  if (keyword == "") {
    console.log("Character Not Found");
  }
  const characters = await getChar(keyword);
  //displayChar(characters);
  //displayChar(characters.results);
};
