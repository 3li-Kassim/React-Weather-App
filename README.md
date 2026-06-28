# React Weather App 🌤️

A responsive weather application built with React that displays real-time weather data using the OpenWeatherMap API.

## Features

- Search weather by city name
- Current weather with temperature, humidity, wind speed, and conditions
- Live weather icons
- 5-day forecast
- Default city loaded on startup (London)
- Loading spinner while fetching data
- Metric units (°C)

## Tech Stack

- React (Vite)
- OpenWeatherMap API
- Bootstrap 5
- Font Awesome

## Concepts Used

- `useState` and `useEffect` hooks
- Fetch API with chained `.then()`
- Conditional rendering
- Array filtering with modulo for forecast days

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Add your OpenWeatherMap API key in `App.jsx`
4. Run `npm run dev`
