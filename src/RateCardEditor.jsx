import { useState, useEffect, useCallback } from 'react';

const SUPABASE_URL = "https://dtjyejkbwqvktkdserci.supabase.co";
const SUPABASE_KEY = "sb_publishable_k_nSyamataNU50XZCdc8Xw_RZ0aAI1f";

async function sbFetch(path, options = {}) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ─── DEFAULT RATE CARD (mirrors pricing.js) ───────────────────────────────────
export const DEFAULT_TIERS = [
  // crmAtsRecurring & onboard & events from rate card. Others derived:
  // careerSite≈18%, internalMobility≈22%, earlyCareers≈15%, hiringMgrPortal≈10%, aiCopilot≈20%, referrals≈8%, agencyPortal≈12%
  { label:"0–1,499",        minFTE:0,      maxFTE:1499,   maxUsers:5,    crmAtsRecurring:30820,   crmOnly:20000,  onboard:17100,  events:14400,  careerSite:5500,   internalMobility:6800,  earlyCareers:4600,  hiringMgrPortal:3100,  aiCopilot:6200,   referrals:2500,  agencyPortal:3700,  implTurnkey:30000 },
  { label:"1,500–2,499",    minFTE:1500,   maxFTE:2499,   maxUsers:10,   crmAtsRecurring:40800,   crmOnly:30000,  onboard:22800,  events:19200,  careerSite:7300,   internalMobility:9000,  earlyCareers:6100,  hiringMgrPortal:4100,  aiCopilot:8200,   referrals:3300,  agencyPortal:4900,  implTurnkey:30000 },
  { label:"2,500–4,999",    minFTE:2500,   maxFTE:4999,   maxUsers:25,   crmAtsRecurring:59800,   crmOnly:40000,  onboard:34650,  events:21600,  careerSite:10800,  internalMobility:13200, earlyCareers:9000,  hiringMgrPortal:6000,  aiCopilot:12000,  referrals:4800,  agencyPortal:7200,  implTurnkey:30000 },
  { label:"5,000–7,499",    minFTE:5000,   maxFTE:7499,   maxUsers:50,   crmAtsRecurring:177000,  crmOnly:45000,  onboard:100000, events:85000,  careerSite:31900,  internalMobility:38900, earlyCareers:26600, hiringMgrPortal:17700, aiCopilot:35400,  referrals:14200, agencyPortal:21200, implTurnkey:60000 },
  { label:"7,500–9,999",    minFTE:7500,   maxFTE:9999,   maxUsers:75,   crmAtsRecurring:241000,  crmOnly:60000,  onboard:128000, events:85000,  careerSite:43400,  internalMobility:53000, earlyCareers:36200, hiringMgrPortal:24100, aiCopilot:48200,  referrals:19300, agencyPortal:28900, implTurnkey:60000 },
  { label:"10,000–14,999",  minFTE:10000,  maxFTE:14999,  maxUsers:100,  crmAtsRecurring:337000,  crmOnly:90000,  onboard:157000, events:147000, careerSite:60700,  internalMobility:74100, earlyCareers:50600, hiringMgrPortal:33700, aiCopilot:67400,  referrals:27000, agencyPortal:40400, implTurnkey:90000 },
  { label:"15,000–19,999",  minFTE:15000,  maxFTE:19999,  maxUsers:150,  crmAtsRecurring:432000,  crmOnly:120000, onboard:200000, events:147000, careerSite:77800,  internalMobility:95000, earlyCareers:64800, hiringMgrPortal:43200, aiCopilot:86400,  referrals:34600, agencyPortal:51800, implTurnkey:90000 },
  { label:"20,000–29,999",  minFTE:20000,  maxFTE:29999,  maxUsers:200,  crmAtsRecurring:527000,  crmOnly:147000, onboard:243000, events:147000, careerSite:94900,  internalMobility:115900,earlyCareers:79100, hiringMgrPortal:52700, aiCopilot:105400, referrals:42200, agencyPortal:63200, implTurnkey:90000 },
  { label:"30,000–39,999",  minFTE:30000,  maxFTE:39999,  maxUsers:300,  crmAtsRecurring:653000,  crmOnly:204000, onboard:286000, events:147000, careerSite:117500, internalMobility:143700,earlyCareers:97900, hiringMgrPortal:65300, aiCopilot:130600, referrals:52200, agencyPortal:78400, implTurnkey:90000 },
  { label:"40,000–49,999",  minFTE:40000,  maxFTE:49999,  maxUsers:375,  crmAtsRecurring:754000,  crmOnly:251000, onboard:343000, events:283000, careerSite:135700, internalMobility:165900,earlyCareers:113100,hiringMgrPortal:75400, aiCopilot:150800, referrals:60300, agencyPortal:90500, implTurnkey:90000 },
  { label:"50,000–74,999",  minFTE:50000,  maxFTE:74999,  maxUsers:500,  crmAtsRecurring:924000,  crmOnly:337000, onboard:428000, events:283000, careerSite:166300, internalMobility:203300,earlyCareers:138600,hiringMgrPortal:92400, aiCopilot:184800, referrals:73900, agencyPortal:110900,implTurnkey:90000 },
  { label:"75,000–99,999",  minFTE:75000,  maxFTE:99999,  maxUsers:700,  crmAtsRecurring:1182500, crmOnly:408000, onboard:528000, events:283000, careerSite:212900, internalMobility:260200,earlyCareers:177400,hiringMgrPortal:118300,aiCopilot:236500, referrals:94600, agencyPortal:141900,implTurnkey:90000 },
  { label:"100,000–149,999",minFTE:100000, maxFTE:149999, maxUsers:1000, crmAtsRecurring:1724000, crmOnly:615000, onboard:614000, events:283000, careerSite:310300, internalMobility:379300,earlyCareers:258600,hiringMgrPortal:172400,aiCopilot:344800, referrals:137900,agencyPortal:206900,implTurnkey:90000 },
];

