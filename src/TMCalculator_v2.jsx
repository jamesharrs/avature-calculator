import { useState, useRef, useEffect } from "react";

const LOGO_URI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJ1dWlkLTI3ZjVjY2VjLTEzYTctNGFiYS1hMDQyLTVmZDE3NDdlMzA2OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDE2MiAzMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLWNlZWE2ZTA4LWNiZDktNDE4Zi1iZjJiLWI0MzYyYTRiYTVmNSIgeDE9IjAiIHkxPSIxNiIgeDI9IjIzLjIxIiB5Mj0iMTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMDUzYmMiLz48c3RvcCBvZmZzZXQ9Ii41OSIgc3RvcC1jb2xvcj0iIzAwNTNiYyIvPjxzdG9wIG9mZnNldD0iLjY3IiBzdG9wLWNvbG9yPSIjMDA1NWMwIi8+PHN0b3Agb2Zmc2V0PSIuNzYiIHN0b3AtY29sb3I9IiMwMDVkY2MiLz48c3RvcCBvZmZzZXQ9Ii44NCIgc3RvcC1jb2xvcj0iIzAwNmFlMCIvPjxzdG9wIG9mZnNldD0iLjkzIiBzdG9wLWNvbG9yPSIjMDA3ZGZjIi8+PHN0b3Agb2Zmc2V0PSIuOTMiIHN0b3AtY29sb3I9IiMwMDdmZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC04YTdkYTYyMi01NTYwLTRiNzUtOGFkMS1jNTYwYjdkODhkMDIiIHgxPSI4LjIzIiB5MT0iMjQuNjUiIHgyPSIzMC43NyIgeTI9IjI0LjY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMDYiIHN0b3AtY29sb3I9IiMwMDUzYmMiLz48c3RvcCBvZmZzZXQ9Ii4xNSIgc3RvcC1jb2xvcj0iIzAwNjFkMiIvPjxzdG9wIG9mZnNldD0iLjI3IiBzdG9wLWNvbG9yPSIjMDA3MWViIi8+PHN0b3Agb2Zmc2V0PSIuMzgiIHN0b3AtY29sb3I9IiMwMDdiZjkiLz48c3RvcCBvZmZzZXQ9Ii40NyIgc3RvcC1jb2xvcj0iIzAwN2ZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLTA2ZTkyOTc5LTg0YmQtNDQwZi05YTdiLTlhMTFkMWQzOTY1NyIgeDE9IjguMjMiIHkxPSIyNC41NiIgeDI9IjMwLjc3IiB5Mj0iMjQuNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4wNiIgc3RvcC1jb2xvcj0iIzAwNTNiYyIvPjxzdG9wIG9mZnNldD0iLjM5IiBzdG9wLWNvbG9yPSIjMDA3NWYwIi8+PHN0b3Agb2Zmc2V0PSIuNzEiIHN0b3AtY29sb3I9IiMwMDY0ZjciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDViZmMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC1iZDcwNDkyZS01ZTJlLTRjYjgtOGFkYy05YjMyZTUyZTI2ZjIiIHgxPSIyLjQ4IiB5MT0iMzIuODUiIHgyPSIxNy42NyIgeTI9IjIuMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iIzAwNWJjZSIvPjxzdG9wIG9mZnNldD0iLjY0IiBzdG9wLWNvbG9yPSIjMDA3ZmZmIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTE1LjUzLjQ0TDAsMzEuNTZoMi43NWM1LjIxLDAsMTEuNDItMy44NywxNC4xLTkuMTFsNC44NS05LjdMMTUuNTMuNDRaIiBmaWxsPSJ1cmwoI3V1aWQtY2VlYTZlMDgtY2JkOS00MThmLWJmMmItYjQzNjJhNGJhNWY1KSIvPjxwYXRoIGQ9Ik0xOC4wMiwxOC4yMWMtMS4xNi0uMzQtMi4yOC0uNDctMy4zMy0uNDctMy42OCwwLTYuNDIsMS42Mi02LjQ2LDEuNjQsMi4yLjUzLDQuNjEsMS45Miw2LjkzLDQuODQsNy4zMSw5LjIsMTUuNjEsNy4xNCwxNS42MSw3LjE0LDAsMC0zLjEtMTAuNS0xMi43NS0xMy4xNVoiIGZpbGw9InVybCgjdXVpZC04YTdkYTYyMi01NTYwLTRiNzUtOGFkMS1jNTYwYjdkODhkMDIpIi8+PHBhdGggZD0iTTE4LjAyLDE4LjIxYy01LjI1LTEuNTMtOS43OCwxLjE3LTkuNzksMS4xOC4wMywwLC4wNi4wMi4wOS4wMiwxNC4xMi0yLjA5LDExLjE4LDkuMjQsMjIuNDUsMTEuOTYsMCwwLTMuMS0xMC41LTEyLjc1LTEzLjE1WiIgZmlsbD0idXJsKCN1dWlkLTA2ZTkyOTc5LTg0YmQtNDQwZi05YTdiLTlhMTFkMWQzOTY1NykiLz48cGF0aCBkPSJNMTguNjMsNi42M0wxNS41My40NCwwLDMxLjU2aDMuMDNTMTEuMTgsMTUuMjIsMTEuMTgsMTUuMjJjMi41My00Ljg4LDUuMDgtNy4xMiw3LjQ0LTguNTlaIiBmaWxsPSJ1cmwoI3V1aWQtYmQ3MDQ5MmUtNWUyZS00Y2I4LThhZGMtOWIzMmU1MmUyNmYyKSIvPjxwb2x5Z29uIHBvaW50cz0iNzAuNzUgMTAuMzkgNjQuNzkgMjIuMDggNTguOTUgMTAuMzkgNTQuNjQgMTAuMzkgNjIuNzkgMjUuOTggNjYuNzYgMjUuOTggNzQuOSAxMC4zOSA3MC43NSAxMC4zOSIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMjUuMzksMTkuNjRjMCwuNzktLjE2LDEuNDMtLjQ3LDEuOS0uMy40NS0uODUuNzktMS42MywxLjAxLS44OC4yNS0yLjEyLjM4LTMuNy4zOC0xLjA3LDAtMS45NS0uMDYtMi42MS0uMTktLjU4LS4xMS0xLjAzLS4yOS0xLjMzLS41NS0uMjgtLjI0LS40OC0uNTktLjYtMS4wNy0uMTQtLjU1LS4yMS0xLjI4LS4yMS0yLjE2di04LjU4aC0zLjcydjguNThjMCwxLjc4LjI0LDMuMTYuNzQsNC4yMi41MywxLjEyLDEuNDIsMS45MiwyLjY1LDIuMzksMS4xNC40MywyLjcxLjY2LDQuNjQuNjYsMS40NiwwLDIuNjYtLjA4LDMuNTgtLjI1Ljk3LS4xOCwxLjc0LS40NCwyLjM0LS44MS4xLS4wNi4yLS4xMy4zLS4ydi45OWgzLjcxdi0xNS41OGgtMy43MXY5LjI1WiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMzkuMDksMTAuMjljLS44MS4wOC0xLjQ0LjIxLTEuOTQuMzloMGMtLjM2LjE0LS42Ny4zMS0uOTUuNTJ2LS44MWgtMy43MXYxNS41OGgzLjcxdi05LjM4YzAtLjcxLjA0LTEuMy4xMS0xLjc1LjA1LS4zMS4xOS0uNTQuNDQtLjcxLjItLjE0LjY1LS4zNCwxLjYyLS40Ny44Ni0uMTEsMi4xMS0uMTcsMy43MS0uMTdoLjY3di0zLjMyaC0uNjdjLTEuMjMsMC0yLjIzLjA0LTMsLjExWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik05MC44MSwxMS44aDBjLS42Mi0uNjUtMS41Mi0xLjExLTIuNjctMS4zNS0xLjA2LS4yMi0yLjQ2LS4zNC00LjE2LS4zNGgtNy4xOXYzLjMxaDcuMTljMS4xMywwLDIuMDMuMDQsMi42OS4xMy41Ni4wNy45OC4yMiwxLjI0LjQ0LjI0LjIxLjQyLjU1LjUyLDEuMDMuMDkuNDMuMTUuOTguMTgsMS42NS0uNTktLjA5LTEuMjItLjE2LTEuOS0uMjEtLjc3LS4wNS0xLjY5LS4wOC0yLjczLS4wOS0uMzEsMC0uNjMsMC0uOTYsMC0xLjgyLDAtMy4zMS4wOS00LjQ1LjI4LTEuMjYuMjEtMi4yMS42OC0yLjgxLDEuNDEtLjYyLjc0LS45MiwxLjgxLS45MiwzLjI4cy4zMywyLjUzLjk4LDMuMjVjLjY0LjcyLDEuNjEsMS4xOCwyLjg3LDEuMzgsMS4xNC4xOCwyLjYuMjcsNC4zMy4yNy4zNCwwLC42NiwwLC45NywwLC44OC0uMDIsMS42NC0uMDYsMi4yNS0uMTIuODgtLjA5LDEuNTgtLjI0LDIuMTMtLjQ0LjA5LS4wMy4xOC0uMDcuMjctLjExdi40MWgzLjcxdi03LjUyYzAtMS42MS0uMS0yLjk1LS4yOS0zLjk4LS4yMS0xLjEyLS42My0yLjAyLTEuMjUtMi42N1pNODguNjQsMjEuMjNjMCwuNjMtLjA4Ljk3LS4xNSwxLjE0LS4wNC4wOS0uMTIuMjMtLjQzLjM0LS4yNC4wOS0uNzMuMi0xLjY5LjIzLS42Mi4wMi0xLjQzLjA0LTIuNC4wNS0uMywwLS42MiwwLS45NSwwLTEuMDksMC0xLjk4LS4wMi0yLjY1LS4wNi0uNzUtLjA1LTEuMTQtLjE1LTEuMzQtLjIzLS4yNC0uMS0uMzEtLjIyLS4zNS0uMzItLjA2LS4xNi0uMTQtLjQ3LS4xNC0xLjA0cy4wOC0uOTIuMTQtMS4wOWMuMDQtLjEuMTEtLjIzLjM1LS4zNC4xOS0uMDguNTgtLjE5LDEuMzMtLjI0LjQ4LS4wMywxLjA5LS4wNSwxLjgxLS4wNS4yNiwwLC41NCwwLC44MywwbDUuNjMuMDd2MS41M1oiIGZpbGw9IiMxMTEiLz48cGF0aCBkPSJNNTIuNTQsMTEuOGMtLjYyLS42NS0xLjUyLTEuMTEtMi42Ny0xLjM1LTEuMDYtLjIyLTIuNDYtLjM0LTQuMTYtLjM0aC03LjE5djMuMzFoNy4xOWMxLjEzLDAsMi4wMy4wNCwyLjY5LjEzLjU2LjA3Ljk4LjIyLDEuMjQuNDQuMjQuMjEuNDIuNTUuNTIsMS4wMy4wOS40My4xNS45OC4xOCwxLjY1LS41OS0uMDktMS4yMi0uMTYtMS45LS4yMS0uNzctLjA1LTEuNjktLjA4LTIuNzMtLjA5LS4zMSwwLS42MywwLS45NiwwLTEuODIsMC0zLjMxLjA5LTQuNDUuMjgtMS4yNi4yMS0yLjIxLjY4LTIuODEsMS40MS0uNjIuNzQtLjkyLDEuODEtLjkyLDMuMjhzLjMzLDIuNTMuOTgsMy4yNWMuNjQuNzIsMS42MSwxLjE4LDIuODcsMS4zOCwxLjE0LjE4LDIuNi4yNyw0LjMzLjI3LjM0LDAsLjY2LDAsLjk3LDAsLjg4LS4wMiwxLjY0LS4wNiwyLjI1LS4xMi44OC0uMDksMS41OC0uMjQsMi4xMy0uNDQuMDktLjAzLjE4LS4wNy4yNy0uMTF2LjQxaDMuNzF2LTcuNTJjMC0xLjYxLS4xLTIuOTUtLjI5LTMuOTgtLjIxLTEuMTItLjYzLTIuMDItMS4yNS0yLjY3Wk01MC4zNywyMS4yM2MwLC42My0uMDguOTctLjE1LDEuMTQtLjA0LjA5LS4xMi4yMy0uNDMuMzQtLjI0LjA5LS43My4yLTEuNjkuMjMtLjYyLjAyLTEuNDMuMDQtMi40LjA1LS4zLDAtLjYyLDAtLjk1LDAtMS4wOSwwLTEuOTgtLjAyLTIuNjUtLjA2LS43NS0uMDUtMS4xNC0uMTUtMS4zNC0uMjMtLjI0LS4xLS4zMS0uMjItLjM1LS4zMi0uMDYtLjE2LS4xNC0uNDctLjE0LTEuMDRzLjA4LS45Mi4xNC0xLjA5Yy4wNC0uMS4xMS0uMjMuMzUtLjM0LjE5LS4wOC41OC0uMTksMS4zMy0uMjQuNDgtLjAzLDEuMDktLjA1LDEuODEtLjA1LjI2LDAsLjU0LDAsLjgzLDBsNS42My4wN3YxLjUzWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xNTguMTIsMjAuMDRjMCwuMTIuMTMsMi43Mi0zLjA0LDIuNzJzLTYuMjUuNTQtNy0xLjYybDEwLjMzLTMuOTQsMi45OC0xLjE0LjYtLjIzYy0uMDItLjQ0LS4wNy0uODYtLjE4LTEuMjgtLjE3LS42Ny0uNDYtMS4zMS0uODUtMS44OC0uODMtMS4yMi0yLjEtMi4xNS0zLjY1LTIuNTMtLjk1LS4yMi0xLjA3LS4xNy02Ljk4LS4xNy0zLjM1LDAtNi4wOCwyLjczLTYuMDgsNi4wOHYzLjk3YzAsMy4zNSwyLjczLDYuMDgsNi4wOCw2LjA4LDUuOTEsMCw2LjAzLjA2LDYuOTgtLjE3LDIuNzktLjY3LDQuNjgtMy4xNCw0LjY4LTUuOTFoLTMuODhaTTE0Ny45MSwxNi4wNmMwLTMuNDMsMy42NS0yLjcyLDcuMTYtMi43MiwxLjEsMCwxLjc5LjMxLDIuMjQuNzNsLTkuNDQsMy42Yy4wMS0uNTIuMDMtMS4wNi4wMy0xLjYxWiIgZmlsbD0iIzExMSIvPjxwYXRoIGQ9Ik0xMDEuNDcsMjIuNTJjLS40MS0uNC0uMy0uNTktLjMtOC42di0uMjRoNi40OHYtMy4yOWgtNi41di00LjY0aC0zLjcxdjQuNjNoLTIuNzR2My4zMWgyLjc1di4yM3MuMDEsNy41Mi4wMSw3LjUyYzAsMy4wNiwyLjE2LDQuNjQsNC40LDQuODJoNS45OHYtMy40NmMtNS45LDAtNS45OS4xLTYuMzktLjI4WiIgZmlsbD0iIzExMSIvPjwvc3ZnPg==";

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
  const totalWeeks = months * 4.33;
  let cumulative = 0;
  return PHASES.map((p, i) => {
    const startWeek = Math.round(cumulative) + 1;
    const rawDur = p.fraction * totalWeeks;
    const duration = i === PHASES.length - 1
      ? Math.round(totalWeeks) - startWeek + 1
      : Math.max(1, Math.round(rawDur));
    cumulative += rawDur;
    return { ...p, startWeek, duration, totalWeeks: Math.round(totalWeeks) };
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
          <div style={{fontSize:13, color:"#6B7280", letterSpacing:"0.05em"}}>Implementation Calculator</div>
        </div>

        <div style={{fontSize:20, fontWeight:700, color:"#F9FAFB", marginBottom:8, textAlign:"center"}}>Welcome back</div>
        <div style={{fontSize:13, color:"#6B7280", marginBottom:32, textAlign:"center"}}>Sign in to access the calculator</div>

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
  const [months, setMonths] = useState(3);
  const [rateAdj, setRateAdj] = useState(0);
  const [complexity, setComplexity] = useState(25);
  const [resources, setResources] = useState(DEFAULT_RESOURCES);
  const [activeTab, setActiveTab] = useState("summary");
  const [clientName, setClientName] = useState("");
  const [importantNotice, setImportantNotice] = useState(DEFAULT_NOTICE);
  const [currency, setCurrency] = useState("USD");
  const [phaseLayout, setPhaseLayout] = useState(null);
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

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

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
              <span style={{fontSize:13,color:"#6B7280"}}>Implementation Calculator</span>
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
                onClick={()=>{ if(freeWeeks!==0){ return; } printProposal(months,computed,phases,clientName,importantNotice,currSym); }}
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
              <button className="signout" onClick={()=>setLoggedIn(false)}
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
