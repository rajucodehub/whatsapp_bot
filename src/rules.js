export const rules = [
  {
    id: "pricing_rule",
    pattern: /\b(price|pricing|cost)\b/i,
    reply: "Latest pricing: https://example.com/pricing",
    cooldownMs: 5 * 60 * 1000
  },
  {
    id: "support_rule",
    pattern: /\b(help|support|issue)\b/i,
    reply: "Support form: https://example.com/support",
    cooldownMs: 2 * 60 * 1000
  }
];

export function findMatchingRule(text) {
  return rules.find((rule) => rule.pattern.test(text));
}