export const DEFAULT_ADDONS = [
  { id:"sandbox",    name:"Sandbox Instance",            category:"Platform",      impl:3000,  annual:3500,  note:"Includes 2 instance refreshes/year" },
  { id:"sso",        name:"SSO (SAML 2.0)",              category:"Integration",   impl:4000,  annual:3500,  note:"Standard integration" },
  { id:"bgcheck",    name:"Background Check Connector",  category:"Integration",   impl:4000,  annual:3500,  note:"Standard integration" },
  { id:"video",      name:"Video Interviewing",          category:"Integration",   impl:4000,  annual:3500,  note:"Standard integration" },
  { id:"scheduling", name:"Interview Self-Scheduling",   category:"Feature",       impl:3000,  annual:4000,  note:"Non-enterprise" },
  { id:"report",     name:"Custom Report",               category:"Reporting",     impl:2000,  annual:1500,  note:"Unit price" },
  { id:"jobboard",   name:"Standard Job Board Feed",     category:"Integration",   impl:4000,  annual:3500,  note:"Standard integration" },
  { id:"hris",       name:"HRIS Entity Feed (standard)", category:"Integration",   impl:2000,  annual:4000,  note:"New customers only" },
  { id:"mobile",     name:"Recruiter Mobile App",        category:"Feature",       impl:5500,  annual:0,     note:"New ATS customers: included" },
  { id:"autoscheduler",name:"AutoScheduler",             category:"Feature",       impl:3000,  annual:4000,  note:"Non-enterprise" },
  { id:"eeo",        name:"EEO / OFCCP Package",         category:"Compliance",    impl:5500,  annual:4000,  note:"US compliance" },
  { id:"careersite", name:"Career Site (custom layout)", category:"Platform",      impl:0,     annual:0,     note:"Based on scoping" },
  { id:"landingpage",name:"Custom Landing Page",         category:"Platform",      impl:3000,  annual:3000,  note:"Unit price" },
  { id:"emailtempl", name:"Custom Email Template",       category:"Platform",      impl:2000,  annual:0,     note:"Unit price" },
];

