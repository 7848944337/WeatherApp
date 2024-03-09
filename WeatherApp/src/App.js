// Importing necessary libraries and components from Chakra UI and Axios
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Input,
  Flex,
  Grid,
  Spinner,
  useToast,
  Button,
} from "@chakra-ui/react";
import weatherCode from "./weather.json"; // Importing weather code mapping from an external file

// Main functional component - App
function App() {
  // State variables to manage real-time weather, forecast weather, loading state, user location, and input value
  const [realTimeWeather, setRealTimeWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const toast = useToast(); // Chakra UI hook for displaying toasts

  // useEffect hook to handle asynchronous data fetching and location setup
  useEffect(() => {
    // Helper function to make weather API requests
    const weatherRequest = async (url, params, successMessage, errorMessage) => {
      const options = {
        method: "GET",
        url,
        params: {
          location: userLocation,
          apikey: "2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU",
          ...params,
        },
        headers: { accept: "application/json" },
      };

      try {
        const response = await axios.request(options);
        setLoading(false);
        toast({
          title: successMessage,
          status: "success",
        });
        return response.data;
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 429) {
          toast({
            title: "Too Many Requests. Please try again later",
            status: "error",
          });
        } else {
          toast({
            title: errorMessage,
            status: "error",
          });
        }
        return null;
      }
    };

    // Function to fetch real-time weather data
    const fetchRealTimeWeather = async () => {
      const url = "https://api.tomorrow.io/v4/weather/realtime";
      const params = {};
      const successMessage = "Real-Time weather successfully fetched!";
      const errorMessage = "Failed to fetch Real-Time weather";

      const data = await weatherRequest(url, params, successMessage, errorMessage);
      if (data) {
        setRealTimeWeather(data);
      }
    };

    // Function to fetch forecast weather data
    const fetchForecastWeather = async () => {
      const url = "https://api.tomorrow.io/v4/weather/forecast";
      const params = {};
      const successMessage = "Forecasted weather successfully fetched!";
      const errorMessage = "Failed to fetch Forecasted weather";

      const data = await weatherRequest(url, params, successMessage, errorMessage);
      if (data) {
        setForecastWeather(data);
      }
    };

    // If user location is available, fetch real-time and forecast weather data
    if (userLocation) {
      fetchRealTimeWeather();
      fetchForecastWeather();
    } else {
      // Use geolocation to get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const currentLocation = `${latitude},${longitude}`;
            setUserLocation(currentLocation);
            fetchRealTimeWeather(currentLocation);
            fetchForecastWeather(currentLocation);
          },
          (error) => {
            setLoading(false);
            toast({
              title: "Location Denied. Please enter manually.",
              status: "warning",
            });
          }
        );
      } else {
        setLoading(false);
        toast({
          title: "Error",
          description:
            "Geolocation is not supported by your browser. Please enter a location manually.",
          status: "error",
        });
      }
    }
  }, [userLocation, toast]); // Dependencies for useEffect

  // Event handler for input change to update inputValue
  const handleLocationChange = (newLocation) => {
    setInputValue(newLocation);
  };

  // Event handler for button click to set userLocation
  const handleButtonClick = () => {
    setUserLocation(inputValue);
  };

  // Function to get weather description based on weather code
  const getWeatherDescription = (code) => {
    return (
      weatherCode.weatherCode[code] ||
      weatherCode.weatherCodeMax[code] ||
      "Unknown"
    );
  };

  // Render the UI using Chakra UI components
  return (
    <ChakraProvider>
      <Box p={8}>
        <Heading as='h3' size='lg' mb={6} textAlign="center">
          Real-Time Weather
        </Heading>

        {realTimeWeather && (
          <Grid
            templateColumns="repeat(1, 1fr)"
            gap={6}
            justifyItems="center"
            alignItems="center"
          >
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <Text>
                Temperature: {realTimeWeather.data.values.temperature} &#176;C{" "}
              </Text>
              <Text>
                Description:{" "}
                {getWeatherDescription(realTimeWeather.data.values.weatherCode)}{" "}
              </Text>
            </Box>
          </Grid>
        )}
      </Box>

      <Box p={8} alignItems="center">
        <Heading as='h3' size='lg' mb={6} textAlign="center">
          Forecasted Weather
        </Heading>
        {forecastWeather && (
          <Grid
            templateColumns="repeat(4, 1fr)"
            justifyItems="center"
            alignItems="center"
          >
            {forecastWeather.timelines.daily
              .slice(0, 4)
              .map((dailyForecast, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                  <Text as="b">{dailyForecast.time.split("T")[0]}</Text>
                  <Text>{dailyForecast.values.temperatureMax} &#176;C</Text>
                  <Text>
                    {getWeatherDescription(dailyForecast.values.weatherCodeMax)}
                  </Text>
                </Box>
              ))}
          </Grid>
        )}
      </Box>

      <Box p={8}>
        <Heading as='h3' size='lg' mb={6} textAlign="center">
          Search Location
        </Heading>
        <Flex
          justifyContent="center" 
          alignItems="center" 
        >
          <Input
            width="350px"
            size='sm'
            placeholder="Enter location"
            onChange={(e) => handleLocationChange(e.target.value)}
            value={inputValue}
            mr={2}
          />
          <Button onClick={handleButtonClick} isDisabled={!inputValue}>
            Fetch
          </Button>
        </Flex>
      </Box>

      <Box textAlign="center" p={4}>
        {loading && <Spinner size="lg" />}
      </Box>
    </ChakraProvider>
  );
}

export default App;
