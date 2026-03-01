import { useState, useRef, useEffect, useMemo } from "react";

const LOGO_URI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJ1dWlkLTI3ZjVjY2VjLTEzYTctNGFiYS1hMDQyLTVmZDE3NDdlMzA2OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDE2MiAzMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLWNlZWE2ZTA4LWNiZDktNDE4Zi1iZjJiLWI0MzYyYTRiYTVmNSIgeDE9IjAiIHkxPSIxNiIgeDI9IjIzLjIxIiB5Mj0iMTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMDUzYmMiLz48c3RvcCBvZmZzZXQ9Ii41OSIgc3RvcC1jb2xvcj0iIzAwNTNiYyIvPjxzdG9wIG9mZnNldD0iLjY3IiBzdG9wLWNvbG9yPSIjMDA1NWMwIi8+PHN0b3Agb2Zmc2V0PSIuNzYiIHN0b3AtY29sb3I9IiMwMDVkY2MiLz48c3RvcCBvZmZzZXQ9Ii44NCIgc3RvcC1jb2xvcj0iIzAwNmFlMCIvPjxzdG9wIG9mZnNldD0iLjkzIiBzdG9wLWNvbG9yPSIjMDA3ZGZjIi8+PHN0b3Agb2Zmc2V0PSIuOTMiIHN0b3AtY29sb3I9IiMwMDdmZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC04YTdkYTYyMi01NTYwLTRiNzUtOGFkMS1jNTYwYjdkODhkMDIiIHgxPSI4LjIzIiB5MT0iMjQuNjUiIHgyPSIzMC43NyIgeTI9IjI0LjY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMDYiIHN0b3AtY29sb3I9IiMwMDUzYmMiLz48c3RvcCBvZmZzZXQ9Ii4xNSIgc3RvcC1jb2xvcj0iIzAwNjFkMiIvPjxzdG9wIG9mZnNldD0iLjI3IiBzdG9wLWNvbG9yPSIjMDA3MWViIi8+PHN0b3Agb2Zmc2V0PSIuMzgiIHN0b3AtY29sb3I9IiMwMDdiZjkiLz48c3RvcCBvZmZzZXQ9Ii40NyIgc3RvcC1jb2xvcj0iIzAwN2ZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLTA2ZTkyOTc5LTg0YmQtNDQwZi05YTdiLTlhMTFkMWQzOTY1NyIgeDE9IjguMjMiIHkxPSIyNC41NiIgeDI9IjMwLjc3IiB5Mj0iMjQuNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4wNiIgc3RvcC1jb2xvcj0iIzAwNTNiYyIvPjxzdG9wIG9mZnNldD0iLjM5IiBzdG9wLWNvbG9yPSIjMDA3NWYwIi8+PHN0b3Agb2Zmc2V0PSIuNzEiIHN0b3AtY29sb3I9IiMwMDY0ZjciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDViZmMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC1iZDcwNDkyZS01ZTJlLTRjYjgtOGFkYy05YjMyZTUyZTI2ZjIiIHgxPSIyLjQ4IiB5MT0iMzIuODUiIHgyPSIxNy42NyIgeTI9IjIuMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iIzAwNWJjZSIvPjxzdG9wIG9mZnNldD0iLjY0IiBzdG9wLWNvbG9yPSIjMDA3ZmZmIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTE1LjUzLjQ0TDAsMzEuNTZoMi43NWM1LjIxLDAsMTEuNDItMy44NywxNC4xLTkuMTFsNC44NS05LjdMMTUuNTMuNDRaIiBmaWxsPSJ1cmwoI3V1aWQtY2VlYTZlMDgtY2JkOS00MThmLWJmMmItYjQzNjJhNGJhNWY1KSIvPjxwYXRoIGQ9Ik0xOC4wMiwxOC4yMWMtMS4xNi0uMzQtMi4yOC0uNDctMy4zMy0uNDctMy42OCwwLTYuNDIsMS42Mi02LjQ2LDEuNjQsMi4yLjUzLDQuNjEsMS45Miw2LjkzLDQuODQsNy4zMSw5LjIsMTUuNjEsNy4xNCwxNS42MSw3LjE0LDAsMC0zLjEtMTAuNS0xMi43NS0xMy4xNVoiIGZpbGw9InVybCgjdXVpZC04YTdkYTYyMi01NTYwLTRiNzUtOGFkMS1jNTYwYjdkODhkMDIpIi8+PHBhdGggZD0iTTE4LjAyLDE4LjIxYy01LjI1LTEuNTMtOS43OCwxLjE3LTkuNzksMS4xOC4wMywwLC4wNi4wMi4wOS4wMiwxNC4xMi0yLjA5LDExLjE4LDkuMjQsMjIuNDUsMTEuOTYsMCwwLTMuMS0xMC41LTEyLjc1LTEzLjE1WiIgZmlsbD0idXJsKCN1dWlkLTA2ZTkyOTc5LTg0YmQtNDQwZi05YTdiLTlhMTFkMWQzOTY1NykiLz48cGF0aCBkPSJNMTguNjMsNi42M0wxNS41My40NCwwLDMxLjU2aDMuMDNTMTEuMTgsMTUuMjIsMTEuMTgsMTUuMjJjMi41My00Ljg4LDUuMDgtNy4xMiw3LjQ0LTguNTlaIiBmaWxsPSJ1cmwoI3V1aWQtYmQ3MDQ5MmUtNWUyZS00Y2I4LThhZGMtOWIzMmU1MmUyNmYyKSIvPjxwb2x5Z29uIHBvaW50cz0iNzAuNzUgMTAuMzkgNjQuNzkgMjIuMDggNTguOTUgMTAuMzkgNTQuNjQgMTAuMzkgNjIuNzkgMjUuOTggNjYuNzYgMjUuOTggNzQuOSAxMC4zOSA3MC43NSAxMC4zOSIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMjUuMzksMTkuNjRjMCwuNzktLjE2LDEuNDMtLjQ3LDEuOS0uMy40NS0uODUuNzktMS42MywxLjAxLS44OC4yNS0yLjEyLjM4LTMuNy4zOC0xLjA3LDAtMS45NS0uMDYtMi42MS0uMTktLjU4LS4xMS0xLjAzLS4yOS0xLjMzLS41NS0uMjgtLjI0LS40OC0uNTktLjYtMS4wNy0uMTQtLjU1LS4yMS0xLjI4LS4yMS0yLjE2di04LjU4aC0zLjcydjguNThjMCwxLjc4LjI0LDMuMTYuNzQsNC4yMi41MywxLjEyLDEuNDIsMS45MiwyLjY1LDIuMzksMS4xNC40MywyLjcxLjY2LDQuNjQuNjYsMS40NiwwLDIuNjYtLjA4LDMuNTgtLjI1Ljk3LS4xOCwxLjc0LS40NCwyLjM0LS44MS4xLS4wNi4yLS4xMy4zLS4ydi45OWgzLjcxdi0xNS41OGgtMy43MXY5LjI1WiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMzkuMDksMTAuMjljLS44MS4wOC0xLjQ0LjIxLTEuOTQuMzloMGMtLjM2LjE0LS42Ny4zMS0uOTUuNTJ2LS44MWgtMy43MXYxNS41OGgzLjcxdi05LjM4YzAtLjcxLjA0LTEuMy4xMS0xLjc1LjA1LS4zMS4xOS0uNTQuNDQtLjcxLjItLjE0LjY1LS4zNCwxLjYyLS40Ny44Ni0uMTEsMi4xMS0uMTcsMy43MS0uMTdoLjY3di0zLjMyaC0uNjdjLTEuMjMsMC0yLjIzLjA0LTMsLjExWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik05MC44MSwxMS44aDBjLS42Mi0uNjUtMS41Mi0xLjExLTIuNjctMS4zNS0xLjA2LS4yMi0yLjQ2LS4zNC00LjE2LS4zNGgtNy4xOXYzLjMxaDcuMTljMS4xMywwLDIuMDMuMDQsMi42OS4xMy41Ni4wNy45OC4yMiwxLjI0LjQ0LjI0LjIxLjQyLjU1LjUyLDEuMDMuMDkuNDMuMTUuOTguMTgsMS42NS0uNTktLjA5LTEuMjItLjE2LTEuOS0uMjEtLjc3LS4wNS0xLjY5LS4wOC0yLjczLS4wOS0uMzEsMC0uNjMsMC0uOTYsMC0xLjgyLDAtMy4zMS4wOS00LjQ1LjI4LTEuMjYuMjEtMi4yMS42OC0yLjgxLDEuNDEtLjYyLjc0LS45MiwxLjgxLS45MiwzLjI4cy4zMywyLjUzLjk4LDMuMjVjLjY0LjcyLDEuNjEsMS4xOCwyLjg3LDEuMzgsMS4xNC4xOCwyLjYuMjcsNC4zMy4yNy4zNCwwLC42NiwwLC45NywwLC44OC0uMDIsMS42NC0uMDYsMi4yNS0uMTIuODgtLjA5LDEuNTgtLjI0LDIuMTMtLjQ0LjA5LS4wMy4xOC0uMDcuMjctLjExdi40MWgzLjcxdi03LjUyYzAtMS42MS0uMS0yLjk1LS4yOS0zLjk4LS4yMS0xLjEyLS42My0yLjAyLTEuMjUtMi42N1pNODguNjQsMjEuMjNjMCwuNjMtLjA4Ljk3LS4xNSwxLjE0LS4wNC4wOS0uMTIuMjMtLjQzLjM0LS4yNC4wOS0uNzMuMi0xLjY5LjIzLS42Mi4wMi0xLjQzLjA0LTIuNC4wNS0uMywwLS42MiwwLS45NSwwLTEuMDksMC0xLjk4LS4wMi0yLjY1LS4wNi0uNzUtLjA1LTEuMTQtLjE1LTEuMzQtLjIzLS4yNC0uMS0uMzEtLjIyLS4zNS0uMzItLjA2LS4xNi0uMTQtLjQ3LS4xNC0xLjA0cy4wOC0uOTIuMTQtMS4wOWMuMDQtLjEuMTEtLjIzLjM1LS4zNC4xOS0uMDguNTgtLjE5LDEuMzMtLjI0LjQ4LS4wMywxLjA5LS4wNSwxLjgxLS4wNS4yNiwwLC41NCwwLC44MywwbDUuNjMuMDd2MS41M1oiIGZpbGw9IiMxMTEiLz48cGF0aCBkPSJNNTIuNTQsMTEuOGMtLjYyLS42NS0xLjUyLTEuMTEtMi42Ny0xLjM1LTEuMDYtLjIyLTIuNDYtLjM0LTQuMTYtLjM0aC03LjE5djMuMzFoNy4xOWMxLjEzLDAsMi4wMy4wNCwyLjY5LjEzLjU2LjA3Ljk4LjIyLDEuMjQuNDQuMjQuMjEuNDIuNTUuNTIsMS4wMy4wOS40My4xNS45OC4xOCwxLjY1LS41OS0uMDktMS4yMi0uMTYtMS45LS4yMS0uNzctLjA1LTEuNjktLjA4LTIuNzMtLjA5LS4zMSwwLS42MywwLS45NiwwLTEuODIsMC0zLjMxLjA5LTQuNDUuMjgtMS4yNi4yMS0yLjIxLjY4LTIuODEsMS40MS0uNjIuNzQtLjkyLDEuODEtLjkyLDMuMjhzLjMzLDIuNTMuOTgsMy4yNWMuNjQuNzIsMS42MSwxLjE4LDIuODcsMS4zOCwxLjE0LjE4LDIuNi4yNyw0LjMzLjI3LjM0LDAsLjY2LDAsLjk3LDAsLjg4LS4wMiwxLjY0LS4wNiwyLjI1LS4xMi44OC0uMDksMS41OC0uMjQsMi4xMy0uNDQuMDktLjAzLjE4LS4wNy4yNy0uMTF2LjQxaDMuNzF2LTcuNTJjMC0xLjYxLS4xLTIuOTUtLjI5LTMuOTgtLjIxLTEuMTItLjYzLTIuMDItMS4yNS0yLjY3Wk01MC4zNywyMS4yM2MwLC42My0uMDguOTctLjE1LDEuMTQtLjA0LjA5LS4xMi4yMy0uNDMuMzQtLjI0LjA5LS43My4yLTEuNjkuMjMtLjYyLjAyLTEuNDMuMDQtMi40LjA1LS4zLDAtLjYyLDAtLjk1LDAtMS4wOSwwLTEuOTgtLjAyLTIuNjUtLjA2LS43NS0uMDUtMS4xNC0uMTUtMS4zNC0uMjMtLjI0LS4xLS4zMS0uMjItLjM1LS4zMi0uMDYtLjE2LS4xNC0uNDctLjE0LTEuMDRzLjA4LS45Mi4xNC0xLjA5Yy4wNC0uMS4xMS0uMjMuMzUtLjM0LjE5LS4wOC41OC0uMTksMS4zMy0uMjQuNDgtLjAzLDEuMDktLjA1LDEuODEtLjA1LjI2LDAsLjU0LDAsLjgzLDBsNS42My4wN3YxLjUzWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xNTguMTIsMjAuMDRjMCwuMTIuMTMsMi43Mi0zLjA0LDIuNzJzLTYuMjUuNTQtNy0xLjYybDEwLjMzLTMuOTQsMi45OC0xLjE0LjYtLjIzYy0uMDItLjQ0LS4wNy0uODYtLjE4LTEuMjgtLjE3LS42Ny0uNDYtMS4zMS0uODUtMS44OC0uODMtMS4yMi0yLjEtMi4xNS0zLjY1LTIuNTMtLjk1LS4yMi0xLjA3LS4xNy02Ljk4LS4xNy0zLjM1LDAtNi4wOCwyLjczLTYuMDgsNi4wOHYzLjk3YzAsMy4zNSwyLjczLDYuMDgsNi4wOCw2LjA4LDUuOTEsMCw2LjAzLjA2LDYuOTgtLjE3LDIuNzktLjY3LDQuNjgtMy4xNCw0LjY4LTUuOTFoLTMuODhaTTE0Ny45MSwxNi4wNmMwLTMuNDMsMy42NS0yLjcyLDcuMTYtMi43MiwxLjEsMCwxLjc5LjMxLDIuMjQuNzNsLTkuNDQsMy42Yy4wMS0uNTIuMDMtMS4wNi4wMy0xLjYxWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMDEuNDcsMjIuNTJjLS40MS0uNC0uMy0uNTktLjMtOC42di0uMjRoNi40OHYtMy4yOWgtNi41di00LjY0aC0zLjcxdjQuNjNoLTIuNzR2My4zMWgyLjc1di4yM3MuMDEsNy41Mi4wMSw3LjUyYzAsMy4wNiwyLjE2LDQuNjQsNC40LDQuODJoNS45OHYtMy40NmMtNS45LDAtNS45OS4xLTYuMzktLjI4WiIgZmlsbD0iIzExMSIvPjwvc3ZnPg==";

// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://dtjyejkbwqvktkdserci.supabase.co";
const SUPABASE_KEY = "sb_publishable_k_nSyamataNU50XZCdc8Xw_RZ0aAI1f";

async function sbFetch(path, options = {}) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
    ...options,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const db = {
  saveImplementation: (data) => sbFetch("implementation_plans", {
    method: "POST",
    body: JSON.stringify(data),
    prefer: "return=representation",
  }),
  getImplementations: () => sbFetch("implementation_plans?order=created_at.desc&limit=50"),
  updateImplementation: (id, data) => sbFetch("implementation_plans?id=eq." + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    prefer: "return=representation",
  }),
  deleteImplementation: (id) => sbFetch("implementation_plans?id=eq." + id, {
    method: "DELETE",
    prefer: "return=minimal",
  }),
  saveAssessment: (data) => sbFetch("maturity_assessments", {
    method: "POST",
    body: JSON.stringify(data),
    prefer: "return=representation",
  }),
  getAssessments: () => sbFetch("maturity_assessments?order=created_at.desc&limit=50"),
  updateAssessment: (id, data) => sbFetch("maturity_assessments?id=eq." + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    prefer: "return=representation",
  }),
  deleteAssessment: (id) => sbFetch("maturity_assessments?id=eq." + id, {
    method: "DELETE",
    prefer: "return=minimal",
  }),
};


// ─── DATA ─────────────────────────────────────────────────────────────────────
const PHASES = [
  { id:1, name:"Discovery, Solution Walkthrough & Planning",               color:"#1A6B7C", fraction:1.5/13 },
  { id:2, name:"Requirements Processing, Documentation & Validation",      color:"#2E6DB4", fraction:2.5/13 },
  { id:3, name:"Solution Design & Configuration",                          color:"#3A6EA8", fraction:3.5/13 },
  { id:4, name:"Integration & Data Migration",                             color:"#2E5D96", fraction:2.0/13 },
  { id:5, name:"Customer Testing",                                         color:"#1B4580", fraction:1.5/13 },
  { id:6, name:"Rollout Activities & Go-Live",                             color:"#0D3568", fraction:1.0/13 },
  { id:7, name:"Stabilisation & Hypercare",                                color:"#092650", fraction:1.0/13 },
];

