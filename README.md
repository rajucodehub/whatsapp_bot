# whatsapp_bot
An AI‑driven WhatsApp automation bot that reads messages from a WhatsApp group and sends automatic, intelligent replies. Built using Python, Selenium, and an LLM engine, the bot monitors WhatsApp Web in real time, detects new group messages, and generates natural responses.

✨ Features
📥 Reads incoming messages from a WhatsApp group chat
🤖 Generates AI‑based replies using an LLM (OpenAI / Gemini)
🔄 Sends automatic responses through WhatsApp Web
🧠 Context‑aware, natural conversation flow
📝 Logs all interactions for review
⚙️ Fully customizable reply logic

🧩 How It Works
The bot opens WhatsApp Web using Selenium
It monitors the selected group chat
When a new message appears, it is passed to the AI engine
The AI generates a smart reply
The bot sends the reply back into the group automatically

🛠️ Tech Stack
Python 3.x
Selenium WebDriver
Chrome + ChromeDriver
OpenAI / Gemini API
dotenv for environment variables

📦 Installation
git clone https://github.com/yourusername/whatsapp_bot
cd whatsapp_bot
pip install -r requirements.txt

▶️ Running the Bot
python main.py



