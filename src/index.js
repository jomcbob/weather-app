import "./styles.css";
import { fetchCity } from './data'
import { refresh } from './dom'

let cityInput = document.querySelector('#cityInput')
let fetchCityButton = document.querySelector('.fetchCityButton')
let credit = document.querySelector('.credit')
let appendCredit = document.querySelector('.appendCredit')

fetchCityButton.addEventListener('click', () => {
    fetchCity(cityInput.value, refresh)
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchCity(cityInput.value, refresh)
    }
})

let showCredit = true
let divs = document.createElement('div')
    credit.addEventListener('click', () => {
        if (showCredit) {
            divs.innerHTML = `
                <a href="https://unsplash.com/@derek_pdx?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Derek Sears</a> on <a href="https://unsplash.com/photos/green-grass-field-under-blue-sky-during-daytime-Uezjb0-RuGk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CHUTTERSNAP</a> on <a href="https://unsplash.com/photos/white-and-teal-sky-PLe8QlV67kg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@berkinuregen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Berkin Üregen</a> on <a href="https://unsplash.com/photos/water-droplets-on-glass-panel-eehRmieZJvY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>
                <a href="https://unsplash.com/@clickandlearnphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Click and Learn Photography</a> on <a href="https://unsplash.com/photos/white-and-brown-tree-illustation-NGB9oBtOUM8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash;</a>

            `
        } else {
            divs.innerHTML = `
            `
        }
        showCredit = !showCredit;
        appendCredit.appendChild(divs)
})

fetchCity("London", refresh)

