// Cache the necessary DOM elements
const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

// Define the API endpoint URL and the API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'c09cff9b998190f1a0d25266ebebbde0';

// Define a function to update the weather information in the DOM
function updateWeatherInfo(weatherData) {
  // Set the weather image source based on the weather condition
  switch (weatherData.weather[0].main) {
    case 'Clear':
      image.src = 'images/clear.png';
      break;
    case 'Rain':
      image.src = 'images/rain.png';
      break;
    case 'Snow':
      image.src = 'images/snow.png';
      break;
    case 'Clouds':
      image.src = 'images/cloud.png';
      break;
    case 'Haze':
      image.src = 'images/mist.png';
      break;
    default:
      image.src = '';
  }

  // Set the weather information in the DOM
  temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>°C</span>`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.innerHTML = `${weatherData.main.humidity}%`;
  wind.innerHTML = `${parseInt(weatherData.wind.speed)}Km/hr`;

  // Add CSS classes to apply a fade-in animation
  weatherBox.classList.add('fadeIn');
  weatherDetails.classList.add('fadeIn');
}

// Define a function to display an error message in the DOM
function displayErrorMessage() {
  container.style.height = '400px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  error404.style.display = 'block';
  error404.classList.add('fadeIn');
}

// Define a function to handle the search button click event
function handleSearchClick() {
  const city = searchInput.value;

  if (!city) {
    return;
  }

  // Perform an HTTP GET request to the OpenWeatherMap API
  fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        displayErrorMessage();
        return;
      }

      // Update the weather information in the DOM
      updateWeatherInfo(data);

      // Show the weather information in the DOM
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');
      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      container.style.height = '590px';
    })
    .catch(error => {
      console.error(error);
      displayErrorMessage();
    });
}

// Add a click event listener to the search button
searchBtn.addEventListener('click', handleSearchClick);
