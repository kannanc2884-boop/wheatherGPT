# WeatherGPT — 100 Capability Catalogue

Build: `20260905-v5`

> Activity profiles are intentionally counted once: capability **61 — Activity Intelligence Engine** contains Running, Walking, Cycling, Cricket, Football, Photography, Laundry Drying and Outdoor Event profiles.

## 1. Natural-language weather questions
**Category:** AI Assistant  
**Status:** LIVE  
Ask normal questions such as “Will it rain at 5 PM?”; n8n grounds the answer in the current weather payload before Gemini responds.

## 2. Rain questions
**Category:** AI Assistant  
**Status:** LIVE  
Answers rain-specific questions using hourly precipitation probability and rainfall values instead of guessing from the condition label.

## 3. Umbrella recommendations
**Category:** AI Assistant  
**Status:** LIVE  
Converts upcoming precipitation probability into a simple carry-an-umbrella decision with the reason shown to the user.

## 4. Simple weather explanations
**Category:** AI Assistant  
**Status:** LIVE  
Translates technical weather values into plain-language summaries for non-technical users.

## 5. Follow-up questions
**Category:** AI Assistant  
**Status:** LIVE  
Keeps the current weather and conversation context available so a user can ask follow-up questions without repeating the location.

## 6. Conversation memory
**Category:** AI Assistant  
**Status:** LIVE  
Stores lightweight conversation history in the browser and passes relevant context to the n8n AI workflow for the prototype.

## 7. Location-aware responses
**Category:** AI Assistant  
**Status:** LIVE  
Uses the searched city or coordinates as context for every forecast, risk and AI response.

## 8. Time-aware weather questions
**Category:** AI Assistant  
**Status:** LIVE  
Maps phrases such as “this evening” or “tomorrow morning” to hourly/daily forecast windows before producing an answer.

## 9. Compare two locations
**Category:** AI Assistant  
**Status:** LIVE  
Fetches a second city and compares temperature, rain probability and derived risk side by side.

## 10. AI-generated daily weather summary
**Category:** AI Assistant  
**Status:** LIVE  
Builds a concise daily briefing from live forecast, risk, activity and alert context.

## 11. Current temperature
**Category:** Core Weather  
**Status:** LIVE  
Displays current temperature from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 12. Feels-like temperature
**Category:** Core Weather  
**Status:** LIVE  
Displays feels-like temperature from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 13. Minimum / maximum temperature
**Category:** Core Weather  
**Status:** LIVE  
Displays minimum / maximum temperature from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 14. Humidity
**Category:** Core Weather  
**Status:** LIVE  
Displays humidity from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 15. Wind speed
**Category:** Core Weather  
**Status:** LIVE  
Displays wind speed from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 16. Wind direction
**Category:** Core Weather  
**Status:** LIVE  
Displays wind direction from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 17. Atmospheric pressure
**Category:** Core Weather  
**Status:** LIVE  
Displays atmospheric pressure from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 18. Visibility
**Category:** Core Weather  
**Status:** LIVE  
Displays visibility from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 19. Cloud cover
**Category:** Core Weather  
**Status:** LIVE  
Displays cloud cover from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 20. UV index
**Category:** Core Weather  
**Status:** LIVE  
Displays uv index from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

## 21. Hourly forecast
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide hourly forecast and feeds the result into charts, planning and WeatherGPT answers.

## 22. 24-hour forecast
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide 24-hour forecast and feeds the result into charts, planning and WeatherGPT answers.

## 23. 7-day forecast
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide 7-day forecast and feeds the result into charts, planning and WeatherGPT answers.

## 24. Rain probability
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide rain probability and feeds the result into charts, planning and WeatherGPT answers.

## 25. Expected rainfall amount
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide expected rainfall amount and feeds the result into charts, planning and WeatherGPT answers.

## 26. Thunderstorm probability / signal
**Category:** Forecasting  
**Status:** LIVE  
Detects thunderstorm weather codes in the hourly forecast and raises a thunderstorm signal used by the risk engine.

## 27. Temperature trend
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide temperature trend and feeds the result into charts, planning and WeatherGPT answers.