const DEFAULT_RESOURCES = [
  { id:1,  role:"Implementation Project Manager",  stdRate:1200, baseDays:10, phase:"All Phases",                     complexMult:0.2 },
  { id:2,  role:"Implementation Consultant",        stdRate:950,  baseDays:15, phase:"Requirements & Solution Design",  complexMult:0.4 },
  { id:3,  role:"Solutions Architect",              stdRate:1400, baseDays:7,  phase:"Discovery & Design",              complexMult:0.8 },
  { id:4,  role:"Implementation Associate",         stdRate:800,  baseDays:20, phase:"Solution Design & Configuration", complexMult:0.5 },
  { id:5,  role:"Integrations Analyst",             stdRate:950,  baseDays:9,  phase:"Integration & Data Migration",    complexMult:1.0 },
  { id:6,  role:"Data Base Analyst (DBA)",          stdRate:900,  baseDays:7,  phase:"Integration & Data Migration",    complexMult:1.0 },
  { id:7,  role:"Portal Apps Analyst",              stdRate:800,  baseDays:6,  phase:"Solution Design & Configuration", complexMult:0.6 },
  { id:8,  role:"Training Specialist",              stdRate:850,  baseDays:9,  phase:"Customer Testing & Rollout",      complexMult:0.2 },
  { id:9,  role:"QA / Testing Consultant",          stdRate:800,  baseDays:11, phase:"Customer Testing",                complexMult:0.5 },
  { id:10, role:"Customer Solution Manager",        stdRate:950,  baseDays:6,  phase:"Rollout & Stabilisation",         complexMult:0.1 },
];

const CURRENCIES = [
  { code:"USD", symbol:"$",  label:"US Dollar"       },
  { code:"EUR", symbol:"€",  label:"Euro"             },
  { code:"GBP", symbol:"£",  label:"British Pound"    },
  { code:"AED", symbol:"د.إ",label:"UAE Dirham"       },
  { code:"JPY", symbol:"¥",  label:"Japanese Yen"     },
  { code:"CHF", symbol:"Fr", label:"Swiss Franc"      },
];

const DURATION_OPTIONS = [1,2,3,4,5,6,9,12,15,18];
const BASELINE_COST = 94000;
const BASELINE_MONTHS = 3;
const DEFAULT_NOTICE = `This estimate is provided on a time & materials basis aligned with Avature's standard implementation methodology. Final costs will depend on actual days consumed, scope changes, client resource availability, and requirements discovered during the project lifecycle. This document is confidential and intended solely for the named recipient. · avature.ai`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmtC(n, sym) { return sym + Math.round(n).toLocaleString(); }

function calcResources(resources, months, rateAdj, complexity) {
  const complexFactor = (complexity / 100) * 3.0;
  return resources.map(r => {
    const adjRate = r.stdRate * (1 + rateAdj / 100);
    const baseScaled = Math.round(r.baseDays * (months / BASELINE_MONTHS));
    const complexDays = Math.round(baseScaled * r.complexMult * complexFactor);
    const scaledDays = baseScaled + complexDays;
    return { ...r, adjRate, scaledDays, complexDays, cost: adjRate * scaledDays };
  });
}

function calcPhaseWeeks(months) {
  const totalWeeks = Math.round(months * 4.33);
  // Compute raw durations
  const rawDurs = PHASES.map(p => p.fraction * totalWeeks);
  // Round each, then fix the last to consume exactly remaining weeks
  let assigned = 0;
  return PHASES.map((p, i) => {
    const startWeek = assigned + 1;
    let duration;
    if (i === PHASES.length - 1) {
      duration = totalWeeks - assigned;
    } else {
      duration = Math.max(1, Math.round(rawDurs[i]));
    }
    assigned += duration;
    return { ...p, startWeek, duration, totalWeeks };
  });
}

