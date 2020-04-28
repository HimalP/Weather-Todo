<template>
    <div>
        <input
            type="text"
            placeholder="Enter a city..."
            v-model="location"
            v-on:keypress="fetchWeather"
        />
        <h1 id="location-name" v-if="weatherData != null">
            {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h1>
        <p id="date">{{ currentDate }}</p>
        <p id="temperature">{{ kelvinToCelsius }}</p>
        <p id="weather-description" v-if="weatherData != null">
            {{ weatherData.weather[0].description }}
        </p>
        <p id="time">{{ currentTime }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Weather',
    data() {
        return {
            apiKey: 'e76639a2f11fd1a42584ba9908864bda',
            location: 'Toronto',
            weatherData: null,
            currentTime: moment().format('h:mm A'),
        };
    },
    computed: {
        kelvinToCelsius: function() {
            if (this.weatherData != null)
                return `${Math.round(
                    this.weatherData.main.temp - 273.15
                )}${String.fromCharCode(176)}C`;
            else return 'Temp Not Found';
        },
        currentDate: function() {
            return moment().format('dddd MMMM DD, YYYY');
        },
    },
    methods: {
        fetchWeather(e) {
            if (e.key == 'Enter') {
                axios
                    .get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`
                    )
                    .then((res) => {
                        this.weatherData = res.data;
                        this.setBackground();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                this.clearLocation();
            }
        },
        clearLocation() {
            this.location = '';
        },
        getCurrentTime() {
            this.currentTime = moment().format('h:mm A');
        },
    },
    created() {
        setInterval(() => this.getCurrentTime(), 3000);

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`
            )
            .then((res) => {
                this.weatherData = res.data;
                this.location = '';
                this.setBackground();
            })
            .catch((err) => {
                console.log(err);
            });

        this.clearLocation();
    },
};
</script>

<style scoped>
div {
    background-image: url('../assets/cool.jpg');
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background-position: center;
    background-size: cover;
}

input {
    width: 100%;
    border: none;
    border-radius: 0 12px 0 12px;
    height: 48px;
    outline: none;
    font-weight: bold;
    font-size: 22px;
    padding: 0 1rem;
    background-image: var(--theme-accent);
    color: white;
    opacity: 55%;
    box-shadow: 6px 8px black;
    transition: border-radius 400ms, opacity 400ms;
}

input:hover,
input:focus {
    border-radius: 12px 0 12px 0;
    opacity: 100%;
}

#location-name {
    color: blueviolet;
    margin-top: 6rem;
    font-size: 36px;
    text-align: center;
}

#temperature {
    color: white;
    font-weight: 900;
    font-size: 64px;
    background-image: var(--theme-accent);
    box-shadow: 6px 6px black;
    text-shadow: 4px 4px black;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 2rem;
    width: 11rem;
    text-align: center;
}

#date {
    color: blueviolet;
    font-weight: bold;
    margin-top: 0.25rem;
}

#time {
    color: white;
    font-weight: bold;
    font-size: 56px;
    margin-top: auto;
    background-image: var(--theme-accent);
    padding: 0.25rem;
    width: 100%;
    text-align: center;
    opacity: 100%;
    border-radius: 8px;
    text-shadow: 4px 4px black;
    box-shadow: 4px 4px black;
}

#weather-description {
    color: blueviolet;
    font-weight: 900;
    font-size: 28px;
    margin-top: 1rem;
}
</style>
