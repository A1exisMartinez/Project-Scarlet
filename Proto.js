const spans = document.querySelectorAll(".word span");

spans.forEach((span, idx) => {
  span.addEventListener("click", (e) => {
    e.target.classList.add("active");
  });
  span.addEventListener("animationend", (e) => {
    e.target.classList.remove("active");
  });

  // Initial animation
  setTimeout(() => {
    span.classList.add("active");
  }, 750 * (idx + 1));
});

// const apiurl = "";
// const outputElement = (document.getElementById("city-input").value = "");
// const output = document.getElementById("out-put");

// First you need to fetch the website from where we going
// to fetch(urllink)-

// const response = await fetch();
// console.log(response);
// const data = await response.json();
// console.log(data);\
const cityname = "brooklyn";
const zipcode = 11221;
const countrycode = "US";
const button = document.querySelectorAll(".submit-button");
const apikey = "b27226d32b98fe892632afdcc471e314";
const outputElement = document.getElementById("city-input");
const output = document.getElementById("out-put");
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=imperial`;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const location = data.name;
    const feels = data.main.feels_like;
    const windspeed = data.wind.speed;
    const weather = data.weather[0].description.toLowerCase();

    let imageSource;
    switch (weather) {
      case "overcast clouds":
      case "scattered clouds":
        imageSource = "./src/1cloud.png";
        break;
      case "few clouds":
        imageSource = "./src/cloud.png";
        break;
      case "clear sky":
        imageSource = "./src/sun.png";
        break;
      case "shower rain":
      case "rain":
      case "light intensity drizzle":
      case "drizzle":
      case "heavy intensity drizzle":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        imageSource = "./src/rain-2.png";
        break;
      case "thunderstorm":
      case "light thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
        imageSource = "./src/storm.png";
        break;
      case "freezing rain":
        imageSource = "./src/snowcloud.png";
        break;
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
      case "thunderstorm with light drizzle":
      case "thunderstorm with heavy drizzle":
        imageSource = "./src/storm-2.png";
        break;
      case "snow":
      case "light snow":
      case "heavy snow":
      case "sleet":
      case "light shower sleet":
      case "light rain and snow":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy":
        imageSource = "./src/snowy.png";
        break;
      //atmosphere weather below
      case "mist":
        imageSource = "./src/mist.png";
        break;
      case "haze":
        imageSource = "./src/fog.png";
        break;
      case "tornado":
        imageSource = "./src/hurricane.png";
        break;
    }

    const htmlContent = `
      <p>Temperature in ${location}: ${temperature}°F</p>
      <p>Weather: ${description}</p>
      <p>Feels Like: ${feels}</p>
      <p>Wind-Speed: ${windspeed} mph</p>
      ${imageSource ? `<img class="constant" src="${imageSource}">` : ""}
    `;

    output.innerHTML = htmlContent;
  })
  .catch((error) => {
    console.log("Error:", error);
  });
