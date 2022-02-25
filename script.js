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

    for (let i = 0; i < ghibliChar.length; i++) {
      const ghibli = ghibliChar[i];

      fetch(ghibliChar[i].films)
        .then((response) => response.json())
        .then((response) => {
          const name = ghibli.name;
          const eyeColor = ghibli.eye_color;
          const hairColor = ghibli.hair_color;

          let gender;
          if (ghibli.gender == "" || ghibli.gender == undefined) {
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

          const title = response.title;
          const oriTitle = response.original_title;
          const image = response.image;
          const desc = response.description;
          const year = response.release_date;

          //Menampilkan character
          const charResult = document.getElementById("characters");
          const ghibliResult = document.createElement("div");
          ghibliResult.innerHTML = `
              <div class="card shadow-sm" style="width: 20rem;">
                <div class="card-header" style="background-color: #a1cae2;">
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
                    <tr>
                        <td valign="top">Appears on</td>
                        <td valign="top">:</td>
                      <td valign="top">${title}<br>${oriTitle}</td>
                    </tr>
                  </table>
                  <button href="#" class="btn-details" data-bs-toggle="modal" data-bs-target="#exampleModal">Movie Details</button>
                </div>
              </div>
              `;
          charResult.append(ghibliResult);

          const movieResult = document.getElementById("modal-body");
          const ghibliMovie = document.createElement("div");
          ghibliMovie.innerHTML = `
              <div class="movie-element text-center">
                <img src="${image}" width="210">
                <p><strong><br>${title}<br>${oriTitle}</strong></p>
                <p>${year}</p>
                <p>${desc}</p>
              </div>
              `;
          movieResult.append(ghibliMovie);
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
};
