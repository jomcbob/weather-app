import "./styles.css";
import { fetchCity } from './page1'

let cityInput = document.querySelector('#cityInput')
let fetchCityButton = document.querySelector('.fetchCityButton')

fetchCityButton.addEventListener('click', () => {
    fetchCity(cityInput.value)
})

