# whatsapp_bot

Webhook-based WhatsApp Cloud API bot that reads incoming messages and sends automatic replies for matched rules.

## Features

- Receives incoming message events from WhatsApp webhook
- Supports keyword/regex rule-based auto replies
- Allows filtering with selected chat/group IDs
- Includes webhook verification endpoint
- Includes Postman collection in `docs/`

## Project Structure

- `src/server.js` - Express webhook server
- `src/config.js` - Environment config and validation
- `src/rules.js` - Reply rules and matcher
- `src/whatsapp.js` - Cloud API send-message helper
- `.env.example` - Environment variable template

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
copy .env.example .env
```

3. Fill values in `.env` (either style works):

- Uppercase:
  - `VERIFY_TOKEN`
  - `WHATSAPP_TOKEN`
  - `PHONE_NUMBER_ID`
  - Optional: `ALLOWED_CHAT_IDS`
- Postman-style aliases:
  - `verify_token`
  - `whatsapp_token`
  - `phone_number_id`
  - Optional: `allowed_chat_ids`

4. Run server:

```bash
npm run dev
```

## Webhook URL

- Verify endpoint: `GET /webhook`
- Message endpoint: `POST /webhook`

If running locally, expose port `3000` with ngrok:

```bash
ngrok http 3000
```

Use the generated HTTPS URL as `webhook_base_url`.

## Postman Variable Mapping

Collection in `docs/whatsapp-cloud-postman-collection.json` uses:

- `verify_token` -> `.env` `VERIFY_TOKEN` (or `verify_token`)
- `whatsapp_token` -> `.env` `WHATSAPP_TOKEN` (or `whatsapp_token`)
- `phone_number_id` -> `.env` `PHONE_NUMBER_ID` (or `phone_number_id`)
- `webhook_base_url` -> ngrok/public URL used in Postman requests