export const DEFAULT_MODULES = [
  { id:"ats",        name:"ATS",                  description:"End-to-end applicant tracking, configurable workflows, compliance controls, hiring manager portal, offer management, analytics", basePrice:0, note:"Included in CRM+ATS band" },
  { id:"crm",        name:"CRM",                  description:"Passive/active candidate database, talent pooling, email/SMS campaigns, AI-powered matching, sourcing automation, rediscovery", basePrice:0, note:"See rate card bands" },
  { id:"onboarding", name:"Onboarding",            description:"Digital onboarding workflows, document management, pre-boarding portals, task automation, compliance tracking", basePrice:0, note:"Additive to CRM+ATS" },
  { id:"careersite", name:"Career Site",           description:"Fully branded candidate experience, CMS, AI job matching, application flow configuration, analytics", basePrice:0, note:"Included in full package" },
  { id:"events",     name:"Events Management",     description:"Recruiting event registration, check-in, follow-up automation, ROI tracking, mobile-enabled", basePrice:0, note:"Additive to CRM+ATS" },
  { id:"hmp",        name:"Hiring Manager Portal", description:"Self-service requisition creation, pipeline visibility, interview scheduling, feedback capture", basePrice:0, note:"Included with ATS" },
  { id:"mobility",   name:"Internal Mobility",     description:"Internal job board, AI-powered matching for current employees, skills-based mobility, opportunity marketplace", basePrice:0, note:"Included in full package" },
  { id:"ai",         name:"AI/Copilot",            description:"Native explainable AI across all modules — ranking, matching, content generation, sourcing assistance, knowledge agents", basePrice:0, note:"Included with platform" },
  { id:"campus",     name:"Early Careers",         description:"Event-based recruiting, university relationship management, bulk application processing, cohort tracking", basePrice:0, note:"Included in full package" },
  { id:"referrals",  name:"Referrals",             description:"Employee referral programme management, automated tracking, reward integration", basePrice:0, note:"See rate card add-ons" },
  { id:"agency",     name:"Agency Portal",         description:"Supplier-neutral agency management, job distribution, candidate submission tracking, fee management", basePrice:0, note:"See agency fee table" },
  { id:"im3",        name:"Internal Mobility (IM3)",description:"Advanced internal marketplace with projects, mentoring, gig assignments and skills-based matching", basePrice:0, note:"Separate scoping" },
];

// ─── SUPABASE RATE CARD PERSISTENCE ──────────────────────────────────────────
const RC_KEY = "main"; // single row identified by key

async function loadRateCard() {
  try {
    const rows = await sbFetch(`rate_card?rc_key=eq.${RC_KEY}&limit=1`);
    if (rows && rows.length > 0 && rows[0].data) return rows[0].data;
  } catch(e) { /* fall through to default */ }
  return null;
}

async function saveRateCard(data) {
  // Upsert — try patch first, then post
  try {
    const existing = await sbFetch(`rate_card?rc_key=eq.${RC_KEY}&limit=1`);
    if (existing && existing.length > 0) {
      await sbFetch(`rate_card?rc_key=eq.${RC_KEY}`, {
        method: "PATCH", body: JSON.stringify({ data, updated_at: new Date().toISOString() }),
        prefer: "return=minimal",
      });
    } else {
      await sbFetch("rate_card", {
        method: "POST", body: JSON.stringify({ rc_key: RC_KEY, data, updated_at: new Date().toISOString() }),
      });
    }
    return true;
  } catch(e) { return false; }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function n(v) { return Number(v) || 0; }
function numInput(val, onChange, style = {}) {
  return (
    <input type="number" value={val} onChange={e => onChange(e.target.value)}
      style={{ width:"100%", background:"#0D1117", border:"1px solid #1F2937", borderRadius:5,
        color:"#E2E8F0", padding:"7px 10px", fontSize:12.5, fontFamily:"'DM Mono','Courier New',monospace",
        outline:"none", textAlign:"right", WebkitAppearance:"none", MozAppearance:"textfield", ...style }} />
  );
}
// Global style to hide number spinners
const hideSpinners = `
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }
  input[type=number]:focus { border-color: #1A6B7C !important; background: #1e293b !important; }
`;
function textInput(val, onChange, placeholder, style = {}) {
  return (
    <input type="text" value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""}
      style={{ width:"100%", background:"#0D1117", border:"1px solid #1F2937", borderRadius:5,
        color:"#E2E8F0", padding:"7px 10px", fontSize:12.5, fontFamily:"inherit", outline:"none", ...style }} />
  );
}

