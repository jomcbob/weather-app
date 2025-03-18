import "./styles.css";
import { fetchCity, moreData, calculateTimeDifference } from './data'
import { refresh } from './dom'

let cityInput = document.querySelector('#cityInput')
let fetchCityButton = document.querySelector('.fetchCityButton')
let credit = document.querySelector('.credit')
let appendCredit = document.querySelector('.appendCredit')
let deleteInputValue = document.querySelector('.deleteInputValue')
let switchValue = document.querySelector('.slider')
let toggle = false
let toggleValue = document.querySelector('.toggleValue')

fetchCityButton.addEventListener('click', () => {
    fetchCity(cityInput.value, refresh)
})

switchValue.addEventListener('click', () => {
    toggle = !toggle
    if (toggle){
        toggleValue.textContent = '℃'
    } else {
        toggleValue.textContent = '℉'
    }
    refresh(moreData)
})

deleteInputValue.addEventListener('click', () => {
    cityInput.value = ''
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchCity(cityInput.value, refresh)
    }
})

let localRotation = new Date().getSeconds() * 6 + 180
let clockInterval

// for the users time
setInterval(function() {
    localRotation += 6
    let clock = document.querySelector('.hand')
    clock.style.transform = 'rotate(' + localRotation + 'deg)'

    const date = new Date();
    const timeString = date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    const timeElement = document.querySelector('.time')
    timeElement.textContent = timeString
    if (localRotation > 3600) {
        localRotation = new Date().getSeconds() * 6 + 180
    }
}, 1000)

// for the searched time
function startClock(timeZone) {
    let locationRotation = new Date().getSeconds() * 6 + 180
    if (clockInterval) {
        clearInterval(clockInterval)
    }

    clockInterval = setInterval(function () {
        locationRotation += 6
        let clock = document.querySelector('.hand2')
        clock.style.transform = 'rotate(' + locationRotation + 'deg)'

        const date = new Date()
        const options = {
            timeZone: timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }

        const timeString = new Intl.DateTimeFormat(navigator.language, options).format(date)
        const timeElement = document.querySelector('.time2')
        timeElement.textContent = timeString
    }, 1000)
}

function displayTimeDifference(zone) {
    const timeZone = zone
    const { hours, minutes } = calculateTimeDifference(timeZone)
    const differenceElement = document.getElementById('timeDifference')
    differenceElement.innerHTML = `
    <div>
        <div>Time Difference</div>
        <div>${hours} hours,</div>
        <div>${minutes} minutes</div>
    </div>
    `
}
  

let showCredit = true
let divs = document.createElement('div')
divs.classList.add('divs')
    credit.addEventListener('click', () => {
        if (showCredit) {
            divs.innerHTML = `
                <a href="https://unsplash.com/@derek_pdx?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Derek Sears</a> on <a href="https://unsplash.com/photos/green-grass-field-under-blue-sky-during-daytime-Uezjb0-RuGk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/white-and-teal-sky-PLe8QlV67kg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@berkinuregen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Berkin Üregen</a> on <a href="https://unsplash.com/photos/water-droplets-on-glass-panel-eehRmieZJvY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@clickandlearnphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Click and Learn Photography</a> on <a href="https://unsplash.com/photos/white-and-brown-tree-illustation-NGB9oBtOUM8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@kreyatif?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Michał Mancewicz</a> on <a href="https://unsplash.com/photos/a-lightning-bolt-is-seen-in-the-sky-R9L7ukhBSgs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                <a href="https://unsplash.com/@pueblovista?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Paul Pastourmatzis</a> on <a href="https://unsplash.com/photos/silhouette-of-trees-covered-by-fog-KT3WlrL_bsg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                <a href="https://unsplash.com/@anandu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anandu Vinod</a> on <a href="https://unsplash.com/photos/cloudy-sky-pbxwxwfI0B4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
            `
        } else {
            divs.innerHTML = `
            `
        }
        showCredit = !showCredit;
        appendCredit.appendChild(divs)
})

fetchCity("London", refresh)

export { toggle, startClock, displayTimeDifference }

