import express from "express";
import { config, validateConfig } from "./config.js";
import { findMatchingRule } from "./rules.js";
import { sendTextMessage } from "./whatsapp.js";

validateConfig();

const app = express();
app.use(express.json());

const cooldownByChatRule = new Map();

function isAllowedChat(chatId) {
  if (!config.allowedChatIds.length) return true;
  return config.allowedChatIds.includes(chatId);
}

function isCooldownActive(key, cooldownMs) {
  const lastTriggeredAt = cooldownByChatRule.get(key);
  if (!lastTriggeredAt) return false;
  return Date.now() - lastTriggeredAt < cooldownMs;
}

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.verifyToken) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const entry = req.body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (!message || message.type !== "text") return;

    const from = message.from;
    const text = message.text?.body || "";
    const chatId = value?.metadata?.display_phone_number || from;

    if (!isAllowedChat(chatId)) return;

    const rule = findMatchingRule(text);
    if (!rule) return;

    const cooldownKey = `${chatId}:${rule.id}`;
    if (isCooldownActive(cooldownKey, rule.cooldownMs)) return;

    await sendTextMessage({
      to: from,
      text: rule.reply,
      phoneNumberId: config.phoneNumberId,
      token: config.whatsappToken
    });

    cooldownByChatRule.set(cooldownKey, Date.now());
  } catch (error) {
    console.error("Webhook processing error:", error.message);
  }
});

app.listen(config.port, () => {
  console.log(`Webhook listening on :${config.port}`);
  const callbackUrl = config.webhookBaseUrl
    ? `${config.webhookBaseUrl.replace(/\/+$/, "")}/webhook`
    : `http://localhost:${config.port}/webhook`;
  console.log(`Webhook callback URL: ${callbackUrl}`);
});