## 28. Wind trend
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide wind trend and feeds the result into charts, planning and WeatherGPT answers.

## 29. Sunrise / sunset
**Category:** Forecasting  
**Status:** LIVE  
Uses Open-Meteo hourly/daily forecast arrays to provide sunrise / sunset and feeds the result into charts, planning and WeatherGPT answers.

## 30. Forecast comparison
**Category:** Forecasting  
**Status:** LIVE  
Compares forecast signals and, where enabled, multi-model outputs so the UI can expose agreement instead of a single opaque forecast.

## 31. Heat risk score
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent heat risk score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 32. Rain risk score
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent rain risk score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 33. Lightning / thunderstorm risk
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent lightning / thunderstorm risk from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 34. Flood-risk indicator
**Category:** Risk Intelligence  
**Status:** LIVE  
Combines heavy precipitation, storm and recent-weather signals into a prototype flood-risk indicator; it is not an official flood warning.

## 35. Strong-wind risk
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent strong-wind risk from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 36. Visibility risk
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent visibility risk from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 37. Outdoor safety score
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent outdoor safety score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 38. Travel safety score
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent travel safety score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 39. Overall weather-risk score
**Category:** Risk Intelligence  
**Status:** LIVE  
Calculates a transparent overall weather-risk score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

## 40. Explainable risk reasons
**Category:** Risk Intelligence  
**Status:** LIVE  
Shows which inputs contributed to the risk score so the score is explainable rather than a black box.

## 41. Official alert integration
**Category:** Disaster Intelligence  
**Status:** LIVE  
Combines authoritative NDMA SACHET alerts with NASA EONET natural-event intelligence while keeping WeatherGPT-derived scores clearly separate.

## 42. District / state warning matching
**Category:** Disaster Intelligence  
**Status:** LIVE  
Matches official alerts to the searched state/district and also checks NASA EONET events within a configurable geographic radius.

## 43. Extreme-rain alerts
**Category:** Disaster Intelligence  
**Status:** LIVE  
Surfaces authoritative heavy-rain alerts when present and augments situational awareness with nearby EONET events.

## 44. Lightning / thunderstorm warnings
**Category:** Disaster Intelligence  
**Status:** LIVE  
Shows official thunderstorm/lightning warnings when available and relates them to current forecast risk.

## 45. Heat-wave warnings
**Category:** Disaster Intelligence  
**Status:** LIVE  
Shows official heat-wave warnings when available and compares them with the local heat-risk calculation.

## 46. Cyclone information scanner
**Category:** Disaster Intelligence  
**Status:** LIVE  
Uses NASA EONET severe-storm events plus official warning data to provide a cyclone/severe-storm situational scanner.

## 47. Flood guidance
**Category:** Disaster Intelligence  
**Status:** LIVE  
Provides prototype flood-safety guidance from forecast/risk inputs while keeping official warnings visually distinct.

## 48. Disaster response mode
**Category:** Disaster Intelligence  
**Status:** LIVE  
Switches the assistant into disaster-response guidance mode with alerts, EONET events, safety actions and source-first language.

## 49. Emergency recommendations
**Category:** Disaster Intelligence  
**Status:** LIVE  
Generates practical emergency precautions from the hazard type without presenting AI guidance as an official authority instruction.

## 50. Disaster event timeline
**Category:** Disaster Intelligence  
**Status:** LIVE  
Builds a timeline/list of nearby NASA EONET natural events using event title, category, date, coordinates and source links.

## 51. Home location saving
**Category:** Personalization  
**Status:** LIVE  
Uses browser localStorage and n8n context to provide home location saving without requiring paid authentication or a cloud database.

## 52. Favourite locations
**Category:** Personalization  
**Status:** LIVE  
Uses browser localStorage and n8n context to provide favourite locations without requiring paid authentication or a cloud database.

## 53. User weather preferences
**Category:** Personalization  
**Status:** LIVE  
Uses browser localStorage and n8n context to provide user weather preferences without requiring paid authentication or a cloud database.

