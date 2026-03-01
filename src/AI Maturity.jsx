import { useState, useMemo } from "react";

const QUESTIONS = [
  { id:"Q1", stage:"ATTRACT", category:"AI Content Generation", question:"Are job descriptions, career site content, and candidate communications created or enhanced using AI tools?", roi:"Efficiency", scores:["All content manually written with no standardisation or reuse. No AI assistance available or considered.","Team has discussed using AI or templates, but no tools are active. Some recruiters experiment informally.","Copilot or AI tools used for drafts by some recruiters in limited regions. Adoption inconsistent.","Most job ads and communications generated with Copilot; consistently reviewed with brand guidelines. Usage tracked.","Job ads created with skills-tagging, tone controls, brand compliance, translation, and full Copilot automation."] },
  { id:"Q2", stage:"ATTRACT", category:"Skills & Taxonomy", question:"Are job ads enriched with structured skills data and connected to a central taxonomy?", roi:"Strategic", scores:["Job ads do not contain structured or inferred skills. No job/role taxonomy exists.","Some jobs manually tagged with skills; no inference, consistency, or connection to broader architecture.","Skills pulled from HRIS or copy-pasted into job templates. Job architecture exists but not connected to TA processes.","Jobs enriched with validated skills from enterprise taxonomy. Roles mapped to taxonomy in CRM/ATS and synced to job ads.","Skills inferred from role context and used in search optimisation. Ontology maintained centrally across HRIS, CRM, and planning."] },
  { id:"Q3", stage:"ATTRACT", category:"Campaign Orchestration", question:"Are sourcing campaigns, candidate nurturing, and event follow-ups automated and segmented by role/skills/behaviour?", roi:"Efficiency", scores:["No email or nurture campaigns in use. All outreach manual and ad hoc.","Manual email sends by recruiters to limited talent pools. Basic lists in spreadsheets.","Drip campaigns created by CRM leads for priority roles. Basic segmentation by job family. Time-based but not behaviour-based.","Campaigns triggered by candidate activity or time-lapse rules. Dynamic content blocks with analytics.","Campaigns AI-curated and optimised by engagement behaviour. Content adapts to interactions. AI dynamically reweights channels."] },
  { id:"Q4", stage:"ATTRACT", category:"Proactive Sourcing", question:"Are passive candidates pre-pipelined before requisitions open using job family logic and AI recommendations?", roi:"Strategic", scores:["Pipelining only after job posted. No proactive sourcing. Recruiters start from scratch with each new requisition.","Ad hoc pre-req sourcing in one or two high-volume areas. Not systematic.","Evergreen requisitions or placeholder pools exist for common roles. Pools manually maintained and not refreshed regularly.","Pools tied to job families. Recruiters pre-source for priority roles using CRM workflows.","AI suggests and ranks candidates for pre-reqs based on forecast and readiness. Copilot recommends leads before requisition approval."] },
  { id:"Q5", stage:"ATTRACT", category:"Performance Optimisation", question:"Is engagement data used to refine content, optimise channels, and improve candidate journeys?", roi:"Experience", scores:["No tracking or visibility into job ad, campaign, or career site performance. No analytics exist.","Some UTM tracking or anecdotal feedback. Basic source-of-apply data exists but not analysed.","Basic source-of-apply tracking in one region or job board. Data reviewed quarterly but not used to drive changes.","Ad performance metrics visible in CRM or career site dashboard. Insights used to A/B test content and channels.","AI suggests real-time optimisations based on audience and performance. AI personalises full site experience."] },
  { id:"Q6", stage:"HIRE", category:"AI Matching", question:"Are candidates ranked using skills-based AI matching with explainable scoring visible to recruiters?", roi:"Efficiency", scores:["Recruiters manually search and rank candidates without AI. All evaluation based on keyword search and personal judgement.","Matching engine enabled but not trusted or actively used. Scoring logic unclear. Recruiters prefer manual review.","AI matching used to rank candidates in limited requisitions without scoring explanation.","AI matching with scoring used and visible to most recruiters. Explainability dashboard adopted.","Explainability, scoring, and match logic embedded and trusted org-wide. Match quality improves over time through feedback."] },
  { id:"Q7", stage:"HIRE", category:"Talent Discovery", question:"Do recruiters use semantic search, AI-suggested synonyms, and automated rediscovery of past candidates?", roi:"Efficiency", scores:["Recruiters search using keywords and Boolean only. Past applicants not revisited. No synonym expansion.","Some search expansions using synonym libraries or filters. No AI assistance in broadening terms.","Copilot or AI assists with simple term rewrites. Silver medallists tagged manually in some reqs.","Recruiters use Copilot or semantic search to broaden pipelines. Rediscovery automations resurface candidates for similar roles.","AI proactively suggests pipeline leads based on inferred fit. AI continuously mines pools for role fit and mobility."] },
  { id:"Q8", stage:"HIRE", category:"Screening Automation", question:"Are screening workflows, shortlisting, and candidate routing automated with triggers and AI summaries?", roi:"Efficiency", scores:["Recruiters manually screen all resumes with no automation. Every application requires manual review.","Rules or tags used to filter applications in bulk. Basic pass/fail criteria.","Workflows route candidates based on survey or form inputs. Some conditional logic.","AI-generated summaries or scores used to prioritise reviews. Automated routing sends qualified candidates to hiring managers.","Copilot and workflows automate initial review and routing. Screening logic adapts based on performance and feedback."] },
  { id:"Q9", stage:"HIRE", category:"Scheduling Automation", question:"Are interviews coordinated through self-scheduling, conflict-aware automation, or AI-powered tools?", roi:"Efficiency", scores:["Recruiters manually coordinate all interviews via email. Significant coordination time required.","Calendars shared, but scheduling still email-based. Recruiters can see availability but manually propose times.","Basic time slot tools used for select roles. Candidates pick from available times.","Candidate self-scheduling enabled via integrated workflows. Conflict detection for panel interviews.","Conflict-aware automation routes to best-fit slots. AI considers time zones, preferences, panel availability."] },
  { id:"Q10", stage:"HIRE", category:"Bias & Feedback Quality", question:"Are AI decisions logged, monitored for bias, and supported by structured hiring manager feedback loops?", roi:"Strategic", scores:["No logging or monitoring of AI-assisted decisions. No structured feedback from hiring managers.","Some manual review of AI decisions post-hire. Feedback collected informally.","AI decisions logged in system. Periodic review by TA ops or compliance team.","Bias monitoring dashboards in use. Structured feedback loops from hiring managers feed scoring adjustments.","Full audit trail of AI decisions. Bias metrics reviewed quarterly. Feedback loops continuously improve AI model accuracy."] },
  { id:"Q11", stage:"DEVELOP", category:"Skills Gap Analysis", question:"Are skill gaps visible at individual/team level and connected to development plans?", roi:"Strategic", scores:["No visibility into skill gaps. Development planning done ad hoc without data.","Skill gaps identified manually during performance reviews. No connection to development plans.","Skills assessments exist in some business units. Gap data not connected to learning recommendations.","Skills gaps visible in talent profiles. Managers can see team-level gaps. Connected to development plan workflows.","AI-generated gap analysis surfaced proactively. Skills forecasts drive development planning. Connected to internal mobility and succession."] },
  { id:"Q12", stage:"DEVELOP", category:"Development Insights", question:"Are AI-generated insights available to managers and employees to guide development priorities?", roi:"Experience", scores:["No AI-driven development insights. Managers rely on instinct or HR guidance.","Generic development prompts available but not personalised to role or skills profile.","Learning recommendations exist in LMS but not connected to skills data or career paths.","AI-generated insights surfaced to managers at review cycles. Employees see recommended skills to develop.","Real-time AI nudges guide employees and managers. Insights connected to role market trends, internal mobility, and succession data."] },
  { id:"Q13", stage:"DEVELOP", category:"Learning Automation", question:"Are learning nudges, enablement content, and skill-building pathways automated and personalised?", roi:"Efficiency", scores:["Learning is self-directed with no automation or personalisation.","Some role-based learning paths exist. Manually curated by L&D team.","Learning paths connected to job profile. Completion tracked but nudges are manual.","Automated nudges triggered by skills gaps or role changes. Content recommended based on profile.","AI personalises learning pathways dynamically. Nudges adapt based on engagement, progress, and business priorities."] },
  { id:"Q14", stage:"DEVELOP", category:"Ontology Stewardship", question:"Is the enterprise skills taxonomy actively managed with designated ownership and a refresh cadence?", roi:"Governance", scores:["No formal skills taxonomy in use. Skills data fragmented across systems.","Taxonomy exists but ownership is unclear. Last updated over a year ago.","Taxonomy maintained by HR ops. Annual refresh. Not connected to TA or L&D workflows.","Taxonomy owned by defined team. Quarterly review. Connected to job architecture and learning content.","Taxonomy governed by cross-functional team. Continuous improvement cycle. Integrated across HRIS, CRM, ATS, and LMS."] },
  { id:"Q15", stage:"DEVELOP", category:"Proficiency Management", question:"Are skill proficiencies rated, validated by managers, and used in talent decisions?", roi:"Strategic", scores:["No proficiency ratings in use. Skills treated as binary present/absent.","Proficiency levels exist in system but self-assessed only. Rarely used in talent decisions.","Manager validation of proficiencies available but inconsistently used.","Proficiency ratings validated by managers and used in succession and mobility decisions.","AI infers proficiency from activity signals. Validated ratings feed AI matching, succession planning, and external hiring decisions."] },
  { id:"Q16", stage:"RETAIN", category:"Internal Matching", question:"Are employees matched to internal opportunities using AI and skills-based logic?", roi:"Strategic", scores:["No internal opportunity matching. Employees find roles through word of mouth or manual search.","Internal job board exists but no AI matching. Employees search manually.","Basic matching by job family or department. Not skills-based.","AI matching surfaces relevant internal roles to employees based on profile and skills.","AI proactively recommends internal moves before employees search. Matches include lateral, stretch, and project opportunities."] },
  { id:"Q17", stage:"RETAIN", category:"Mobility Automation", question:"Are mobility campaigns automated and internal transitions supported by structured workflows?", roi:"Efficiency", scores:["Internal moves handled ad hoc. No campaigns or workflows to support transitions.","Some internal hiring processes documented but not automated.","Internal move workflows exist for select role types. No automated campaigns.","Mobility campaigns automated. Employees notified of relevant opportunities based on profile triggers.","End-to-end mobility journeys automated from interest to onboarding. AI optimises campaign timing and targeting."] },
  { id:"Q18", stage:"RETAIN", category:"Mobility Intelligence", question:"Are mobility patterns tracked across dimensions (dept, level, DEI) and used to inform retention strategy?", roi:"Strategic", scores:["No mobility data tracked. Retention strategy based on exit interviews and anecdote.","Basic headcount movement tracked in HRIS. Not analysed for patterns.","Mobility data available in reports. Reviewed periodically by HR leadership.","Mobility trends analysed by department, level, and demographics. Insights inform retention planning.","Predictive models flag flight risk and mobility readiness. AI links mobility patterns to engagement and performance outcomes."] },
  { id:"Q19", stage:"RETAIN", category:"Opportunity Ecosystem", question:"Can employees access an opportunity marketplace with mentoring, projects, and stretch assignments?", roi:"Experience", scores:["No opportunity marketplace. Employees have limited visibility of development or stretch options.","Ad hoc mentoring and project work. No central platform.","Internal project board or mentoring programme exists but participation is low.","Opportunity marketplace live with projects, mentoring, and stretch assignments. Employee uptake tracked.","AI-powered marketplace personalises opportunities to employee profile, aspirations, and skills gaps."] },
  { id:"Q20", stage:"PLAN", category:"Workforce Forecasting", question:"Are predictive tools used to forecast role and skill demand, linked to business planning cycles?", roi:"Strategic", scores:["Workforce planning based on headcount targets only. No predictive capability.","Basic demand forecasting done in spreadsheets. Disconnected from business planning.","Forecasting tool in use but data quality inconsistent. Limited stakeholder trust.","Predictive demand models connected to business planning cycle. Scenarios modelled by HR and finance.","AI forecasts demand by role, skill, location, and business unit. Connected to financial planning and real-time workforce data."] },
  { id:"Q21", stage:"PLAN", category:"Scenario Planning", question:"Can leaders model organisational change impacts using unified workforce data?", roi:"Strategic", scores:["No scenario planning capability. Leaders rely on static headcount data.","Scenario modelling done in spreadsheets. No integration with live workforce data.","Basic what-if modelling available in planning tool. Limited to headcount changes.","Leaders can model restructures, growth scenarios, and skill redeployment using integrated workforce data.","AI generates recommended scenarios based on market signals and internal data. Modelling includes cost, skills, and DEI impact."] },
  { id:"Q22", stage:"PLAN", category:"Planning Governance", question:"Is there cross-functional governance reviewing KPIs, with planning connected to TA and L&D execution?", roi:"Governance", scores:["No governance structure for workforce planning. HR plans in isolation.","Occasional planning reviews with HR leadership. KPIs not formalised.","Quarterly workforce planning reviews with HR. Loosely connected to TA hiring plans.","Cross-functional governance with HR, Finance, and business leaders. KPIs tracked. Connected to TA pipeline and L&D programmes.","Executive-sponsored governance with quarterly board-level reporting. Planning outcomes drive TA, L&D, and total rewards decisions."] },
  { id:"Q23", stage:"MEASURE", category:"Unified Analytics", question:"Are CRM, ATS, and HRIS data unified with predictive analytics accessible to TA and HR leaders?", roi:"Strategic", scores:["Data sits in separate systems. No unified view. Leaders rely on manual exports.","Basic reporting available in each system. Some manual consolidation by HR ops.","Cross-system dashboards exist but data quality issues undermine trust.","Unified analytics platform used by TA and HR leaders. Key metrics tracked across the talent lifecycle.","AI-powered analytics surface predictive insights. Leaders receive proactive alerts and trend analysis across all talent data."] },
  { id:"Q24", stage:"MEASURE", category:"Data & Compliance", question:"Are data accuracy, duplication, and compliance rules (opt-in, GDPR, data decay) actively managed?", roi:"Governance", scores:["No data governance policy in place. Compliance managed reactively.","Basic GDPR processes in place. Data quality managed manually by HR ops.","Data hygiene rules configured in system. Duplication and opt-in managed with some automation.","Data governance policy active. Automated compliance workflows. Regular audits with documented outcomes.","Proactive data governance with AI-flagged anomalies. Full audit trails. GDPR and regional compliance automated end-to-end."] },
  { id:"Q25", stage:"MEASURE", category:"ROI & Ethics", question:"Are ROI metrics reviewed quarterly, governance/ethics policies maintained, and outcomes shared with leadership?", roi:"Governance", scores:["No ROI measurement. Ethics policies not documented.","ROI tracked informally. Ethics guidelines exist but not actively enforced.","Quarterly ROI review by HR leadership. Ethics policy documented.","ROI metrics shared with business leadership. Ethics governance reviewed semi-annually. Linked to AI tool procurement.","Exec-level ROI reporting. Ethics board or committee reviewing AI use. Outcomes published internally. Continuous improvement cycle."] },
];

