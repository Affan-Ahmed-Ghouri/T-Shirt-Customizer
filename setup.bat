@echo off
REM T-Shirt Customizer Setup Script for Windows
REM This script will help you set up the project quickly

echo ==========================================
echo   T-Shirt Customizer Setup Script
echo ==========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node -v
echo.

REM Check if npm is installed
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

echo [OK] npm version:
npm -v
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
call npm run install:all

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed successfully
echo.

REM Check for server .env file
if not exist "server\.env" (
    echo [WARNING] No .env file found in server directory
    echo [INFO] Creating .env file from template...
    copy server\.env.example server\.env >nul
    echo [OK] Created server\.env file
    echo.
    echo [IMPORTANT] Edit server\.env and add your OpenAI API key!
    echo            You can get one from: https://platform.openai.com/api-keys
)

REM Check for client .env file
if not exist "client\.env" (
    echo [INFO] Creating client .env file from template...
    copy client\.env.example client\.env >nul
    echo [OK] Created client\.env file
)

echo.
echo ==========================================
echo           Setup complete!
echo ==========================================
echo.
echo To start the development server, run:
echo    npm run dev
echo.
echo For more information, see README.md
echo.
pause
