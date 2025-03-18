import { changeTemperature, changeUnitOfLength } from "./data"
import { toggle } from "./index"

let showWeatherData = document.querySelector('.showWeatherData')
let showForcast = document.querySelector('.nextTenDays')

const refresh = (data) => {
    giveTodaysData(data)
    updateBackgroundImage(data)
    giveTenDayForecast(data)
}

let giveTodaysData = (validData) => {
    showWeatherData.innerHTML = `
    <div class='data'> 
        <p class='city'>City: ${validData.address.toUpperCase()}</p>
        <p>Overview: ${validData.description}</p>
        <p>Conditions: ${validData.conditions}</p>
        <p>Max temp: ${changeTemperature(validData.days[0].tempmax, !toggle)}</p>
        <p>Min temp: ${changeTemperature(validData.days[0].tempmin, !toggle)}</p>
        <p>Temp: ${ changeTemperature(validData.temp, !toggle)}</p>
    </div>
    <div class='boxForWidgets'>
         <div class='wind widget'>💨 ${changeUnitOfLength(validData.windspeed, !toggle)}</div>
        <div class='humidity widget'>Humidity: ${validData.humidity}%</div>
    </div>
    `
}

let giveTenDayForecast = (forecast) => {
    showForcast.innerHTML = ''

    for (let i = 1; i < 11; i++) {
        let dayForcast = document.createElement('div')
        dayForcast.classList.add('dayForecast')
        dayForcast.textContent = formatDate(forecast.days[i].datetime)
        showForcast.appendChild(dayForcast)

        let isExpanded = false;

        dayForcast.addEventListener('click', () => {
            if (isExpanded) {
                dayForcast.innerHTML = formatDate(forecast.days[i].datetime);
            } else {
                dayForcast.innerHTML = `
                    <p>${forecast.days[i].description}</p>
                    <p>Max temp: ${changeTemperature(forecast.days[i].tempmax, !toggle)}</p>
                    <p>Min temp: ${changeTemperature(forecast.days[i].tempmin, !toggle)}°</p>
                `
            }
            isExpanded = !isExpanded
        })
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return localDate.toLocaleDateString('en-US', options);
}

async function updateBackgroundImage(data) {
    const condition = data.conditions.toLowerCase()
    
    let imagePath = 'cloudy'

    if (condition.includes('clear') || condition.includes('sunny') || condition.includes('fair')) {
        imagePath = 'sunny'
    } else if (condition.includes('rain') || condition.includes('showers') || condition.includes('drizzle')) {
        imagePath = 'rainy'
    } else if (condition.includes('snow') || condition.includes('sleet') ) {
        imagePath = 'snowy'
    } else if (condition.includes('cloud') || condition.includes('hail') || condition.includes('partly cloudy') || condition.includes('wind')) {
        imagePath = 'cloudy'
    } else if (condition.includes('thunder')){
        imagePath = 'lightning'
    } else if (condition.includes('fog') || condition.includes('haze')){
        imagePath = 'fog'
    } else if (condition.includes('overcast')){
        imagePath = 'overcast'
    }

    try {
        const image = await import(`./imgs/${imagePath}.jpg`)
        document.body.style.backgroundImage = `url(${image.default})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = 'center'
        document.body.style.height = '100vh'

    } catch (error) {
        console.error('Error loading background image:', error)
        document.body.style.backgroundImage = `url(./imgs/default.jpg)`
    }
}

export { refresh }