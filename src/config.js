import "dotenv/config";

function env(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (value && String(value).trim()) return String(value).trim();
  }
  return "";
}

const allowedChatIds = env("ALLOWED_CHAT_IDS", "allowed_chat_ids")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

export const config = {
  port: Number(env("PORT", "port") || 3000),
  verifyToken: env("VERIFY_TOKEN", "verify_token"),
  whatsappToken: env("WHATSAPP_TOKEN", "whatsapp_token"),
  phoneNumberId: env("PHONE_NUMBER_ID", "phone_number_id"),
  webhookBaseUrl: env("WEBHOOK_BASE_URL", "webhook_base_url"),
  allowedChatIds
};

export function validateConfig() {
  const missing = [];
  if (!config.verifyToken) missing.push("VERIFY_TOKEN/verify_token");
  if (!config.whatsappToken) missing.push("WHATSAPP_TOKEN/whatsapp_token");
  if (!config.phoneNumberId) missing.push("PHONE_NUMBER_ID/phone_number_id");

  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}
