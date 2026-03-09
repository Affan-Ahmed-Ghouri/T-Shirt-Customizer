#!/bin/bash

# T-Shirt Customizer Setup Script
# This script will help you set up the project quickly

echo "🎨 T-Shirt Customizer Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check for .env file
if [ ! -f "server/.env" ]; then
    echo "⚠️  No .env file found in server directory"
    echo "📝 Creating .env file from template..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env file"
    echo ""
    echo "⚠️  IMPORTANT: Edit server/.env and add your OpenAI API key!"
    echo "   You can get one from: https://platform.openai.com/api-keys"
fi

if [ ! -f "client/.env" ]; then
    echo "📝 Creating client .env file from template..."
    cp client/.env.example client/.env
    echo "✅ Created client/.env file"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📖 For more information, see README.md"
