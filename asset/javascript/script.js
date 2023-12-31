const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');

const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchButton.click();
    searchInput.blur();
  }
});


search.addEventListener('click', () => {
    const APIKey = 'Your_API_Key_Here';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const weatherBox = document.querySelector('.weather-box');
            const weatherDetails = document.querySelector('.weather-details');
            const error404 = document.querySelector('.not-found');

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box i');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Thunderstorm':
                    image.innerHTML = '<i class="fas fa-bolt custom-icon"></i>';
                    break;
                case 'Drizzle':
                    image.innerHTML = '<i class="fas fa-cloud-rain custom-icon"></i>';
                    break;
                case 'Rain':
                    image.innerHTML = '<i class="fas fa-cloud-showers-heavy custom-icon"></i>';
                    break;
                case 'Snow':
                    image.innerHTML = '<i class="fas fa-snowflake custom-icon"></i>';
                    break;
                case 'Clear':
                    image.innerHTML = '<i class="fas fa-sun custom-icon"></i>';
                    break;
                case 'Clouds':
                    image.innerHTML = '<i class="fas fa-cloud custom-icon"></i>';
                    break;
                case 'Mist':
                    image.innerHTML = '<i class="fas fa-smog custom-icon"></i>';
                    break;
                case 'Haze':
                    image.innerHTML = '<i class="fas fa-smog custom-icon"></i>';
                    break;
                case 'Fog':
                    image.innerHTML = '<i class="fas fa-smog custom-icon"></i>';
                    break;
                case 'Smoke':
                    image.innerHTML = '<i class="fas fa-smog custom-icon"></i>';
                    break;
                default:
                    image.innerHTML = '';
            }
            
            

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
