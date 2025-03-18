function getWeatherIconPath(weatherCondition) {
    const iconMap = {
        "clear-day": require("./icons/clear-day.svg"),
        "clear-night": require("./icons/clear-night.svg"),
        "cloudy": require("./icons/cloudy.svg"),
        "fog": require("./icons/fog.svg"),
        "hail": require("./icons/hail.svg"),
        "partly-cloudy-day": require("./icons/partly-cloudy-day.svg"),
        "partly-cloudy-night": require("./icons/partly-cloudy-night.svg"),
        "rain-snow-showers-day": require("./icons/rain-snow-showers-day.svg"),
        "rain-snow-showers-night": require("./icons/rain-snow-showers-night.svg"),
        "rain-snow": require("./icons/rain-snow.svg"),
        "rain": require("./icons/rain.svg"),
        "showers-day": require("./icons/showers-day.svg"),
        "showers-night": require("./icons/showers-night.svg"),
        "sleet": require("./icons/sleet.svg"),
        "snow-showers-day": require("./icons/snow-showers-day.svg"),
        "snow-showers-night": require("./icons/snow-showers-night.svg"),
        "snow": require("./icons/snow.svg"),
        "thunder-rain": require("./icons/thunder-rain.svg"),
        "thunder-showers-day": require("./icons/thunder-showers-day.svg"),
        "thunder-showers-night": require("./icons/thunder-showers-night.svg"),
        "thunder": require("./icons/thunder.svg"),
        "wind": require("./icons/wind.svg")
    }

     return iconMap[weatherCondition]// || require("./icons/thunder.svg"); // Default image
}

export { getWeatherIconPath }