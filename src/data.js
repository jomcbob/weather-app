let fetchCity = (city, refresh) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=Y9ZFF9CEJ475LE5UTF9JWAD4Y&contentType=json`, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            const data = {
                address: response.address,
                conditions: response.currentConditions.conditions,
                description: response.description,
                humidity: response.currentConditions.humidity,
                temp: response.days[0].temp,
                windspeed: response.currentConditions.windspeed,
                days: response.days.map(day => {
                    return {
                        datetime: day.datetime,
                        description: day.description,
                        tempmin: day.tempmin,
                        tempmax: day.tempmax,
                    }
                })
            }

            refresh(data)
        })
        .catch(error => {
            console.log(error)
        })
}

export { fetchCity }