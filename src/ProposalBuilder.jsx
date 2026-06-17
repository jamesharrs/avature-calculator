import { useState, useCallback, useMemo, useEffect } from 'react';
import { getSuggestedPricing, getPricingTier, PRICING_TIERS } from './pricing';
import RateCardEditor, { DEFAULT_TIERS, DEFAULT_ADDONS, DEFAULT_MODULES, getRateCardContext, getSuggestedPricingFromRC } from './RateCardEditor';

const LOGO_URI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJ1dWlkLTI3ZjVjY2VjLTEzYTctNGFiYS1hMDQyLTVmZDE3NDdlMzA2OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDE2MiAzMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLWNlZWE2ZTA4LWNiZDktNDE4Zi1iZjJiLWI0MzYyYTRiYTVmNSIgeDE9IjAiIHkxPSIxNiIgeDI9IjIzLjIxIiB5Mj0iMTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMDUzYmMiLz48c3RvcCBvZmZzZXQ9Ii41OSIgc3RvcC1jb2xvcj0iIzAwNTNiYyIvPjxzdG9wIG9mZnNldD0iLjY3IiBzdG9wLWNvbG9yPSIjMDA1NWMwIi8+PHN0b3Agb2Zmc2V0PSIuNzYiIHN0b3AtY29sb3I9IiMwMDVkY2MiLz48c3RvcCBvZmZzZXQ9Ii44NCIgc3RvcC1jb2xvcj0iIzAwNmFlMCIvPjxzdG9wIG9mZnNldD0iLjkzIiBzdG9wLWNvbG9yPSIjMDA3ZGZjIi8+PHN0b3Agb2Zmc2V0PSIuOTMiIHN0b3AtY29sb3I9IiMwMDdmZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC04YTdkYTYyMi01NTYwLTRiNzUtOGFkMS1jNTYwYjdkODhkMDIiIHgxPSI4LjIzIiB5MT0iMjQuNjUiIHgyPSIzMC43NyIgeTI9IjI0LjY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMDYiIHN0b3AtY29sb3I9IiMwMDUzYmMiLz48c3RvcCBvZmZzZXQ9Ii4xNSIgc3RvcC1jb2xvcj0iIzAwNjFkMiIvPjxzdG9wIG9mZnNldD0iLjI3IiBzdG9wLWNvbG9yPSIjMDA3MWViIi8+PHN0b3Agb2Zmc2V0PSIuMzgiIHN0b3AtY29sb3I9IiMwMDdiZjkiLz48c3RvcCBvZmZzZXQ9Ii40NyIgc3RvcC1jb2xvcj0iIzAwN2ZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLTA2ZTkyOTc5LTg0YmQtNDQwZi05YTdiLTlhMTFkMWQzOTY1NyIgeDE9IjguMjMiIHkxPSIyNC41NiIgeDI9IjMwLjc3IiB5Mj0iMjQuNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4wNiIgc3RvcC1jb2xvcj0iIzAwNTNiYyIvPjxzdG9wIG9mZnNldD0iLjM5IiBzdG9wLWNvbG9yPSIjMDA3NWYwIi8+PHN0b3Agb2Zmc2V0PSIuNzEiIHN0b3AtY29sb3I9IiMwMDY0ZjciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDViZmMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC1iZDcwNDkyZS01ZTJlLTRjYjgtOGFkYy05YjMyZTUyZTI2ZjIiIHgxPSIyLjQ4IiB5MT0iMzIuODUiIHgyPSIxNy42NyIgeTI9IjIuMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iIzAwNWJjZSIvPjxzdG9wIG9mZnNldD0iLjY0IiBzdG9wLWNvbG9yPSIjMDA3ZmZmIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTE1LjUzLjQ0TDAsMzEuNTZoMi43NWM1LjIxLDAsMTEuNDItMy44NywxNC4xLTkuMTFsNC44NS05LjdMMTUuNTMuNDRaIiBmaWxsPSJ1cmwoI3V1aWQtY2VlYTZlMDgtY2JkOS00MThmLWJmMmItYjQzNjJhNGJhNWY1KSIvPjxwYXRoIGQ9Ik0xOC4wMiwxOC4yMWMtMS4xNi0uMzQtMi4yOC0uNDctMy4zMy0uNDctMy42OCwwLTYuNDIsMS42Mi02LjQ2LDEuNjQsMi4yLjUzLDQuNjEsMS45Miw2LjkzLDQuODQsNy4zMSw5LjIsMTUuNjEsNy4xNCwxNS42MSw3LjE0LDAsMC0zLjEtMTAuNS0xMi43NS0xMy4xNVoiIGZpbGw9InVybCgjdXVpZC04YTdkYTYyMi01NTYwLTRiNzUtOGFkMS1jNTYwYjdkODhkMDIpIi8+PHBhdGggZD0iTTE4LjAyLDE4LjIxYy01LjI1LTEuNTMtOS43OCwxLjE3LTkuNzksMS4xOC4wMywwLC4wNi4wMi4wOS4wMiwxNC4xMi0yLjA5LDExLjE4LDkuMjQsMjIuNDUsMTEuOTYsMCwwLTMuMS0xMC41LTEyLjc1LTEzLjE1WiIgZmlsbD0idXJsKCN1dWlkLTA2ZTkyOTc5LTg0YmQtNDQwZi05YTdiLTlhMTFkMWQzOTY1NykiLz48cGF0aCBkPSJNMTguNjMsNi42M0wxNS41My40NCwwLDMxLjU2aDMuMDNTMTEuMTgsMTUuMjIsMTEuMTgsMTUuMjJjMi41My00Ljg4LDUuMDgtNy4xMiw3LjQ0LTguNTlaIiBmaWxsPSJ1cmwoI3V1aWQtYmQ3MDQ5MmUtNWUyZS00Y2I4LThhZGMtOWIzMmU1MmUyNmYyKSIvPjxwb2x5Z29uIHBvaW50cz0iNzAuNzUgMTAuMzkgNjQuNzkgMjIuMDggNTguOTUgMTAuMzkgNTQuNjQgMTAuMzkgNjIuNzkgMjUuOTggNjYuNzYgMjUuOTggNzQuOSAxMC4zOSA3MC43NSAxMC4zOSIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMjUuMzksMTkuNjRjMCwuNzktLjE2LDEuNDMtLjQ3LDEuOS0uMy40NS0uODUuNzktMS42MywxLjAxLS44OC4yNS0yLjEyLjM4LTMuNy4zOC0xLjA3LDAtMS45NS0uMDYtMi42MS0uMTktLjU4LS4xMS0xLjAzLS4yOS0xLjMzLS41NS0uMjgtLjI0LS40OC0uNTktLjYtMS4wNy0uMTQtLjU1LS4yMS0xLjI4LS4yMS0yLjE2di04LjU4aC0zLjcydjguNThjMCwxLjc4LjI0LDMuMTYuNzQsNC4yMi41MywxLjEyLDEuNDIsMS45MiwyLjY1LDIuMzksMS4xNC40MywyLjcxLjY2LDQuNjQuNjYsMS40NiwwLDIuNjYtLjA4LDMuNTgtLjI1Ljk3LS4xOCwxLjc0LS40NCwyLjM0LS44MS4xLS4wNi4yLS4xMy4zLS4ydi45OWgzLjcxdi0xNS41OGgtMy43MXY5LjI1WiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMzkuMDksMTAuMjljLS44MS4wOC0xLjQ0LjIxLTEuOTQuMzloMGMtLjM2LjE0LS42Ny4zMS0uOTUuNTJ2LS44MWgtMy43MXYxNS41OGgzLjcxdi05LjM4YzAtLjcxLjA0LTEuMy4xMS0xLjc1LjA1LS4zMS4xOS0uNTQuNDQtLjcxLjItLjE0LjY1LS4zNCwxLjYyLS40Ny44Ni0uMTEsMi4xMS0uMTcsMy43MS0uMTdoLjY3di0zLjMyaC0uNjdjLTEuMjMsMC0yLjIzLjA0LTMsLjExWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik05MC44MSwxMS44aDBjLS42Mi0uNjUtMS41Mi0xLjExLTIuNjctMS4zNS0xLjA2LS4yMi0yLjQ2LS4zNC00LjE2LS4zNGgtNy4xOXYzLjMxaDcuMTljMS4xMywwLDIuMDMuMDQsMi42OS4xMy41Ni4wNy45OC4yMiwxLjI0LjQ0LjI0LjIxLjQyLjU1LjUyLDEuMDMuMDkuNDMuMTUuOTguMTgsMS42NS0uNTktLjA5LTEuMjItLjE2LTEuOS0uMjEtLjc3LS4wNS0xLjY5LS4wOC0yLjczLS4wOS0uMzEsMC0uNjMsMC0uOTYsMC0xLjgyLDAtMy4zMS4wOS00LjQ1LjI4LTEuMjYuMjEtMi4yMS42OC0yLjgxLDEuNDEtLjYyLjc0LS45MiwxLjgxLS45MiwzLjI4cy4zMywyLjUzLjk4LDMuMjVjLjY0LjcyLDEuNjEsMS4xOCwyLjg3LDEuMzgsMS4xNC4xOCwyLjYuMjcsNC4zMy4yNy4zNCwwLC42NiwwLC45NywwLC44OC0uMDIsMS42NC0uMDYsMi4yNS0uMTIuODgtLjA5LDEuNTgtLjI0LDIuMTMtLjQ0LjA5LS4wMy4xOC0uMDcuMjctLjExdi40MWgzLjcxdi03LjUyYzAtMS42MS0uMS0yLjk1LS4yOS0zLjk4LS4yMS0xLjEyLS42My0yLjAyLTEuMjUtMi42N1pNODguNjQsMjEuMjNjMCwuNjMtLjA4Ljk3LS4xNSwxLjE0LS4wNC4wOS0uMTIuMjMtLjQzLjM0LS4yNC4wOS0uNzMuMi0xLjY5LjIzLS42Mi4wMi0xLjQzLjA0LTIuNC4wNS0uMywwLS42MiwwLS45NSwwLTEuMDksMC0xLjk4LS4wMi0yLjY1LS4wNi0uNzUtLjA1LTEuMTQtLjE1LTEuMzQtLjIzLS4yNC0uMS0uMzEtLjIyLS4zNS0uMzItLjA2LS4xNi0uMTQtLjQ3LS4xNC0xLjA0cy4wOC0uOTIuMTQtMS4wOWMuMDQtLjEuMTEtLjIzLjM1LS4zNC4xOS0uMDguNTgtLjE5LDEuMzMtLjI0LjQ4LS4wMywxLjA5LS4wNSwxLjgxLS4wNS4yNiwwLC41NCwwLC44MywwbDUuNjMuMDd2MS41M1oiIGZpbGw9IiMxMTEiLz48cGF0aCBkPSJNNTIuNTQsMTEuOGMtLjYyLS42NS0xLjUyLTEuMTEtMi42Ny0xLjM1LTEuMDYtLjIyLTIuNDYtLjM0LTQuMTYtLjM0aC03LjE5djMuMzFoNy4xOWMxLjEzLDAsMi4wMy4wNCwyLjY5LjEzLjU2LjA3Ljk4LjIyLDEuMjQuNDQuMjQuMjEuNDIuNTUuNTIsMS4wMy4wOS40My4xNS45OC4xOCwxLjY1LS41OS0uMDktMS4yMi0uMTYtMS45LS4yMS0uNzctLjA1LTEuNjktLjA4LTIuNzMtLjA5LS4zMSwwLS42MywwLS45NiwwLTEuODIsMC0zLjMxLjA5LTQuNDUuMjgtMS4yNi4yMS0yLjIxLjY4LTIuODEsMS40MS0uNjIuNzQtLjkyLDEuODEtLjkyLDMuMjhzLjMzLDIuNTMuOTgsMy4yNWMuNjQuNzIsMS42MSwxLjE4LDIuODcsMS4zOCwxLjE0LjE4LDIuNi4yNyw0LjMzLjI3LjM0LDAsLjY2LDAsLjk3LDAsLjg4LS4wMiwxLjY0LS4wNiwyLjI1LS4xMi44OC0uMDksMS41OC0uMjQsMi4xMy0uNDQuMDktLjAzLjE4LS4wNy4yNy0uMTF2LjQxaDMuNzF2LTcuNTJjMC0xLjYxLS4xLTIuOTUtLjI5LTMuOTgtLjIxLTEuMTItLjYzLTIuMDItMS4yNS0yLjY3Wk01MC4zNywyMS4yM2MwLC42My0uMDguOTctLjE1LDEuMTQtLjA0LjA5LS4xMi4yMy0uNDMuMzQtLjI0LjA5LS43My4yLTEuNjkuMjMtLjYyLjAyLTEuNDMuMDQtMi40LjA1LS4zLDAtLjYyLDAtLjk1LDAtMS4wOSwwLTEuOTgtLjAyLTIuNjUtLjA2LS43NS0uMDUtMS4xNC0uMTUtMS4zNC0uMjMtLjI0LS4xLS4zMS0uMjItLjM1LS4zMi0uMDYtLjE2LS4xNC0uNDctLjE0LTEuMDRzLjA4LS45Mi4xNC0xLjA5Yy4wNC0uMS4xMS0uMjMuMzUtLjM0LjE5LS4wOC41OC0uMTksMS4zMy0uMjQuNDgtLjAzLDEuMDktLjA1LDEuODEtLjA1LjI2LDAsLjU0LDAsLjgzLDBsNS42My4wN3YxLjUzWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xNTguMTIsMjAuMDRjMCwuMTIuMTMsMi43Mi0zLjA0LDIuNzJzLTYuMjUuNTQtNy0xLjYybDEwLjMzLTMuOTQsMi45OC0xLjE0LjYtLjIzYy0uMDItLjQ0LS4wNy0uODYtLjE4LTEuMjgtLjE3LS42Ny0uNDYtMS4zMS0uODUtMS44OC0uODMtMS4yMi0yLjEtMi4xNS0zLjY1LTIuNTMtLjk1LS4yMi0xLjA3LS4xNy02Ljk4LS4xNy0zLjM1LDAtNi4wOCwyLjczLTYuMDgsNi4wOHYzLjk3YzAsMy4zNSwyLjczLDYuMDgsNi4wOCw2LjA4LDUuOTEsMCw2LjAzLjA2LDYuOTgtLjE3LDIuNzktLjY3LDQuNjgtMy4xNCw0LjY4LTUuOTFoLTMuODhaTTE0Ny45MSwxNi4wNmMwLTMuNDMsMy42NS0yLjcyLDcuMTYtMi43MiwxLjEsMCwxLjc5LjMxLDIuMjQuNzNsLTkuNDQsMy42Yy4wMS0uNTIuMDMtMS4wNi4wMy0xLjYxWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMDEuNDcsMjIuNTJjLS40MS0uNC0uMy0uNTktLjMtOC42di0uMjRoNi40OHYtMy4yOWgtNi41di00LjY0aC0zLjcxdjQuNjNoLTIuNzR2My4zMWgyLjc1di4yM3MuMDEsNy41Mi4wMSw3LjUyYzAsMy4wNiwyLjE2LDQuNjQsNC40LDQuODJoNS45OHYtMy40NmMtNS45LDAtNS45OS4xLTYuMzktLjI4WiIgZmlsbD0iIzExMSIvPjwvc3ZnPg=="