const STAGES = ["ATTRACT","HIRE","DEVELOP","RETAIN","PLAN","MEASURE"];
const STAGE_RANGES = { ATTRACT:[0,4], HIRE:[5,9], DEVELOP:[10,14], RETAIN:[15,18], PLAN:[19,21], MEASURE:[22,24] };
const ROI_COLOR = { Efficiency:"#3b82f6", Strategic:"#8b5cf6", Experience:"#10b981", Governance:"#f59e0b" };
const SCORE_LABELS = ["Pre-Activation","Foundational","Emerging","Developing","Advanced"];
const SCORE_COLORS = ["#ef4444","#f97316","#eab308","#22c55e","#6366f1"];

function getMaturity(score) {
  if (score === null || score === undefined) return { label:"—", color:"#475569" };
  const i = Math.min(Math.floor(score), 4);
  return { label: SCORE_LABELS[i], color: SCORE_COLORS[i] };
}

function avg(arr) {
  const valid = arr.filter(v => v !== null && v !== undefined);
  if (!valid.length) return null;
  return valid.reduce((a,b)=>a+b,0)/valid.length;
}

export default function App() {
  const [scores, setScores] = useState({});
  const [view, setView] = useState("assessment");
  const [currentStage, setCurrentStage] = useState("ATTRACT");

  const answered = Object.keys(scores).length;
  const total = QUESTIONS.length;

  const stageScores = useMemo(() => {
    const out = {};
    for (const [stage, [s,e]] of Object.entries(STAGE_RANGES)) {
      const qs = QUESTIONS.slice(s, e+1);
      out[stage] = avg(qs.map(q => scores[q.id] ?? null));
    }
    return out;
  }, [scores]);

  const overall = useMemo(() => avg(QUESTIONS.map(q => scores[q.id] ?? null)), [scores]);
  const intelIds = ["Q1","Q2","Q5","Q6","Q11","Q12","Q16","Q18","Q19","Q20","Q23"];
  const autoIds  = ["Q3","Q4","Q8","Q9","Q13","Q17","Q21","Q24"];
  const govIds   = ["Q2","Q10","Q14","Q15","Q22","Q24","Q25"];
  const intelScore = useMemo(() => avg(intelIds.map(id => scores[id] ?? null)), [scores]);
  const autoScore  = useMemo(() => avg(autoIds.map(id => scores[id] ?? null)), [scores]);
  const govScore   = useMemo(() => avg(govIds.map(id => scores[id] ?? null)), [scores]);

  const stageQs = QUESTIONS.filter(q => q.stage === currentStage);
  const stageIdx = STAGES.indexOf(currentStage);
  const stageDone = stageQs.filter(q => scores[q.id] !== undefined).length;

  return (
    <div style={{ fontFamily:"'DM Sans','Trebuchet MS',sans-serif", background:"#0b1120", minHeight:"100vh", color:"#e2e8f0" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)", borderBottom:"1px solid #1e293b", padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.15em", color:"#6366f1", fontWeight:700, textTransform:"uppercase" }}>Avature</div>
            <div style={{ fontSize:17, fontWeight:700, color:"#f8fafc", letterSpacing:"-0.02em" }}>AI Maturity Self-Assessment</div>
          </div>
          <div style={{ fontSize:12, color:"#475569", borderLeft:"1px solid #1e293b", paddingLeft:20 }}>
            <span style={{ color: answered===total ? "#22c55e" : "#94a3b8", fontWeight:600 }}>{answered}</span>
            <span style={{ color:"#334155" }}>/{total} answered</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["assessment","dashboard"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding:"7px 18px", borderRadius:6, border:"1px solid", borderColor: view===v ? "#6366f1" : "#1e293b", background: view===v ? "#6366f1" : "transparent", color: view===v ? "#fff" : "#64748b", fontSize:12, fontWeight:600, cursor:"pointer", textTransform:"capitalize" }}>
              {v === "assessment" ? "Assessment" : "Dashboard"}
            </button>
          ))}
        </div>
      </div>

      {view === "assessment" && (
        <div style={{ display:"flex", minHeight:"calc(100vh - 61px)" }}>

          {/* Stage sidebar */}
          <div style={{ width:160, background:"#0a0f1e", borderRight:"1px solid #1e293b", flexShrink:0, position:"sticky", top:61, height:"calc(100vh - 61px)", overflowY:"auto" }}>
            {STAGES.map(stage => {
              const [s,e] = STAGE_RANGES[stage];
              const qs = QUESTIONS.slice(s,e+1);
              const done = qs.filter(q => scores[q.id] !== undefined).length;
              const sc = stageScores[stage];
              const active = currentStage === stage;
              return (
                <button key={stage} onClick={() => setCurrentStage(stage)} style={{ width:"100%", padding:"14px 16px", background: active ? "#1e293b" : "transparent", border:"none", borderLeft:`3px solid ${active ? "#6366f1" : "transparent"}`, color: active ? "#f8fafc" : "#64748b", textAlign:"left", cursor:"pointer", fontSize:12, fontWeight: active ? 700 : 400, transition:"all 0.15s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <span>{stage}</span>
                    {sc !== null && <span style={{ fontSize:11, fontWeight:800, color:getMaturity(sc).color }}>{sc.toFixed(1)}</span>}
                  </div>
                  <div style={{ display:"flex", gap:2 }}>
                    {qs.map(q => (
                      <div key={q.id} style={{ width:8, height:4, borderRadius:2, background: scores[q.id] !== undefined ? SCORE_COLORS[scores[q.id]] : "#1e293b" }} />
                    ))}
                  </div>
                  <div style={{ fontSize:10, color:"#334155", marginTop:4 }}>{done}/{qs.length}</div>
                </button>
              );
            })}
          </div>

          {/* Question list */}
          <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>

            {/* Stage header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:"#f8fafc" }}>{currentStage}</h2>
                <p style={{ margin:"3px 0 0", fontSize:12, color:"#475569" }}>{stageDone}/{stageQs.length} answered · Score each question 0–4 using the descriptions below</p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {stageIdx > 0 && <button onClick={() => setCurrentStage(STAGES[stageIdx-1])} style={{ padding:"6px 14px", borderRadius:6, border:"1px solid #1e293b", background:"transparent", color:"#64748b", fontSize:12, cursor:"pointer" }}>← {STAGES[stageIdx-1]}</button>}
                {stageIdx < STAGES.length-1 && <button onClick={() => setCurrentStage(STAGES[stageIdx+1])} style={{ padding:"6px 14px", borderRadius:6, border:"1px solid #1e293b", background:"#1e293b", color:"#e2e8f0", fontSize:12, cursor:"pointer", fontWeight:600 }}>{STAGES[stageIdx+1]} →</button>}
              </div>
            </div>

            {/* Score legend */}
            <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
              {SCORE_LABELS.map((label, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", background:"#0f172a", border:`1px solid ${SCORE_COLORS[i]}33`, borderRadius:20 }}>
                  <span style={{ fontSize:12, fontWeight:800, color:SCORE_COLORS[i] }}>{i}</span>
                  <span style={{ fontSize:11, color:"#64748b" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Questions — fully inline */}
            {stageQs.map((q) => {
              const selected = scores[q.id];
              const hasAnswer = selected !== undefined;
              return (
                <div key={q.id} style={{ background:"#0f172a", border:`1px solid ${hasAnswer ? SCORE_COLORS[selected]+"44" : "#1e293b"}`, borderRadius:10, marginBottom:16, overflow:"hidden" }}>

                  {/* Question header */}
                  <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid #1e293b" }}>
                    <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap", alignItems:"center" }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"#6366f1", background:"#1e1b4b", padding:"2px 8px", borderRadius:10, letterSpacing:"0.05em" }}>{q.id}</span>
                      <span style={{ fontSize:11, color:"#64748b", background:"#1e293b", padding:"2px 8px", borderRadius:10 }}>{q.category}</span>
                      <span style={{ fontSize:10, color:ROI_COLOR[q.roi], padding:"2px 8px", borderRadius:10, border:`1px solid ${ROI_COLOR[q.roi]}44` }}>{q.roi}</span>
                      {hasAnswer && (
                        <span style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:SCORE_COLORS[selected], background:`${SCORE_COLORS[selected]}15`, padding:"2px 10px", borderRadius:10 }}>
                          {selected} · {SCORE_LABELS[selected]}
                        </span>
                      )}
                    </div>
                    <p style={{ margin:0, fontSize:14, color:"#cbd5e1", lineHeight:1.6, fontWeight:500 }}>{q.question}</p>
                  </div>

                  {/* Score options — all visible */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0 }}>
                    {q.scores.map((desc, i) => {
                      const isSelected = selected === i;
                      return (
                        <button key={i} onClick={() => setScores(s => ({ ...s, [q.id]: i }))} style={{ padding:"12px 14px", background: isSelected ? `${SCORE_COLORS[i]}18` : "transparent", border:"none", borderRight: i < 4 ? "1px solid #1e293b" : "none", borderTop: isSelected ? `2px solid ${SCORE_COLORS[i]}` : "2px solid transparent", color:"inherit", textAlign:"left", cursor:"pointer", transition:"all 0.15s" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                            <span style={{ fontSize:16, fontWeight:800, color: isSelected ? SCORE_COLORS[i] : "#334155" }}>{i}</span>
                            <span style={{ fontSize:9, fontWeight:700, color: isSelected ? SCORE_COLORS[i] : "#334155", letterSpacing:"0.08em", textTransform:"uppercase" }}>{SCORE_LABELS[i]}</span>
                          </div>
                          <p style={{ margin:0, fontSize:11, color: isSelected ? "#cbd5e1" : "#475569", lineHeight:1.5 }}>{desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Next stage nudge */}
            {stageDone === stageQs.length && stageIdx < STAGES.length-1 && (
              <div style={{ textAlign:"center", padding:"20px 0 8px" }}>
                <button onClick={() => setCurrentStage(STAGES[stageIdx+1])} style={{ padding:"10px 28px", background:"#6366f1", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                  Continue to {STAGES[stageIdx+1]} →
                </button>
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
              <button onClick={() => setView("assessment")} style={{ marginTop:16, padding:"10px 24px", background:"#6366f1", color:"#fff", border:"none", borderRadius:6, fontSize:13, fontWeight:600, cursor:"pointer" }}>Go to Assessment</button>
            </div>
          ) : (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:14, marginBottom:24 }}>
                {[
                  { label:"Overall Maturity", score:overall, sub:`${answered}/${total} answered` },
                  { label:"Intelligence", score:intelScore, sub:"Content & discovery" },
                  { label:"Automation", score:autoScore, sub:"Campaigns & workflows" },
                  { label:"Governance", score:govScore, sub:"Data, AI & compliance" },
                ].map(({ label, score, sub }) => {
                  const m = getMaturity(score);
                  return (
                    <div key={label} style={{ background:"#0f172a", border:`1px solid ${score !== null ? m.color+"44" : "#1e293b"}`, borderRadius:8, padding:"18px 20px" }}>
                      <div style={{ fontSize:11, color:"#64748b", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</div>
                      <div style={{ display:"flex", alignItems:"baseline", gap:8, margin:"8px 0 4px" }}>
                        <span style={{ fontSize:32, fontWeight:800, color: score !== null ? m.color : "#334155" }}>{score !== null ? score.toFixed(1) : "—"}</span>
                        {score !== null && <span style={{ fontSize:11, color:m.color, fontWeight:600 }}>{m.label}</span>}
                      </div>
                      {score !== null && (
                        <div style={{ background:"#1e293b", borderRadius:4, height:5, overflow:"hidden", marginBottom:6 }}>
                          <div style={{ width:`${(score/4)*100}%`, height:"100%", background:m.color, borderRadius:4 }}/>
                        </div>
                      )}
                      <div style={{ fontSize:10, color:"#334155" }}>{sub}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:8, padding:"22px", marginBottom:16 }}>
                <h3 style={{ margin:"0 0 18px", fontSize:14, fontWeight:700, color:"#f8fafc" }}>Maturity by Stage</h3>
                <div style={{ display:"grid", gap:12 }}>
                  {STAGES.map(stage => {
                    const sc = stageScores[stage];
                    const m = getMaturity(sc);
                    const [s,e] = STAGE_RANGES[stage];
                    const qs = QUESTIONS.slice(s,e+1);
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
                          {sc !== null && <div style={{ width:`${(sc/4)*100}%`, height:"100%", background:m.color, borderRadius:4, transition:"width 0.5s" }}/>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {(() => {
                const critical = QUESTIONS.filter(q => scores[q.id] !== undefined && scores[q.id] < 2);
                const building = QUESTIONS.filter(q => scores[q.id] !== undefined && scores[q.id] >= 2 && scores[q.id] < 3);
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