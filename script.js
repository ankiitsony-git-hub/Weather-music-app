const apiKey = "703722619acc76e4d2bfa0e6f4b77c1b";
let selectedCountryCode = "";
//
function getweather() {
  let city = document.getElementById("city").value;
  let errorBox = document.getElementById("errorMsg");
  let countryObj = countries.find(function (c) {
    return c.code === selectedCountryCode;
  });
  let countryName = countryObj ? countryObj.name : "";

  errorBox.innerText = "";

  if (city === "") {
    errorBox.innerText = "Please enter a city name";
    return;
  }
// display none initially
  document.getElementById("loader").style.display = "flex";

  if (selectedCountryCode === "") {
    errorBox.innerText = "Please select a country";
    return;
  }

  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "," +
    selectedCountryCode +
    "&appid=" +
    apiKey +
    "&units=metric";





  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found in selected country");
      }




      return response.json();
    })


    .then(function (data) {
      if (data.cod !== 200) {
        document.getElementById("loader").style.display = "none";
        errorBox.innerText = "City not found in selected country ";
        return;
      }



      setTimeout(function () {
        let temp = data.main.temp;
        let condition = data.weather[0].main;

        document.getElementById("weather").innerHTML =

          `<div class="city">${city}, ${countryName}</div>
 <div class="temp">${temp}°C</div>
 <div class="condition">${condition}</div>`;



        showWeatherSongs(condition);
        changeBackground(condition);

        document.getElementById("loader").style.display = "none";
      }, 2000);
    })
    
    
    .catch(function () {
      errorBox.innerText = "City not found ";
      document.getElementById("loader").style.display = "none";
    });
}






function selectmood(mood) {
  let list = document.getElementById("moodSongs");
  list.innerHTML = "";

  let songs;
  let query;
  // stores music name and send that to api for search

  if (mood === "happy") {
    songs = ["Happy Track", "Feel Good Music", "Dance Songs"];
    query = "happy upbeat songs";
    document.body.style.backgroundImage = "url('images/happy.png')";
  } else if (mood === "sad") {
    songs = ["Sad Track", "Emotional Songs", "Broken Heart"];
    query = "sad emotional songs";
    document.body.style.backgroundImage = "url('images/sad.png')";
  } else if (mood === "rain") {
    songs = ["Rainy Day Vibes", "Lo fi Rain", "Calm Rain"];
    query = "lofi rain";
    document.body.style.backgroundImage = "url('images/rain.png')";
  } else if (mood === "night") {
    songs = ["Night Vibes", "Chill Beats", "Late Night"];
    query = "night chill music";
    document.body.style.backgroundImage = "url('images/night.png')";
  } else {
    songs = ["Chill Music", "Top Songs"];
    query = "relax music";
    document.body.style.backgroundImage = "url('images/allelse.png')";
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  for (let i = 0; i < songs.length; i++) {
    let li = document.createElement("li");
    li.innerText = songs[i];

    li.onclick = function () {
      fetchMusic(songs[i]);
    };

    list.appendChild(li);
  }

  fetchMusic(query);
}








function changeBackground(condition) {
  if (condition === "Rain") {
    document.body.style.backgroundImage = "url('images/rain.png')";
  } else if (condition === "Clear") {
    document.body.style.backgroundImage = "url('images/clear.png')";
  } else if (condition === "Haze") {
    document.body.style.backgroundImage = "url('images/haze.png')";
  } else if (condition === "Smoke") {
    document.body.style.backgroundImage = "url('images/smoke.png')";
  } else if (condition === "Clouds") {
    document.body.style.backgroundImage = "url('images/Clouds.png')";
  } else {
    document.body.style.backgroundImage = "url('images/allelse.png')";
  }
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}






function searchMusic() {
  let query = document.getElementById("musicSearch").value;

  if (query === "") {
    let container = document.getElementById("musicResults");

    container.innerHTML = `
    <p style="color: red; text-align:center; margin-top:20px;">
      Please enter music name first
    </p>
  `;

    return;
  }



  let url =
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      displayMusic(data.data);
      // pass song array into display function
    });
}






function displayMusic(songs) {
  let container = document.getElementById("musicResults");

  container.innerHTML = "";

  for (let i = 0; i < Math.min(songs.length, 3); i++) {
    let song = songs[i];

    let card = document.createElement("div");
    card.className = "music-card";

    card.innerHTML = `
      <img src="${song.album.cover}" />

      <div class="music-info">
        <h4>${song.title}</h4>
        <p>${song.artist.name}</p>

        <audio controls class="audioPlayer" >
          <source src="${song.preview}" type="audio/mpeg">
        </audio>
      </div>
    `;

    container.appendChild(card);
    let allPlayers = document.querySelectorAll(".audioPlayer");

allPlayers.forEach(function(player) {

  player.addEventListener("play", function() {

    allPlayers.forEach(function(otherPlayer) {

      if (otherPlayer !== player) {

        otherPlayer.pause();

        otherPlayer.currentTime = 0;
      }
    });
  });
});
  }
}







function showWeatherSongs(condition) {
  let list = document.getElementById("weathersongs");
  list.innerHTML = "";

  condition = condition.toLowerCase();

  let songs;
  let query;

  if (condition.includes("rain") || condition.includes("drizzle")) {
    songs = ["Rain Vibes", "Lo fi Chill", "Sad Songs"];
    query = "lofi rain";
  } else if (condition.includes("clear")) {
    songs = ["Happy Songs", "Party Music", "Dance Hits"];
    query = "happy upbeat songs";
  } else if (condition.includes("cloud")) {
    songs = ["Chill Music", "Soft Beats"];
    query = "chill acoustic songs";
  } else if (condition.includes("thunder")) {
    songs = ["Storm Beats", "Dark Music"];
    query = "intense instrumental music";
  } else if (condition.includes("snow")) {
    songs = ["Winter Piano", "Soft Chill"];
    query = "soft piano winter songs";
  } else if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    songs = ["Ambient Music", "Slow Vibes"];
    query = "calm ambient music";
  } else {
    songs = ["Relax Music", "Top Songs"];
    query = "relaxing music";
  }

  for (let i = 0; i < songs.length; i++) {
    let li = document.createElement("li");
    li.innerText = songs[i];

    li.onclick = function () {
      fetchMusic(songs[i]);
    };

    list.appendChild(li);
  }

  fetchMusic(query);
}

function fetchMusic(query) {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query)
    .then((res) => res.json())
    .then((data) => displayMusic(data.data));
}
