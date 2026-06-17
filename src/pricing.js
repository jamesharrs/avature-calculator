// ─── PRICING RATE CARD (from Pricing_Main.xlsx) ────────────────────────────
// All figures in USD. Source: Avature internal rate card.
export const PRICING_TIERS = [
  { label: "0–1,499",      minFTE: 0,      maxFTE: 1499,   maxUsers: 5,   crmAtsRecurring: 30820,  onboard: 17100,  events: 14400,  crmOnly: 20000,  fullPkg: 69070,   implTurnkey: 30000 },
  { label: "1,500–2,499",  minFTE: 1500,   maxFTE: 2499,   maxUsers: 10,  crmAtsRecurring: 40800,  onboard: 22800,  events: 19200,  crmOnly: 30000,  fullPkg: 96400,   implTurnkey: 30000 },
  { label: "2,500–4,999",  minFTE: 2500,   maxFTE: 4999,   maxUsers: 25,  crmAtsRecurring: 59800,  onboard: 34650,  events: 21600,  crmOnly: 40000,  fullPkg: 134050,  implTurnkey: 30000 },
  { label: "5,000–7,499",  minFTE: 5000,   maxFTE: 7499,   maxUsers: 50,  crmAtsRecurring: 177000, onboard: 100000, events: 85000,  crmOnly: 45000,  fullPkg: 418500,  implTurnkey: 60000 },
  { label: "7,500–9,999",  minFTE: 7500,   maxFTE: 9999,   maxUsers: 75,  crmAtsRecurring: 241000, onboard: 128000, events: 85000,  crmOnly: 60000,  fullPkg: 516500,  implTurnkey: 60000 },
  { label: "10,000–14,999",minFTE: 10000,  maxFTE: 14999,  maxUsers: 100, crmAtsRecurring: 337000, onboard: 157000, events: 147000, crmOnly: 90000,  fullPkg: 715000,  implTurnkey: 90000 },
  { label: "15,000–19,999",minFTE: 15000,  maxFTE: 19999,  maxUsers: 150, crmAtsRecurring: 432000, onboard: 200000, events: 147000, crmOnly: 120000, fullPkg: 858500,  implTurnkey: 90000 },
  { label: "20,000–29,999",minFTE: 20000,  maxFTE: 29999,  maxUsers: 200, crmAtsRecurring: 527000, onboard: 243000, events: 147000, crmOnly: 147000, fullPkg: 1026500, implTurnkey: 90000 },
  { label: "30,000–39,999",minFTE: 30000,  maxFTE: 39999,  maxUsers: 300, crmAtsRecurring: 653000, onboard: 286000, events: 147000, crmOnly: 204000, fullPkg: 1212500, implTurnkey: 90000 },
  { label: "40,000–49,999",minFTE: 40000,  maxFTE: 49999,  maxUsers: 375, crmAtsRecurring: 754000, onboard: 343000, events: 283000, crmOnly: 251000, fullPkg: 1550000, implTurnkey: 90000 },
  { label: "50,000–74,999",minFTE: 50000,  maxFTE: 74999,  maxUsers: 500, crmAtsRecurring: 924000, onboard: 428000, events: 283000, crmOnly: 337000, fullPkg: 1850500, implTurnkey: 90000 },
  { label: "75,000–99,999",minFTE: 75000,  maxFTE: 99999,  maxUsers: 700, crmAtsRecurring: 1182500,onboard: 528000, events: 283000, crmOnly: 408000, fullPkg: 2268500, implTurnkey: 90000 },
  { label: "100,000–149,999",minFTE:100000,maxFTE: 149999, maxUsers:1000, crmAtsRecurring: 1724000,onboard: 614000, events: 283000, crmOnly: 615000, fullPkg: 2934000, implTurnkey: 90000 },
];

export const ADDONS = [
  { name: "Sandbox Instance",           impl: 3000,  annual: 3500 },
  { name: "SSO (SAML 2.0)",             impl: 4000,  annual: 3500 },
  { name: "Background Check Connector", impl: 4000,  annual: 3500 },
  { name: "Video Interviewing",          impl: 4000,  annual: 3500 },
  { name: "Interview Self-Scheduling",   impl: 3000,  annual: 4000 },
  { name: "Custom Report",               impl: 2000,  annual: 1500 },
  { name: "Standard Job Board Feed",     impl: 4000,  annual: 3500 },
  { name: "HRIS Entity Feed (standard)", impl: 2000,  annual: 4000 },
  { name: "Recruiter Mobile App",        impl: 5500,  annual: 0    },
];

export function getPricingTier(fte) {
  if (!fte) return null;
  const n = Number(fte);
  return PRICING_TIERS.find(t => n >= t.minFTE && n <= t.maxFTE) || null;
}

export function getSuggestedPricing(fte, modules) {
  const tier = getPricingTier(fte);
  if (!tier) return { saas: null, impl: null, tier: null };
  const mods = (modules || []).map(m => m.toLowerCase());
  const hasCRM   = mods.some(m => m.includes("crm"));
  const hasATS   = mods.some(m => m.includes("ats"));
  const hasOnb   = mods.some(m => m.includes("onboard"));
  const hasEvt   = mods.some(m => m.includes("event"));
  let saas = 0;
  if (hasCRM && hasATS) saas += tier.crmAtsRecurring;
  else if (hasCRM)      saas += tier.crmOnly;
  else if (hasATS)      saas += tier.crmAtsRecurring; // ATS-only uses same band
  if (hasOnb) saas += tier.onboard;
  if (hasEvt) saas += tier.events;
  if (saas === 0) saas = tier.crmAtsRecurring;
  return { saas, impl: tier.implTurnkey, tier };
}