const SUPABASE_URL = "https://dtjyejkbwqvktkdserci.supabase.co"
const SUPABASE_KEY = "sb_publishable_k_nSyamataNU50XZCdc8Xw_RZ0aAI1f"

async function sbFetch(path, options = {}) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const db = {
  saveProposal: (data) => sbFetch('commercial_proposals', { method: 'POST', body: JSON.stringify(data) }),
  getProposals: () => sbFetch('commercial_proposals?order=created_at.desc&limit=50'),
  deleteProposal: (id) => sbFetch('commercial_proposals?id=eq.' + id, { method: 'DELETE', prefer: 'return=minimal' }),
};

// ─── AVATURE MODULE CONTEXT FOR AI ───────────────────────────────────────────
const AVATURE_MODULES = `
Avature is a highly configurable, single-platform talent acquisition suite. Key modules:
- ATS: End-to-end applicant tracking, configurable workflows, compliance, hiring manager portal, offer management, analytics
- CRM: Passive/active candidate database, talent pooling, email/SMS campaigns, AI-powered matching, sourcing automation, rediscovery
- Onboarding: Digital onboarding workflows, document management, pre-boarding portals, task automation
- Early Careers / Campus: Event-based recruiting, university relationships, bulk application processing
- Events Management: Recruiting event registration, check-in, follow-up automation, ROI tracking
- Career Site: Fully branded candidate experience, CMS, AI job matching, application flow config, analytics
- Internal Mobility: Internal job board, AI-powered matching for current employees, skills-based mobility
- Hiring Manager Portal: Requisition creation, pipeline visibility, interview scheduling, feedback
- AI/Copilot: Native explainable AI across all modules — ranking, matching, content generation, sourcing assistance
Delivery models: Turnkey (12 weeks), Tailored (12–20 weeks), Bespoke (20+ weeks)
Key certifications: ISO 27001, SOC 2 Type II, Cyber Essentials Plus
`;

