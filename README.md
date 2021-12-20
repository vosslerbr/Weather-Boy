# Weather Boy v1.0

Weather Boy is a Discord bot written in Node.js. At its core, Weather Boy is meant to be an easy way for Discord users to request simple, up-to-date information about the weather conditions in their area.

Weather Boy uses OpenWeatherMap for geocoding and weather data.

We've got a landing page now! Check out https://vosslerbr.github.io/Weather-Boy/ to see it.

## Current Features

- Help
  - Command: '$help'
  - Tells user what commands are available
- Current weather information
  - Command: '$now [city name]'
  - Temperature
  - Feels like
  - Wind bearing and speed
  - Humidity
- 5 day forecast
  - Command: '$5day [city name]'
  - High
  - Low
  - Daily summary (one for each day)
- ## Alerts
  - Command: '$alerts [city name]'
  - 'Issued by' Office
  - Event name
  - Event/Alert message

## Future Plans

- Update landing page to align with current features
- Allow user to input city and state/country instead of just city. Will allow for more accurate results
- Allow user to chose from a list of cities if no state/country give.
