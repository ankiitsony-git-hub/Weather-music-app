const apiKey = "703722619acc76e4d2bfa0e6f4b77c1b";


function getweather() {
  let city = document.getElementById("city").value;

  if (city === "") {
    alert("Enter city name");
    return;
  }

  let url = "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&appid=" + apiKey + "&units=metric";

  fetch(url)
               .then(function(response) {
            return response.json();


    })
            .then(function(data) {
          let temp = data.main.temp;
            let condition = data.weather[0].main;

     document.getElementById("weather").innerHTML =
     `<div class="city">${city}</div>
  <div class="temp">${temp}°C</div>
  <div class="condition">${condition}</div>`;

      showWeatherSongs(condition);

      changeBackground(condition);

    })
    .catch(function() {


           alert("Error fetching data");
    });
}

function showWeatherSongs(condition) {
          let list = document.getElementById("weathersongs");
  list.innerHTML = "";   



  let songs;

  if (condition === "Rain") {

    songs = ["Rain Vibes", "Lo fi Chill", "Sad Songs"];
  } 

  else if (condition === "Clear") {


    songs = ["Happy Songs", "Party Music", "Dance Hits"];

  } 
  else {
    songs = ["Relax Music", "Top Songs"];

  }

  for (let i = 0; i < songs.length; i++) {  


    let li = document.createElement("li");
   
        li.innerText = songs[i];
           list.appendChild(li);
  }
}


function selectmood(mood) { 

  let list = document.getElementById("moodSongs");


  list.innerHTML = "";

  let songs;

  if (mood === "happy") {

    songs = ["Happy Track", "Feel Good Music"];

   document.body.style.backgroundImage = "url('images/happy.png')";

  } 
  else if (mood === "sad") {

    songs = ["Sad Track", "Emotional Songs"];

    document.body.style.backgroundImage = "url('images/sad.png')";

  } 
  else if (mood === "rain") {

    songs = ["Rainy Day Vibes", "Lo fi Rain"];
document.body.style.backgroundImage = "url('images/rain.png')";
  }

         else if (mood === "night") {
              songs = ["Night Vibes", "Chill"];
          document.body.style.backgroundImage = "url('images/night.png')";
  }
  
  else {
    
           songs = ["Chill Music", "Top Songs"];
  document.body.style.backgroundImage = "url('images/allelse.png')";
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  for (let i = 0; i < songs.length; i++) {
    let li = document.createElement("li");


          li.innerText = songs[i];
    list.appendChild(li);
  }     
}

function changeBackground(condition) {
  if (condition === "Rain") {
    document.body.style.backgroundImage = "url('images/rain.png')";
  } 
  else if (condition === "Clear") {
    document.body.style.backgroundImage = "url('images/clear.png')";
  } 
  
else if (condition === "Haze") {
    document.body.style.backgroundImage = "url('images/haze.png')";
  } 
  
  else if (condition === "Smoke") {
    document.body.style.backgroundImage = "url('images/smoke.png')";
  } 
  
    else if (condition === "Clouds") {
    document.body.style.backgroundImage = "url('images/Clouds.png')";
  } 

  else {
    document.body.style.backgroundImage = "url('images/allelse.png')";




  }
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}