// ─── CLAUDE API ───────────────────────────────────────────────────────────────
async function callClaude(systemPrompt, userMessage) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

// ─── CURRENCIES & FX ─────────────────────────────────────────────────────────
// Rate card is USD. FX rates are indicative — fetched live where possible,
// fallback to hardcoded approximates. 1 USD = X local currency.
const CURRENCIES = [
  { code: "USD", symbol: "$",     label: "US Dollar",        fxFromUSD: 1        },
  { code: "GBP", symbol: "£",     label: "British Pound",     fxFromUSD: 0.79     },
  { code: "EUR", symbol: "€",     label: "Euro",              fxFromUSD: 0.92     },
  { code: "SAR", symbol: "SAR ",  label: "Saudi Riyal",       fxFromUSD: 3.75     },
  { code: "AED", symbol: "AED ",  label: "UAE Dirham",        fxFromUSD: 3.67     },
  { code: "QAR", symbol: "QAR ",  label: "Qatari Riyal",      fxFromUSD: 3.64     },
  { code: "KWD", symbol: "KWD ",  label: "Kuwaiti Dinar",     fxFromUSD: 0.31     },
  { code: "CHF", symbol: "Fr ",   label: "Swiss Franc",       fxFromUSD: 0.90     },
  { code: "SGD", symbol: "S$ ",  label: "Singapore Dollar",  fxFromUSD: 1.34     },
  { code: "AUD", symbol: "A$ ",  label: "Australian Dollar", fxFromUSD: 1.53     },
  { code: "CAD", symbol: "C$ ",  label: "Canadian Dollar",   fxFromUSD: 1.36     },
  { code: "INR", symbol: "₹",     label: "Indian Rupee",      fxFromUSD: 83.5     },
  { code: "JPY", symbol: "¥",     label: "Japanese Yen",      fxFromUSD: 154      },
];

// Convert a USD amount to the selected currency
function convertFromUSD(usdAmount, currency) {
  if (!usdAmount) return null;
  return Math.round(Number(usdAmount) * currency.fxFromUSD);
}

// Format a converted amount with correct locale separators
function fmtCurrency(n, currency) {
  if (!n && n !== 0) return "TBC";
  const sym = typeof currency === "string" ? currency : currency.symbol;
  const code = typeof currency === "object" ? currency.code : null;
  // JPY and KWD need special decimal handling
  const decimals = code === "JPY" ? 0 : code === "KWD" ? 3 : 0;
  return sym + Number(n).toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Fetch live FX rates from open API (no key needed), update currency objects
async function fetchLiveFX(currencies, setCurrencies) {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) return;
    const data = await res.json();
    if (!data.rates) return;
    const updated = currencies.map(c => ({
      ...c,
      fxFromUSD: data.rates[c.code] || c.fxFromUSD,
      live: !!data.rates[c.code],
    }));
    setCurrencies(updated);
  } catch(e) {
    // Silent fail — fallback rates remain
  }
}