// ─── EXPORT PROPOSAL ──────────────────────────────────────────────────────────
function exportProposal(months, computed, phases, clientName, importantNotice, currSym) {
  const total = computed.reduce((s,r) => s + r.cost, 0);
  const totalDays = computed.reduce((s,r) => s + r.scaledDays, 0);
  const blended = total / totalDays;
  const totalWeeks = Math.round(months * 4.33);
  const dateStr = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });

  const rows = computed.map(r => `
    <tr>
      <td>${r.role}</td>
      <td class="c">${currSym}${Math.round(r.adjRate).toLocaleString()}</td>
      <td class="c">${r.scaledDays}</td>
      <td class="c bold">${currSym}${Math.round(r.cost).toLocaleString()}</td>
      <td class="c">${((r.cost/total)*100).toFixed(1)}%</td>
    </tr>`).join("");

  const ganttBars = phases.map(p => {
    const lp = ((p.startWeek-1)/totalWeeks*100).toFixed(1);
    const wp = (p.duration/totalWeeks*100).toFixed(1);
    return `<div class="grow">
      <div class="glabel">${p.name}</div>
      <div class="gtrack"><div class="gbar" style="left:${lp}%;width:${wp}%;background:${p.color}"><span>${p.duration}w</span></div></div>
      <div class="gwk">W${p.startWeek}</div>
    </div>`;
  }).join("");

  const legend = phases.map(p =>
    `<div class="li"><div class="ld" style="background:${p.color}"></div>${p.name}</div>`).join("");

  const clientHeading = clientName ? `<div class="cover-client">Prepared for: <strong>${clientName}</strong></div>` : "";

  const footerHTML = `
  <div class="pg-footer">
    <img src="${LOGO_URI}" alt="Avature"/>
    <div class="footer-text">Confidential · Time &amp; Materials · ${months}-Month Implementation${clientName ? " · "+clientName : ""}</div>
  </div>`;

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
<title>Avature — Implementation Proposal${clientName ? " · "+clientName : ""}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
@page{size:A4 portrait;margin:0}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Source Sans 3',sans-serif;background:#E5E7EB;color:#1A1A2E;font-size:13.5px;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
/* Each pg div = exactly one A4 page */
.pg{width:210mm;height:297mm;background:white;margin:0 auto 12px;display:flex;flex-direction:column;page-break-after:always;break-after:page;overflow:hidden}
.pg:last-child{page-break-after:auto;break-after:auto}
.pg-body{flex:1;padding:32px 48px 20px;overflow:hidden}
.pg-footer{background:#0A1628;padding:14px 48px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.pg-footer img{height:18px;filter:brightness(0) invert(1)}
.footer-text{font-size:11px;color:#475569}
/* Cover */
.cover{flex:1;background:linear-gradient(135deg,#0A1628 0%,#0D2A3A 60%,#0A2030 100%);padding:48px 56px 40px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between}
.cover::before{content:'';position:absolute;top:-60px;right:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,#1A6B7C18 0%,transparent 70%)}
.cover-line{height:3px;background:linear-gradient(90deg,#1A6B7C,#C9A84C,#1A6B7C);margin-bottom:20px}
.logo-wrap{}.logo-wrap img{height:26px;filter:brightness(0) invert(1)}
.cover-main{display:flex;flex-direction:column;justify-content:center;flex:1;padding:40px 0 20px}
.cover-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#3A8FA6;margin-bottom:16px;font-weight:600}
.cover-title{font-family:'Playfair Display',serif;font-size:42px;font-weight:800;color:#FFF;line-height:1.15;margin-bottom:12px}
.cover-subtitle{color:#94A3B8;font-size:14px;font-weight:300;margin-bottom:8px}
.cover-client{color:#C9A84C;font-size:15px;margin-bottom:0}
.cover-meta{display:flex;gap:32px;border-top:1px solid #1E3A5F;padding-top:20px;flex-wrap:wrap}
.cmi label{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#64748B;margin-bottom:4px}
.cmi span{font-size:13px;font-weight:600;color:#E2E8F0}
/* KPIs */
.kgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
.kpi{border-radius:8px;padding:12px 14px;border:1px solid #E5E7EB;background:#FAFAFA}
.kpi.accent{background:#0A1628;border-color:#0A1628;position:relative;overflow:hidden}
.kpi.accent::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#1A6B7C,#C9A84C)}
.kl{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9CA3AF;margin-bottom:4px;font-weight:600}
.kpi.accent .kl{color:#64748B}
.kv{font-size:20px;font-weight:700;color:#1A1A2E;line-height:1}
.kpi.accent .kv{color:#C9A84C;font-size:23px}
.ks{font-size:10px;color:#9CA3AF;margin-top:3px}
/* Section headers */
.sh{display:flex;align-items:center;gap:12px;margin:14px 0 8px}
.sh::before{content:'';width:4px;height:20px;background:linear-gradient(180deg,#1A6B7C,#2E6DB4);border-radius:2px;flex-shrink:0}
.sh h2{font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#374151;font-weight:700}
.sh::after{content:'';flex:1;height:1px;background:#E5E7EB}
/* Table */
table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:0}
thead tr{background:#0A1628}
thead th{padding:7px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#94A3B8;font-weight:600;text-align:left}
th.c,td.c{text-align:center}
tbody tr{border-bottom:1px solid #F3F4F6}
tbody tr:nth-child(even) td{background:#FAFAFA}
td{padding:7px 10px;color:#374151;vertical-align:middle}
td.bold{font-weight:700;color:#111827}
.total-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;background:#0A1628;padding:9px 10px;font-weight:700;color:#E2E8F0;font-size:12px;margin-bottom:4px}
.total-row .c{text-align:center}
.total-row .gold{color:#C9A84C;font-size:14px;text-align:center}
/* Gantt */
.grow{display:flex;align-items:center;gap:8px;margin-bottom:5px}
.glabel{width:210px;font-size:10px;color:#374151;text-align:right;flex-shrink:0;font-weight:500;line-height:1.3}
.gtrack{flex:1;height:18px;background:#F1F5F9;border-radius:4px;position:relative;overflow:hidden}
.gbar{position:absolute;top:2px;bottom:2px;border-radius:3px;display:flex;align-items:center;justify-content:center}
.gbar span{font-size:9px;color:white;font-weight:700;padding:0 4px}
.gwk{width:28px;font-size:10px;color:#9CA3AF;flex-shrink:0}
.legend{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:8px;padding-top:8px;border-top:1px solid #E5E7EB}
.li{display:flex;align-items:center;gap:5px;font-size:9.5px;color:#6B7280}
.ld{width:9px;height:9px;border-radius:2px;flex-shrink:0}
.ms-row{display:flex;justify-content:space-around;margin-top:8px;padding-top:8px;border-top:1px dashed #E5E7EB}
.ms{font-size:10.5px;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid}
.ms1{color:#1A6B7C;border-color:#1A6B7C;background:#EFF9FB}
.ms2{color:#2E6DB4;border-color:#2E6DB4;background:#EFF3FB}
.ms3{color:#C9A84C;border-color:#C9A84C;background:#FEFBEF}
.disc{background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:10px 14px;font-size:10.5px;color:#92400E;margin-top:12px;line-height:1.6}
@media print{body{background:white}.pg{margin:0;box-shadow:none}}
</style></head><body>

<!-- PAGE 1: Cover -->
<div class="pg">
  <div class="cover">
    <div class="logo-wrap"><img src="${LOGO_URI}" alt="Avature"/></div>
    <div class="cover-main">
      <div class="cover-eyebrow">Professional Services · Time &amp; Materials</div>
      <div class="cover-title">Implementation<br>Investment Proposal</div>
      <div class="cover-subtitle">Confidential — Prepared for Client Review</div>
      ${clientHeading}
    </div>
    <div>
      <div class="cover-line"></div>
      <div class="cover-meta">
        <div class="cmi"><label>Prepared</label><span>${dateStr}</span></div>
        <div class="cmi"><label>Duration</label><span>${months} Month${months>1?"s":""} / ${totalWeeks} Weeks</span></div>
        <div class="cmi"><label>Engagement</label><span>Time &amp; Materials</span></div>
        <div class="cmi"><label>Methodology</label><span>Avature Standard</span></div>
      </div>
    </div>
  </div>
  ${footerHTML}
</div>

<!-- PAGE 2: Content -->
<div class="pg">
  <div class="pg-body">
    <div class="kgrid">
      <div class="kpi accent"><div class="kl">Total Investment</div><div class="kv">${currSym}${Math.round(total).toLocaleString()}</div><div class="ks" style="color:#475569">Time &amp; materials basis</div></div>
      <div class="kpi"><div class="kl">Consultant Days</div><div class="kv">${totalDays}</div><div class="ks">across ${months} month${months>1?"s":""}</div></div>
      <div class="kpi"><div class="kl">Blended Day Rate</div><div class="kv">${currSym}${Math.round(blended).toLocaleString()}</div><div class="ks">weighted average</div></div>
      <div class="kpi"><div class="kl">Project Phases</div><div class="kv">7</div><div class="ks">Avature methodology</div></div>
      <div class="kpi"><div class="kl">Timeline</div><div class="kv">${totalWeeks}w</div><div class="ks">${months} calendar month${months>1?"s":""}</div></div>
      <div class="kpi"><div class="kl">Specialist Roles</div><div class="kv">${computed.length}</div><div class="ks">dedicated resources</div></div>
    </div>
    <div class="sh"><h2>Resource Allocation &amp; Cost Breakdown</h2></div>
    <table>
      <thead><tr><th>Resource / Role</th><th class="c">Day Rate</th><th class="c">Days</th><th class="c">Total Cost</th><th class="c">% Share</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="total-row">
      <span>TOTAL</span><span></span>
      <span class="c">${totalDays}</span>
      <span class="gold">${currSym}${Math.round(total).toLocaleString()}</span>
      <span class="c" style="color:#E2E8F0">100%</span>
    </div>
    <div class="sh"><h2>Implementation Timeline — ${totalWeeks} Weeks</h2></div>
    ${ganttBars}
    <div class="legend">${legend}</div>
    <div class="ms-row">
      <div class="ms ms1">✓ Implementation Kick-Off</div>
      <div class="ms ms2">✓ Configuration Approved</div>
      <div class="ms ms3">✓ Final Sign-Off &amp; Go-Live</div>
    </div>
    <div class="disc"><strong>Important Notice:</strong> ${importantNotice.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
  </div>
  ${footerHTML}
</div>

</body></html>`;

  return html;
}


// Download as HTML file
function downloadProposal(months, computed, phases, clientName, importantNotice, currSym) {
  const html = exportProposal(months, computed, phases, clientName, importantNotice, currSym);
  const blob = new Blob([html], { type:"text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Avature_Proposal${clientName?"_"+clientName.replace(/\s+/g,"_"):""}_${months}mo.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// Open in new tab + auto-trigger print dialog so user saves as PDF
function printProposal(months, computed, phases, clientName, importantNotice, currSym) {
  const html = exportProposal(months, computed, phases, clientName, importantNotice, currSym);
  const closeScript = ["</scr", "ipt>"].join("");
  const printHTML = html.replace("</body>", `<script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 600);
    };
  ${closeScript}</body>`);
  const blob = new Blob([printHTML], { type:"text/html" });
  const url = URL.createObjectURL(blob);
  const newTab = window.open(url, "_blank");
  if (!newTab) {
    // Fallback if popups are blocked — show alert
    alert("Please allow pop-ups for this site, then try again. Or use the HTML download instead.");
  }
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}

// ─── AI MATURITY TOOL ─────────────────────────────────────────────────────────
const AI_QUESTIONS = [
  { id:"Q1",  stage:"ATTRACT", category:"AI Content Generation",   question:"Are job descriptions, career site content, and candidate communications created or enhanced using AI tools?", roi:"Efficiency", scores:["All content manually written with no standardisation or reuse. No AI assistance available or considered.","Team has discussed using AI or templates, but no tools are active. Some recruiters experiment informally.","Copilot or AI tools used for drafts by some recruiters in limited regions. Adoption inconsistent.","Most job ads and communications generated with Copilot; consistently reviewed with brand guidelines. Usage tracked.","Job ads created with skills-tagging, tone controls, brand compliance, translation, and full Copilot automation."] },
  { id:"Q2",  stage:"ATTRACT", category:"Skills & Taxonomy",        question:"Are job ads enriched with structured skills data and connected to a central taxonomy?", roi:"Strategic", scores:["Job ads do not contain structured or inferred skills. No job/role taxonomy exists.","Some jobs manually tagged with skills; no inference, consistency, or connection to broader architecture.","Skills pulled from HRIS or copy-pasted into job templates. Job architecture exists but not connected to TA processes.","Jobs enriched with validated skills from enterprise taxonomy. Roles mapped to taxonomy in CRM/ATS and synced to job ads.","Skills inferred from role context and used in search optimisation. Ontology maintained centrally across HRIS, CRM, and planning."] },
  { id:"Q3",  stage:"ATTRACT", category:"Campaign Orchestration",   question:"Are sourcing campaigns, candidate nurturing, and event follow-ups automated and segmented by role/skills/behaviour?", roi:"Efficiency", scores:["No email or nurture campaigns in use. All outreach manual and ad hoc.","Manual email sends by recruiters to limited talent pools. Basic lists in spreadsheets.","Drip campaigns created by CRM leads for priority roles. Basic segmentation by job family. Time-based but not behaviour-based.","Campaigns triggered by candidate activity or time-lapse rules. Dynamic content blocks with analytics.","Campaigns AI-curated and optimised by engagement behaviour. Content adapts to interactions. AI dynamically reweights channels."] },
  { id:"Q4",  stage:"ATTRACT", category:"Proactive Sourcing",       question:"Are passive candidates pre-pipelined before requisitions open using job family logic and AI recommendations?", roi:"Strategic", scores:["Pipelining only after job posted. No proactive sourcing. Recruiters start from scratch with each new requisition.","Ad hoc pre-req sourcing in one or two high-volume areas. Not systematic.","Evergreen requisitions or placeholder pools exist for common roles. Pools manually maintained and not refreshed regularly.","Pools tied to job families. Recruiters pre-source for priority roles using CRM workflows.","AI suggests and ranks candidates for pre-reqs based on forecast and readiness. Copilot recommends leads before requisition approval."] },
  { id:"Q5",  stage:"ATTRACT", category:"Performance Optimisation", question:"Is engagement data used to refine content, optimise channels, and improve candidate journeys?", roi:"Experience", scores:["No tracking or visibility into job ad, campaign, or career site performance. No analytics exist.","Some UTM tracking or anecdotal feedback. Basic source-of-apply data exists but not analysed.","Basic source-of-apply tracking in one region or job board. Data reviewed quarterly but not used to drive changes.","Ad performance metrics visible in CRM or career site dashboard. Insights used to A/B test content and channels.","AI suggests real-time optimisations based on audience and performance. AI personalises full site experience."] },
  { id:"Q6",  stage:"HIRE",    category:"AI Matching",              question:"Are candidates ranked using skills-based AI matching with explainable scoring visible to recruiters?", roi:"Efficiency", scores:["Recruiters manually search and rank candidates without AI. All evaluation based on keyword search and personal judgement.","Matching engine enabled but not trusted or actively used. Scoring logic unclear. Recruiters prefer manual review.","AI matching used to rank candidates in limited requisitions without scoring explanation.","AI matching with scoring used and visible to most recruiters. Explainability dashboard adopted.","Explainability, scoring, and match logic embedded and trusted org-wide. Match quality improves over time through feedback."] },
  { id:"Q7",  stage:"HIRE",    category:"Talent Discovery",         question:"Do recruiters use semantic search, AI-suggested synonyms, and automated rediscovery of past candidates?", roi:"Efficiency", scores:["Recruiters search using keywords and Boolean only. Past applicants not revisited. No synonym expansion.","Some search expansions using synonym libraries or filters. No AI assistance in broadening terms.","Copilot or AI assists with simple term rewrites. Silver medallists tagged manually in some reqs.","Recruiters use Copilot or semantic search to broaden pipelines. Rediscovery automations resurface candidates for similar roles.","AI proactively suggests pipeline leads based on inferred fit. AI continuously mines pools for role fit and mobility."] },
  { id:"Q8",  stage:"HIRE",    category:"Screening Automation",     question:"Are screening workflows, shortlisting, and candidate routing automated with triggers and AI summaries?", roi:"Efficiency", scores:["Recruiters manually screen all resumes with no automation. Every application requires manual review.","Rules or tags used to filter applications in bulk. Basic pass/fail criteria.","Workflows route candidates based on survey or form inputs. Some conditional logic.","AI-generated summaries or scores used to prioritise reviews. Automated routing sends qualified candidates to hiring managers.","Copilot and workflows automate initial review and routing. Screening logic adapts based on performance and feedback."] },
  { id:"Q9",  stage:"HIRE",    category:"Scheduling Automation",    question:"Are interviews coordinated through self-scheduling, conflict-aware automation, or AI-powered tools?", roi:"Efficiency", scores:["Recruiters manually coordinate all interviews via email. Significant coordination time required.","Calendars shared, but scheduling still email-based. Recruiters can see availability but manually propose times.","Basic time slot tools used for select roles. Candidates pick from available times.","Candidate self-scheduling enabled via integrated workflows. Conflict detection for panel interviews.","Conflict-aware automation routes to best-fit slots. AI considers time zones, preferences, panel availability."] },
  { id:"Q10", stage:"HIRE",    category:"Bias & Feedback Quality",  question:"Are AI decisions logged, monitored for bias, and supported by structured hiring manager feedback loops?", roi:"Strategic", scores:["No logging or monitoring of AI-assisted decisions. No structured feedback from hiring managers.","Some manual review of AI decisions post-hire. Feedback collected informally.","AI decisions logged in system. Periodic review by TA ops or compliance team.","Bias monitoring dashboards in use. Structured feedback loops from hiring managers feed scoring adjustments.","Full audit trail of AI decisions. Bias metrics reviewed quarterly. Feedback loops continuously improve AI model accuracy."] },
  { id:"Q11", stage:"DEVELOP", category:"Skills Gap Analysis",      question:"Are skill gaps visible at individual/team level and connected to development plans?", roi:"Strategic", scores:["No visibility into skill gaps. Development planning done ad hoc without data.","Skill gaps identified manually during performance reviews. No connection to development plans.","Skills assessments exist in some business units. Gap data not connected to learning recommendations.","Skills gaps visible in talent profiles. Managers can see team-level gaps. Connected to development plan workflows.","AI-generated gap analysis surfaced proactively. Skills forecasts drive development planning. Connected to internal mobility and succession."] },
  { id:"Q12", stage:"DEVELOP", category:"Development Insights",     question:"Are AI-generated insights available to managers and employees to guide development priorities?", roi:"Experience", scores:["No AI-driven development insights. Managers rely on instinct or HR guidance.","Generic development prompts available but not personalised to role or skills profile.","Learning recommendations exist in LMS but not connected to skills data or career paths.","AI-generated insights surfaced to managers at review cycles. Employees see recommended skills to develop.","Real-time AI nudges guide employees and managers. Insights connected to role market trends, internal mobility, and succession data."] },
  { id:"Q13", stage:"DEVELOP", category:"Learning Automation",      question:"Are learning nudges, enablement content, and skill-building pathways automated and personalised?", roi:"Efficiency", scores:["Learning is self-directed with no automation or personalisation.","Some role-based learning paths exist. Manually curated by L&D team.","Learning paths connected to job profile. Completion tracked but nudges are manual.","Automated nudges triggered by skills gaps or role changes. Content recommended based on profile.","AI personalises learning pathways dynamically. Nudges adapt based on engagement, progress, and business priorities."] },
  { id:"Q14", stage:"DEVELOP", category:"Ontology Stewardship",     question:"Is the enterprise skills taxonomy actively managed with designated ownership and a refresh cadence?", roi:"Governance", scores:["No formal skills taxonomy in use. Skills data fragmented across systems.","Taxonomy exists but ownership is unclear. Last updated over a year ago.","Taxonomy maintained by HR ops. Annual refresh. Not connected to TA or L&D workflows.","Taxonomy owned by defined team. Quarterly review. Connected to job architecture and learning content.","Taxonomy governed by cross-functional team. Continuous improvement cycle. Integrated across HRIS, CRM, ATS, and LMS."] },
  { id:"Q15", stage:"DEVELOP", category:"Proficiency Management",   question:"Are skill proficiencies rated, validated by managers, and used in talent decisions?", roi:"Strategic", scores:["No proficiency ratings in use. Skills treated as binary present/absent.","Proficiency levels exist in system but self-assessed only. Rarely used in talent decisions.","Manager validation of proficiencies available but inconsistently used.","Proficiency ratings validated by managers and used in succession and mobility decisions.","AI infers proficiency from activity signals. Validated ratings feed AI matching, succession planning, and external hiring decisions."] },
  { id:"Q16", stage:"RETAIN",  category:"Internal Matching",        question:"Are employees matched to internal opportunities using AI and skills-based logic?", roi:"Strategic", scores:["No internal opportunity matching. Employees find roles through word of mouth or manual search.","Internal job board exists but no AI matching. Employees search manually.","Basic matching by job family or department. Not skills-based.","AI matching surfaces relevant internal roles to employees based on profile and skills.","AI proactively recommends internal moves before employees search. Matches include lateral, stretch, and project opportunities."] },
  { id:"Q17", stage:"RETAIN",  category:"Mobility Automation",      question:"Are mobility campaigns automated and internal transitions supported by structured workflows?", roi:"Efficiency", scores:["Internal moves handled ad hoc. No campaigns or workflows to support transitions.","Some internal hiring processes documented but not automated.","Internal move workflows exist for select role types. No automated campaigns.","Mobility campaigns automated. Employees notified of relevant opportunities based on profile triggers.","End-to-end mobility journeys automated from interest to onboarding. AI optimises campaign timing and targeting."] },
  { id:"Q18", stage:"RETAIN",  category:"Mobility Intelligence",    question:"Are mobility patterns tracked across dimensions (dept, level, DEI) and used to inform retention strategy?", roi:"Strategic", scores:["No mobility data tracked. Retention strategy based on exit interviews and anecdote.","Basic headcount movement tracked in HRIS. Not analysed for patterns.","Mobility data available in reports. Reviewed periodically by HR leadership.","Mobility trends analysed by department, level, and demographics. Insights inform retention planning.","Predictive models flag flight risk and mobility readiness. AI links mobility patterns to engagement and performance outcomes."] },
  { id:"Q19", stage:"RETAIN",  category:"Opportunity Ecosystem",    question:"Can employees access an opportunity marketplace with mentoring, projects, and stretch assignments?", roi:"Experience", scores:["No opportunity marketplace. Employees have limited visibility of development or stretch options.","Ad hoc mentoring and project work. No central platform.","Internal project board or mentoring programme exists but participation is low.","Opportunity marketplace live with projects, mentoring, and stretch assignments. Employee uptake tracked.","AI-powered marketplace personalises opportunities to employee profile, aspirations, and skills gaps."] },
  { id:"Q20", stage:"PLAN",    category:"Workforce Forecasting",    question:"Are predictive tools used to forecast role and skill demand, linked to business planning cycles?", roi:"Strategic", scores:["Workforce planning based on headcount targets only. No predictive capability.","Basic demand forecasting done in spreadsheets. Disconnected from business planning.","Forecasting tool in use but data quality inconsistent. Limited stakeholder trust.","Predictive demand models connected to business planning cycle. Scenarios modelled by HR and finance.","AI forecasts demand by role, skill, location, and business unit. Connected to financial planning and real-time workforce data."] },
  { id:"Q21", stage:"PLAN",    category:"Scenario Planning",        question:"Can leaders model organisational change impacts using unified workforce data?", roi:"Strategic", scores:["No scenario planning capability. Leaders rely on static headcount data.","Scenario modelling done in spreadsheets. No integration with live workforce data.","Basic what-if modelling available in planning tool. Limited to headcount changes.","Leaders can model restructures, growth scenarios, and skill redeployment using integrated workforce data.","AI generates recommended scenarios based on market signals and internal data. Modelling includes cost, skills, and DEI impact."] },
  { id:"Q22", stage:"PLAN",    category:"Planning Governance",      question:"Is there cross-functional governance reviewing KPIs, with planning connected to TA and L&D execution?", roi:"Governance", scores:["No governance structure for workforce planning. HR plans in isolation.","Occasional planning reviews with HR leadership. KPIs not formalised.","Quarterly workforce planning reviews with HR. Loosely connected to TA hiring plans.","Cross-functional governance with HR, Finance, and business leaders. KPIs tracked. Connected to TA pipeline and L&D programmes.","Executive-sponsored governance with quarterly board-level reporting. Planning outcomes drive TA, L&D, and total rewards decisions."] },
  { id:"Q23", stage:"MEASURE", category:"Unified Analytics",        question:"Are CRM, ATS, and HRIS data unified with predictive analytics accessible to TA and HR leaders?", roi:"Strategic", scores:["Data sits in separate systems. No unified view. Leaders rely on manual exports.","Basic reporting available in each system. Some manual consolidation by HR ops.","Cross-system dashboards exist but data quality issues undermine trust.","Unified analytics platform used by TA and HR leaders. Key metrics tracked across the talent lifecycle.","AI-powered analytics surface predictive insights. Leaders receive proactive alerts and trend analysis across all talent data."] },
  { id:"Q24", stage:"MEASURE", category:"Data & Compliance",        question:"Are data accuracy, duplication, and compliance rules (opt-in, GDPR, data decay) actively managed?", roi:"Governance", scores:["No data governance policy in place. Compliance managed reactively.","Basic GDPR processes in place. Data quality managed manually by HR ops.","Data hygiene rules configured in system. Duplication and opt-in managed with some automation.","Data governance policy active. Automated compliance workflows. Regular audits with documented outcomes.","Proactive data governance with AI-flagged anomalies. Full audit trails. GDPR and regional compliance automated end-to-end."] },
  { id:"Q25", stage:"MEASURE", category:"ROI & Ethics",             question:"Are ROI metrics reviewed quarterly, governance/ethics policies maintained, and outcomes shared with leadership?", roi:"Governance", scores:["No ROI measurement. Ethics policies not documented.","ROI tracked informally. Ethics guidelines exist but not actively enforced.","Quarterly ROI review by HR leadership. Ethics policy documented.","ROI metrics shared with business leadership. Ethics governance reviewed semi-annually. Linked to AI tool procurement.","Exec-level ROI reporting. Ethics board or committee reviewing AI use. Outcomes published internally. Continuous improvement cycle."] },
];

const AI_STAGES = ["ATTRACT","HIRE","DEVELOP","RETAIN","PLAN","MEASURE"];
const AI_STAGE_RANGES = { ATTRACT:[0,4], HIRE:[5,9], DEVELOP:[10,14], RETAIN:[15,18], PLAN:[19,21], MEASURE:[22,24] };
const AI_ROI_COLOR = { Efficiency:"#3b82f6", Strategic:"#8b5cf6", Experience:"#10b981", Governance:"#f59e0b" };
const AI_SCORE_LABELS = ["Pre-Activation","Foundational","Emerging","Developing","Advanced"];
const AI_SCORE_COLORS = ["#ef4444","#f97316","#eab308","#22c55e","#6366f1"];

function aiGetMaturity(score) {
  if (score === null || score === undefined) return { label:"—", color:"#475569" };
  return { label: AI_SCORE_LABELS[Math.min(Math.floor(score), 4)], color: AI_SCORE_COLORS[Math.min(Math.floor(score), 4)] };
}
function aiAvg(arr) {
  const valid = arr.filter(v => v !== null && v !== undefined);
  return valid.length ? valid.reduce((a,b)=>a+b,0)/valid.length : null;
}

const AI_INTEL_IDS = ["Q1","Q2","Q5","Q6","Q11","Q12","Q16","Q18","Q19","Q20","Q23"];
const AI_AUTO_IDS  = ["Q3","Q4","Q8","Q9","Q13","Q17","Q21","Q24"];
const AI_GOV_IDS   = ["Q2","Q10","Q14","Q15","Q22","Q24","Q25"];

function AIMaturityTool({ onBack, initialData, guestMode }) {
  const [scores, setScores] = useState(initialData?.scores || {});
  const [view, setView] = useState("assessment");
  const [currentStage, setCurrentStage] = useState("ATTRACT");
  const [clientName, setClientName] = useState(initialData?.client_name || "");
  const [clientOrg, setClientOrg] = useState(initialData?.client_org || "");
  const [shareEmail, setShareEmail] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(null);
  const [loadedId, setLoadedId] = useState(initialData?.id || null);
  const [submitted, setSubmitted] = useState(false);

  const handleGuestSubmit = async () => {
    setSaving(true);
    try {
      const stageScoresSnap = {};
      for (const [stage, [s,e]] of Object.entries(AI_STAGE_RANGES)) {
        stageScoresSnap[stage] = aiAvg(AI_QUESTIONS.slice(s,e+1).map(q => scores[q.id] ?? null));
      }
      const overallSnap = aiAvg(AI_QUESTIONS.map(q => scores[q.id] ?? null));
      await db.saveAssessment({
        client_name: clientName || null,
        client_org: clientOrg || null,
        scores,
        overall_score: overallSnap !== null ? Math.round(overallSnap * 100) / 100 : null,
        stage_scores: stageScoresSnap,
      });
      setSubmitted(true);
    } catch(e) {
      alert("Submit failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAssessment = async () => {
    setSaving(true);
    try {
      const stageScoresSnap = {};
      for (const [stage, [s,e]] of Object.entries(AI_STAGE_RANGES)) {
        stageScoresSnap[stage] = aiAvg(AI_QUESTIONS.slice(s,e+1).map(q => scores[q.id] ?? null));
      }
      const overallSnap = aiAvg(AI_QUESTIONS.map(q => scores[q.id] ?? null));
      const payload = {
        client_name: clientName || null,
        client_org: clientOrg || null,
        scores,
        overall_score: overallSnap !== null ? Math.round(overallSnap * 100) / 100 : null,
        stage_scores: stageScoresSnap,
      };
      if (loadedId) {
        await db.updateAssessment(loadedId, payload);
      } else {
        const result = await db.saveAssessment(payload);
        if (result && result[0]) setLoadedId(result[0].id);
      }
      setSavedToast("Assessment saved ✓");
      setTimeout(() => setSavedToast(null), 3000);
    } catch(e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const answered = Object.keys(scores).length;
  const total = AI_QUESTIONS.length;

  const stageScores = useMemo(() => {
    const out = {};
    for (const [stage, [s,e]] of Object.entries(AI_STAGE_RANGES)) {
      out[stage] = aiAvg(AI_QUESTIONS.slice(s,e+1).map(q => scores[q.id] ?? null));
    }
    return out;
  }, [scores]);

  const overall = useMemo(() => aiAvg(AI_QUESTIONS.map(q => scores[q.id] ?? null)), [scores]);
  const intelScore = useMemo(() => aiAvg(AI_INTEL_IDS.map(id => scores[id] ?? null)), [scores]);
  const autoScore  = useMemo(() => aiAvg(AI_AUTO_IDS.map(id => scores[id] ?? null)), [scores]);
  const govScore   = useMemo(() => aiAvg(AI_GOV_IDS.map(id => scores[id] ?? null)), [scores]);

  const stageQs = AI_QUESTIONS.filter(q => q.stage === currentStage);
  const stageIdx = AI_STAGES.indexOf(currentStage);
  const stageDone = stageQs.filter(q => scores[q.id] !== undefined).length;

  const handleShare = () => {
    const scoreStr = AI_QUESTIONS.map(q => scores[q.id] !== undefined ? scores[q.id] : "").join(",");
    const url = window.location.href.split("?")[0] + "?tool=ai-maturity&client=" + encodeURIComponent(clientName) + "&org=" + encodeURIComponent(clientOrg) + "&s=" + encodeURIComponent(scoreStr);
    const subject = "Avature AI Maturity Self-Assessment" + (clientOrg ? " — " + clientOrg : "");
    const body = "Hi" + (clientName ? " " + clientName : "") + ",\n\nPlease use the link below to complete your Avature AI Maturity Self-Assessment.\n\nThis assessment evaluates your organisation's AI readiness across six dimensions: Attract, Hire, Develop, Retain, Plan, and Measure.\n\nStart your assessment here:\n" + url + "\n\nIf you have any questions, please don't hesitate to reach out.\n\nBest regards,\nAvature Professional Services";
    window.location.href = "mailto:" + encodeURIComponent(shareEmail) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    setShowShareModal(false);
  };

  // Guest mode: thank you screen after submit
  if (guestMode && submitted) {
    return (
      <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#0b1120", minHeight:"100vh", color:"#e2e8f0", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center", maxWidth:480, padding:"40px 24px" }}>
          <div style={{ fontSize:56, marginBottom:24 }}>✅</div>
          <h1 style={{ fontSize:26, fontWeight:700, color:"#f8fafc", margin:"0 0 12px" }}>Thank you{clientName ? ", " + clientName : ""}!</h1>
          <p style={{ fontSize:15, color:"#64748b", lineHeight:1.7, margin:"0 0 8px" }}>
            Your AI Maturity Assessment has been submitted successfully.
          </p>
          {clientOrg && <p style={{ fontSize:13, color:"#475569" }}>Submitted on behalf of <strong style={{ color:"#94a3b8" }}>{clientOrg}</strong></p>}
          <p style={{ fontSize:13, color:"#334155", marginTop:24 }}>The Avature Professional Services team will be in touch with your results and recommendations.</p>
          <div style={{ marginTop:32, padding:"16px 20px", background:"#0f172a", border:"1px solid #1e293b", borderRadius:12 }}>
            <img src={LOGO_URI} alt="Avature" style={{ height:18, filter:"brightness(0) invert(1)", opacity:0.5 }}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#0b1120", minHeight:"100vh", color:"#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        .ai-score-btn{transition:all 0.15s}
        .ai-score-btn:hover{filter:brightness(1.15)}
        .ai-stage-btn{transition:all 0.15s}
        .ai-stage-btn:hover{background:#1e293b!important;color:#f8fafc!important}
        .ai-share-input:focus{border-color:#6366f1!important;outline:none;box-shadow:0 0 0 3px #6366f133}
      `}</style>

      {/* Share Modal */}
      {showShareModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"36px 32px", width:"100%", maxWidth:440, boxShadow:"0 24px 64px rgba(0,0,0,0.6)" }}>
            <h3 style={{ margin:"0 0 6px", fontSize:17, fontWeight:700, color:"#f8fafc" }}>Share Assessment</h3>
            <p style={{ margin:"0 0 24px", fontSize:13, color:"#475569", lineHeight:1.6 }}>Send this assessment to a client to complete. You can pre-fill their name and organisation so it's personalised when they open it.</p>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:11, color:"#94a3b8", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Client Name</label>
              <input className="ai-share-input" value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="e.g. Sarah Johnson" style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#f8fafc", padding:"10px 14px", fontSize:13, transition:"border-color 0.2s, box-shadow 0.2s" }}/>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:11, color:"#94a3b8", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Organisation</label>
              <input className="ai-share-input" value={clientOrg} onChange={e=>setClientOrg(e.target.value)} placeholder="e.g. Acme Corp" style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#f8fafc", padding:"10px 14px", fontSize:13, transition:"border-color 0.2s, box-shadow 0.2s" }}/>
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ display:"block", fontSize:11, color:"#94a3b8", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>Send To (Email)</label>
              <input className="ai-share-input" type="email" value={shareEmail} onChange={e=>setShareEmail(e.target.value)} placeholder="client@company.com" style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#f8fafc", padding:"10px 14px", fontSize:13, transition:"border-color 0.2s, box-shadow 0.2s" }}/>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={handleShare} disabled={!shareEmail} style={{ flex:1, background: shareEmail ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "#1e293b", border:"none", borderRadius:8, color: shareEmail ? "white" : "#475569", padding:"11px", fontSize:13, fontWeight:600, cursor: shareEmail ? "pointer" : "not-allowed", transition:"all 0.2s" }}>
                ✉ Open in Mail App
              </button>
              <button onClick={()=>setShowShareModal(false)} style={{ padding:"11px 20px", background:"transparent", border:"1px solid #334155", borderRadius:8, color:"#64748b", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)", borderBottom:"1px solid #1e293b", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <img src={LOGO_URI} alt="Avature" style={{ height:20, filter:"brightness(0) invert(1)" }}/>
          <div style={{ width:1, height:18, background:"#334155" }}/>
          {!guestMode && (
            <>
              <button onClick={onBack} style={{ background:"none", border:"none", padding:0, cursor:"pointer", color:"#475569", fontSize:13, fontFamily:"inherit", transition:"color 0.2s" }} onMouseOver={e=>e.currentTarget.style.color="#94a3b8"} onMouseOut={e=>e.currentTarget.style.color="#475569"}>Tools</button>
              <span style={{ color:"#334155", fontSize:13 }}>›</span>
            </>
          )}
          <span style={{ fontSize:13, color:"#94a3b8", fontWeight:500 }}>AI Maturity Assessment</span>
          {clientOrg && <span style={{ fontSize:12, color:"#6366f1", fontWeight:600, background:"#1e1b4b", padding:"2px 10px", borderRadius:20, border:"1px solid #6366f133" }}>{clientOrg}</span>}
          <div style={{ fontSize:12, color:"#475569", borderLeft:"1px solid #1e293b", paddingLeft:16 }}>
            <span style={{ color: answered===total ? "#22c55e" : "#94a3b8", fontWeight:600 }}>{answered}</span>
            <span style={{ color:"#334155" }}>/{total} answered</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {guestMode ? (
            <button onClick={handleGuestSubmit} disabled={saving || answered === 0}
              style={{ padding:"8px 20px", borderRadius:6, border:"none",
                background: answered === 0 ? "#1e293b" : "linear-gradient(135deg,#6366f1,#4f46e5)",
                color: answered === 0 ? "#334155" : "#fff", fontSize:13, fontWeight:600,
                cursor: answered === 0 ? "not-allowed" : "pointer", fontFamily:"inherit",
                boxShadow: answered > 0 ? "0 2px 12px #6366f144" : "none",
              }}>
              {saving ? "Submitting…" : answered === 0 ? "Answer questions to submit" : `Submit Assessment (${answered}/${total})`}
            </button>
          ) : (
            <>
              <div style={{ position:"relative" }}>
                <button onClick={handleSaveAssessment} disabled={saving || answered === 0}
                  style={{ padding:"7px 16px", borderRadius:6, border:"1px solid", borderColor: answered === 0 ? "#1e293b" : "#334155",
                    background:"transparent", color: answered === 0 ? "#334155" : "#94a3b8", fontSize:12, fontWeight:600,
                    cursor: answered === 0 ? "not-allowed" : "pointer", fontFamily:"inherit",
                  }}
                  onMouseOver={e=>{ if(answered>0 && !saving){ e.currentTarget.style.borderColor="#6366f1"; e.currentTarget.style.color="#6366f1"; }}}
                  onMouseOut={e=>{ e.currentTarget.style.borderColor= answered===0?"#1e293b":"#334155"; e.currentTarget.style.color= answered===0?"#334155":"#94a3b8"; }}>
                  {saving ? "Saving…" : "☁ Save"}
                </button>
                {savedToast && (
                  <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"#14532D", border:"1px solid #166534", color:"#4ADE80", borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, whiteSpace:"nowrap", zIndex:99 }}>
                    {savedToast}
                  </div>
                )}
              </div>
              <button onClick={()=>setShowShareModal(true)} style={{ padding:"7px 16px", borderRadius:6, border:"1px solid #334155", background:"transparent", color:"#94a3b8", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                ✉ Share
              </button>
            </>
          )}
          {["assessment","dashboard"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding:"7px 16px", borderRadius:6, border:"1px solid", borderColor: view===v ? "#6366f1" : "#1e293b", background: view===v ? "#6366f1" : "transparent", color: view===v ? "#fff" : "#64748b", fontSize:12, fontWeight:600, cursor:"pointer" }}>
              {v === "assessment" ? "Assessment" : "Dashboard"}
            </button>
          ))}
        </div>
      </div>

      {/* Client identity banner — shown when names are set */}
      {(clientName || clientOrg) && (
        <div style={{ background:"#0f172a", borderBottom:"1px solid #1e293b", padding:"10px 28px", display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ fontSize:11, color:"#475569", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>Completing for:</span>
          {clientName && <span style={{ fontSize:13, color:"#f8fafc", fontWeight:600 }}>{clientName}</span>}
          {clientName && clientOrg && <span style={{ color:"#334155" }}>·</span>}
          {clientOrg && <span style={{ fontSize:13, color:"#94a3b8" }}>{clientOrg}</span>}
          <button onClick={()=>setShowShareModal(true)} style={{ marginLeft:"auto", fontSize:11, color:"#475569", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", padding:0 }}>Edit details</button>
        </div>
      )}

      {/* No client yet — prompt */}
      {!clientName && !clientOrg && (
        <div style={{ background:"#0f172a", borderBottom:"1px solid #1e293b", padding:"10px 28px", display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:12, color:"#475569" }}>Add client details to personalise this assessment</span>
          <button onClick={()=>setShowShareModal(true)} style={{ fontSize:12, color:"#6366f1", background:"none", border:"1px solid #6366f133", borderRadius:6, cursor:"pointer", fontFamily:"inherit", padding:"4px 12px", fontWeight:600 }}>+ Add details / Share</button>
        </div>
      )}

      {view === "assessment" && (
        <div style={{ display:"flex", minHeight:"calc(100vh - 100px)" }}>
          {/* Stage sidebar */}
          <div style={{ width:155, background:"#0a0f1e", borderRight:"1px solid #1e293b", flexShrink:0, position:"sticky", top:100, height:"calc(100vh - 100px)", overflowY:"auto" }}>
            {AI_STAGES.map(stage => {
              const [s,e] = AI_STAGE_RANGES[stage];
              const qs = AI_QUESTIONS.slice(s,e+1);
              const done = qs.filter(q => scores[q.id] !== undefined).length;
              const sc = stageScores[stage];
              const active = currentStage === stage;
              return (
                <button key={stage} className="ai-stage-btn" onClick={() => setCurrentStage(stage)} style={{ width:"100%", padding:"14px 16px", background: active ? "#1e293b" : "transparent", border:"none", borderLeft:"3px solid " + (active ? "#6366f1" : "transparent"), color: active ? "#f8fafc" : "#64748b", textAlign:"left", cursor:"pointer", fontSize:12, fontWeight: active ? 700 : 400 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <span>{stage}</span>
                    {sc !== null && <span style={{ fontSize:11, fontWeight:800, color:aiGetMaturity(sc).color }}>{sc.toFixed(1)}</span>}
                  </div>
                  <div style={{ display:"flex", gap:2, marginBottom:4 }}>
                    {qs.map(q => (<div key={q.id} style={{ width:8, height:4, borderRadius:2, background: scores[q.id] !== undefined ? AI_SCORE_COLORS[scores[q.id]] : "#1e293b" }} />))}
                  </div>
                  <div style={{ fontSize:10, color:"#334155" }}>{done}/{qs.length}</div>
                </button>
              );
            })}
          </div>

          {/* Questions */}
          <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:"#f8fafc" }}>{currentStage}</h2>
                <p style={{ margin:"3px 0 0", fontSize:12, color:"#475569" }}>{stageDone}/{stageQs.length} answered · Score each question 0–4</p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {stageIdx > 0 && <button onClick={() => setCurrentStage(AI_STAGES[stageIdx-1])} style={{ padding:"6px 14px", borderRadius:6, border:"1px solid #1e293b", background:"transparent", color:"#64748b", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>← {AI_STAGES[stageIdx-1]}</button>}
                {stageIdx < AI_STAGES.length-1 && <button onClick={() => setCurrentStage(AI_STAGES[stageIdx+1])} style={{ padding:"6px 14px", borderRadius:6, border:"1px solid #1e293b", background:"#1e293b", color:"#e2e8f0", fontSize:12, cursor:"pointer", fontWeight:600, fontFamily:"inherit" }}>{AI_STAGES[stageIdx+1]} →</button>}
              </div>
            </div>

            <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
              {AI_SCORE_LABELS.map((label, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", background:"#0f172a", border:"1px solid " + AI_SCORE_COLORS[i] + "33", borderRadius:20 }}>
                  <span style={{ fontSize:12, fontWeight:800, color:AI_SCORE_COLORS[i] }}>{i}</span>
                  <span style={{ fontSize:11, color:"#64748b" }}>{label}</span>
                </div>
              ))}
            </div>

            {stageQs.map((q) => {
              const selected = scores[q.id];
              const hasAnswer = selected !== undefined;
              return (
                <div key={q.id} style={{ background:"#0f172a", border:"1px solid " + (hasAnswer ? AI_SCORE_COLORS[selected]+"44" : "#1e293b"), borderRadius:10, marginBottom:16, overflow:"hidden" }}>
                  <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid #1e293b" }}>
                    <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"#6366f1", background:"#1e1b4b", padding:"2px 8px", borderRadius:10, letterSpacing:"0.05em" }}>{q.id}</span>
                      <span style={{ fontSize:11, color:"#64748b", background:"#1e293b", padding:"2px 8px", borderRadius:10 }}>{q.category}</span>
                      <span style={{ fontSize:10, color:AI_ROI_COLOR[q.roi], padding:"2px 8px", borderRadius:10, border:"1px solid " + AI_ROI_COLOR[q.roi] + "44" }}>{q.roi}</span>
                      {hasAnswer && <span style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:AI_SCORE_COLORS[selected], background:AI_SCORE_COLORS[selected]+"15", padding:"2px 10px", borderRadius:10 }}>{selected} · {AI_SCORE_LABELS[selected]}</span>}
                    </div>
                    <p style={{ margin:0, fontSize:14, color:"#cbd5e1", lineHeight:1.6, fontWeight:500 }}>{q.question}</p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0 }}>
                    {q.scores.map((desc, i) => {
                      const isSelected = selected === i;
                      return (
                        <button key={i} className="ai-score-btn" onClick={() => setScores(s => ({ ...s, [q.id]: i }))} style={{ padding:"12px 14px", background: isSelected ? AI_SCORE_COLORS[i]+"18" : "transparent", border:"none", borderRight: i < 4 ? "1px solid #1e293b" : "none", borderTop: isSelected ? "2px solid "+AI_SCORE_COLORS[i] : "2px solid transparent", color:"inherit", textAlign:"left", cursor:"pointer" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                            <span style={{ fontSize:16, fontWeight:800, color: isSelected ? AI_SCORE_COLORS[i] : "#94a3b8" }}>{i}</span>
                            <span style={{ fontSize:9, fontWeight:700, color: isSelected ? AI_SCORE_COLORS[i] : "#64748b", letterSpacing:"0.08em", textTransform:"uppercase" }}>{AI_SCORE_LABELS[i]}</span>
                          </div>
                          <p style={{ margin:0, fontSize:11, color: isSelected ? "#cbd5e1" : "#94a3b8", lineHeight:1.5 }}>{desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {stageDone === stageQs.length && stageIdx < AI_STAGES.length-1 && (
              <div style={{ textAlign:"center", padding:"20px 0 8px" }}>
                <button onClick={() => setCurrentStage(AI_STAGES[stageIdx+1])} style={{ padding:"10px 28px", background:"#6366f1", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Continue to {AI_STAGES[stageIdx+1]} →</button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === "dashboard" && (
        <div style={{ padding:"28px 32px", maxWidth:1000, margin:"0 auto" }}>
          {answered < 5 ? (
            <div style={{ textAlign:"center", padding:"80px 20px", color:"#475569" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📊</div>
              <p style={{ fontSize:15 }}>Answer at least 5 questions to see your dashboard.</p>
              <button onClick={() => setView("assessment")} style={{ marginTop:16, padding:"10px 24px", background:"#6366f1", color:"#fff", border:"none", borderRadius:6, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Go to Assessment</button>
            </div>
          ) : (
            <>
              {(clientName || clientOrg) && (
                <div style={{ marginBottom:24 }}>
                  <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#f8fafc" }}>
                    AI Maturity Report{clientOrg ? " — " + clientOrg : ""}
                  </h2>
                  {clientName && <p style={{ margin:"4px 0 0", fontSize:13, color:"#475569" }}>Completed by {clientName}</p>}
                </div>
              )}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:14, marginBottom:24 }}>
                {[
                  { label:"Overall Maturity", score:overall, sub:answered+"/"+total+" answered" },
                  { label:"Intelligence", score:intelScore, sub:"Content & discovery" },
                  { label:"Automation", score:autoScore, sub:"Campaigns & workflows" },
                  { label:"Governance", score:govScore, sub:"Data, AI & compliance" },
                ].map(({ label, score, sub }) => {
                  const m = aiGetMaturity(score);
                  return (
                    <div key={label} style={{ background:"#0f172a", border:"1px solid "+(score !== null ? m.color+"44" : "#1e293b"), borderRadius:8, padding:"18px 20px" }}>
                      <div style={{ fontSize:11, color:"#64748b", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</div>
                      <div style={{ display:"flex", alignItems:"baseline", gap:8, margin:"8px 0 4px" }}>
                        <span style={{ fontSize:32, fontWeight:800, color: score !== null ? m.color : "#334155" }}>{score !== null ? score.toFixed(1) : "—"}</span>
                        {score !== null && <span style={{ fontSize:11, color:m.color, fontWeight:600 }}>{m.label}</span>}
                      </div>
                      {score !== null && <div style={{ background:"#1e293b", borderRadius:4, height:5, overflow:"hidden", marginBottom:6 }}><div style={{ width:((score/4)*100)+"%", height:"100%", background:m.color, borderRadius:4 }}/></div>}
                      <div style={{ fontSize:10, color:"#334155" }}>{sub}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:8, padding:"22px", marginBottom:16 }}>
                <h3 style={{ margin:"0 0 18px", fontSize:14, fontWeight:700, color:"#f8fafc" }}>Maturity by Stage</h3>
                <div style={{ display:"grid", gap:12 }}>
                  {AI_STAGES.map(stage => {
                    const sc = stageScores[stage];
                    const m = aiGetMaturity(sc);
                    const [s,e] = AI_STAGE_RANGES[stage];
                    const qs = AI_QUESTIONS.slice(s,e+1);
                    const done = qs.filter(q => scores[q.id] !== undefined).length;
                    return (
                      <div key={stage}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                          <span style={{ fontSize:12, fontWeight:600, color:"#cbd5e1" }}>{stage}</span>
                          <span style={{ fontSize:12 }}>
                            {sc !== null ? <span style={{ color:m.color, fontWeight:700 }}>{sc.toFixed(1)} · {m.label}</span> : <span style={{ color:"#334155" }}>No data</span>}
                            <span style={{ color:"#334155" }}> ({done}/{qs.length})</span>
                          </span>
                        </div>
                        <div style={{ background:"#1e293b", borderRadius:4, height:8, overflow:"hidden" }}>
                          {sc !== null && <div style={{ width:((sc/4)*100)+"%", height:"100%", background:m.color, borderRadius:4, transition:"width 0.5s" }}/>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {(() => {
                const critical = AI_QUESTIONS.filter(q => scores[q.id] !== undefined && scores[q.id] < 2);
                const building = AI_QUESTIONS.filter(q => scores[q.id] !== undefined && scores[q.id] >= 2 && scores[q.id] < 3);
                if (!critical.length && !building.length) return null;
                return (
                  <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:8, padding:"22px" }}>
                    <h3 style={{ margin:"0 0 16px", fontSize:14, fontWeight:700, color:"#f8fafc" }}>Priority Recommendations</h3>
                    {critical.length > 0 && (
                      <div style={{ marginBottom:14 }}>
                        <div style={{ fontSize:11, fontWeight:700, color:"#ef4444", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>🔴 Critical Gaps — Score below 2</div>
                        {critical.map(q => (
                          <div key={q.id} style={{ display:"flex", gap:10, padding:"10px 14px", background:"#1a0a0a", border:"1px solid #3f1515", borderRadius:6, marginBottom:6 }}>
                            <span style={{ fontSize:10, fontWeight:700, color:"#ef4444", flexShrink:0, paddingTop:2 }}>{q.id}</span>
                            <div>
                              <div style={{ fontSize:12, fontWeight:600, color:"#fca5a5", marginBottom:2 }}>{q.category} <span style={{ color:"#64748b", fontWeight:400 }}>· {q.stage}</span></div>
                              <div style={{ fontSize:11, color:"#64748b" }}>{q.question}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {building.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:"#eab308", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>🟡 Building — Score 2 to 3</div>
                        {building.map(q => (
                          <div key={q.id} style={{ display:"flex", gap:10, padding:"10px 14px", background:"#1a1400", border:"1px solid #3d3000", borderRadius:6, marginBottom:6 }}>
                            <span style={{ fontSize:10, fontWeight:700, color:"#eab308", flexShrink:0, paddingTop:2 }}>{q.id}</span>
                            <div>
                              <div style={{ fontSize:12, fontWeight:600, color:"#fde68a", marginBottom:2 }}>{q.category} <span style={{ color:"#64748b", fontWeight:400 }}>· {q.stage}</span></div>
                              <div style={{ fontSize:11, color:"#64748b" }}>{q.question}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onSelectTool, onSignOut, onLoadPlan, onLoadAssessment }) {
  const tools = [
    { id:"calculator",  title:"Implementation Calculator",      description:"T&M scoping tool for Avature implementations. Configure phases, complexity, resources and export a professional proposal.", icon:"📊", status:"live",   color:"#1A6B7C" },
    { id:"proposal",    title:"Business Proposal Generator",    description:"Generate comprehensive, branded business proposals tailored to client requirements and Avature solutions.",               icon:"📋", status:"coming", color:"#2E6DB4" },
    { id:"ai-maturity", title:"AI Maturity Self-Assessment",    description:"Evaluate your organisation's AI readiness across key dimensions and receive a tailored roadmap.",                        icon:"🧠", status:"live",   color:"#7C3AED" },
  ];

  const [plans, setPlans] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [activeTab, setActiveTab] = useState("plans");

  useEffect(() => {
    async function load() {
      try {
        const [p, a] = await Promise.all([db.getImplementations(), db.getAssessments()]);
        setPlans(p || []);
        setAssessments(a || []);
      } catch(e) {
        setDbError("Could not load saved records — " + e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDeletePlan = async (id) => {
    if (!window.confirm("Delete this implementation plan?")) return;
    setDeleting(id);
    try {
      await db.deleteImplementation(id);
      setPlans(p => p.filter(x => x.id !== id));
    } catch(e) { alert("Delete failed: " + e.message); }
    finally { setDeleting(null); }
  };

  const handleDeleteAssessment = async (id) => {
    if (!window.confirm("Delete this assessment?")) return;
    setDeleting(id);
    try {
      await db.deleteAssessment(id);
      setAssessments(a => a.filter(x => x.id !== id));
    } catch(e) { alert("Delete failed: " + e.message); }
    finally { setDeleting(null); }
  };

  const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }) + " " + d.toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" });
  };

  const fmtCost = (n, currency) => {
    const sym = { USD:"$", EUR:"€", GBP:"£", AED:"AED " }[currency] || "$";
    return sym + Number(n).toLocaleString();
  };

  const totalRecords = plans.length + assessments.length;

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#060D18 0%,#0D2A3A 60%,#060D18 100%)", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#F9FAFB" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        .tool-card{transition:all 0.2s ease;cursor:pointer}
        .tool-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.4)!important}
        .tool-card-disabled{cursor:not-allowed;opacity:0.55}
        .tool-card-disabled:hover{transform:none!important}
        .signout-dash:hover{color:#F9FAFB!important}
        .rec-row:hover{background:#111827!important}
        .del-btn:hover{color:#F87171!important;border-color:#F8717144!important}
        .dash-tab{transition:all 0.15s;cursor:pointer}
        .dash-tab:hover{color:#F9FAFB!important}
      `}</style>

      {/* Header */}
      <div style={{ background:"linear-gradient(180deg,#0D1B30 0%,#060D18 100%)", borderBottom:"1px solid #1F2937", padding:"0 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <img src={LOGO_URI} alt="Avature" style={{ height:24, filter:"brightness(0) invert(1)" }}/>
            <div style={{ width:1, height:20, background:"#1F2937" }}/>
            <span style={{ fontSize:14, color:"#6B7280", fontWeight:500 }}>Professional Services</span>
          </div>
          <button className="signout-dash" onClick={onSignOut} style={{ background:"transparent", border:"none", color:"#374151", fontSize:13, cursor:"pointer", fontFamily:"inherit", transition:"color 0.2s" }}>Sign out</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"52px 40px 32px" }}>
        <div style={{ marginBottom:8 }}>
          <span style={{ fontSize:12, color:"#1A6B7C", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>Avature Tools</span>
        </div>
        <h1 style={{ fontSize:34, fontWeight:700, margin:"0 0 10px", lineHeight:1.2, color:"#F9FAFB" }}>Professional Services Hub</h1>
        <p style={{ fontSize:15, color:"#6B7280", margin:0, maxWidth:520, lineHeight:1.6 }}>
          A suite of tools to support scoping, proposals, and client engagement across the full Avature implementation lifecycle.
        </p>
      </div>

      {/* Tool Cards */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
          {tools.map(tool => {
            const isLive = tool.status === "live";
            return (
              <div key={tool.id} className={"tool-card" + (isLive ? "" : " tool-card-disabled")} onClick={() => isLive && onSelectTool(tool.id)}
                style={{ background:"#0D1117", border:"1px solid " + (isLive ? tool.color + "44" : "#1F2937"), borderRadius:16, padding:"28px 24px", boxShadow:"0 4px 24px rgba(0,0,0,0.3)", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background: isLive ? "linear-gradient(90deg," + tool.color + "," + tool.color + "88)" : "#1F2937" }}/>
                <div style={{ position:"absolute", top:18, right:18 }}>
                  {isLive
                    ? <span style={{ background:"#14532D44", border:"1px solid #166534", color:"#4ADE80", fontSize:10, fontWeight:700, borderRadius:20, padding:"3px 10px", letterSpacing:"0.08em" }}>LIVE</span>
                    : <span style={{ background:"#1F2937", border:"1px solid #374151", color:"#6B7280", fontSize:10, fontWeight:600, borderRadius:20, padding:"3px 10px", letterSpacing:"0.08em" }}>COMING SOON</span>}
                </div>
                <div style={{ width:48, height:48, borderRadius:12, background:tool.color + "18", border:"1px solid " + tool.color + "33", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:16 }}>{tool.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:700, margin:"0 0 8px", color: isLive ? "#F9FAFB" : "#6B7280", lineHeight:1.3 }}>{tool.title}</h3>
                <p style={{ fontSize:13, color:"#6B7280", margin:"0 0 20px", lineHeight:1.6 }}>{tool.description}</p>
                {isLive && <div style={{ display:"flex", alignItems:"center", gap:6, color:tool.color, fontSize:13, fontWeight:600 }}>Open tool <span style={{ fontSize:16 }}>→</span></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Records */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px 80px" }}>
        <div style={{ background:"#0D1117", border:"1px solid #1F2937", borderRadius:16, overflow:"hidden" }}>
          {/* Records header */}
          <div style={{ padding:"20px 24px", borderBottom:"1px solid #1F2937", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:15, fontWeight:700, color:"#F9FAFB" }}>Saved Records</span>
              {!loading && <span style={{ fontSize:12, color:"#4B5563", background:"#1F2937", borderRadius:20, padding:"2px 10px" }}>{totalRecords}</span>}
            </div>
            <div style={{ display:"flex", gap:4 }}>
              {[["plans","📊 Plans", plans.length], ["assessments","🧠 Assessments", assessments.length]].map(([id, label, count]) => (
                <button key={id} className="dash-tab" onClick={() => setActiveTab(id)} style={{
                  background: activeTab === id ? "#1F2937" : "transparent",
                  border:"1px solid " + (activeTab === id ? "#374151" : "transparent"),
                  borderRadius:8, padding:"6px 14px", fontSize:12, fontWeight: activeTab === id ? 600 : 400,
                  color: activeTab === id ? "#F9FAFB" : "#4B5563", fontFamily:"inherit",
                }}>{label} {!loading && <span style={{ opacity:0.6 }}>({count})</span>}</button>
              ))}
            </div>
          </div>

          {/* Error */}
          {dbError && (
            <div style={{ padding:"16px 24px", background:"#7F1D1D22", color:"#F87171", fontSize:13, borderBottom:"1px solid #1F2937" }}>
              ⚠ {dbError}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ padding:"40px 24px", textAlign:"center", color:"#4B5563", fontSize:13 }}>
              Loading records…
            </div>
          )}

          {/* Plans tab */}
          {!loading && activeTab === "plans" && (
            plans.length === 0
              ? <div style={{ padding:"40px 24px", textAlign:"center", color:"#4B5563", fontSize:13 }}>No implementation plans saved yet. Create one in the calculator and save it.</div>
              : <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 100px 80px 90px 100px 130px", gap:16, padding:"10px 24px", borderBottom:"1px solid #1F2937" }}>
                    {["Client", "Cost", "Months", "Complexity", "Saved", ""].map((h,i) => (
                      <span key={i} style={{ fontSize:10, fontWeight:600, color:"#4B5563", textTransform:"uppercase", letterSpacing:"0.08em" }}>{h}</span>
                    ))}
                  </div>
                  {plans.map(p => (
                    <div key={p.id} className="rec-row" style={{ display:"grid", gridTemplateColumns:"1fr 100px 80px 90px 100px 130px", gap:16, padding:"14px 24px", borderBottom:"1px solid #0D1117", alignItems:"center", transition:"background 0.15s" }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:"#F9FAFB" }}>{p.client_name || <span style={{ color:"#374151", fontStyle:"italic" }}>No name</span>}</div>
                      </div>
                      <div style={{ fontSize:13, color:"#1A6B7C", fontWeight:600 }}>{fmtCost(p.total_cost, p.currency)}</div>
                      <div style={{ fontSize:13, color:"#9CA3AF" }}>{p.months}mo</div>
                      <div style={{ fontSize:13, color:"#9CA3AF" }}>{p.complexity}%</div>
                      <div style={{ fontSize:11, color:"#4B5563" }}>{fmtDate(p.created_at)}</div>
                      <div style={{ display:"flex", gap:6 }}>
                        <button className="del-btn" onClick={() => onLoadPlan(p)} style={{ flex:1, background:"transparent", border:"1px solid #1A6B7C55", borderRadius:6, color:"#1A6B7C", fontSize:11, padding:"4px 8px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                          onMouseOver={e=>{ e.currentTarget.style.background="#1A6B7C22"; }} onMouseOut={e=>{ e.currentTarget.style.background="transparent"; }}>
                          Load
                        </button>
                        <button className="del-btn" onClick={() => handleDeletePlan(p.id)} disabled={deleting === p.id} style={{ background:"transparent", border:"1px solid #1F2937", borderRadius:6, color:"#374151", fontSize:11, padding:"4px 8px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                          {deleting === p.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
          )}

          {/* Assessments tab */}
          {!loading && activeTab === "assessments" && (
            assessments.length === 0
              ? <div style={{ padding:"40px 24px", textAlign:"center", color:"#4B5563", fontSize:13 }}>No assessments saved yet. Complete one in the AI Maturity tool and save it.</div>
              : <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 80px 80px 100px 130px", gap:16, padding:"10px 24px", borderBottom:"1px solid #1F2937" }}>
                    {["Name", "Organisation", "Overall", "Intel", "Auto", "Saved", ""].map((h,i) => (
                      <span key={i} style={{ fontSize:10, fontWeight:600, color:"#4B5563", textTransform:"uppercase", letterSpacing:"0.08em" }}>{h}</span>
                    ))}
                  </div>
                  {assessments.map(a => {
                    const score = a.overall_score;
                    const color = score < 1 ? "#ef4444" : score < 2 ? "#f97316" : score < 3 ? "#eab308" : score < 4 ? "#22c55e" : "#6366f1";
                    const stg = a.stage_scores || {};
                    return (
                      <div key={a.id} className="rec-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 80px 80px 100px 130px", gap:16, padding:"14px 24px", borderBottom:"1px solid #0D1117", alignItems:"center", transition:"background 0.15s" }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"#F9FAFB" }}>{a.client_name || <span style={{ color:"#374151", fontStyle:"italic" }}>No name</span>}</div>
                        <div style={{ fontSize:13, color:"#9CA3AF" }}>{a.client_org || "—"}</div>
                        <div style={{ fontSize:13, fontWeight:700, color }}>{score !== null && score !== undefined ? Number(score).toFixed(1) : "—"}</div>
                        <div style={{ fontSize:12, color:"#6B7280" }}>{stg.ATTRACT !== undefined ? Number(stg.ATTRACT).toFixed(1) : "—"}</div>
                        <div style={{ fontSize:12, color:"#6B7280" }}>{stg.HIRE !== undefined ? Number(stg.HIRE).toFixed(1) : "—"}</div>
                        <div style={{ fontSize:11, color:"#4B5563" }}>{fmtDate(a.created_at)}</div>
                        <div style={{ display:"flex", gap:6 }}>
                          <button onClick={() => onLoadAssessment(a)} style={{ flex:1, background:"transparent", border:"1px solid #7C3AED55", borderRadius:6, color:"#7C3AED", fontSize:11, padding:"4px 8px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                            onMouseOver={e=>{ e.currentTarget.style.background="#7C3AED22"; }} onMouseOut={e=>{ e.currentTarget.style.background="transparent"; }}>
                            Load
                          </button>
                          <button className="del-btn" onClick={() => handleDeleteAssessment(a.id)} disabled={deleting === a.id} style={{ background:"transparent", border:"1px solid #1F2937", borderRadius:6, color:"#374151", fontSize:11, padding:"4px 8px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
                            {deleting === a.id ? "…" : "Delete"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (user.toLowerCase() === "avature" && pass.toLowerCase() === "avature") {
      onLogin();
    } else {
      setError("Incorrect username or password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight:"100vh", background:"linear-gradient(135deg,#060D18 0%,#0D2A3A 60%,#060D18 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'DM Sans','Segoe UI',sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        .login-input:focus{border-color:#1A6B7C!important;outline:none;box-shadow:0 0 0 3px #1A6B7C22}
        .login-btn:hover{background:linear-gradient(135deg,#1F8A9E,#1A6B7C)!important;transform:translateY(-1px)}
        .login-btn:active{transform:translateY(0)}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        .shake{animation:shake 0.4s ease}
      `}</style>

      {/* Background decoration */}
      <div style={{position:"fixed",top:-100,right:-100,width:400,height:400,borderRadius:"50%",
        background:"radial-gradient(circle,#1A6B7C10,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:-100,left:-100,width:300,height:300,borderRadius:"50%",
        background:"radial-gradient(circle,#C9A84C08,transparent 70%)",pointerEvents:"none"}}/>

      <div className={shake?"shake":""} style={{
        background:"#0D1117", border:"1px solid #1F2937", borderRadius:16,
        padding:"48px 44px", width:"100%", maxWidth:420,
        boxShadow:"0 24px 64px rgba(0,0,0,0.5)",
      }}>
        {/* Logo */}
        <div style={{textAlign:"center", marginBottom:32}}>
          <img src={LOGO_URI} alt="Avature" style={{height:28, filter:"brightness(0) invert(1)", marginBottom:20}}/>
          <div style={{fontSize:13, color:"#6B7280", letterSpacing:"0.05em"}}>Avature Tools</div>
        </div>

        <div style={{fontSize:20, fontWeight:700, color:"#F9FAFB", marginBottom:8, textAlign:"center"}}>Welcome back</div>
        <div style={{fontSize:13, color:"#6B7280", marginBottom:32, textAlign:"center"}}>Sign in to access Avature Tools</div>

        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontSize:12,color:"#9CA3AF",marginBottom:6,fontWeight:500,letterSpacing:"0.05em"}}>
            USERNAME
          </label>
          <input
            className="login-input"
            type="text" value={user} onChange={e => setUser(e.target.value)}
            onKeyDown={e => e.key==="Enter" && handleSubmit()}
            placeholder="Enter username"
            style={{
              width:"100%", background:"#111827", border:"1px solid #1F2937",
              borderRadius:8, color:"#F9FAFB", padding:"12px 16px", fontSize:14,
              transition:"border-color 0.2s, box-shadow 0.2s",
            }}
          />
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:"block",fontSize:12,color:"#9CA3AF",marginBottom:6,fontWeight:500,letterSpacing:"0.05em"}}>
            PASSWORD
          </label>
          <input
            className="login-input"
            type="password" value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key==="Enter" && handleSubmit()}
            placeholder="Enter password"
            style={{
              width:"100%", background:"#111827", border:"1px solid #1F2937",
              borderRadius:8, color:"#F9FAFB", padding:"12px 16px", fontSize:14,
              transition:"border-color 0.2s, box-shadow 0.2s",
            }}
          />
        </div>

        {error && (
          <div style={{
            background:"#7F1D1D22", border:"1px solid #DC262644",
            borderRadius:8, padding:"10px 14px", color:"#F87171",
            fontSize:13, marginBottom:20, textAlign:"center",
          }}>{error}</div>
        )}

        <button
          className="login-btn"
          onClick={handleSubmit}
          style={{
            width:"100%", background:"linear-gradient(135deg,#1A6B7C,#155E6E)",
            border:"none", borderRadius:8, color:"white",
            padding:"13px", fontSize:14, fontWeight:600,
            cursor:"pointer", letterSpacing:"0.03em",
            transition:"all 0.2s", boxShadow:"0 4px 16px #1A6B7C44",
          }}>
          Sign In
        </button>

        <div style={{textAlign:"center",marginTop:20,fontSize:12,color:"#374151"}}>
          Avature Professional Services
        </div>
      </div>
    </div>
  );
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Pill({ children, color="#1A6B7C" }) {
  return (
    <span style={{background:color+"22",color,border:`1px solid ${color}44`,
      borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:600,letterSpacing:"0.04em",whiteSpace:"nowrap"}}>
      {children}
    </span>
  );
}

function KpiCard({ label, value, sub, accent=false }) {
  return (
    <div style={{
      background:accent?"linear-gradient(135deg,#1B2A4A,#0D1B30)":"#111827",
      border:`1px solid ${accent?"#C9A84C44":"#1F2937"}`,
      borderRadius:12,padding:"20px 24px",position:"relative",overflow:"hidden",
    }}>
      {accent && <div style={{position:"absolute",top:0,left:0,right:0,height:2,
        background:"linear-gradient(90deg,#1A6B7C,#C9A84C,#1A6B7C)"}}/>}
      <div style={{fontSize:11,color:"#6B7280",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>{label}</div>
      <div style={{fontSize:accent?28:22,fontWeight:700,color:accent?"#C9A84C":"#F9FAFB",lineHeight:1.1}}>{value}</div>
      {sub && <div style={{fontSize:12,color:"#4B5563",marginTop:6}}>{sub}</div>}
    </div>
  );
}

// ─── DRAGGABLE GANTT BAR ──────────────────────────────────────────────────────
function DraggableGanttBar({ phase, idx, totalWeeks, onResize, onMove }) {
  const [drag, setDrag] = useState(null);

  const baseLp = ((phase.startWeek - 1) / totalWeeks) * 100;
  const baseWp = (phase.duration / totalWeeks) * 100;

  const makeDragHandler = (type, side) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const trackEl = e.currentTarget.closest("[data-track]");
    const trackRect = trackEl ? trackEl.getBoundingClientRect() : { width: 600 };
    const pxPerWeek = trackRect.width / totalWeeks;
    // Snapshot the phase state at drag start
    const startDuration = phase.duration;
    const startWeek = phase.startWeek;
    let lastCommitted = 0; // last integer week delta we sent

    const onMouseMove = (me) => {
      const dx = me.clientX - startX;
      setDrag({ type: side ? `resize-${side}` : "move", px: dx });

      // Always compute absolute target from the mousedown snapshot
      const weekDelta = Math.round(dx / pxPerWeek);
      if (weekDelta === lastCommitted) return;
      lastCommitted = weekDelta;

      if (type === "move") {
        // Pass absolute target start week
        onMove(idx, startWeek + weekDelta);
      } else {
        // Pass absolute target duration / start
        onResize(idx, side, startWeek, startDuration, weekDelta);
      }
    };

    const onMouseUp = () => {
      setDrag(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Smooth visual: shift position or width by live px during drag
  let visualLeft = `${baseLp}%`;
  let visualWidth = `${baseWp}%`;
  if (drag) {
    if (drag.type === "move") {
      visualLeft = `calc(${baseLp}% + ${drag.px}px)`;
    } else if (drag.type === "resize-right") {
      visualWidth = `calc(${baseWp}% + ${drag.px}px)`;
    } else if (drag.type === "resize-left") {
      visualLeft = `calc(${baseLp}% + ${drag.px}px)`;
      visualWidth = `calc(${baseWp}% - ${drag.px}px)`;
    }
  }
  const isDragging = !!drag;

  const Handle = ({ side }) => (
    <div
      onMouseDown={makeDragHandler("resize", side)}
      style={{
        position:"absolute",
        [side === "right" ? "right" : "left"]: -6,
        top:"50%", transform:"translateY(-50%)",
        width:12, height:24, background:"#F9FAFB", borderRadius:4,
        cursor:"ew-resize", display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 1px 4px rgba(0,0,0,0.5)", zIndex:20, userSelect:"none",
      }}>
      <div style={{display:"flex",gap:2}}>
        <div style={{width:1.5,height:10,background:"#9CA3AF",borderRadius:1}}/>
        <div style={{width:1.5,height:10,background:"#9CA3AF",borderRadius:1}}/>
      </div>
    </div>
  );

  const colW = (100/totalWeeks).toFixed(4);
  const gridBg = `repeating-linear-gradient(90deg,#1F2937 0px,#1F2937 calc(${colW}% - 1px),#2D3748 calc(${colW}% - 1px),#2D3748 ${colW}%)`;

  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:7}}>
      <div style={{width:230,fontSize:11,color:"#D1D5DB",textAlign:"right",flexShrink:0,lineHeight:1.3,fontWeight:500,paddingRight:4}}>
        {phase.name}
      </div>
      <div data-track style={{
        flex:1, height:28, borderRadius:6, position:"relative", overflow:"visible",
        background:gridBg,
      }}>
        <div
          onMouseDown={makeDragHandler("move", null)}
          style={{
            position:"absolute", left:visualLeft, width:visualWidth,
            top:3, bottom:3,
            background:`linear-gradient(90deg,${phase.color}EE,${phase.color}99)`,
            borderRadius:4, cursor: isDragging ? "grabbing" : "grab",
            display:"flex", alignItems:"center", justifyContent:"center",
            overflow:"visible", zIndex: isDragging ? 10 : 1, userSelect:"none", minWidth:4,
            boxShadow: isDragging ? `0 4px 16px ${phase.color}66` : "none",
          }}>
          <Handle side="left" />
          <span style={{fontSize:10,color:"white",fontWeight:700,
            padding:"0 14px",whiteSpace:"nowrap",pointerEvents:"none",
            textShadow:"0 1px 2px rgba(0,0,0,0.6)"}}>
            {phase.duration}w
          </span>
          <Handle side="right" />
        </div>
      </div>
      <div style={{width:32,fontSize:10,color:"#6B7280",flexShrink:0,textAlign:"right"}}>W{phase.startWeek}</div>
    </div>
  );
}

// ─── CLIENT DETAILS TAB ───────────────────────────────────────────────────────
function ClientDetails({ clientName, setClientName, importantNotice, setImportantNotice, currency, setCurrency }) {
  return (
    <div style={{background:"#0D1117",border:"1px solid #1F2937",borderRadius:12,padding:"28px"}}>
      <div style={{fontSize:13,color:"#6B7280",marginBottom:24,lineHeight:1.6}}>
        Personalise the proposal output. These details appear on the cover page and in the important notice section of the exported PDF.
      </div>

      {/* Currency selector */}
      <div style={{marginBottom:28}}>
        <label style={{display:"block",fontSize:11,color:"#9CA3AF",marginBottom:10,
          textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>
          Proposal Currency
        </label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {CURRENCIES.map(c => (
            <button key={c.code} onClick={()=>setCurrency(c.code)} style={{
              background:currency===c.code?"#1B2A4A":"#111827",
              border:`1px solid ${currency===c.code?"#1A6B7C":"#1F2937"}`,
              borderRadius:8,padding:"8px 16px",cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",gap:2,
              transition:"all 0.15s",fontFamily:"inherit",
              minWidth:80,
            }}>
              <span style={{fontSize:16,fontWeight:700,color:currency===c.code?"#C9A84C":"#9CA3AF"}}>{c.symbol}</span>
              <span style={{fontSize:11,fontWeight:600,color:currency===c.code?"#F9FAFB":"#6B7280"}}>{c.code}</span>
              <span style={{fontSize:9,color:"#4B5563",textAlign:"center",lineHeight:1.2}}>{c.label}</span>
            </button>
          ))}
        </div>
        <div style={{fontSize:11,color:"#4B5563",marginTop:8}}>
          Symbol updates throughout the app and proposal. No conversion applied.
        </div>
      </div>
      <div style={{marginBottom:28}}>
        <label style={{display:"block",fontSize:11,color:"#9CA3AF",marginBottom:8,
          textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>
          Client Name
        </label>
        <input
          type="text" value={clientName}
          onChange={e => setClientName(e.target.value)}
          placeholder="e.g. Qatar Airways, AtkinsRéalis…"
          style={{
            width:"100%",maxWidth:420,background:"#111827",border:"1px solid #1F2937",
            borderRadius:8,color:"#F9FAFB",padding:"12px 16px",fontSize:14,
            transition:"border-color 0.2s",fontFamily:"inherit",
          }}
          onFocus={e => e.target.style.borderColor="#1A6B7C"}
          onBlur={e => e.target.style.borderColor="#1F2937"}
        />
        {clientName && (
          <div style={{marginTop:8,fontSize:12,color:"#1A6B7C"}}>
            ✓ Will appear on cover: "Prepared for: <strong>{clientName}</strong>"
          </div>
        )}
      </div>

      {/* Important notice */}
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <label style={{fontSize:11,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>
            Important Notice (appears at bottom of proposal)
          </label>
          <button
            onClick={() => setImportantNotice(DEFAULT_NOTICE)}
            style={{background:"transparent",border:"1px solid #374151",borderRadius:6,
              color:"#6B7280",padding:"4px 12px",fontSize:11,cursor:"pointer",
              fontFamily:"inherit",transition:"all 0.15s"}}
            onMouseOver={e => {e.target.style.borderColor="#1A6B7C";e.target.style.color="#1A6B7C"}}
            onMouseOut={e => {e.target.style.borderColor="#374151";e.target.style.color="#6B7280"}}
          >
            Reset to default
          </button>
        </div>
        <textarea
          value={importantNotice}
          onChange={e => setImportantNotice(e.target.value)}
          rows={6}
          style={{
            width:"100%",background:"#111827",border:"1px solid #1F2937",
            borderRadius:8,color:"#D1D5DB",padding:"14px 16px",fontSize:13,
            lineHeight:1.7,resize:"vertical",fontFamily:"inherit",
            transition:"border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor="#1A6B7C"}
          onBlur={e => e.target.style.borderColor="#1F2937"}
        />
        <div style={{fontSize:11,color:"#4B5563",marginTop:6}}>
          {importantNotice.length} characters · tip: mention client name, specific scope, or commercial terms
        </div>
      </div>

      {/* Preview */}
      <div style={{marginTop:28,padding:20,background:"#060D18",border:"1px solid #1F2937",borderRadius:10}}>
        <div style={{fontSize:11,color:"#6B7280",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.08em"}}>
          Preview — Proposal Cover
        </div>
        <div style={{background:"linear-gradient(135deg,#0A1628,#0D2A3A)",borderRadius:8,padding:"20px 24px",position:"relative"}}>
          <div style={{fontSize:10,color:"#3A8FA6",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8,fontWeight:600}}>
            Professional Services · Time &amp; Materials
          </div>
          <div style={{fontSize:18,fontWeight:700,color:"white",marginBottom:4,lineHeight:1.2}}>
            Implementation<br/>Investment Proposal
          </div>
          <div style={{fontSize:12,color:"#94A3B8",marginBottom:4}}>Confidential — Prepared for Client Review</div>
          {clientName && (
            <div style={{fontSize:13,color:"#C9A84C",fontWeight:600}}>Prepared for: {clientName}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── RATE CARD TAB ────────────────────────────────────────────────────────────
function RateCard({ resources, rateAdj, onRateAdjChange, onRateChange, onDaysChange, complexity, currSym }) {
  const complexLabel = complexity<=25?"Standard":complexity<=50?"Moderate":complexity<=75?"Advanced":"Enterprise";
  const complexColor = complexity<=25?"#4ADE80":complexity<=50?"#FBBF24":complexity<=75?"#F97316":"#F87171";
  return (
    <div style={{background:"#0D1117",border:"1px solid #1F2937",borderRadius:12,padding:"24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
        <div>
          <div style={{fontSize:11,color:"#6B7280",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.1em"}}>
            Global Rate Adjustment
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <input type="range" min="-30" max="50" step="1" value={rateAdj}
              onChange={e=>onRateAdjChange(Number(e.target.value))} style={{flex:1,accentColor:"#1A6B7C"}}/>
            <div style={{
              background:rateAdj===0?"#1F2937":rateAdj>0?"#14532D22":"#7F1D1D22",
              border:`1px solid ${rateAdj===0?"#374151":rateAdj>0?"#16A34A44":"#DC262644"}`,
              borderRadius:8,padding:"6px 14px",
              color:rateAdj===0?"#9CA3AF":rateAdj>0?"#4ADE80":"#F87171",
              fontWeight:700,fontSize:15,minWidth:64,textAlign:"center",
            }}>{rateAdj>0?"+":""}{rateAdj}%</div>
          </div>
        </div>
        <div>
          <div style={{fontSize:11,color:"#6B7280",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.1em"}}>
            Scope Complexity
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <input type="range" min="0" max="100" step="5" value={complexity}
              onChange={()=>{}} readOnly style={{flex:1,accentColor:complexColor,opacity:0.5,cursor:"not-allowed"}}/>
            <div style={{background:complexColor+"22",border:`1px solid ${complexColor}44`,
              borderRadius:8,padding:"6px 14px",color:complexColor,fontWeight:700,fontSize:12,minWidth:90,textAlign:"center"}}>
              {complexLabel}
            </div>
          </div>
          <div style={{fontSize:11,color:"#374151",marginTop:4}}>Adjust in the main controls bar</div>
        </div>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead>
            <tr style={{borderBottom:"1px solid #1F2937"}}>
              {["Role","Std. Rate / Day","Base Days (3mo)","Adj. Rate / Day","Phase Focus"].map(h=>(
                <th key={h} style={{padding:"8px 12px",textAlign:h==="Role"||h==="Phase Focus"?"left":"center",
                  color:"#6B7280",fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.map((r,i)=>{
              const adj = r.stdRate*(1+rateAdj/100);
              return (
                <tr key={r.id} style={{borderBottom:"1px solid #111827",background:i%2===0?"#0D1117":"transparent"}}>
                  <td style={{padding:"10px 12px",color:"#F9FAFB",fontWeight:500}}>{r.role}</td>
                  <td style={{padding:"10px 12px",textAlign:"center"}}>
                    <input type="number" value={r.stdRate} min={100} step={50} onChange={e=>onRateChange(r.id,Number(e.target.value))}
                      style={{background:"#1F2937",border:"1px solid #374151",borderRadius:6,color:"#60A5FA",
                        padding:"4px 8px",width:90,textAlign:"center",fontSize:13,fontWeight:600}}/>
                  </td>
                  <td style={{padding:"10px 12px",textAlign:"center"}}>
                    <input type="number" value={r.baseDays} min={1} step={1} onChange={e=>onDaysChange(r.id,Number(e.target.value))}
                      style={{background:"#1F2937",border:"1px solid #374151",borderRadius:6,color:"#60A5FA",
                        padding:"4px 8px",width:70,textAlign:"center",fontSize:13,fontWeight:600}}/>
                  </td>
                  <td style={{padding:"10px 12px",textAlign:"center",
                    color:rateAdj===0?"#9CA3AF":rateAdj>0?"#4ADE80":"#F87171",fontWeight:700}}>
                    {fmtC(adj,currSym)}
                  </td>
                  <td style={{padding:"10px 12px"}}><Pill>{r.phase}</Pill></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function TMCalculator() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("dashboard"); // "dashboard" | "calculator"
  const [months, setMonths] = useState(3);
  const [rateAdj, setRateAdj] = useState(0);
  const [complexity, setComplexity] = useState(25);
  const [resources, setResources] = useState(DEFAULT_RESOURCES);
  const [activeTab, setActiveTab] = useState("summary");
  const [clientName, setClientName] = useState("");
  const [importantNotice, setImportantNotice] = useState(DEFAULT_NOTICE);
  const [currency, setCurrency] = useState("USD");
  const [phaseLayout, setPhaseLayout] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(null);
  const [loadedPlanId, setLoadedPlanId] = useState(null);
  const [loadedAssessment, setLoadedAssessment] = useState(null);

  const handleLoadPlan = (record) => {
    setClientName(record.client_name || "");
    setCurrency(record.currency || "USD");
    setMonths(record.months || 3);
    setComplexity(record.complexity || 25);
    setRateAdj(record.rate_adj || 0);
    if (record.resources) setResources(record.resources);
    if (record.phase_layout) setLayout(record.phase_layout);
    else setLayout(null);
    setLoadedPlanId(record.id);
    setScreen("calculator");
  };

  const handleLoadAssessment = (record) => {
    setLoadedAssessment(record);
    setScreen("ai-maturity");
  };

  const handleSavePlan = async () => {
    setSaving(true);
    try {
      const computedNow = calcResources(resources, months, rateAdj, complexity);
      const total = computedNow.reduce((s,r) => s+r.cost, 0);
      const totalDays = computedNow.reduce((s,r) => s+r.scaledDays, 0);
      const payload = {
        client_name: clientName || null,
        currency,
        months,
        complexity,
        rate_adj: rateAdj,
        total_cost: Math.round(total),
        total_days: Math.round(totalDays),
        resources,
        phase_layout: phaseLayout,
      };
      if (loadedPlanId) {
        await db.updateImplementation(loadedPlanId, payload);
      } else {
        const result = await db.saveImplementation(payload);
        if (result && result[0]) setLoadedPlanId(result[0].id);
      }
      setSavedToast("Plan saved ✓");
      setTimeout(() => setSavedToast(null), 3000);
    } catch(e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const layoutRef = useRef(null);
  const setLayout = (l) => { layoutRef.current = l; setPhaseLayout(l); };

  useEffect(() => {
    // Set favicon
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.type = "image/svg+xml";
    link.rel = "icon";
    link.href = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+TG9nbzwvdGl0bGU+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iNTAlIiB4Mj0iMTA3LjAzMzQ5MyUiIHkyPSI1MCUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzAwNTRCOSIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDA1NEI5IiBvZmZzZXQ9IjU5JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDI1NkJEIiBvZmZzZXQ9IjY3JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDg1RUM5IiBvZmZzZXQ9Ijc1JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMTI2QUREIiBvZmZzZXQ9Ijg0JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMUY3Q0ZBIiBvZmZzZXQ9IjkyJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjI3RkZGIiBvZmZzZXQ9IjkzJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSIxLjIyOTAyOTE4ZS0xNCUiIHkxPSI1MC4wMDQwNjg5JSIgeDI9IjEwMC4xODQ1MDIlIiB5Mj0iNTAuMDA0MDY4OSUiIGlkPSJsaW5lYXJHcmFkaWVudC0yIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzAwNTRCOSIgb2Zmc2V0PSI2JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMEQ2NEQzIiBvZmZzZXQ9IjE2JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMTg3M0VCIiBvZmZzZXQ9IjI3JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjA3Q0ZBIiBvZmZzZXQ9IjM4JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjI3RkZGIiBvZmZzZXQ9IjQ3JSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI4LjE3ODQzODQ5ZS0xNSUiIHkxPSI1MC4wMDgwMzA4JSIgeDI9IjEwMCUiIHkyPSI1MC4wMDgwMzA4JSIgaWQ9ImxpbmVhckdyYWRpZW50LTMiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDA1NEI5IiBvZmZzZXQ9IjYlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMjc1RUUiIG9mZnNldD0iMzklIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMjY0RjYiIG9mZnNldD0iNzElIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMjVCRkEiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSIzNi43OCUiIHkxPSIxMDQuMTMzMzMzJSIgeDI9IjY2LjA2JSIgeTI9IjUuODY2NjY2NjclIiBpZD0ibGluZWFyR3JhZGllbnQtNCI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDVCQ0MiIG9mZnNldD0iMjklIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyMjdGRkYiIG9mZnNldD0iNjQlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJMb2dvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iaXNveC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjAwMDAwMCwgMy4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMTIsMCBMMCwyNCBMMi4xMiwyNCBDNi4xMiwyNCAxMC45MiwyMS4wMTYgMTIuOTg0LDE2Ljk3NiBMMTYuNzIsOS41MDQgTDEyLDAgWiIgaWQ9IlBhdGgiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTEzLjg4OCwxMy43MDQgQzEzLjA1NTc5NzEsMTMuNDY0NDIxMiAxMi4xOTQwMDE4LDEzLjM0MzIzMTMgMTEuMzI4LDEzLjM0Mzk5NjQgQzkuNTg3MTMzNzQsMTMuMzUwMDU0NiA3Ljg3NDg1MTUzLDEzLjc4NzA1NzYgNi4zNDQsMTQuNjE2IEM4LjQ5ODEyMTIzLDE1LjIxMzM2MDcgMTAuMzgzNTU1MSwxNi41Mjg2NDg0IDExLjY4OCwxOC4zNDM5OTY0IEMxNy4yODgsMjUuNDMyIDIzLjY4OCwyMy44NDggMjMuNjg4LDIzLjg0OCBDMjMuNjg4LDIzLjg0OCAyMS4zMjgsMTUuNzUyIDEzLjg4OCwxMy43MDQgWiIgaWQ9IlBhdGgiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTEzLjg4OCwxMy43MDQgQzExLjM0ODgxMDYsMTMuMDM4MjQyNiA4LjY1MTM5MDgxLDEzLjM2NDMzNTggNi4zNDQsMTQuNjE2IEw2LjQxNiwxNC42MTYgQzE3LjMwNCwxMy4wMTYgMTUuMDMyLDIxLjczNiAyMy43MiwyMy44MzIwMjM3IEMyMy43MiwyMy44NDggMjEuMzI4LDE1Ljc1MiAxMy44ODgsMTMuNzA0IFoiIGlkPSJQYXRoIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTMpIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNC40LDQuOCBMMTIsMCBMMCwyNCBMMi4zMzYsMjQgTDguNjI0LDExLjQgQzEwLjU3Niw3LjYzMiAxMi41NDQsNS45MTIgMTQuNCw0LjggWiIgaWQ9IlBhdGgiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtNCkiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
    document.head.appendChild(link);
    document.title = "Avature T&M Calculator";
  }, []);

  // ── Parse URL params on first load ──────────────────────────────────────────
  const urlParams = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    return {
      tool:   p.get("tool"),
      client: p.get("client") || "",
      org:    p.get("org") || "",
      scores: p.get("s") || "",
    };
  }, []);

  const isGuestAssessment = urlParams.tool === "ai-maturity";

  // Guest mode — client arrived via email link, bypass login entirely
  if (isGuestAssessment) {
    const preloadedScores = {};
    if (urlParams.scores) {
      urlParams.scores.split(",").forEach((val, i) => {
        if (val !== "" && AI_QUESTIONS[i]) preloadedScores[AI_QUESTIONS[i].id] = Number(val);
      });
    }
    return (
      <AIMaturityTool
        guestMode
        initialData={{
          client_name: urlParams.client,
          client_org: urlParams.org,
          scores: preloadedScores,
        }}
        onBack={null}
      />
    );
  }

  if (!loggedIn) return <LoginPage onLogin={() => { setLoggedIn(true); setScreen("dashboard"); }} />;
  if (screen === "dashboard") return (
    <Dashboard
      onSelectTool={id => {
        if (id === "calculator") { setLoadedPlanId(null); setScreen("calculator"); }
        else if (id === "ai-maturity") { setLoadedAssessment(null); setScreen("ai-maturity"); }
      }}
      onSignOut={() => { setLoggedIn(false); setScreen("dashboard"); }}
      onLoadPlan={handleLoadPlan}
      onLoadAssessment={handleLoadAssessment}
    />
  );
  if (screen === "ai-maturity") return (
    <AIMaturityTool
      onBack={() => { setLoadedAssessment(null); setScreen("dashboard"); }}
      initialData={loadedAssessment}
    />
  );

  const currSym = CURRENCIES.find(c => c.code === currency)?.symbol || "$";
  const computed = calcResources(resources, months, rateAdj, complexity);

  // Phase layout - each phase has independent start+duration; gaps are free space
  const totalWeeks = Math.round(months * 4.33);
  const phases = (() => {
    if (phaseLayout && phaseLayout.length === PHASES.length) {
      return PHASES.map((p, i) => ({
        ...p,
        startWeek: phaseLayout[i].start,
        duration: phaseLayout[i].duration,
        totalWeeks,
      }));
    }
    return calcPhaseWeeks(months);
  })();
  const usedWeeks = phases.reduce((s, p) => s + p.duration, 0);
  const freeWeeks = totalWeeks - usedWeeks;

  const total = computed.reduce((s,r) => s+r.cost, 0);
  const totalDays = computed.reduce((s,r) => s+r.scaledDays, 0);
  const blended = totalDays > 0 ? total/totalDays : 0;
  const delta = ((total-BASELINE_COST)/BASELINE_COST)*100;
  const complexLabel = complexity<=25?"Standard":complexity<=50?"Moderate":complexity<=75?"Advanced":"Enterprise";
  const complexColor = complexity<=25?"#4ADE80":complexity<=50?"#FBBF24":complexity<=75?"#F97316":"#F87171";

  const handleMonthChange = m => {
    setMonths(m);
    setLayout(null);
  };

  // Get current layout as array of {start, duration}
  const getLayout = () => layoutRef.current || phases.map(p => ({ start: p.startWeek, duration: p.duration }));

  // Resize — receives absolute startWeek+duration snapshot + weekDelta from drag origin
  const handlePhaseResize = (idx, side, snapStart, snapDuration, weekDelta) => {
    const layout = getLayout().map(l => ({ ...l }));
    const p = layout[idx];
    if (side === "right") {
      const newDur = snapDuration + weekDelta;
      if (newDur < 1 || snapStart + newDur - 1 > totalWeeks) return;
      p.duration = newDur;
    } else {
      const newStart = snapStart + weekDelta;
      const newDur = snapDuration - weekDelta;
      if (newStart < 1 || newDur < 1) return;
      p.start = newStart;
      p.duration = newDur;
    }
    setLayout(layout);
  };

  // Move — receives absolute target start week
  const handlePhaseMove = (idx, targetStart) => {
    const layout = getLayout().map(l => ({ ...l }));
    const p = layout[idx];
    const newEnd = targetStart + p.duration - 1;
    if (targetStart < 1 || newEnd > totalWeeks) return;
    p.start = targetStart;
    setLayout(layout);
  };

  const handleComplexChange = v => { setComplexity(v); };

  const NAV = [
    {id:"summary",  label:"Summary"},
    {id:"gantt",    label:"Timeline"},
    {id:"rates",    label:"Rate Card"},
    {id:"client",   label:"Client Details"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#060D18",color:"#F9FAFB",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        input[type=range]{cursor:pointer;height:4px}
        input[type=number]::-webkit-inner-spin-button{opacity:.5}
        input[type=number]:focus{border-color:#1A6B7C!important;outline:none}
        input[type=text]:focus{border-color:#1A6B7C!important;outline:none}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-track{background:#111827}
        ::-webkit-scrollbar-thumb{background:#374151;border-radius:3px}
        .tab-btn{transition:all .2s}.tab-btn:hover{background:#1F2937!important}
        .dur-btn{transition:all .15s ease}.dur-btn:hover{transform:translateY(-1px)}
        .export-btn:hover{background:linear-gradient(135deg,#1F8A9E,#1A6B7C)!important;transform:translateY(-1px);box-shadow:0 4px 16px #1A6B7C66!important}
        .signout:hover{color:#F9FAFB!important}
      `}</style>

      {/* Header */}
      <div style={{background:"linear-gradient(180deg,#0D1B30 0%,#060D18 100%)",borderBottom:"1px solid #1F2937",padding:"0 32px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0 0"}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <img src={LOGO_URI} alt="Avature" style={{height:22,filter:"brightness(0) invert(1)"}}/>
              <div style={{width:1,height:20,background:"#1F2937"}}/>
              <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"none",padding:0,cursor:"pointer",color:"#4B5563",fontSize:13,fontFamily:"inherit",transition:"color 0.2s"}}
                onMouseOver={e=>e.currentTarget.style.color="#9CA3AF"} onMouseOut={e=>e.currentTarget.style.color="#4B5563"}>
                Tools
              </button>
              <span style={{color:"#374151",fontSize:13}}>›</span>
              <span style={{fontSize:13,color:"#6B7280"}}>Implementation Calculator</span>
              {loadedPlanId && (
                <span style={{fontSize:10,fontWeight:600,color:"#1A6B7C",background:"#1A6B7C18",border:"1px solid #1A6B7C44",borderRadius:20,padding:"2px 10px",letterSpacing:"0.06em"}}>EDITING SAVED</span>
              )}
              {clientName && (
                <>
                  <div style={{width:1,height:20,background:"#1F2937"}}/>
                  <span style={{fontSize:13,color:"#1A6B7C",fontWeight:600}}>{clientName}</span>
                </>
              )}
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              {freeWeeks !== 0 && (
                <div style={{
                  fontSize:11,color: freeWeeks > 0 ? "#FBBF24" : "#F87171",
                  background: freeWeeks > 0 ? "#2A1F00" : "#2A0000",
                  border: "1px solid " + (freeWeeks > 0 ? "#FBBF2444" : "#F8717144"),
                  borderRadius:6, padding:"6px 10px", maxWidth:200, lineHeight:1.4, textAlign:"center",
                }}>
                  {freeWeeks > 0
                    ? freeWeeks + "w unallocated — assign all weeks before exporting"
                    : Math.abs(freeWeeks) + "w over-allocated — fix timeline before exporting"}
                </div>
              )}
              <button className="export-btn"
                onClick={()=>{ if(freeWeeks!==0){ return; } printProposal(months,computed,phases,clientName,importantNotice,currSym); handleSavePlan(); }}
                style={{background: freeWeeks!==0 ? "#1F2937" : "linear-gradient(135deg,#1A6B7C,#155E6E)",
                  border:"none",color: freeWeeks!==0 ? "#4B5563" : "white",
                  borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:600,
                  cursor: freeWeeks!==0 ? "not-allowed" : "pointer",
                  display:"flex",alignItems:"center",gap:7,transition:"all 0.2s",
                  boxShadow: freeWeeks!==0 ? "none" : "0 2px 12px #1A6B7C44",
                  opacity: freeWeeks!==0 ? 0.5 : 1,
                }}>
                <span style={{fontSize:15}}>⎙</span> Save as PDF
              </button>
              <button
                onClick={()=>{ if(freeWeeks!==0){ return; } downloadProposal(months,computed,phases,clientName,importantNotice,currSym); }}
                style={{background:"transparent",
                  border:"1px solid " + (freeWeeks!==0 ? "#2D3748" : "#374151"),
                  color: freeWeeks!==0 ? "#374151" : "#9CA3AF",
                  borderRadius:8,padding:"9px 14px",fontSize:12,fontWeight:500,
                  cursor: freeWeeks!==0 ? "not-allowed" : "pointer",
                  display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",fontFamily:"inherit",
                  opacity: freeWeeks!==0 ? 0.4 : 1,
                }}
                onMouseOver={e=>{ if(freeWeeks===0) e.currentTarget.style.borderColor="#6B7280"; }}
                onMouseOut={e=>{ if(freeWeeks===0) e.currentTarget.style.borderColor="#374151"; }}>
                ↓ HTML
              </button>
              <div style={{position:"relative"}}>
                <button onClick={handleSavePlan} disabled={saving}
                  style={{background:"transparent", border:"1px solid #374151", borderRadius:8,
                    color: saving ? "#4B5563" : "#9CA3AF", padding:"9px 14px", fontSize:12, fontWeight:500,
                    cursor: saving ? "not-allowed" : "pointer", display:"flex", alignItems:"center", gap:6,
                    transition:"all 0.2s", fontFamily:"inherit",
                  }}
                  onMouseOver={e=>{ if(!saving) e.currentTarget.style.borderColor="#1A6B7C"; e.currentTarget.style.color="#1A6B7C"; }}
                  onMouseOut={e=>{ e.currentTarget.style.borderColor="#374151"; e.currentTarget.style.color="#9CA3AF"; }}>
                  {saving ? "Saving…" : "☁ Save"}
                </button>
                {savedToast && (
                  <div style={{position:"absolute", top:"calc(100% + 8px)", right:0, background:"#14532D", border:"1px solid #166534", color:"#4ADE80", borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, whiteSpace:"nowrap", zIndex:99}}>
                    {savedToast}
                  </div>
                )}
              </div>
              <button className="signout" onClick={()=>setScreen("dashboard")}
                style={{background:"transparent",border:"none",color:"#374151",fontSize:12,
                  cursor:"pointer",padding:"9px 4px",transition:"color 0.2s",fontFamily:"inherit"}}>
                Sign out
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:0,marginTop:18}}>
            {NAV.map(n=>(
              <button key={n.id} className="tab-btn" onClick={()=>setActiveTab(n.id)} style={{
                background:activeTab===n.id?"#060D18":"transparent",border:"none",
                borderTop:activeTab===n.id?"2px solid #1A6B7C":"2px solid transparent",
                color:activeTab===n.id?"#F9FAFB":"#6B7280",
                padding:"11px 22px",fontSize:13,fontWeight:activeTab===n.id?600:400,cursor:"pointer",
                position:"relative",
              }}>
                {n.label}
                {n.id==="client" && clientName && (
                  <span style={{position:"absolute",top:8,right:8,width:6,height:6,
                    borderRadius:"50%",background:"#1A6B7C"}}/>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"32px"}}>

        {/* Controls bar */}
        <div style={{background:"#0D1117",border:"1px solid #1F2937",borderRadius:12,
          padding:"20px 24px",marginBottom:28,display:"flex",gap:28,flexWrap:"wrap",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>
              Project Duration
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {DURATION_OPTIONS.map(m=>(
                <button key={m} className="dur-btn" onClick={()=>handleMonthChange(m)} style={{
                  background:months===m?"#1B2A4A":"#111827",
                  border:months===m?"1px solid #1A6B7C":"1px solid #1F2937",
                  color:months===m?"#F9FAFB":"#6B7280",
                  borderRadius:8,padding:"8px 16px",fontSize:13,fontWeight:months===m?700:400,
                  cursor:"pointer",minWidth:52,
                }}>{m}mo</button>
              ))}
            </div>
          </div>
          <div style={{flex:1,minWidth:220}}>
            <div style={{fontSize:11,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>
              Scope Complexity
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <input type="range" min="0" max="100" step="5" value={complexity}
                onChange={e=>handleComplexChange(Number(e.target.value))} style={{flex:1,accentColor:complexColor}}/>
              <div style={{background:complexColor+"22",border:`1px solid ${complexColor}44`,
                borderRadius:8,padding:"6px 14px",color:complexColor,fontWeight:700,fontSize:12,
                minWidth:90,textAlign:"center"}}>{complexLabel}</div>
            </div>
          </div>
          <div style={{marginLeft:"auto",display:"flex",gap:20,flexShrink:0}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:11,color:"#6B7280",marginBottom:2}}>Total</div>
              <div style={{fontSize:20,fontWeight:700,color:"#C9A84C"}}>{fmtC(total,currSym)}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:11,color:"#6B7280",marginBottom:2}}>vs 3mo baseline</div>
              <div style={{fontSize:16,fontWeight:700,color:delta>=0?"#F87171":"#4ADE80"}}>
                {delta>=0?"+":""}{delta.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* ── SUMMARY ── */}
        {activeTab==="summary" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:28}}>
              <KpiCard label="Total Investment" value={fmtC(total,currSym)} sub={`${totalDays} days · ${months} month${months>1?"s":""}`} accent/>
              <KpiCard label="Consultant Days" value={`${totalDays} days`} sub="all Avature roles"/>
              <KpiCard label="Blended Day Rate" value={fmtC(blended,currSym)} sub="weighted average"/>
            </div>
            <div style={{background:"#0D1117",border:"1px solid #1F2937",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"16px 24px",borderBottom:"1px solid #1F2937",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontSize:12,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.1em"}}>Resource Allocation</div>
                <div style={{display:"flex",gap:10}}>
                  <Pill color="#1A6B7C">{months}mo · {totalWeeks}w</Pill>
                  <Pill color={complexColor}>{complexLabel} Scope</Pill>
                </div>
              </div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid #1F2937"}}>
                      {["Role","Adj. Day Rate","Days","Cost","% Share","Phase"].map(h=>(
                        <th key={h} style={{padding:"10px 16px",textAlign:h==="Role"||h==="Phase"?"left":"center",
                          color:"#6B7280",fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {computed.map((r,i)=>(
                      <tr key={r.id} style={{borderBottom:"1px solid #111827",background:i%2===0?"#060D18":"transparent"}}>
                        <td style={{padding:"11px 16px",color:"#F9FAFB",fontWeight:500}}>{r.role}</td>
                        <td style={{padding:"11px 16px",textAlign:"center",
                          color:rateAdj===0?"#9CA3AF":rateAdj>0?"#4ADE80":"#F87171",fontWeight:600}}>{fmtC(r.adjRate,currSym)}</td>
                        <td style={{padding:"11px 16px",textAlign:"center",color:"#D1D5DB"}}>
                          {r.scaledDays}
                          {r.complexDays>0&&<span style={{fontSize:10,color:complexColor,marginLeft:4}}>+{r.complexDays}</span>}
                        </td>
                        <td style={{padding:"11px 16px",textAlign:"center",color:"#F9FAFB",fontWeight:600}}>{fmtC(r.cost,currSym)}</td>
                        <td style={{padding:"11px 16px",textAlign:"center"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center"}}>
                            <div style={{width:60,height:4,background:"#1F2937",borderRadius:2,overflow:"hidden"}}>
                              <div style={{width:`${(r.cost/total)*100}%`,height:"100%",background:"#1A6B7C",borderRadius:2,transition:"width 0.4s"}}/>
                            </div>
                            <span style={{color:"#9CA3AF",fontSize:11}}>{((r.cost/total)*100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td style={{padding:"11px 16px"}}><Pill color="#1A6B7C">{r.phase}</Pill></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{background:"#1B2A4A",borderTop:"1px solid #2E4D7B"}}>
                      <td style={{padding:"12px 16px",color:"#F9FAFB",fontWeight:700}}>TOTAL</td>
                      <td></td>
                      <td style={{padding:"12px 16px",textAlign:"center",color:"#F9FAFB",fontWeight:700}}>{totalDays}</td>
                      <td style={{padding:"12px 16px",textAlign:"center",color:"#C9A84C",fontWeight:700,fontSize:16}}>{fmtC(total,currSym)}</td>
                      <td></td><td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab==="gantt" && (
          <div style={{background:"#0D1117",border:"1px solid #1F2937",borderRadius:12,padding:"28px 24px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <div>
                <div style={{fontSize:15,fontWeight:600,color:"#F9FAFB",marginBottom:4}}>Implementation Timeline</div>
                <div style={{fontSize:12,color:"#6B7280"}}>{months} month{months>1?"s":""} · {totalWeeks} weeks total · drag handles to adjust each phase</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {/* Free weeks pool indicator */}
                <div style={{
                  background: freeWeeks > 0 ? "#1A3A2A" : freeWeeks < 0 ? "#3A1A1A" : "#1F2937",
                  border: `1px solid ${freeWeeks > 0 ? "#166534" : freeWeeks < 0 ? "#991B1B" : "#374151"}`,
                  borderRadius:8, padding:"8px 16px", textAlign:"center",
                }}>
                  <div style={{fontSize:10,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:2}}>Unallocated</div>
                  <div style={{fontSize:18,fontWeight:700,color: freeWeeks > 0 ? "#4ADE80" : freeWeeks < 0 ? "#F87171" : "#6B7280"}}>
                    {freeWeeks > 0 ? "+" : ""}{freeWeeks}w
                  </div>
                </div>
                {phaseLayout && (
                  <button onClick={()=>setLayout(null)} style={{
                    background:"transparent",border:"1px solid #374151",borderRadius:6,
                    color:"#6B7280",padding:"8px 14px",fontSize:11,cursor:"pointer",fontFamily:"inherit",
                  }}>↺ Reset</button>
                )}
              </div>
            </div>

            {/* Week ruler */}
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <div style={{width:230,flexShrink:0}}/>
              <div style={{flex:1,display:"flex",position:"relative",height:16}}>
                {(() => {
                  const step = totalWeeks <= 13 ? 1 : totalWeeks <= 26 ? 2 : 4;
                  const ticks = [];
                  for (let i = 0; i <= totalWeeks; i += step) {
                    ticks.push(<div key={i} style={{position:"absolute",left:`${(i/totalWeeks)*100}%`,
                      fontSize:9,color:"#4B5563",transform:"translateX(-50%)",userSelect:"none"}}>W{i+1}</div>);
                  }
                  return ticks;
                })()}
              </div>
              <div style={{width:32}}/>
            </div>

            {/* Phase bars */}
            {phases.map((p,idx)=>(
              <DraggableGanttBar
                key={p.id}
                phase={p}
                idx={idx}
                totalWeeks={totalWeeks}
                freeWeeks={freeWeeks}
                onResize={handlePhaseResize}
                onMove={handlePhaseMove}
              />
            ))}

            {/* Free weeks visual bar */}
            {freeWeeks > 0 && (
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:7,opacity:0.6}}>
                <div style={{width:230,fontSize:10,color:"#4B5563",textAlign:"right",flexShrink:0}}>Unallocated buffer</div>
                <div style={{flex:1,height:28,background:"#1F2937",borderRadius:6,position:"relative"}}>
                  <div style={{
                    position:"absolute",
                    left:`${(usedWeeks/totalWeeks)*100}%`,
                    width:`${(freeWeeks/totalWeeks)*100}%`,
                    top:3,bottom:3,
                    background:"repeating-linear-gradient(45deg,#374151,#374151 4px,transparent 4px,transparent 8px)",
                    borderRadius:4,border:"1px dashed #4B5563",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    <span style={{fontSize:10,color:"#6B7280",fontWeight:600}}>{freeWeeks}w free</span>
                  </div>
                </div>
                <div style={{width:32}}/>
              </div>
            )}

            <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid #1F2937"}}>
              <div style={{fontSize:11,color:"#6B7280",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>Key Milestones</div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                {["Implementation Kick-Off","Configuration Approved","Final Sign-Off"].map(m=>(
                  <div key={m} style={{background:"#1F2937",border:"1px solid #374151",borderRadius:20,padding:"5px 14px",fontSize:11,color:"#9CA3AF"}}>✓ {m}</div>
                ))}
              </div>
            </div>
            <div style={{marginTop:14,paddingTop:12,borderTop:"1px solid #1F2937",display:"flex",gap:10,flexWrap:"wrap"}}>
              {phases.map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:10,height:10,borderRadius:3,background:p.color,flexShrink:0}}/>
                  <span style={{fontSize:10,color:"#6B7280"}}>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RATE CARD ── */}
        {activeTab==="rates" && (
          <RateCard resources={resources} rateAdj={rateAdj} onRateAdjChange={setRateAdj}
            onRateChange={(id,v)=>setResources(rs=>rs.map(r=>r.id===id?{...r,stdRate:v}:r))}
            onDaysChange={(id,v)=>setResources(rs=>rs.map(r=>r.id===id?{...r,baseDays:v}:r))}
            complexity={complexity} currSym={currSym}/>
        )}

        {/* ── CLIENT DETAILS ── */}
        {activeTab==="client" && (
          <ClientDetails clientName={clientName} setClientName={setClientName}
            importantNotice={importantNotice} setImportantNotice={setImportantNotice}
            currency={currency} setCurrency={setCurrency}/>
        )}
      </div>
    </div>
  );
}
