# Weather App 

## Overview

This React application fetches real-time and forecasted weather data using the Tomorrow.io API. It displays current weather details and a 4-day forecast. Users can enter a location manually or allow geolocation. Chakra UI styles components, and axios handles API requests. The app provides feedback using toasts for success, warning, and error messages. Overall, it offers a simple interface for weather information retrieval.
## Features

- Real-time and forecasted weather data from Tomorrow.io API.
- Current weather details and a 4-day forecast.
- Manual location entry or automatic geolocation.
- Styling with Chakra UI components.
- API requests handled with axios.
- User feedback through toasts for success, warning, and error messages.
  
## Setup

### Clone the Repository

```bash
git clone https://github.com/7848944337/WeatherApp.git
```

### Or Download Zip File

1. Download the zip file and extract it to your desired location.
2. Open the extracted WeatherApp folder in Visual Studio Code.

### Install Dependencies

Open the terminal in the WeatherApp directory and run the following commands:

```bash
npm install
```

### Start the Application

```bash
npm start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.


## Issues and Troubleshooting

If you encounter the "Too Many Requests. Please try again later" error, follow these steps:

1. Open the WeatherApp code in your editor.

2. Locate the API key in the code and replace it with the following:
   ```python
    apiKey = "u8liUnWkCf5wHeis2jp44pPFH6DtBqgv";
   ```

3. Save the changes and try running the application again.

## Contact Information

Tarrun Krishna
tarrunkrishna@gmail.com
