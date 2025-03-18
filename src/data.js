let moreData;
const fetchCity = (city, refresh) => {
    document.getElementById('loadingBarContainer').style.display = 'block'

    let loadingProgress = 0;

    const loadingInterval = setInterval(() => {
        if (loadingProgress < 100) {
            loadingProgress += 10
            document.getElementById('loadingBar').style.width = `${loadingProgress}%`
        }
    }, 100)

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=Y9ZFF9CEJ475LE5UTF9JWAD4Y&contentType=json`, { mode: 'cors' })
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            clearInterval(loadingInterval)
            document.getElementById('loadingBar').style.width = '100%'

            setTimeout(() => {
                document.getElementById('loadingBarContainer').style.display = 'none';
            }, 500)

            console.log(response);
            const data = {
                address: response.address,
                conditions: response.currentConditions.conditions,
                description: response.description,
                humidity: response.currentConditions.humidity,
                temp: response.days[0].temp,
                windspeed: response.currentConditions.windspeed,
                hours: response.days[0].hours.map(hour => {
                    return {
                        icon: hour.icon,
                        feelslike: hour.feelslike,
                        datetime: hour.datetime
                    }
                }),
                days: response.days.map(day => {
                    return {
                        datetime: day.datetime,
                        description: day.description,
                        tempmin: day.tempmin,
                        tempmax: day.tempmax,
                    }
                })
            }
            refresh(data);
            moreData = data
        })
        .catch(error => {
            clearInterval(loadingInterval);
            document.getElementById('loadingBar').style.width = '10%'
            document.getElementById('loadingBarContainer').style.display = 'none'

            alert('Please enter a valid city', error)
        })
}

const changeTemperature = (temperature, isCelsius) => {
    if (isCelsius) {
      return temperature + ' ℉'
    } else {
      return  Math.round((temperature - 32) * 5 / 9 * 100) / 100 + ' ℃'
    }
}

const changeUnitOfLength = (distance, isMiles) => {
    if (isMiles) {
      return distance + ' mph';
    } else {
      return Math.round(distance * 1.60934 * 100) / 100 + ' km/h';
    }
  }



export { fetchCity, changeTemperature, changeUnitOfLength, moreData }