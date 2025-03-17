import "./styles.css";
import { fetchCity } from './data'
import { refresh } from './page1'

let cityInput = document.querySelector('#cityInput')
let fetchCityButton = document.querySelector('.fetchCityButton')

fetchCityButton.addEventListener('click', () => {
    fetchCity(cityInput.value, refresh)
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchCity(cityInput.value, refresh)
    }
  })

fetchCity("shelley id", refresh)