const TIER_COLS = [
  { key:"label",             label:"Band",              w:140, type:"text",   group:"" },
  { key:"maxUsers",          label:"Max Users",         w:90,  type:"number", group:"" },
  { key:"crmAtsRecurring",   label:"CRM+ATS",           w:130, type:"number", group:"Core" },
  { key:"crmOnly",           label:"CRM Only",          w:130, type:"number", group:"Core" },
  { key:"onboard",           label:"Onboarding",        w:130, type:"number", group:"Core" },
  { key:"events",            label:"Events",            w:130, type:"number", group:"Core" },
  { key:"careerSite",        label:"Career Site",       w:130, type:"number", group:"Platform" },
  { key:"internalMobility",  label:"Int. Mobility",     w:130, type:"number", group:"Platform" },
  { key:"earlyCareers",      label:"Early Careers",     w:130, type:"number", group:"Platform" },
  { key:"hiringMgrPortal",   label:"HM Portal",         w:130, type:"number", group:"Platform" },
  { key:"aiCopilot",         label:"AI/Copilot",        w:130, type:"number", group:"AI" },
  { key:"referrals",         label:"Referrals",         w:130, type:"number", group:"Other" },
  { key:"agencyPortal",      label:"Agency Portal",     w:130, type:"number", group:"Other" },
  { key:"implTurnkey",       label:"Impl (Turnkey)",    w:140, type:"number", group:"" },
];

const GROUP_COLORS = { Core:"#1A3A4A", Platform:"#1A2A4A", AI:"#2A1A4A", Other:"#2A2A1A", "":"" };

