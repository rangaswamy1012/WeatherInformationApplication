import {Climate} from './data/climate.js';
async function getData(cityName){
    const APIkey = '2e2981eb1f717465bc03166123dbc471';
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`)
    let jsonData = await data.json();
    const c1 = new Climate(jsonData);
    return c1;
}


function renderWeather(){
    
    document.querySelector('.search-button')
        .addEventListener('click',()=>{
            loadCimateHtml();
    })
    document.querySelector('.search-bar')
        .addEventListener('keydown',(event)=>{
            if(event.key == 'Enter'){
                loadCimateHtml();
            }
    });
}
renderWeather();


function getCityNameHtml(){
    const cityName = document.querySelector('.search-bar').value;
    return cityName;
}

function loadCimateHtml(){
    let weatherHtml = '';
    const city = getCityNameHtml();
    if(city){
        const data = getData(city);
        data.then((res)=>{
            weatherHtml +=`
            <header>
                <input type="text" class="search-bar" placeholder = 'Enter the city'>
                <button class="search-button">
                    <img src="images/search.png" alt="">
                </button>
            </header>
            <div class="error-msg">Please enter the city name</div>
            <section class="middle-section">
                <div class="weather-image">
                    <img src="images/${res.mainImg}.png" alt="">
                </div>
                <div class="weather-temp">
                    ${res.temp}&deg;c
                </div>
                <div class="weather-location">
                    ${res.cityName}
                </div>
            </section>
            <section class="footer">
                <div class="humidity">
                    <div class="humidity-img">
                        <img src="images/humidity.png" alt="">
                    </div>
                    <div class="humidity-percent">
                        ${res.humidity}&percnt;
                    </div>
                    <div>Humidity</div>
                </div>
                <div class="wind">
                    <div class="wind-img">
                        <img src="images/wind.png" alt="">
                    </div>
                    <div class="wind-speed">
                        ${res.windSpeed} km/h
                    </div>
                    <div>Wind Speed</div>
                </div>
            </section>
            `;
            document.querySelector('.weather-card').innerHTML = weatherHtml;
            renderWeather();
        })
    }
    else{
        const shakeAnimationSearch = document.querySelector('.search-bar');
        shakeAnimationSearch.classList.add('error');
        setInterval(()=>{
            shakeAnimationSearch.classList.remove('error');
        },1000);
        document.querySelector('.error-msg').classList.add('js-error-msg');
    }
}