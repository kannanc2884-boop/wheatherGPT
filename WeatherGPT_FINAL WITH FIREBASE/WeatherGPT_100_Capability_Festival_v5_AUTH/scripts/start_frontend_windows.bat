@echo off
cd /d "%~dp0..\frontend"
echo.
echo WeatherGPT frontend starting on http://localhost:8080
echo Open: http://localhost:8080/login.html
echo Keep this window open while using WeatherGPT.
echo.
python -m http.server 8080
