#!/usr/bin/env bash
cd "$(dirname "$0")/../frontend"
echo "WeatherGPT: http://localhost:8080/login.html"
python3 -m http.server 8080