function fmtDate() {
  return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// ─── HTML EXPORT ─────────────────────────────────────────────────────────────
function buildProposalHTML({ client, preparedBy, currency, saasAnnual, implFee, fte, modules, narrative, addons, bespokeNote, aiCreditsDesc, aiCreditsAmount, dateStr }) {
  const sym = currency.symbol;
  const saas = Number(saasAnnual) || 0;
  const impl = Number(implFee) || 0;
  const totalY1 = saas + impl;
  const tier = getPricingTier(fte);

  const moduleChips = (modules || []).map(m => `<span class="chip">${m}</span>`).join("");
  // Bundle all add-ons into a single row with a summary list below
  const totalAddonImpl = (addons || []).reduce((s, a) => s + (a.impl ? convertFromUSD(a.impl, currency) : 0), 0);
  const totalAddonAnnual = (addons || []).reduce((s, a) => s + (a.annual ? convertFromUSD(a.annual, currency) : 0), 0);
  const addonNames = (addons || []).map(a => a.name);
  const addonBundleRow = addons && addons.length > 0 ? `
    <tr>
      <td>
        <strong>Integrations &amp; Add-ons</strong>
        <div style="margin-top:4px;font-size:10.5px;color:#6B7280;line-height:1.6;">${addonNames.join(" · ")}</div>
      </td>
      <td>${totalAddonImpl ? sym + Number(totalAddonImpl).toLocaleString() : "—"}</td>
      <td>${totalAddonAnnual ? sym + Number(totalAddonAnnual).toLocaleString() + "/yr" : "—"}</td>
      <td class="note">Bundled</td>
    </tr>` : "";
  // AI credits row
  const aiAmt = aiCreditsAmount ? convertFromUSD(Number(aiCreditsAmount), currency) : null;
  const aiRow = aiCreditsDesc ? `
    <tr>
      <td><strong>AI Credits</strong><div style="margin-top:3px;font-size:10.5px;color:#6B7280;">${aiCreditsDesc}</div></td>
      <td>${aiAmt ? sym + Number(aiAmt).toLocaleString() : "Variable"}</td>
      <td>Non-expiring</td>
      <td class="note">As per contract</td>
    </tr>` : "";
  const nar = narrative || {};

  const footerHTML = `<div class="pg-footer"><img src="${LOGO_URI}" alt="Avature"/><div class="footer-text">Confidential · Commercial Proposal${client ? " · " + client : ""}</div></div>`;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Avature — Commercial Proposal${client ? " · " + client : ""}</title>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4 portrait;margin:0}*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Work Sans',sans-serif;background:#E5E7EB;color:#1A1A2E;font-size:13px;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:210mm;height:297mm;background:white;margin:0 auto 12px;display:flex;flex-direction:column;page-break-after:always;break-after:page;overflow:hidden}
.pg:last-child{page-break-after:auto;break-after:auto}
.pg-body{flex:1;padding:30px 46px 16px;overflow:hidden}
.pg-footer{background:#0A1628;padding:12px 46px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.pg-footer img{height:17px;filter:brightness(0) invert(1)}
.footer-text{font-size:10.5px;color:#475569}
.cover{flex:1;background:linear-gradient(135deg,#0A1628 0%,#0D2A3A 60%,#0A2030 100%);padding:46px 54px 38px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.cover::before{content:'';position:absolute;top:-60px;right:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,#1A6B7C18 0%,transparent 70%)}
.cover-line{height:3px;background:linear-gradient(90deg,#1A6B7C,#C9A84C,#1A6B7C);margin-bottom:18px}
.logo-wrap img{height:24px;filter:brightness(0) invert(1)}
.cover-main{flex:1;padding:36px 0 18px}
.cover-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#3A8FA6;margin-bottom:14px;font-weight:600}
.cover-title{font-size:34pt;font-weight:700;color:#FFF;line-height:1.15;margin-bottom:10px}
.cover-subtitle{color:#94A3B8;font-size:13px;font-weight:300;margin-bottom:6px}
.cover-client{color:#C9A84C;font-size:15px;font-weight:500}
.cover-meta{display:flex;gap:28px;border-top:1px solid #1E3A5F;padding-top:18px;flex-wrap:wrap}
.cmi label{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#64748B;margin-bottom:3px}
.cmi span{font-size:12.5px;font-weight:600;color:#E2E8F0}
.sh{display:flex;align-items:center;gap:10px;margin:14px 0 8px}
.sh::before{content:'';width:4px;height:18px;background:linear-gradient(180deg,#1A6B7C,#2E6DB4);border-radius:2px;flex-shrink:0}
.sh h2{font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:#374151;font-weight:700}
.sh::after{content:'';flex:1;height:1px;background:#E5E7EB}
.kgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}
.kpi{border-radius:7px;padding:12px 14px;border:1px solid #E5E7EB;background:#FAFAFA}
.kpi.accent{background:#0A1628;border-color:#0A1628;position:relative;overflow:hidden}
.kpi.accent::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#1A6B7C,#C9A84C)}
.kl{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#9CA3AF;margin-bottom:3px;font-weight:600}
.kpi.accent .kl{color:#64748B}
.kv{font-size:19px;font-weight:700;color:#1A1A2E;line-height:1}
.kpi.accent .kv{color:#C9A84C;font-size:21px}
.ks{font-size:9.5px;color:#9CA3AF;margin-top:2px}
.prose{font-size:12px;color:#374151;line-height:1.7;margin-bottom:12px}
.chip{display:inline-block;background:#EFF9FB;border:1px solid #A5D8E2;color:#1A6B7C;font-size:10.5px;font-weight:600;padding:2px 9px;border-radius:20px;margin:2px 3px}
table{width:100%;border-collapse:collapse;font-size:12px;margin:6px 0;table-layout:fixed;min-width:0}
thead tr{background:#0A1628}
thead th{padding:9px 12px;font-size:9.5px;text-transform:uppercase;letter-spacing:.1em;color:#94A3B8;font-weight:600;text-align:left;white-space:nowrap}
thead th:first-child{width:auto}thead th:nth-child(2),thead th:nth-child(3){width:34mm;text-align:center;white-space:nowrap}thead th:nth-child(4){width:32mm}
tbody tr{border-bottom:1px solid #F3F4F6}
tbody tr:nth-child(even) td{background:#FAFAFA}
td{padding:9px 12px;color:#374151;vertical-align:middle}
td:nth-child(2),td:nth-child(3){text-align:center;vertical-align:middle;white-space:nowrap;font-weight:600;color:#111827}
td.note{color:#9CA3AF;font-size:11px;font-weight:400}
td.gold{font-weight:700;color:#C9A84C;font-size:13px;text-align:center;vertical-align:middle;white-space:nowrap}
.total-row td{background:#0A1628;color:#E2E8F0;font-weight:700;vertical-align:middle;text-align:left}
.total-row td.gold{color:#C9A84C}
.risk-row{display:flex;gap:8px;align-items:flex-start;padding:7px 0;border-bottom:1px solid #F3F4F6}
.risk-row:last-child{border-bottom:none}
.risk-badge{font-size:8.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:20px;flex-shrink:0;margin-top:2px}
.risk-low{background:#D1FAE5;color:#065F46}.risk-med{background:#FEF3C7;color:#92400E}.risk-high{background:#FEE2E2;color:#991B1B}
.pricing-note{background:#FFFBEB;border:1px solid #FDE68A;border-radius:7px;padding:9px 13px;font-size:10.5px;color:#92400E;margin-top:12px;line-height:1.6}
@media print{body{background:white}.pg{margin:0;box-shadow:none}}
</style></head><body>

<div class="pg">
  <div class="cover">
    <div class="logo-wrap"><img src="${LOGO_URI}" alt="Avature"/></div>
    <div class="cover-main">
      <div class="cover-eyebrow">Commercial Proposal · Confidential</div>
      <div class="cover-title">Avature<br>Commercial Proposal</div>
      <div class="cover-subtitle">Prepared for</div>
      <div class="cover-client">${client || "Client Organisation"}</div>
    </div>
    <div>
      <div class="cover-line"></div>
      <div class="cover-meta">
        <div class="cmi"><label>Prepared</label><span>${dateStr}</span></div>
        <div class="cmi"><label>Prepared by</label><span>${preparedBy || "Avature"}</span></div>
        ${fte ? `<div class="cmi"><label>Organisation Size</label><span>${Number(fte).toLocaleString()} FTE${tier ? " · " + tier.label + " band" : ""}</span></div>` : ""}
        <div class="cmi"><label>Currency</label><span>${currency.code}</span></div>
        <div class="cmi"><label>Status</label><span>Draft for Discussion</span></div>
      </div>
    </div>
  </div>
  ${footerHTML}
</div>

<div class="pg">
  <div class="pg-body">
    <div class="kgrid">
      <div class="kpi accent"><div class="kl">Year 1 Investment</div><div class="kv">${fmtCurrency(totalY1 || null, sym)}</div><div class="ks" style="color:#475569">Licence + implementation</div></div>
      <div class="kpi"><div class="kl">Annual Licence</div><div class="kv">${fmtCurrency(saas || null, sym)}</div><div class="ks">from Year 2 onwards</div></div>
      <div class="kpi"><div class="kl">Implementation</div><div class="kv">${fmtCurrency(impl || null, sym)}</div><div class="ks">one-time</div></div>
      <div class="kpi"><div class="kl">Max Users</div><div class="kv">${tier ? tier.maxUsers : "TBC"}</div><div class="ks">included in licence</div></div>
    </div>
    <div class="sh"><h2>Executive Summary</h2></div>
    <div class="prose">${nar.execSummary || ""}</div>
    <div class="sh"><h2>Recommended Scope</h2></div>
    <div style="margin-bottom:10px">${moduleChips}</div>
    <div class="prose">${nar.scopeRationale || ""}</div>
    <div class="sh"><h2>Commercial Summary</h2></div>
    <table>
      <thead><tr><th>Item</th><th>Year 1</th><th>Year 2+</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>Annual Licence Fee</td><td>${fmtCurrency(saas || null, sym)}</td><td>${fmtCurrency(saas || null, sym)}</td><td>SaaS, billed annually</td></tr>
        <tr><td>Implementation Fee</td><td>${fmtCurrency(impl || null, sym)}</td><td>—</td><td>One-time, milestone billing</td></tr>
        ${addonBundleRow}
        ${aiRow}
        <tr class="total-row"><td>Total</td><td class="gold">${fmtCurrency((totalY1 + totalAddonImpl + (aiAmt||0)) || null, sym)}</td><td class="gold">${fmtCurrency((saas + totalAddonAnnual) || null, sym)}</td><td style="color:#64748B">Excl. applicable taxes</td></tr>
      </tbody>
    </table>
    <p style="font-size:10px;color:#9CA3AF;margin-top:8px;line-height:1.5;">All fees indicative · ${currency.code}${currency.code !== "USD" ? " (1 USD = " + (currency.fxFromUSD < 1 ? currency.fxFromUSD.toFixed(3) : currency.fxFromUSD > 10 ? currency.fxFromUSD.toFixed(1) : currency.fxFromUSD.toFixed(2)) + " " + currency.code + ", indicative rate)" : ""} · Subject to final scoping and contract negotiation · Excl. applicable taxes</p>
  </div>
  ${footerHTML}
</div>

<div class="pg">
  <div class="pg-body">
    <div class="sh"><h2>How Avature Addresses Your Requirements</h2></div>
    <div class="prose">${nar.requirementsFit || ""}</div>
    ${nar.moduleDetail ? `<div class="sh"><h2>Module Scope Detail</h2></div><div class="prose">${nar.moduleDetail}</div>` : ""}
    <div class="sh" style="margin-top:14px"><h2>Proposed Next Steps</h2></div>
    <div class="prose">${nar.nextSteps || ""}</div>
    ${bespokeNote ? `
    <div class="sh" style="margin-top:14px"><h2>Additional Notes</h2></div>
    <div style="background:#F8FAFC;border:1px solid #E5E7EB;border-left:3px solid #1A6B7C;border-radius:0 7px 7px 0;padding:12px 16px;font-size:12px;color:#374151;line-height:1.7;white-space:pre-wrap;">${bespokeNote.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
    ` : ""}
  </div>
  ${footerHTML}
</div>

</body></html>`;
}


// ─── ALL AVATURE MODULES (for scope picker) ───────────────────────────────────
const ALL_AVATURE_MODULES = [
  "ATS",
  "CRM",
  "Onboarding",
  "Career Site",
  "Events Management",
  "Hiring Manager Portal",
  "Internal Mobility",
  "AI/Copilot",
  "Early Careers",
  "Referrals",
  "Agency Portal",
  "Video Interviewing",
  "Assessments",
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ProposalBuilder() {
  const [view, setView] = useState("proposal"); // proposal | ratecard
  const [rcTiers, setRcTiers] = useState(DEFAULT_TIERS);
  const [rcAddons, setRcAddons] = useState(DEFAULT_ADDONS);
  const [rcModules, setRcModules] = useState(DEFAULT_MODULES);

  // Load rate card from Supabase on mount
  useEffect(() => {
    import('./RateCardEditor').then(({ DEFAULT_TIERS: dt, DEFAULT_ADDONS: da, DEFAULT_MODULES: dm }) => {
      fetch(
        "https://dtjyejkbwqvktkdserci.supabase.co/rest/v1/rate_card?rc_key=eq.main&limit=1",
        { headers: { apikey: "sb_publishable_k_nSyamataNU50XZCdc8Xw_RZ0aAI1f", Authorization: "Bearer sb_publishable_k_nSyamataNU50XZCdc8Xw_RZ0aAI1f" } }
      ).then(r => r.json()).then(rows => {
        if (rows && rows[0]?.data) {
          const d = rows[0].data;
          if (d.tiers)   setRcTiers(d.tiers);
          if (d.addons)  setRcAddons(d.addons);
          if (d.modules) setRcModules(d.modules);
        }
      }).catch(() => {});
    });
  }, []);

  const [form, setForm] = useState({
    client: "", preparedBy: "", currency: CURRENCIES[0],
    fte: "", saasAnnual: "", implFee: "",
    requirements: "", bespokeNote: "", aiCreditsDesc: "", aiCreditsAmount: "", marginPct: 0,
  });
  const [step, setStep] = useState("input");
  const [narrative, setNarrative] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [usingSuggested, setUsingSuggested] = useState(false);
  const [liveCurrencies, setLiveCurrencies] = useState(CURRENCIES);
  const [fxLive, setFxLive] = useState(false);

  // Fetch live FX rates on mount
  useEffect(() => {
    fetchLiveFX(CURRENCIES, (updated) => {
      setLiveCurrencies(updated);
      // Update selected currency object with live rate
      setForm(f => {
        const updatedCurr = updated.find(c => c.code === f.currency.code) || f.currency;
        return { ...f, currency: updatedCurr };
      });
      setFxLive(true);
    });
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Auto-compute pricing suggestion from live rate card
  const pricingSuggestion = useMemo(() => {
    if (!form.fte || modules.length === 0) return null;
    return getSuggestedPricingFromRC(form.fte, modules, rcTiers);
  }, [form.fte, modules, rcTiers]);

  // Re-apply rate card whenever modules change (if pricing was from rate card)
  useEffect(() => {
    if (!usingSuggested || !pricingSuggestion) return;
    const saas = convertFromUSD(pricingSuggestion.saas, form.currency);
    const impl = convertFromUSD(pricingSuggestion.impl, form.currency);
    setForm(f => ({ ...f, saasAnnual: String(saas), implFee: String(impl) }));
  }, [modules, pricingSuggestion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Derived: effective saas with margin applied — used in all UI displays
  const effectiveSaas = Math.round((Number(form.saasAnnual) || 0) * (1 + (Number(form.marginPct) || 0) / 100));
  const effectiveImpl = Number(form.implFee) || 0;
  const effectiveY1   = effectiveSaas + effectiveImpl;

  const applySuggestion = (currencyOverride) => {
    if (!pricingSuggestion) return;
    const curr = currencyOverride || form.currency;
    const saas = convertFromUSD(pricingSuggestion.saas, curr);
    const impl = convertFromUSD(pricingSuggestion.impl, curr);
    set("saasAnnual", String(saas));
    set("implFee", String(impl));
    setUsingSuggested(true);
  };

  const handleGenerate = useCallback(async () => {
    if (!form.requirements.trim()) { setError("Please enter client requirements."); return; }
    setError(null);
    setStep("generating");
    try {
      const systemPrompt = `You are an expert Avature pre-sales consultant. Analyse the client requirements and return a structured JSON proposal. No markdown, no explanation — valid JSON only.

Platform context:
${getRateCardContext(rcTiers, rcAddons, rcModules)}

Return exactly this JSON structure:
{
  "modules": ["recommended Avature module names only"],
  "execSummary": "2-3 sentence executive summary",
  "scopeRationale": "1-2 sentences explaining module selection",
  "requirementsFit": "3-5 sentences mapping client requirements to Avature capabilities",
  "moduleDetail": "brief prose expanding on scope per module",
  "risks": [{"level":"Low|Medium|High","title":"short title","detail":"one sentence"}],
  "nextSteps": "2-3 sentences on next steps"
}

Style: confident, specific, no generic filler. Prose only in text fields (no bullets, no markdown bold). risks: 2-4 items, honest.
Modules must be from: ATS, CRM, Onboarding, Career Site, Events Management, Hiring Manager Portal, Internal Mobility, AI/Copilot, Early Careers`;

      const raw = await callClaude(systemPrompt,
        `Client: ${form.client || "Not specified"}\nOrganisation size: ${form.fte ? form.fte + " FTE" : "Not specified"}\n\nRequirements:\n${form.requirements}`
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      const mods = parsed.modules || [];
      setModules(mods);
      setNarrative({
        execSummary: parsed.execSummary, scopeRationale: parsed.scopeRationale,
        requirementsFit: parsed.requirementsFit, moduleDetail: parsed.moduleDetail,
        risks: parsed.risks || [], nextSteps: parsed.nextSteps,
      });
      // Auto-apply rate card if FTE is set, converted to selected currency
      if (form.fte) {
        const suggestion = getSuggestedPricing(form.fte, mods);
        if (suggestion && suggestion.saas) {
          const curr = form.currency;
          const saas = convertFromUSD(suggestion.saas, curr);
          const impl = convertFromUSD(suggestion.impl, curr);
          setForm(f => ({ ...f, saasAnnual: String(saas), implFee: String(impl) }));
          setUsingSuggested(true);
        }
      }
      setStep("pricing");
    } catch (e) {
      setError("Generation failed: " + e.message);
      setStep("input");
    }
  }, [form]);

  const handleBuildDocument = () => {
    const html = buildProposalHTML({
      client: form.client, preparedBy: form.preparedBy,
      currency: form.currency, saasAnnual: String(effectiveSaas),
      implFee: form.implFee, fte: form.fte, modules,
      narrative, addons: selectedAddons, bespokeNote: form.bespokeNote,
      aiCreditsDesc: form.aiCreditsDesc, aiCreditsAmount: form.aiCreditsAmount,
      dateStr: fmtDate(),
    });
    setPreviewHtml(html);
    setStep("preview");
  };

  const handleDownload = () => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Avature_Proposal_${(form.client || "Client").replace(/\s+/g, "_")}.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return alert("Allow pop-ups to use print/PDF export.");
    w.document.write(previewHtml.replace("</body>", `<script>window.onload=function(){setTimeout(function(){window.print();},500);};<\/script></body>`));
    w.document.close();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await db.saveProposal({
        client_name: form.client || null, prepared_by: form.preparedBy || null,
        currency: form.currency.code, saas_annual: Number(form.saasAnnual) || null,
        impl_fee: Number(form.implFee) || null, fte: Number(form.fte) || null,
        modules, requirements: form.requirements, narrative,
      });
      setSavedOk(true); setTimeout(() => setSavedOk(false), 3000);
    } catch (e) { setError("Save failed — " + e.message); }
    finally { setSaving(false); }
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => prev.find(a => a.name === addon.name)
      ? prev.filter(a => a.name !== addon.name)
      : [...prev, addon]);
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const dark = "#060D18"; const navy = "#0D1117"; const border = "#1F2937";
  const teal = "#1A6B7C"; const gold = "#C9A84C"; const muted = "#64748B";
  const S = {
    app: { fontFamily: "'DM Sans','Segoe UI',sans-serif", background: dark, minHeight: "100vh", color: "#E2E8F0" },
    header: { background: "linear-gradient(180deg,#0D1B30,#060D18)", borderBottom: `1px solid ${border}`, padding: "13px 32px", display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 50 },
    body: { maxWidth: 820, margin: "0 auto", padding: "32px 24px" },
    card: { background: navy, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 26px", marginBottom: 18 },
    cardTitle: { fontSize: 13, fontWeight: 700, color: "#F8FAFC", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${border}` },
    label: { display: "block", fontSize: 10.5, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 },
    input: { width: "100%", background: "#1e293b", border: `1px solid #334155`, borderRadius: 7, color: "#F8FAFC", padding: "9px 13px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
    textarea: { width: "100%", background: "#1e293b", border: `1px solid #334155`, borderRadius: 7, color: "#F8FAFC", padding: "11px 13px", fontSize: 13, fontFamily: "inherit", outline: "none", resize: "vertical", minHeight: 200, boxSizing: "border-box", lineHeight: 1.6 },
    btnPrimary: { background: `linear-gradient(135deg,${teal},#2E6DB4)`, border: "none", borderRadius: 8, color: "#fff", padding: "11px 26px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
    btnSecondary: { background: "transparent", border: `1px solid #334155`, borderRadius: 7, color: "#94A3B8", padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
    row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
    row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
    hint: { fontSize: 11.5, color: "#475569", marginBottom: 8, lineHeight: 1.5 },
    err: { background: "#7F1D1D22", border: `1px solid #7F1D1D66`, borderRadius: 8, padding: "10px 14px", color: "#F87171", fontSize: 12.5, marginBottom: 14 },
    suggestion: { background: "#0F4A5622", border: `1px solid ${teal}55`, borderRadius: 8, padding: "12px 14px", marginTop: 10 },
    chip: { display: "inline-block", background: "#0F4A5622", border: `1px solid ${teal}66`, color: "#3A9FA6", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, margin: "2px 3px" },
  };


  const CSS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box}input:focus,textarea:focus,select:focus{border-color:#1A6B7C!important;outline:none}select{appearance:none;-webkit-appearance:none}`;

  if (view === "ratecard") return (
    <RateCardEditor onBack={() => setView("proposal")}
      onSaved={(tiers, addons, modules) => { setRcTiers(tiers); setRcAddons(addons); setRcModules(modules); }} />
  );

  // ── Generating ───────────────────────────────────────────────────────────
  if (step === "generating") return (
    <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{CSS + `@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 44, height: 44, border: "3px solid #1F2937", borderTop: `3px solid ${teal}`, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
        <img src={LOGO_URI} alt="Avature" style={{ height: 20, filter: "brightness(0) invert(1)", opacity: 0.5, marginBottom: 14 }} />
        <p style={{ color: muted, fontSize: 13 }}>Analysing requirements and building proposal…</p>
      </div>
    </div>
  );

  // ── Pricing & Add-ons step ───────────────────────────────────────────────
  if (step === "pricing") {
    const ADDONS_LIST = rcAddons;
    const sym = form.currency.symbol;
    const sugSaas = pricingSuggestion?.saas;
    const sugImpl = pricingSuggestion?.impl;
    const tier = pricingSuggestion?.tier;
    return (
      <div style={S.app}>
        <style>{CSS}</style>
        <div style={S.header}>
          <img src={LOGO_URI} alt="Avature" style={{ height: 19, filter: "brightness(0) invert(1)" }} />
          <div style={{ width: 1, height: 16, background: border }} />
          <button onClick={() => setStep("input")} style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 11 }}>← Back</button>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>Step 2 of 2 — Commercial & Add-ons</span>
        </div>
        <div style={S.body}>
          {/* Recommended modules */}
          <div style={S.card}>
            <div style={{ ...S.cardTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Scope — AI Recommended <span style={{ color: teal, fontSize: 11, fontWeight: 400 }}>click to remove · add below</span></span>
              <span style={{ fontSize: 10.5, color: muted, fontWeight: 400 }}>{modules.length} module{modules.length !== 1 ? "s" : ""} selected</span>
            </div>
            {/* Active modules — click to remove */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {modules.map(m => (
                <button key={m} onClick={() => setModules(prev => prev.filter(x => x !== m))}
                  title="Click to remove"
                  style={{ background: "#0F4A5622", border: `1px solid ${teal}66`, color: "#3A9FA6", fontSize: 12, fontWeight: 600,
                    padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}
                  onMouseOver={e => { e.currentTarget.style.background="#7F1D1D22"; e.currentTarget.style.borderColor="#F8717144"; e.currentTarget.style.color="#F87171"; }}
                  onMouseOut={e => { e.currentTarget.style.background="#0F4A5622"; e.currentTarget.style.borderColor=teal+"66"; e.currentTarget.style.color="#3A9FA6"; }}>
                  {m} <span style={{ fontSize: 10, opacity: 0.7 }}>✕</span>
                </button>
              ))}
              {modules.length === 0 && (
                <span style={{ fontSize: 12, color: "#475569", fontStyle: "italic" }}>No modules selected — add from the list below</span>
              )}
            </div>
            {/* Add modules not yet selected */}
            {ALL_AVATURE_MODULES.filter(m => !modules.includes(m)).length > 0 && (
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 10 }}>
                <div style={{ fontSize: 10, color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Add module</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {ALL_AVATURE_MODULES.filter(m => !modules.includes(m)).map(m => (
                    <button key={m} onClick={() => setModules(prev => [...prev, m])}
                      title="Click to add"
                      style={{ background: "transparent", border: `1px dashed ${border}`, color: "#475569", fontSize: 11, fontWeight: 500,
                        padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                      onMouseOver={e => { e.currentTarget.style.background="#0F4A5622"; e.currentTarget.style.borderColor=teal+"66"; e.currentTarget.style.color="#3A9FA6"; }}
                      onMouseOut={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor=border; e.currentTarget.style.color="#475569"; }}>
                      + {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p style={{ ...S.hint, marginTop: 10, marginBottom: 0 }}>{narrative?.scopeRationale}</p>
          </div>

          {/* Pricing */}
          <div style={S.card}>
            <div style={S.cardTitle}>Commercial Inputs</div>
            {/* FTE + rate card suggestion */}
            <div style={{ marginBottom: 16 }}>
              <label style={S.label}>Organisation Size (FTE)</label>
              <input style={{ ...S.input, maxWidth: 200 }} type="number" value={form.fte}
                onChange={e => { set("fte", e.target.value); setUsingSuggested(false); }}
                placeholder="e.g. 12000" />
              {form.fte && modules.length > 0 && (
                <div style={S.suggestion}>
                  <div style={{ fontSize: 11, color: teal, fontWeight: 700, marginBottom: 6 }}>
                    Rate Card Suggestion — {tier ? tier.label + " FTE band" : ""}
                  </div>
                  <div style={{ display: "flex", gap: 24, marginBottom: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div>
                      <span style={{ fontSize: 11, color: muted }}>Annual Licence</span><br/>
                      <span style={{ fontWeight: 700, color: "#F8FAFC" }}>{sym}{sugSaas ? convertFromUSD(sugSaas, form.currency).toLocaleString() : "TBC"}</span>
                      {form.currency.code !== "USD" && sugSaas && <span style={{ fontSize: 9.5, color: muted, marginLeft: 5 }}>({sugSaas.toLocaleString()} USD)</span>}
                    </div>
                    <div>
                      <span style={{ fontSize: 11, color: muted }}>Implementation</span><br/>
                      <span style={{ fontWeight: 700, color: "#F8FAFC" }}>{sym}{sugImpl ? convertFromUSD(sugImpl, form.currency).toLocaleString() : "TBC"}</span>
                      {form.currency.code !== "USD" && sugImpl && <span style={{ fontSize: 9.5, color: muted, marginLeft: 5 }}>({sugImpl.toLocaleString()} USD)</span>}
                    </div>
                    <div>
                      <span style={{ fontSize: 11, color: muted }}>Max Users</span><br/>
                      <span style={{ fontWeight: 700, color: "#F8FAFC" }}>{tier?.maxUsers || "TBC"}</span>
                    </div>
                    {form.currency.code !== "USD" && (
                      <span style={{ fontSize: 9.5, color: fxLive ? teal : muted, paddingBottom: 2 }}>
                        {fxLive ? "● " : ""}1 USD = {form.currency.fxFromUSD < 1 ? form.currency.fxFromUSD.toFixed(3) : form.currency.fxFromUSD > 10 ? form.currency.fxFromUSD.toFixed(1) : form.currency.fxFromUSD.toFixed(2)} {form.currency.code} {fxLive ? "(live)" : "(indicative)"}
                      </span>
                    )}
                  </div>
                  <button onClick={applySuggestion} style={{ ...S.btnSecondary, fontSize: 11, padding: "5px 12px", borderColor: teal, color: teal }}>
                    Apply rate card figures ↓
                  </button>
                  <span style={{ fontSize: 10.5, color: "#334155", marginLeft: 8 }}>USD rate card · adjust for local currency below</span>
                </div>
              )}
            </div>
            <div style={{ ...S.row3, marginBottom: 14 }}>
              <div>
                <label style={S.label}>
                  Currency
                  {fxLive && <span style={{ color: teal, fontWeight: 400, fontSize: 9.5, marginLeft: 5 }}>● live rates</span>}
                </label>
                <select style={{ ...S.input, cursor: "pointer" }} value={form.currency.code}
                  onChange={e => {
                    const newCurr = liveCurrencies.find(x => x.code === e.target.value);
                    if (usingSuggested && pricingSuggestion) {
                      const saas = convertFromUSD(pricingSuggestion.saas, newCurr);
                      const impl = convertFromUSD(pricingSuggestion.impl, newCurr);
                      setForm(f => ({ ...f, currency: newCurr, saasAnnual: String(saas), implFee: String(impl) }));
                    } else {
                      setForm(f => ({ ...f, currency: newCurr }));
                    }
                  }}>
                  {liveCurrencies.map(x => {
                    const rate = x.fxFromUSD;
                    const rateStr = rate === 1 ? "" : " (1 USD = " + (rate < 1 ? rate.toFixed(3) : rate > 10 ? rate.toFixed(0) : rate.toFixed(2)) + " " + x.code + ")";
                    return <option key={x.code} value={x.code}>{x.code} — {x.label}{rateStr}</option>;
                  })}
                </select>
                {form.currency.code !== "USD" && (
                  <div style={{ fontSize: 10, color: muted, marginTop: 4 }}>
                    Rate card is USD · 1 USD = {form.currency.fxFromUSD < 1 ? form.currency.fxFromUSD.toFixed(3) : form.currency.fxFromUSD > 10 ? form.currency.fxFromUSD.toFixed(1) : form.currency.fxFromUSD.toFixed(2)} {form.currency.code} {fxLive ? "(live)" : "(indicative)"}
                  </div>
                )}
              </div>
              <div>
                <label style={S.label}>Annual Licence Fee {usingSuggested && <span style={{ color: teal, fontSize: 10 }}>★ from rate card</span>}</label>
                <input style={S.input} type="number" value={form.saasAnnual}
                  onChange={e => { set("saasAnnual", e.target.value); setUsingSuggested(false); }} placeholder="e.g. 90000" />
              </div>
              <div>
                <label style={S.label}>Implementation Fee {usingSuggested && <span style={{ color: teal, fontSize: 10 }}>★ from rate card</span>}</label>
                <input style={S.input} type="number" value={form.implFee}
                  onChange={e => { set("implFee", e.target.value); setUsingSuggested(false); }} placeholder="e.g. 30000" />
              </div>
            </div>
            {/* Margin slider */}
            <div style={{ marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${border}` }}>
              <label style={S.label}>
                Margin Adjustment
                <span style={{ color: muted, fontWeight: 400, fontSize: 10, marginLeft: 6 }}>applied to annual licence fee only</span>
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6 }}>
                <input type="range" min={-30} max={50} step={1} value={form.marginPct}
                  onChange={e => set("marginPct", Number(e.target.value))}
                  style={{ flex: 1, accentColor: teal, cursor: "pointer", height: 4 }} />
                <div style={{ minWidth: 110, background: "#0A1628", border: `1px solid ${form.marginPct > 0 ? "#1A6B7C" : form.marginPct < 0 ? "#7F1D1D44" : border}`, borderRadius: 7, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: form.marginPct > 0 ? "#4ADE80" : form.marginPct < 0 ? "#F87171" : "#94A3B8" }}>
                    {form.marginPct > 0 ? "+" : ""}{form.marginPct}%
                  </span>
                  <button onClick={() => set("marginPct", 0)} style={{ background: "none", border: "none", color: muted, fontSize: 10, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>reset</button>
                </div>
                {form.marginPct !== 0 && form.saasAnnual && (
                  <div style={{ fontSize: 11, color: muted, minWidth: 140 }}>
                    {form.currency.symbol}{Math.round(Number(form.saasAnnual) * (1 + form.marginPct / 100)).toLocaleString()}
                    <span style={{ fontSize: 10, color: "#334155", marginLeft: 4 }}>adj. licence</span>
                  </div>
                )}
              </div>
              <div style={{ fontSize: 10.5, color: "#334155", marginTop: 5 }}>
                {form.marginPct === 0 ? "No adjustment — rate card price" :
                  form.marginPct > 0 ? `+${form.marginPct}% uplift on annual licence` :
                  `${form.marginPct}% discount on annual licence`}
              </div>
            </div>
            {/* AI Credits */}
            <div style={{ ...S.row2, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}` }}>
              <div>
                <label style={S.label}>AI Credits Description <span style={{ color: muted, fontWeight: 400 }}>optional</span></label>
                <input style={S.input} value={form.aiCreditsDesc}
                  onChange={e => set("aiCreditsDesc", e.target.value)}
                  placeholder="e.g. AI Copilot credits — sourcing, matching & content generation" />
              </div>
              <div>
                <label style={S.label}>AI Credits Amount (USD) <span style={{ color: muted, fontWeight: 400 }}>optional — leave blank for variable</span></label>
                <input style={S.input} type="number" value={form.aiCreditsAmount}
                  onChange={e => set("aiCreditsAmount", e.target.value)}
                  placeholder="e.g. 12000 or leave blank" />
              </div>
            </div>
            {/* Year 1 summary */}
            {(form.saasAnnual || form.implFee) && (
              <div style={{ background: "#0A1628", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 24 }}>
                <div>
                  <span style={{ fontSize: 10, color: muted }}>YEAR 1 TOTAL</span><br/>
                  <span style={{ fontSize: 18, fontWeight: 700, color: gold }}>{form.currency.symbol}{effectiveY1.toLocaleString()}</span>
                  {form.marginPct !== 0 && <span style={{ fontSize: 10, color: form.marginPct > 0 ? "#4ADE80" : "#F87171", marginLeft: 6 }}>{form.marginPct > 0 ? "+" : ""}{form.marginPct}% margin</span>}
                </div>
                <div>
                  <span style={{ fontSize: 10, color: muted }}>YEAR 2+ ANNUAL</span><br/>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#E2E8F0" }}>{form.currency.symbol}{effectiveSaas.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Add-ons */}
          <div style={S.card}>
            <div style={S.cardTitle}>Add-ons & Integrations <span style={{ fontSize: 11, fontWeight: 400, color: muted }}>(optional — select to include in proposal)</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {ADDONS_LIST.map(a => {
                const sel = selectedAddons.find(x => x.name === a.name);
                return (
                  <div key={a.name} onClick={() => toggleAddon(a)}
                    style={{ padding: "10px 12px", border: `1px solid ${sel ? teal : border}`, borderRadius: 7, cursor: "pointer", background: sel ? "#0F4A5622" : "transparent", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: sel ? "#3A9FA6" : "#94A3B8" }}>{a.name}</div>
                      <div style={{ fontSize: 10.5, color: muted }}>
                        {a.impl ? `$${a.impl.toLocaleString()} impl` : ""}
                        {a.impl && a.annual ? " · " : ""}
                        {a.annual ? `$${a.annual.toLocaleString()}/yr` : ""}
                      </div>
                    </div>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${sel ? teal : border}`, background: sel ? teal : "transparent", flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={handleBuildDocument} style={S.btnPrimary}>Build Proposal Document →</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Preview ──────────────────────────────────────────────────────────────
  if (step === "preview") return (
    <div style={S.app}>
      <style>{CSS}</style>
      <div style={{ ...S.header, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_URI} alt="Avature" style={{ height: 19, filter: "brightness(0) invert(1)" }} />
          <div style={{ width: 1, height: 16, background: border }} />
          <button onClick={() => setStep("pricing")} style={{ ...S.btnSecondary, padding: "5px 12px", fontSize: 11 }}>← Edit</button>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>{form.client || "Proposal"} · {modules.length} modules</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {savedOk && <span style={{ fontSize: 11.5, color: "#4ADE80", fontWeight: 600 }}>Saved ✓</span>}
          {error && <span style={{ fontSize: 11, color: "#F87171" }}>{error}</span>}
          <button onClick={handleSave} disabled={saving} style={{ ...S.btnSecondary, padding: "6px 14px", fontSize: 11.5 }}>{saving ? "Saving…" : "☁ Save"}</button>
          <button onClick={handleDownload} style={{ ...S.btnSecondary, padding: "6px 14px", fontSize: 11.5 }}>⬇ HTML</button>
          <button onClick={handlePrint} style={{ ...S.btnPrimary, padding: "7px 18px", fontSize: 12 }}>🖨 Print / PDF</button>
        </div>
      </div>
      <div style={{ background: "#374151", padding: "20px", overflowY: "auto", minHeight: "calc(100vh - 56px)" }}>
        <iframe srcDoc={previewHtml} style={{ width: "210mm", height: "900mm", border: "none", display: "block", margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }} title="Proposal Preview" />
      </div>
    </div>
  );

  // ── Input ────────────────────────────────────────────────────────────────
  return (
    <div style={S.app}>
      <style>{CSS}</style>
      <div style={{ ...S.header, justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <img src={LOGO_URI} alt="Avature" style={{ height: 19, filter: "brightness(0) invert(1)" }} />
          <div style={{ width: 1, height: 16, background: border }} />
          <span style={{ fontSize: 12.5, color: "#94A3B8", fontWeight: 500 }}>Proposal Builder</span>
        </div>
        <button onClick={() => setView("ratecard")}
          style={{ background:"transparent", border:`1px solid ${border}`, borderRadius:7, color:muted, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          📊 Rate Card
        </button>
      </div>
      <div style={S.body}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10.5, color: teal, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 7 }}>Avature Proposal Builder</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F8FAFC", margin: "0 0 9px" }}>Build a Commercial Proposal</h1>
          <p style={{ color: muted, fontSize: 13.5, lineHeight: 1.6, maxWidth: 540 }}>
            Paste client requirements below. AI will recommend Avature modules, suggest pricing from the rate card, and generate a branded proposal document.
          </p>
        </div>
        {error && <div style={S.err}>⚠ {error}</div>}
        <div style={S.card}>
          <div style={S.cardTitle}>Client Details</div>
          <div style={{ ...S.row2, marginBottom: 14 }}>
            <div><label style={S.label}>Client Name</label><input style={S.input} value={form.client} onChange={e => set("client", e.target.value)} placeholder="e.g. AtkinsRéalis" /></div>
            <div><label style={S.label}>Prepared By</label><input style={S.input} value={form.preparedBy} onChange={e => set("preparedBy", e.target.value)} placeholder="e.g. James Harrison" /></div>
          </div>
          <div style={{ marginTop: 4 }}>
            <label style={{ ...S.label, color: "#C9A84C" }}>
              Organisation Size (FTE)
              <span style={{ color: muted, fontWeight: 400, fontSize: 10, marginLeft: 6 }}>— used to auto-suggest pricing from the rate card</span>
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input style={{ ...S.input, maxWidth: 200, borderColor: form.fte ? "#334155" : "#C9A84C55" }} type="number" value={form.fte} onChange={e => set("fte", e.target.value)} placeholder="e.g. 12000" />
              {!form.fte && <span style={{ fontSize: 11, color: "#C9A84C" }}>⚠ Enter FTE for automatic rate card pricing</span>}
            </div>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>Client Requirements</div>
          <p style={S.hint}>Paste RFP text, meeting notes, or type a summary. AI will read this, recommend modules, and draft the proposal narrative. The more detail, the more specific the output.</p>
          <textarea style={S.textarea} value={form.requirements} onChange={e => set("requirements", e.target.value)}
            placeholder={"Paste client requirements here. For example:\n\n\"The client is a 12,000-person global engineering firm. They want to replace Taleo with a modern ATS, add a talent pipeline CRM for hard-to-fill roles, and build an improved career site. Key integrations needed: Workday HRIS, LinkedIn, DocuSign. UK data residency required. Target go-live in 9 months.\""} />
          <div style={{ marginTop: 6, fontSize: 10.5, color: "#334155" }}>{form.requirements.length > 0 ? `${form.requirements.length} characters` : "No requirements entered"}</div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}>
            Additional Notes
            <span style={{ fontSize: 11, fontWeight: 400, color: muted, marginLeft: 8 }}>optional — appears as a dedicated section in the proposal</span>
          </div>
          <p style={S.hint}>Use this for any bespoke context, caveats, commercial conditions, scope assumptions, or internal notes you want to include verbatim in the document.</p>
          <textarea style={{ ...S.textarea, minHeight: 100 }}
            value={form.bespokeNote}
            onChange={e => set("bespokeNote", e.target.value)}
            placeholder={"e.g. This proposal is valid for 30 days from the date of issue. Pricing assumes standard Avature Turnkey methodology. Any requirements identified during scoping that fall outside the standard module configuration will be quoted separately on a time-and-materials basis..."}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          {!form.fte && form.requirements.trim() && (
            <span style={{ fontSize: 11.5, color: "#C9A84C" }}>No FTE entered — pricing will show as TBC</span>
          )}
          <button onClick={handleGenerate} disabled={!form.requirements.trim()}
            style={{ ...S.btnPrimary, opacity: form.requirements.trim() ? 1 : 0.4, cursor: form.requirements.trim() ? "pointer" : "not-allowed" }}>
            ✨ Analyse & Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
