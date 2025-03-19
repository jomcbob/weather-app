let moreData
const fetchCity = (city, refresh) => {
    document.getElementById('loadingBarContainer').style.display = 'block'

    let loadingProgress = 0

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
                document.getElementById('loadingBarContainer').style.display = 'none'
            }, 500)

            // save only data I need in a nice array
            const data = {
                address: response.address,
                conditions: response.currentConditions.conditions,
                description: response.description,
                humidity: response.currentConditions.humidity,
                temp: response.days[0].temp,
                windspeed: response.currentConditions.windspeed,
                timezone: response.timezone,
                winddir: response.currentConditions.winddir,
                visibility: response.currentConditions.visibility,
                feelslike: response.currentConditions.feelslike,
                windgust: response.currentConditions.windgust,
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
            refresh(data)
            // make copy of data so I can export it and use the info in other modules
            moreData = data
        })
        .catch(error => {
            clearInterval(loadingInterval);
            document.getElementById('loadingBar').style.width = '10%'
            document.getElementById('loadingBarContainer').style.display = 'none'

            alert('Please enter a valid city', error)
        })
}

// read name if you want to know what it does
const changeTemperature = (temperature, isCelsius) => {
    if (isCelsius) {
        return temperature + ' ℉'
    } else {
        return Math.round((temperature - 32) * 5 / 9 * 100) / 100 + ' ℃'
    }
}

// read the last // if you want to know what this one does
const changeUnitOfLength = (distance, isMiles) => {
    if (isMiles) {
        return distance + ' mph'
    } else {
        return Math.round(distance * 1.60934 * 100) / 100 + ' km/h'
    }
}

// Ok Ok you get it I'll stop.
function calculateTimeDifference(timeZone) {
    // Get the current local time
    const localDate = new Date()
    // Get the time in the specified target time zone as a UTC Date object
    const targetDate = new Date().toLocaleString("en-US", { timeZone: timeZone })
    const targetDateTime = new Date(targetDate)
    // Calculate the difference in milliseconds
    const diffInMillis =  targetDateTime.getTime() - localDate.getTime()
    // Convert milliseconds to total minutes and round to the nearest minute
    const diffInMinutes = Math.round(diffInMillis / 60000)
    // Return the difference in hours and minutes 
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = Math.abs(diffInMinutes % 60)

    return { hours, minutes }
}

function formatTo12Hour(time) {
    const [hours, minutes] = time.split(":").map(Number)

    const period = hours >= 12 ? "PM" : "AM"

    const hours12 = hours % 12 || 12

    const formattedTime = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`

    return formattedTime
}

function formatDate(dateString) {
    const date = new Date(dateString)
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return localDate.toLocaleDateString('en-US', options)
}

function getDirection(degree) {
    if (degree < 0 || degree >= 360) {
        return "Not found"
    }

    const directions = [
        { range: [0, 22.5], direction: 'North' },
        { range: [22.5, 67.5], direction: 'North-East' },
        { range: [67.5, 112.5], direction: 'East' },
        { range: [112.5, 157.5], direction: 'South-East' },
        { range: [157.5, 202.5], direction: 'South' },
        { range: [202.5, 247.5], direction: 'South-West' },
        { range: [247.5, 292.5], direction: 'West' },
        { range: [292.5, 337.5], direction: 'North-West' },
        { range: [337.5, 360], direction: 'North' }
    ]

    for (let dir of directions) {
        if (degree >= dir.range[0] && degree < dir.range[1]) {
            return dir.direction
        }
    }

    return "Not found"
}



export { fetchCity, changeTemperature, changeUnitOfLength, moreData, calculateTimeDifference, formatTo12Hour, formatDate, getDirection }