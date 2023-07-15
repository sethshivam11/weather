let city;
let gps = document.getElementById('gps');
let btn = document.getElementById('search');
let cityName = document.getElementById('city-name');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let temp = document.getElementById('temp');
let icon = document.getElementById('condition');
let details = document.getElementById('details');
let searchContainer = document.getElementById('search-container');
let errors = document.getElementById('error');
btn.addEventListener("click", e=>{
    e.preventDefault();
    city = document.getElementById('city-input').value;
    fetchData(city);
});
gps.addEventListener("click", e=>{
    e.preventDefault();
    getLocation();
});
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(fetchCity);
    }
    else{
        console.log('some error');
    }
}
async function fetchData(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41b7ce70676bbad96d4e1c4b3d01cbae`);
        const data = await response.json();
        console.log(data);
        temp.innerHTML = Math.round(data.main.temp/10) + "°C";
        cityName.innerHTML = data.name;
        humidity.innerHTML = `<img src="resources/humidity.svg" class="more-img">` + data.main.humidity + "%";
        wind.innerHTML = `<img src="resources/wind.svg" class="more-img">` + data.wind.speed + " km/h";
        if(data.weather[0].main == "Clouds"){
            icon.src = "resources/clouds.png";
        }
        else if(data.weather[0].main == "Rain"){
            icon.src = "resources/rain.png";
        }
        else if(data.weather[0].main == "Mist"){
            icon.src = "resources/mist.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            icon.src = "resources/drizzle.png";
        }
        else if(data.weather[0].main == "Clear"){
            icon.src = "resources/clear.png";
        }
        else if(data.weather[0].main == "Snow"){
            icon.src = "resources/snow.png";
        }
        errors.style.display = 'none';
        details.style.display = 'flex';
        searchContainer.style.borderBottomLeftRadius = '0px';
        searchContainer.style.borderBottomRightRadius = '0px';
    }
    catch(err){
        console.log(err);
        if(errors.style.display != 'block'){
            searchContainer.style.borderBottomLeftRadius = '0px';
            searchContainer.style.borderBottomRightRadius = '0px';
            errors.style.display = 'block';
        }
    }
}
async function fetchCity(position){
    try{
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
        const jsonRes = await res.json();
        city = jsonRes.city;
        fetchData(city);
    }
    catch(err){
        console.log(err
        fetchData("-1");
    }
}