## 54. Daily weather briefing
**Category:** Personalization  
**Status:** LIVE  
Generates a reusable daily summary containing weather, risk, useful time windows and active alerts.

## 55. Morning forecast brief
**Category:** Personalization  
**Status:** LIVE  
n8n can execute a scheduled morning briefing for the configured home location using the same zero-cost data stack.

## 56. Evening forecast brief
**Category:** Personalization  
**Status:** LIVE  
Produces an evening-oriented summary using the upcoming nighttime and next-morning forecast window.

## 57. Personal rain alert
**Category:** Personalization  
**Status:** LIVE  
Uses the saved rain threshold/preferences to decide whether a browser rain alert should be offered.

## 58. Personal heat alert
**Category:** Personalization  
**Status:** LIVE  
Uses apparent temperature and saved preferences to generate a personal heat alert.

## 59. Severe-weather browser alert
**Category:** Personalization  
**Status:** LIVE  
Uses browser Notification permission to surface severe-weather reminders without a paid SMS/WhatsApp gateway.

## 60. Personalized recommendation engine
**Category:** Personalization  
**Status:** LIVE  
Combines saved location, preferences, risk and activity scores to personalize recommendations.

## 61. Activity Intelligence Engine
**Category:** Activity Intelligence  
**Status:** LIVE  
One explainable activity-intelligence feature with eight profiles: Running, Walking, Cycling, Cricket, Football, Photography, Laundry Drying and Outdoor Event. Each profile applies activity-specific weather penalties without being counted as a separate major capability. Profiles: Running, Walking, Cycling, Cricket, Football, Photography, Laundry Drying, Outdoor Event.

## 62. Best outdoor time
**Category:** Activity Intelligence  
**Status:** LIVE  
Scans the next 24 hours in 3-hour windows and selects the lowest-risk outdoor window based on rain, wind, heat and UV.

## 63. Activity recommendation engine
**Category:** Activity Intelligence  
**Status:** LIVE  
Transforms weather and risk variables into activity-specific advice instead of showing only raw weather values.

## 64. Interactive weather map
**Category:** Maps & Visualization  
**Status:** LIVE  
Displays the searched location and intelligence layers on an interactive Leaflet/OpenStreetMap map.

## 65. Temperature map layer
**Category:** Maps & Visualization  
**Status:** LIVE  
Builds temperature points/tiles from the n8n map-grid workflow for a prototype temperature layer.

## 66. Rainfall map layer
**Category:** Maps & Visualization  
**Status:** LIVE  
Builds precipitation values over a local map grid for a prototype rainfall layer.

## 67. Wind visualization
**Category:** Maps & Visualization  
**Status:** LIVE  
Displays wind values/direction from forecast-grid data to provide spatial wind context.

## 68. Cloud layer
**Category:** Maps & Visualization  
**Status:** LIVE  
Uses cloud-cover/condition data in the map-grid layer to represent cloud conditions.

## 69. Warning-region layer
**Category:** Maps & Visualization  
**Status:** LIVE  
Places matched official-warning and NASA EONET hazard locations on the map without relabelling derived risk as official.

## 70. Current-location marker
**Category:** Maps & Visualization  
**Status:** LIVE  
Marks the user-selected or geolocated coordinates on the interactive map.

## 71. Forecast timeline slider
**Category:** Maps & Visualization  
**Status:** LIVE  
Lets the map/grid data be associated with forecast time so the prototype can step through upcoming conditions.

## 72. Animated weather cards
**Category:** Maps & Visualization  
**Status:** LIVE  
Uses animated cards, counters, hover motion, background weather shapes and scrolling marquee effects to make the dashboard feel live.

## 73. Weather charts
**Category:** Maps & Visualization  
**Status:** LIVE  
Shows hourly temperature and rain charts with Chart.js for fast visual interpretation.

## 74. Travel mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for travel mode.

## 75. Agriculture mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for agriculture mode.

## 76. Disaster response mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for disaster response mode.

## 77. Student / college mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for student / college mode.

## 78. Outdoor sports mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for outdoor sports mode.

## 79. Marine weather mode
**Category:** Specialized Modes  
**Status:** LIVE  
Uses Open-Meteo Marine data through n8n for wave/wind context; it is prototype guidance, not certified navigation data.

