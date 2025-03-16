import cloudy from './imgs/cloudy.jpg'
import sunny from './imgs/sunny.jpg'
import rainy from './imgs/rainy.jpg'
import snowy from './imgs/snowy.jpg'

let showWeatherData = document.querySelector('.showWeatherData')
let showForcast = document.querySelector('.sideBar')

const refresh = (data) => {
    giveData(data)
    updateBackgroundImage(data)
    giveTenDayForecast(data)
}

let giveData = (validData) => {
    showWeatherData.innerHTML = `
    <div class='data'> 
        <p class='city'>City: ${validData.address.toUpperCase()}</p>
        <p>Overview: ${validData.description}</p>
        <p>Max temp: ${validData.days[0].tempmax}</p>
        <p>Min temp: ${validData.days[0].tempmin}</p>
        <p>Temp: ${validData.temp}</p>
    </div>
    <div class='boxForWidgets'>
         <div class='wind widget'>💨 ${validData.windspeed} mph</div>
        <div class='humidity widget'>Humidty: ${validData.humidity}</div>
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
                    <p>Max temp: ${forecast.days[i].tempmax}°</p>
                    <p>Min temp: ${forecast.days[i].tempmin}°</p>
                `
            }
            isExpanded = !isExpanded;
        })
    }
}

function formatDate(dateString) {
    // Create a Date object
    const date = new Date(dateString);

    // Adjust the date to the local timezone if needed
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    // Format the date to your desired format
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return localDate.toLocaleDateString('en-US', options);
}


function updateBackgroundImage(data) {
    const condition = data.conditions.toLowerCase()

    if (condition.includes('clear')) {
        document.body.style.backgroundImage = `url(${sunny})`;
    } else if (condition.includes('rain') || condition.includes('showers') || condition.includes('thunder')) {
        document.body.style.backgroundImage = `url(${rainy})`;
    } else if (condition.includes('snow')) {
        document.body.style.backgroundImage = `url(${snowy})`;
    } else if (condition.includes('cloud') || condition.includes('fog') || condition.includes('hail') || condition.includes('sleet') || condition.includes('wind')) {
        document.body.style.backgroundImage = `url(${cloudy})`
    }

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.backgroundAttachment = 'fixed';
}

export { refresh }

// Photo by <a href="https://unsplash.com/@derek_pdx?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Derek Sears</a> on <a href="https://unsplash.com/photos/green-grass-field-under-blue-sky-during-daytime-Uezjb0-RuGk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/white-and-teal-sky-PLe8QlV67kg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@berkinuregen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Berkin Üregen</a> on <a href="https://unsplash.com/photos/water-droplets-on-glass-panel-eehRmieZJvY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@clickandlearnphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Click and Learn Photography</a> on <a href="https://unsplash.com/photos/white-and-brown-tree-illustation-NGB9oBtOUM8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
