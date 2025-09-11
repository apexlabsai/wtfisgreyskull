# WTF is Greyskull? - MVP Web App

A simple Flask app that generates personalized fitness plans based on celebrity looks. No jargon, just clear, actionable advice.

## Files Structure
```
braddpitt/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Procfile              # Render deployment config
├── templates/
│   ├── index.html        # Homepage with form
│   └── plan.html         # Results page
└── README.md             # This file
```

## Deploy to Render

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/braddpitt.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `wtf-is-greyskull` (or your choice)
     - **Runtime:** `Python 3`
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `python app.py`
     - **Environment:** `Python 3.11` (or latest)
   - Click "Create Web Service"

### Option 2: Deploy from Render Dashboard

1. **Create a new Web Service on Render**
2. **Connect your GitHub repo** (or upload files directly)
3. **Use these settings:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py`
   - **Python Version:** 3.11

### Option 3: Manual Deploy (if you don't want to use GitHub)

1. **Zip the project files** (excluding `__pycache__` and `.git`)
2. **Upload to Render** via their dashboard
3. **Use the same build/start commands** as above

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py

# Open http://localhost:4000
```

## Features

- **5 Celebrity Profiles:** Brad Pitt (Fight Club), Ryan Gosling (Drive), Henry Cavill (Superman), Chris Hemsworth (Thor), Jimin (BTS)
- **Personalized Plans:** Based on height, weight, age
- **Conversational Tone:** No boring fitness jargon
- **Simple UI:** Clean, mobile-friendly design
- **No Database:** Stateless, perfect for MVP

## Notes

- The app uses the Mifflin-St Jeor equation for calorie estimation
- All profiles are pre-configured with workout splits, macros, and lifestyle tips
- Results are generated in real-time based on user input
- Perfect for deployment on Render, Replit, or similar platforms
