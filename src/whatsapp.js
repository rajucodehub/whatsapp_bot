export async function sendTextMessage({ to, text, phoneNumberId, token }) {
  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text }
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`WhatsApp send failed: ${response.status} ${JSON.stringify(payload)}`);
  }
  return payload;
}
