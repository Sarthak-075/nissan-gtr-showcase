@echo off
echo Stopping any existing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
echo.
echo Starting Cinematic Transformer Showcase on Port 3001...
echo.
echo Open http://localhost:3001 in your browser once ready.
echo.
call npm run start -- -p 3001
pause
