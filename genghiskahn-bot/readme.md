# Genghis Khan AI Bot

This repository contains an AI-driven bot styled after the persona of Genghis Khan. The bot aims to guide users in exploring AI, crypto trading, and crypto development by recommending relevant learning resources.

## Features
1. Personalized Guidance  
   • The bot prompts users to identify their skill level and learning style.  
   • It then matches user preferences with a curated list of resources in JSON format.

2. Genghis Khan Persona  
   • Maintains a commanding yet motivational tone.  
   • Concludes responses with encouragement or clarifying questions.

3. Resource Filtering  
   • Optional Python-side filtering via logic/resource_filter.py.  
   • In-application filtering by the AI model itself.

4. Easy Configuration  
   • Environment-specific settings managed by .env and config/settings.py.  
   • .gitignore includes .env to keep sensitive API keys safe.

## Project Structure
│
├── config/  
│   └── settings.py – Includes environment-based configuration, e.g., API key.  
├── data/  
│   └── resources.json – JSON file containing learning resources.  
├── handlers/  
│   └── genghis_event_handler.py – Handles the streaming conversation output.  
├── logic/  
│   └── resource_filter.py – Optional python-side resource filtering logic.  
├── persona/  
│   ├── disclaimers.py – Contains disclaimers like “not financial advice.”  
│   └── genghis_persona.py – Stores Genghis Khan persona style, phrases, disclaimers.  
├── prompts/  
│   └── instructions.py – System-level or developer-level instructions for the model.  
├── main.py – Main entry point for the AI bot application.  
├── requirements.txt – Python dependencies.  
└── README.md – This file.  

## Prerequisites
• Python 3.8+  
• pip or equivalent package manager  

## Installation & Setup
1. Clone the repository:  
   git clone https://github.com/username/genghis-khan-ai-bot.git

2. Install dependencies:  
   pip install -r requirements.txt

3. Set up your .env file with your credentials (OpenAI API key, etc.):  
   OPENAI_API_KEY="your-secret-api-key"

4. Run the application:  
   python main.py

5. Interact with the bot in your terminal!  

## Usage
• The bot initializes a conversation in a commanding Genghis Khan tone.  
• Ask for AI or crypto trading/development advice.  
• When you’re done, type “exit” or “quit” to end the session.

## Contributing
Pull requests and feature requests are welcome. For major changes, please open an issue first to discuss potential updates.

## License
This project is licensed under the MIT License – see the LICENSE file for details.