const ADDON_CATS = ["Platform","Integration","Feature","Reporting","Compliance","Other"];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function RateCardEditor({ onBack, onSaved }) {
  const [tab, setTab] = useState("tiers"); // tiers | addons | modules
  const [tiers, setTiers] = useState(DEFAULT_TIERS);
  const [addons, setAddons] = useState(DEFAULT_ADDONS);
  const [modules, setModules] = useState(DEFAULT_MODULES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [dbError, setDbError] = useState(null);

  // Load on mount
  useEffect(() => {
    loadRateCard().then(data => {
      if (data) {
        if (data.tiers) setTiers(data.tiers);
        if (data.addons) setAddons(data.addons);
        if (data.modules) setModules(data.modules);
      }
      setLoading(false);
    });
  }, []);

  const markDirty = () => setDirty(true);

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveRateCard({ tiers, addons, modules });
    setSaving(false);
    if (ok) { setSaved(true); setDirty(false); setTimeout(() => setSaved(false), 3000); if (onSaved) onSaved(tiers, addons, modules); }
    else setDbError("Save failed — check Supabase table exists (rate_card with columns: rc_key, data, updated_at)");
  };

  const handleReset = () => {
    setTiers(DEFAULT_TIERS);
    setAddons(DEFAULT_ADDONS);
    setModules(DEFAULT_MODULES);
    markDirty();
  };

  // Tier editing
  const setTierField = (i, key, val) => {
    setTiers(t => t.map((row, ri) => ri === i ? { ...row, [key]: key === "label" ? val : n(val) } : row));
    markDirty();
  };
  const addTier = () => {
    setTiers(t => [...t, { label:"New Band", minFTE:0, maxFTE:0, maxUsers:0, crmAtsRecurring:0, onboard:0, events:0, crmOnly:0, implTurnkey:0 }]);
    markDirty();
  };
  const removeTier = (i) => { setTiers(t => t.filter((_, ri) => ri !== i)); markDirty(); };

  // Addon editing
  const setAddonField = (i, key, val) => {
    setAddons(a => a.map((row, ri) => ri === i ? { ...row, [key]: (key === "name" || key === "note" || key === "category" || key === "id") ? val : n(val) } : row));
    markDirty();
  };
  const addAddon = () => {
    setAddons(a => [...a, { id: "new_" + Date.now(), name:"New Add-on", category:"Other", impl:0, annual:0, note:"" }]);
    markDirty();
  };
  const removeAddon = (i) => { setAddons(a => a.filter((_, ri) => ri !== i)); markDirty(); };

  // Module editing
  const setModuleField = (i, key, val) => {
    setModules(m => m.map((row, ri) => ri === i ? { ...row, [key]: val } : row));
    markDirty();
  };
  const addModule = () => {
    setModules(m => [...m, { id:"new_"+Date.now(), name:"New Module", description:"", basePrice:0, note:"" }]);
    markDirty();
  };
  const removeModule = (i) => { setModules(m => m.filter((_, ri) => ri !== i)); markDirty(); };

  // Styles
  const dark = "#060D18", navy = "#0D1117", border = "#1F2937", teal = "#1A6B7C", muted = "#64748B";
  const S = {
    app: { fontFamily:"'DM Sans','Segoe UI',sans-serif", background:dark, minHeight:"100vh", color:"#E2E8F0" },
    header: { background:"linear-gradient(180deg,#0D1B30,#060D18)", borderBottom:`1px solid ${border}`, padding:"13px 32px", display:"flex", alignItems:"center", gap:14, position:"sticky", top:0, zIndex:50 },
    body: { maxWidth:1100, margin:"0 auto", padding:"28px 24px" },
    card: { background:navy, border:`1px solid ${border}`, borderRadius:12, overflow:"hidden", marginBottom:20 },
    cardHead: { padding:"14px 20px", borderBottom:`1px solid ${border}`, display:"flex", alignItems:"center", justifyContent:"space-between" },
    cardTitle: { fontSize:13, fontWeight:700, color:"#F8FAFC" },
    tab: (active) => ({ padding:"7px 18px", borderRadius:7, border:`1px solid ${active ? teal : border}`, background: active ? teal+"22" : "transparent", color: active ? "#3A9FA6" : muted, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }),
    btn: (color="#1A6B7C") => ({ background:color, border:"none", borderRadius:7, color:"#fff", padding:"7px 16px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }),
    btnGhost: { background:"transparent", border:`1px solid ${border}`, borderRadius:7, color:muted, padding:"6px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit" },
    th: { padding:"8px 10px", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94A3B8", fontWeight:600, textAlign:"left", background:"#0A1628", borderRight:`1px solid ${border}`, whiteSpace:"nowrap" },
    td: { padding:"5px 8px", borderRight:`1px solid ${border}`, borderBottom:`1px solid ${border}`, verticalAlign:"middle" },
    delBtn: { background:"transparent", border:"none", color:"#475569", cursor:"pointer", fontSize:14, lineHeight:1, padding:"2px 6px" },
  };

  if (loading) return (
    <div style={{ ...S.app, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span style={{ color:muted, fontSize:13 }}>Loading rate card…</span>
    </div>
  );

  return (
    <div style={S.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box}${hideSpinners}`}</style>

      {/* Header */}
      <div style={{ ...S.header, justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <button onClick={onBack} style={{ ...S.btnGhost, padding:"5px 12px", fontSize:11 }}>← Back</button>
          <div style={{ width:1, height:16, background:border }} />
          <span style={{ fontSize:13, color:"#94A3B8", fontWeight:500 }}>Rate Card Editor</span>
          {dirty && <span style={{ fontSize:10.5, color:"#C9A84C", fontWeight:600 }}>● Unsaved changes</span>}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {saved && <span style={{ fontSize:11.5, color:"#4ADE80", fontWeight:600 }}>Saved ✓</span>}
          {dbError && <span style={{ fontSize:11, color:"#F87171", maxWidth:300 }}>{dbError}</span>}
          <button onClick={handleReset} style={S.btnGhost}>Reset to defaults</button>
          <button onClick={handleSave} disabled={saving || !dirty}
            style={{ ...S.btn(), opacity: saving || !dirty ? 0.5 : 1, cursor: saving || !dirty ? "not-allowed" : "pointer" }}>
            {saving ? "Saving…" : "☁ Save Rate Card"}
          </button>
        </div>
      </div>

      <div style={S.body}>
        {/* Intro */}
        <div style={{ marginBottom:20 }}>
          <p style={{ fontSize:13, color:muted, lineHeight:1.6 }}>
            Changes here update what the AI uses when generating proposals. All prices are in <strong style={{ color:"#F8FAFC" }}>USD</strong> — currency conversion is applied at proposal generation time. Save to persist across sessions.
          </p>
        </div>

        {/* Tab bar */}
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {[["tiers","📊 FTE Bands & Pricing"],["addons","🔌 Add-ons & Integrations"],["modules","📦 Modules & Descriptions"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={S.tab(tab === id)}>{label}</button>
          ))}
        </div>

        {/* ── TIERS TAB ─────────────────────────────────────────────────── */}
        {tab === "tiers" && (
          <div style={S.card}>
            <div style={S.cardHead}>
              <div>
                <span style={S.cardTitle}>FTE Bands & Annual Pricing (USD)</span>
                <span style={{ fontSize:11, color:muted, marginLeft:10 }}>All recurring fees are annual. Implementation = Turnkey flat fee.</span>
              </div>
              <button onClick={addTier} style={S.btn()}>+ Add Band</button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"max-content", minWidth:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead>
                  {/* Group header row */}
                  <tr>
                    <th colSpan={2} style={{ ...S.th, background:"#060D18" }}></th>
                    <th colSpan={4} style={{ ...S.th, background:GROUP_COLORS.Core, textAlign:"center", borderRight:"2px solid #334155" }}>Core Modules (annual, USD)</th>
                    <th colSpan={4} style={{ ...S.th, background:GROUP_COLORS.Platform, textAlign:"center", borderRight:"2px solid #334155" }}>Platform Modules (annual, USD)</th>
                    <th colSpan={1} style={{ ...S.th, background:GROUP_COLORS.AI, textAlign:"center", borderRight:"2px solid #334155" }}>AI</th>
                    <th colSpan={2} style={{ ...S.th, background:GROUP_COLORS.Other, textAlign:"center", borderRight:"2px solid #334155" }}>Other</th>
                    <th colSpan={1} style={{ ...S.th, background:"#060D18" }}>Impl</th>
                    <th style={{ ...S.th, width:40, background:"#060D18" }}></th>
                  </tr>
                  <tr>
                    {TIER_COLS.map(col => (
                      <th key={col.key} style={{ ...S.th, width:col.w, background: GROUP_COLORS[col.group] || "#0A1628", fontSize:9, whiteSpace:"nowrap" }}>{col.label}</th>
                    ))}
                    <th style={{ ...S.th, width:40, background:"#060D18" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#0D1117" : "#080D18" }}
                      onMouseOver={e => e.currentTarget.style.background="#112030"}
                      onMouseOut={e => e.currentTarget.style.background = i % 2 === 0 ? "#0D1117" : "#080D18"}>
                      {TIER_COLS.map(col => (
                        <td key={col.key} style={S.td}>
                          {col.type === "text"
                            ? textInput(tier[col.key], v => setTierField(i, col.key, v))
                            : numInput(tier[col.key], v => setTierField(i, col.key, v))}
                        </td>
                      ))}
                      <td style={{ ...S.td, textAlign:"center" }}>
                        <button onClick={() => removeTier(i)} style={S.delBtn} title="Remove band">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding:"10px 20px", borderTop:`1px solid ${border}`, fontSize:11, color:"#334155" }}>
              Tip: minFTE and maxFTE are set automatically based on band label. CRM+ATS includes both modules; Events and Onboard are additive on top.
            </div>
          </div>
        )}

        {/* ── ADDONS TAB ────────────────────────────────────────────────── */}
        {tab === "addons" && (
          <div style={S.card}>
            <div style={S.cardHead}>
              <div>
                <span style={S.cardTitle}>Add-ons & Integrations (USD)</span>
                <span style={{ fontSize:11, color:muted, marginLeft:10 }}>Implementation = one-time. Annual = recurring. 0 = included/free.</span>
              </div>
              <button onClick={addAddon} style={S.btn()}>+ Add Item</button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead>
                  <tr>
                    {[["Name",200],["Category",120],["Impl (USD)",100],["Annual (USD)",110],["Notes",200],["",40]].map(([l,w]) => (
                      <th key={l} style={{ ...S.th, width:w }}>{l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {addons.map((a, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#0D1117" : "#0A0F1E" }}>
                      <td style={S.td}>{textInput(a.name, v => setAddonField(i,"name",v))}</td>
                      <td style={S.td}>
                        <select value={a.category} onChange={e => setAddonField(i,"category",e.target.value)}
                          style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:6, color:"#F8FAFC", padding:"6px 9px", fontSize:12, fontFamily:"inherit" }}>
                          {ADDON_CATS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </td>
                      <td style={S.td}>{numInput(a.impl, v => setAddonField(i,"impl",v))}</td>
                      <td style={S.td}>{numInput(a.annual, v => setAddonField(i,"annual",v))}</td>
                      <td style={S.td}>{textInput(a.note, v => setAddonField(i,"note",v), "Optional note")}</td>
                      <td style={{ ...S.td, textAlign:"center" }}>
                        <button onClick={() => removeAddon(i)} style={S.delBtn} title="Remove">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MODULES TAB ───────────────────────────────────────────────── */}
        {tab === "modules" && (
          <div style={S.card}>
            <div style={S.cardHead}>
              <div>
                <span style={S.cardTitle}>Modules & AI Descriptions</span>
                <span style={{ fontSize:11, color:muted, marginLeft:10 }}>Descriptions are injected into the AI prompt — keep them accurate and concise.</span>
              </div>
              <button onClick={addModule} style={S.btn()}>+ Add Module</button>
            </div>
            <div style={{ padding:0 }}>
              {modules.map((m, i) => (
                <div key={i} style={{ padding:"16px 20px", borderBottom:`1px solid ${border}`, display:"grid", gridTemplateColumns:"160px 1fr 180px 36px", gap:12, alignItems:"start" }}>
                  <div>
                    <div style={{ fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Module Name</div>
                    {textInput(m.name, v => setModuleField(i,"name",v))}
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Description (used by AI)</div>
                    <textarea value={m.description} onChange={e => setModuleField(i,"description",e.target.value)}
                      style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:6, color:"#F8FAFC",
                        padding:"6px 9px", fontSize:12, fontFamily:"inherit", outline:"none", resize:"vertical", minHeight:60, lineHeight:1.5 }} />
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Pricing Note</div>
                    {textInput(m.note, v => setModuleField(i,"note",v), "e.g. Included in full package")}
                  </div>
                  <button onClick={() => removeModule(i)} style={{ ...S.delBtn, marginTop:20 }} title="Remove">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EXPORTED HELPERS (used by ProposalBuilder) ───────────────────────────────
export function getRateCardContext(tiers, addons, modules) {
  const tierStr = tiers.map(t => {
    const parts = [
      `CRM+ATS ${(t.crmAtsRecurring||0).toLocaleString()}/yr`,
      `CRM-only ${(t.crmOnly||0).toLocaleString()}/yr`,
      `Onboarding +${(t.onboard||0).toLocaleString()}/yr`,
      `Events +${(t.events||0).toLocaleString()}/yr`,
      t.careerSite       ? `Career Site +${t.careerSite.toLocaleString()}/yr` : null,
      t.internalMobility ? `Internal Mobility +${t.internalMobility.toLocaleString()}/yr` : null,
      t.earlyCareers     ? `Early Careers +${t.earlyCareers.toLocaleString()}/yr` : null,
      t.hiringMgrPortal  ? `HM Portal +${t.hiringMgrPortal.toLocaleString()}/yr` : null,
      t.aiCopilot        ? `AI/Copilot +${t.aiCopilot.toLocaleString()}/yr` : null,
      t.referrals        ? `Referrals +${t.referrals.toLocaleString()}/yr` : null,
      t.agencyPortal     ? `Agency Portal +${t.agencyPortal.toLocaleString()}/yr` : null,
      `Impl (Turnkey) ${(t.implTurnkey||0).toLocaleString()} one-time`,
      `Max ${t.maxUsers} users`,
    ].filter(Boolean);
    return `${t.label} FTE: ${parts.join(", ")}`;
  }).join("\n");

  const addonStr = addons.map(a =>
    `${a.name} (${a.category}): $${a.impl} impl + $${a.annual}/yr${a.note ? " — " + a.note : ""}`
  ).join("\n");

  const moduleStr = modules.map(m =>
    `${m.name}: ${m.description}${m.note ? " [" + m.note + "]" : ""}`
  ).join("\n");

  return `AVATURE RATE CARD (USD, all prices annual unless noted):\n\nFTE BANDS:\n${tierStr}\n\nADD-ONS & INTEGRATIONS:\n${addonStr}\n\nMODULES:\n${moduleStr}`;
}

export function getSuggestedPricingFromRC(fte, modules, tiers) {
  if (!fte || !tiers) return { saas: null, impl: null, tier: null };
  const n = Number(fte);
  const tier = tiers.find(t => n >= t.minFTE && n <= t.maxFTE);
  if (!tier) return { saas: null, impl: null, tier: null };
  const mods = (modules || []).map(m => m.toLowerCase());

  // Map module names to tier keys
  const MODULE_MAP = [
    { match: m => m.includes("crm") && m.includes("ats"),   key: null, combined: true },
    { match: m => m.includes("ats") && !m.includes("crm"),  key: "crmAtsRecurring" },
    { match: m => m.includes("crm") && !m.includes("ats"),  key: "crmOnly" },
    { match: m => m.includes("onboard"),                     key: "onboard" },
    { match: m => m.includes("event"),                       key: "events" },
    { match: m => m.includes("career site"),                 key: "careerSite" },
    { match: m => m.includes("internal mobil") || m.includes("mobility"), key: "internalMobility" },
    { match: m => m.includes("early career") || m.includes("campus"),     key: "earlyCareers" },
    { match: m => m.includes("hiring manager") || m.includes("hm portal"),key: "hiringMgrPortal" },
    { match: m => m.includes("ai") || m.includes("copilot"),              key: "aiCopilot" },
    { match: m => m.includes("referral"),                    key: "referrals" },
    { match: m => m.includes("agency"),                      key: "agencyPortal" },
  ];

  let saas = 0;
  const hasCRM = mods.some(m => m.includes("crm"));
  const hasATS = mods.some(m => m.includes("ats"));

  // Core platform base price
  if (hasCRM && hasATS)      saas += tier.crmAtsRecurring || 0;
  else if (hasCRM)           saas += tier.crmOnly || 0;
  else if (hasATS)           saas += tier.crmAtsRecurring || 0;

  // All other modules — add their column value
  const coreHandled = ["crm","ats"];
  mods.forEach(mod => {
    if (coreHandled.some(c => mod.includes(c))) return; // already handled above
    const mapping = MODULE_MAP.find(m => !m.combined && m.match(mod));
    if (mapping && mapping.key && tier[mapping.key]) saas += tier[mapping.key];
  });

  if (saas === 0) saas = tier.crmAtsRecurring || 0;
  return { saas, impl: tier.implTurnkey, tier };
}