## 80. Event planner mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for event planner mode.

## 81. Health / comfort mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for health / comfort mode.

## 82. Smart city mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for smart city mode.

## 83. Research mode
**Category:** Specialized Modes  
**Status:** LIVE  
Reuses the same verified weather/alert context but changes the assistant and scoring priorities for research mode.

## 84. Multilingual assistant
**Category:** Advanced  
**Status:** LIVE  
Lets the AI response language switch between English, Tamil and Hindi while keeping the same grounded weather context.

## 85. Voice questions
**Category:** Advanced  
**Status:** LIVE  
Uses the browser Web Speech Recognition interface to convert spoken questions into text at zero API cost where supported.

## 86. Voice weather briefing
**Category:** Advanced  
**Status:** LIVE  
Uses browser speech synthesis to read WeatherGPT answers aloud where supported.

## 87. Weather-source citations
**Category:** Advanced  
**Status:** LIVE  
Keeps source labels visible for Open-Meteo, NDMA SACHET, NASA EONET, OpenStreetMap and AI-derived results.

## 88. Multi-model forecast verification
**Category:** Advanced  
**Status:** LIVE  
Queries multiple numerical weather-model outputs through the Open-Meteo model interfaces and compares their key forecast values.

## 89. Forecast confidence score
**Category:** Advanced  
**Status:** LIVE  
Converts cross-model agreement into a prototype confidence indicator so users can see when models disagree.

## 90. Citizen weather reporting
**Category:** Advanced  
**Status:** LIVE  
Accepts a local community weather report through an n8n webhook and labels it as community-supplied, never official.

## 91. Weather anomaly detection
**Category:** Advanced  
**Status:** LIVE  
Compares recent observations/forecast past-days values with current conditions to flag unusual changes.

## 92. Recent-history analytics
**Category:** Advanced  
**Status:** LIVE  
Uses Open-Meteo Forecast past_days data for recent-history trends without requiring the paid long-term historical API.

## 93. Experimental local nowcast model
**Category:** Advanced  
**Status:** EXPERIMENTAL  
Runs a clearly labelled experimental trend/persistence nowcast in n8n. It is a prototype model and is never presented as a meteorological authority forecast.

## 94. Weather Route Intelligence
**Category:** Decision Intelligence  
**Status:** LIVE  
Builds an origin-to-destination weather corridor, samples weather along the path, highlights the highest-risk point and visualizes the corridor on a map. It is weather planning, not turn-by-turn navigation.

## 95. Campus Weather Mode
**Category:** Decision Intelligence  
**Status:** LIVE  
Turns the current local forecast into a campus-day timeline for commute, midday movement, sports/outdoor time and evening departure with explainable GO/CAUTION/AVOID signals.

## 96. Event Weather Planner
**Category:** Decision Intelligence  
**Status:** LIVE  
Evaluates a selected event date, start time and duration inside the available forecast window and returns an outdoor-event suitability score, key risks and a backup-plan recommendation.

## 97. AI Trip Weather Planner
**Category:** Decision Intelligence  
**Status:** LIVE  
Compares weather across multiple trip stops for a chosen forecast date, ranks the stops by weather suitability and can ask the grounded Gemini workflow to produce a concise trip-weather plan.

## 98. Weather Scenario Simulator
**Category:** Decision Intelligence  
**Status:** LIVE  
Lets the user change hypothetical temperature, rain, wind, UV and thunderstorm values and recomputes a simulated WeatherGPT risk score beside the real current risk. Simulations are clearly labelled as non-forecasts.

## 99. Heat Stress Intelligence
**Category:** Decision Intelligence  
**Status:** LIVE  
Combines apparent temperature, humidity, UV and wind into an explainable outdoor heat-burden score and general comfort precautions. It is not a medical diagnosis or clinical heat index service.

## 100. Indian Languages Mode
**Category:** Accessibility & Language  
**Status:** LIVE  
Lets the WeatherGPT copilot answer and speak weather briefings in multiple Indian languages including Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese and Urdu.
