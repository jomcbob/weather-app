import cloudy from './imgs/cloudy.jpg'
import sunny from './imgs/sunny.jpg'
import rainy from './imgs/rainy.jpg'
import snowy from './imgs/snowy.jpg'

let showWeatherData = document.querySelector('.showWeatherData')
let showForcast = document.querySelector('.sideBar')

let fetchCity = (city) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=Y9ZFF9CEJ475LE5UTF9JWAD4Y&contentType=json`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      let validData = 
        {
        address: response.address.toUpperCase(),
        description: response.description,
        tempmin: response.days[0].tempmin,
        tempmax: response.days[0].tempmax,
        temp: response.days[0].temp
        }
        console.log(response)
        giveData(validData)
        updateBackgroundImage(response)
        giveTenDayForecast(response.days)
    })
    .catch(error => {
        alert('Error fetching weather data:', error);
      })
}

let giveData = (validData) => {
    showWeatherData.innerHTML = `
    <div class='data'> 
        <p class='city'>City: ${validData.address}</p>
        <p>Overview: ${validData.description}</p>
        <p>Max temp: ${validData.tempmax}</p>
        <p>Temp: ${validData.temp}</p>
    </div>
    `
}

let giveTenDayForecast = (forcast) => {
    console.log(forcast)
    for (let i = 0; i <= 15; i++){
        let div = document.createElement('div')
        div.classList.add('div')
        div.textContent = forcast[i].description
        showForcast.appendChild(div)
    }
    // showForcast.innerHTML = `
    // <div>
    //     ${forcast[0].description}
    // </div>
    // `
}

function updateBackgroundImage(data) {
    const condition = data.currentConditions.conditions.toLowerCase()

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

  

fetchCity("shelley id")
export { fetchCity }

// Photo by <a href="https://unsplash.com/@derek_pdx?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Derek Sears</a> on <a href="https://unsplash.com/photos/green-grass-field-under-blue-sky-during-daytime-Uezjb0-RuGk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/white-and-teal-sky-PLe8QlV67kg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@berkinuregen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Berkin Üregen</a> on <a href="https://unsplash.com/photos/water-droplets-on-glass-panel-eehRmieZJvY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@clickandlearnphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Click and Learn Photography</a> on <a href="https://unsplash.com/photos/white-and-brown-tree-illustation-NGB9oBtOUM8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      