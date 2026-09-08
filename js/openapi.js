
// Open-Meteo Weather API


// Bellevue, Washington coordinates
const latitude = 47.6101;
const longitude = -122.2015;


// Get HTML elements
const temperatureButton =
    document.querySelector("#temperature-button");

const conditionButton =
    document.querySelector("#condition-button");

const weatherResult =
    document.querySelector("#weather-result");



// Weather Code Function

function getWeatherCondition(weatherCode) {

    if (weatherCode === 0) {
        return "Clear Sky";
    }

    if (weatherCode === 1) {
        return "Mainly Clear";
    }

    if (weatherCode === 2) {
        return "Partly Cloudy";
    }

    if (weatherCode === 3) {
        return "Overcast";
    }

    if (
        weatherCode === 45 ||
        weatherCode === 48
    ) {
        return "Fog";
    }

    if (
        weatherCode >= 51 &&
        weatherCode <= 57
    ) {
        return "Drizzle";
    }

    if (
        weatherCode >= 61 &&
        weatherCode <= 67
    ) {
        return "Rain";
    }

    if (
        weatherCode >= 71 &&
        weatherCode <= 77
    ) {
        return "Snow";
    }

    if (
        weatherCode >= 80 &&
        weatherCode <= 82
    ) {
        return "Rain Showers";
    }

    if (
        weatherCode >= 85 &&
        weatherCode <= 86
    ) {
        return "Snow Showers";
    }

    if (
        weatherCode >= 95 &&
        weatherCode <= 99
    ) {
        return "Thunderstorm";
    }

    return "Unknown Weather Condition";
}



// Endpoint 1:
// Temperature

async function getTemperature() {

    // Loading message
    weatherResult.innerHTML = `
        <p>Loading temperature...</p>
    `;

    try {

        /*
         * GET REQUEST #1
         *
         * This request asks Open-Meteo
         * ONLY for temperature data.
         *
         * temperature_2m=current
         */
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
        );

        if (!response.ok) {
            throw new Error(
                "Unable to retrieve temperature."
            );
        }

        const data = await response.json();

        const temperature =
            data.current.temperature_2m;

        const unit =
            data.current_units.temperature_2m;


        // Display temperature
        weatherResult.innerHTML = `
            <p class="temperature-label">
                Current Temperature
            </p>

            <p class="temperature-value">
                ${temperature}°${unit === "°F" ? "F" : "C"}
            </p>

            <p>
                Bellevue, Washington
            </p>
        `;

    } catch (error) {

        console.error(
            "Temperature API Error:",
            error
        );

        weatherResult.innerHTML = `
            <p class="weather-error">
                Unable to load the temperature.
                Please try again.
            </p>
        `;
    }
}


// Endpoint 2:
// Weather Condition


async function getWeatherConditionData() {

    // Loading message
    weatherResult.innerHTML = `
        <p>Loading weather condition...</p>
    `;

    try {

        /*
         * GET REQUEST #2
         *
         * This is a separate request.
         *
         * It asks Open-Meteo ONLY for
         * the weather code.
         *
         * weather_code=current
         */
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code`
        );

        if (!response.ok) {
            throw new Error(
                "Unable to retrieve weather condition."
            );
        }

        const data = await response.json();

        const weatherCode =
            data.current.weather_code;

        const condition =
            getWeatherCondition(weatherCode);


        // Display weather condition
        weatherResult.innerHTML = `
            <p class="condition-icon">
                ☁️
            </p>

            <p class="condition-value">
                ${condition}
            </p>

            <p>
                Bellevue, Washington
            </p>
        `;

    } catch (error) {

        console.error(
            "Weather Condition API Error:",
            error
        );

        weatherResult.innerHTML = `
            <p class="weather-error">
                Unable to load the weather condition.
                Please try again.
            </p>
        `;
    }
}



// Navigation


// Temperature button
temperatureButton.addEventListener(
    "click",
    function() {

        // Change active button
        temperatureButton.classList.add("active");

        conditionButton.classList.remove("active");

        // Make a NEW GET request
        getTemperature();
    }
);


// Weather condition button
conditionButton.addEventListener(
    "click",
    function() {

        // Change active button
        conditionButton.classList.add("active");

        temperatureButton.classList.remove("active");

        // Make a NEW GET request
        getWeatherConditionData();
    }
);



// Initial API Request

// Show temperature when page loads
getTemperature();