// Frontend
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const forecastContainer = document.querySelector('.forcast');

const fetchData = (location) => {
  const url = 'http://localhost:3000/weather?address=' + location;

  fetch(url).then(response => {
    response.json().then(data => {
      console.log(data)
      renderWeather(data)
    });
  });
};

const renderWeather = (data) => {
  forecastContainer.innerHTML = "";
  let locationParagraph = document.createElement('p');
  let forecastParagraph = document.createElement('p');
  let errorParagraph = document.createElement('p');

  if(data.error){
    errorParagraph.innerHTML = data.error;
    forecastContainer.appendChild(errorParagraph);
    return;
  }

  locationParagraph.textContent = data.location;
  forecastParagraph.textContent = data.forecastData;

  forecastContainer.appendChild(locationParagraph);
  forecastContainer.appendChild(forecastParagraph);
}

const submitHandler = event => {
  event.preventDefault();
  const location = searchInput.value;

  forecastContainer.innerHTML = "<p>Loading...</p>"

  fetchData(location);
};

weatherForm.addEventListener('submit', submitHandler);