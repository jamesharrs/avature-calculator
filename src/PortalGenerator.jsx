import React, { useState, useRef, useCallback } from 'react';
import TemplateLibrary from './PortalTemplateLibrary';
import { BUILTIN_TEMPLATES } from './PortalTemplates';

function rgba(hex, a) {
  try { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${a})`; }
  catch { return `rgba(0,0,0,${a})`; }
}
function lighten(hex, n) {
  try { const r=Math.min(255,parseInt(hex.slice(1,3),16)+n),g=Math.min(255,parseInt(hex.slice(3,5),16)+n),b=Math.min(255,parseInt(hex.slice(5,7),16)+n); return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`; }
  catch { return '#eeeeee'; }
}
function initials(name) { return (name||'').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
function firstName(name) { return (name||'').split(' ')[0]; }
function tokenise(str, brand) { return (str||'').replace(/\{company\}/g, brand.company).replace(/\{department\}/g, brand.department); }

function Header({ brand, nav, activeIndex=0, isMobile=false }) {
  const hasCaret = idx => idx > 0 && idx < nav.length - 1;
  if (isMobile) return (
    <div style={{ display:'flex', alignItems:'center', height:48, background:'white', borderBottom:`2px solid ${brand.primary}`, padding:'0 14px', flexShrink:0 }}>
      <div style={{ marginRight:'auto' }}>
        {brand.logoUrl
          ? <img src={brand.logoUrl} alt="logo" style={{ height:26, maxWidth:110, objectFit:'contain', display:'block' }} />
          : <div style={{ height:26, padding:'0 10px', background:brand.primary, color:'white', display:'flex', alignItems:'center', borderRadius:5, fontWeight:700, fontSize:12 }}>{brand.company}</div>
        }
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:24, height:24, borderRadius:'50%', border:`1.5px solid ${brand.primary}`, background:lighten(brand.primary,220), display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:brand.primary }}>{initials(brand.managerName)}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:3 }}>{[0,1,2].map(i=><div key={i} style={{ width:18, height:2, background:'#555', borderRadius:1 }} />)}</div>
      </div>
    </div>
  );
  return (
    <div style={{ display:'flex', alignItems:'center', height:54, background:'white', borderBottom:`2.5px solid ${brand.primary}`, padding:'0 18px', flexShrink:0, gap:0 }}>
      <div style={{ marginRight:22, flexShrink:0 }}>
        {brand.logoUrl
          ? <img src={brand.logoUrl} alt="logo" style={{ height:34, maxWidth:160, objectFit:'contain', display:'block' }} />
          : <div style={{ height:34, padding:'0 12px', background:brand.primary, color:'white', display:'flex', alignItems:'center', borderRadius:6, fontWeight:700, fontSize:13 }}>{brand.company}</div>
        }
      </div>
      <nav style={{ display:'flex', gap:0, flex:1 }}>
        {nav.map((n,i) => {
          const label = tokenise(n, brand);
          return (
            <span key={i} style={{ fontSize:12, padding:'0 10px', height:54, display:'flex', alignItems:'center', cursor:'pointer', whiteSpace:'nowrap', color:i===activeIndex?brand.primary:'#555', fontWeight:i===activeIndex?700:400, borderBottom:i===activeIndex?`2.5px solid ${brand.primary}`:'2.5px solid transparent' }}>
              {label}{hasCaret(i)?' ▾':''}
            </span>
          );
        })}
      </nav>
      <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#333', flexShrink:0 }}>
        <div style={{ width:28, height:28, borderRadius:'50%', border:`1.5px solid ${brand.primary}`, background:lighten(brand.primary,220), display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:brand.primary }}>{initials(brand.managerName)}</div>
        <span>{brand.managerName} ▾</span>
      </div>
    </div>
  );
}

function Footer({ brand, isMobile=false }) {
  return (
    <div style={{ background:'white', borderTop:`3px solid ${brand.primary}`, padding:isMobile?'8px 14px':'9px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        {brand.logoUrl ? <img src={brand.logoUrl} alt="" style={{ height:isMobile?14:18, objectFit:'contain' }} /> : <div style={{ width:12, height:12, background:brand.primary, borderRadius:2 }} />}
        <span style={{ fontSize:isMobile?8:10, color:'#aaa' }}>© 2026 {brand.company}</span>
      </div>
      <div style={{ display:'flex', gap:10, fontSize:isMobile?10:12, color:'#bbb' }}>{['f','𝕏','in'].map(s=><span key={s}>{s}</span>)}</div>
    </div>
  );
}

function W_HeroBanner({ brand, w, isMobile=false }) {
  const ctas = w.showCTA || [];
  const headline = w.headline ? tokenise(w.headline, brand) : `Welcome, ${firstName(brand.managerName)}`;
  const overlayOpacity = brand.overlayOpacity !== undefined ? brand.overlayOpacity : 0.88;
  const overlayColor   = brand.overlayColor || brand.primary;
  const accentOpacity  = overlayOpacity * 0.4;
  const h = isMobile ? 160 : 210;
  return (
    <div style={{ position:'relative', height:h, overflow:'hidden', background:brand.primary, flexShrink:0 }}>
      {brand.bannerUrl && <img src={brand.bannerUrl} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(to right,${rgba(overlayColor,overlayOpacity)},${rgba(brand.accent,accentOpacity)})` }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:isMobile?'12px 14px':'18px 22px', display:'flex', alignItems:'flex-end', gap:isMobile?10:14 }}>
        {w.showManagerName !== false && (
          <div style={{ width:isMobile?38:54, height:isMobile?38:54, borderRadius:'50%', border:`${isMobile?2:3}px solid white`, background:brand.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden' }}>
            {brand.logoUrl ? <img src={brand.logoUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'contain', padding:isMobile?4:6 }} /> : <span style={{ fontSize:isMobile?13:18, fontWeight:700, color:brand.primary }}>{initials(brand.managerName)}</span>}
          </div>
        )}
        <div>
          <div style={{ fontSize:isMobile?16:22, fontWeight:700, color:'white', marginBottom:ctas.length?(isMobile?5:8):0, textShadow:'0 1px 4px rgba(0,0,0,0.4)' }}>{headline}</div>
          {ctas.length > 0 && (
            <div style={{ display:'flex', gap:6 }}>
              {ctas.map((c,i) => i===0
                ? <button key={c} style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:isMobile?'5px 10px':'7px 16px', fontSize:isMobile?10:12, fontWeight:700, cursor:'pointer' }}>{c}</button>
                : <button key={c} style={{ background:'transparent', color:'white', border:'2px solid white', borderRadius:5, padding:isMobile?'3px 8px':'5px 14px', fontSize:isMobile?10:12, fontWeight:600, cursor:'pointer' }}>{c}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function W_PageHero({ brand, w, isMobile=false }) {
  const crumbs = w.breadcrumb || [];
  const title = crumbs[crumbs.length - 1] || '';
  return (
    <>
      <div style={{ padding:isMobile?'12px 14px 10px':'16px 22px 12px', background:`linear-gradient(135deg,${brand.primary},${brand.accent})`, flexShrink:0 }}>
        {crumbs.length > 1 && <div style={{ fontSize:9, color:'rgba(255,255,255,0.75)', marginBottom:2 }}>{crumbs.slice(0,-1).join(' / ')}</div>}
        <div style={{ fontSize:isMobile?16:22, fontWeight:700, color:'white' }}>{title}</div>
      </div>
      {crumbs.length > 0 && (
        <div style={{ fontSize:9, color:'#888', padding:isMobile?'5px 14px':'6px 22px', background:'white', borderBottom:'0.5px solid #ebebeb', flexShrink:0 }}>
          {crumbs.map((c,i) => <span key={i}>{i>0&&' / '}<span style={{ color:i<crumbs.length-1?brand.primary:'#888' }}>{c}</span></span>)}
        </div>
      )}
    </>
  );
}

function W_KpiRow({ brand, w, isMobile=false }) {
  const items = (w.items || []).slice(0, isMobile ? 2 : 5);
  const nums = (brand.mockData?.kpis) || ['4','85','73','22','11'];
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:isMobile?6:8, marginBottom:isMobile?10:16 }}>
      {items.map((label,i) => (
        <div key={label} style={{ background:'white', borderRadius:8, padding:isMobile?'10px 8px':'12px 10px', textAlign:'center', border:'0.5px solid #e5e7eb' }}>
          <div style={{ width:'100%', height:3, borderRadius:2, background:brand.primary, marginBottom:isMobile?6:10 }} />
          <div style={{ fontSize:isMobile?16:22, fontWeight:700, color:'#111', marginBottom:2 }}>{nums[i]||'–'}</div>
          <div style={{ fontSize:isMobile?8:10, color:'#777' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function W_DataTable({ brand, w, isMobile=false }) {
  const cols = w.columns || ['Name','Details','Status','Action'];
  const hasCheckbox = cols[0]==='';
  const hasBulk = !!w.bulkAction;
  const md = brand.mockData || {};

  const isJobsTable = cols.some(c => ['Openings','Shortlisted','Interviewing','Offers','Onboarding'].includes(c));
  const isCandidateTable = cols.some(c => ['Name','Current position','Employer','Applying to'].includes(c));

  let rows;
  if (md.tableRows) {
    rows = md.tableRows.slice(0,4);
  } else if (isJobsTable) {
    rows = [
      ['Store Supervisor','Lagos Central','20','12','8','3','1'],
      ['Area Manager','Abuja North','5','8','6','2','0'],
      ['Crew Leader','Port Harcourt','10','15','10','4','2'],
      ['Graduate Trainee','Accra','8','9','7','2','1'],
    ];
  } else if (isCandidateTable) {
    const cands = md.candidates || [
      ['Adeyemi, Tunde','Shift Supervisor','KFC Nigeria','Store Supervisor'],
      ['Okonkwo, Ify','Crew Lead','Chicken Republic','Store Supervisor'],
      ['Mensah, Kofi','Restaurant Mgr','Tastee Fried Chicken','Area Manager'],
      ['Abubakar, Fatima','Team Lead','Dominos Nigeria','Crew Leader'],
    ];
    rows = cands.slice(0,4);
  } else {
    rows = [
      ['Store Supervisor','Lagos','Active','—'],
      ['Area Manager','Abuja','Active','—'],
      ['Crew Leader','Port Harcourt','Review','—'],
      ['Graduate Trainee','Accra','Active','—'],
    ];
  }

  const visibleCols = isMobile ? cols.slice(0, hasCheckbox?3:2).filter(c=>c!=='') : cols.filter(c=>c!=='');

  return (
    <div style={{ marginBottom:isMobile?10:14 }}>
      {(w.title||hasBulk) && (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
          {w.title && <span style={{ fontSize:isMobile?12:14, fontWeight:700, color:'#111' }}>{w.title}</span>}
          {w.viewAll && <span style={{ fontSize:10, color:brand.primary, cursor:'pointer' }}>View all</span>}
          {hasBulk && !isMobile && (
            <div style={{ display:'flex', alignItems:'center', gap:10, marginLeft:'auto' }}>
              <span style={{ fontSize:10, color:'#888' }}>1–10 of 85 results</span>
              <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:'5px 12px', fontSize:11, fontWeight:600, cursor:'pointer' }}>{w.bulkAction} ▾</button>
            </div>
          )}
        </div>
      )}
      <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:isMobile?9:11, tableLayout:'fixed' }}>
          <thead>
            <tr style={{ background:'#fafafa' }}>
              {!isMobile && hasCheckbox && <th style={{ padding:'8px 10px', width:28 }}><input type="checkbox" /></th>}
              {visibleCols.map((h,i) => (
                <th key={i} style={{ padding:isMobile?'7px 8px':'9px 12px', textAlign:'left', fontSize:isMobile?9:10, fontWeight:600, color:'#888', borderBottom:'1px solid #f0f0f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:'0.5px solid #f5f5f5' }}>
                {!isMobile && hasCheckbox && <td style={{ padding:'8px 10px' }}><input type="checkbox" /></td>}
                {row.slice(0, isMobile?2:visibleCols.length).map((cell,ci) => (
                  <td key={ci} style={{ padding:isMobile?'7px 8px':'9px 12px', color:ci===0?brand.primary:'#333', fontWeight:ci===0?500:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', cursor:ci===0?'pointer':'default' }}>
                    {!isMobile && ci===row.length-1 && visibleCols[visibleCols.length-1]==='Action'
                      ? <button style={{ fontSize:9, padding:'2px 7px', border:`1px solid ${lighten(brand.primary,160)}`, borderRadius:4, background:'white', color:brand.primary, cursor:'pointer', fontWeight:500 }}>Actions ▾</button>
                      : cell
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function W_StatRow({ brand, w, isMobile=false }) {
  const items = w.items || [];
  const vals = brand.mockData?.stats || ['5','78%','84%'];
  const subs = ['How quickly you respond to new candidates','Quality from recruiters, past month','How often candidates accepted the offer'];
  const show = isMobile ? items.slice(0,2) : items;
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${show.length},1fr)`, gap:isMobile?6:8 }}>
      {show.map((label,i) => (
        <div key={label} style={{ background:'white', borderRadius:8, padding:isMobile?'10px 8px':14, textAlign:'center', border:'0.5px solid #e5e7eb' }}>
          <div style={{ fontSize:isMobile?18:24, fontWeight:700, color:brand.primary, marginBottom:2 }}>{vals[i]||'–'}</div>
          <div style={{ fontSize:isMobile?9:11, fontWeight:600, color:'#333', marginBottom:2 }}>{label}</div>
          {!isMobile && <div style={{ fontSize:10, color:'#888' }}>{subs[i]||''}</div>}
        </div>
      ))}
    </div>
  );
}

function W_PipelineTabs({ brand, w, isMobile=false }) {
  const tabs = isMobile ? (w.tabs||[]).slice(0,3) : (w.tabs||[]);
  return (
    <div style={{ display:'flex', borderBottom:'1.5px solid #e5e7eb', background:'white', padding:`0 ${isMobile?'10px':'22px'}`, flexShrink:0, overflowX:'auto' }}>
      {tabs.map((t,i) => (
        <span key={t} style={{ fontSize:isMobile?10:11, padding:isMobile?'6px 8px':'7px 12px', cursor:'pointer', color:i===0?'#111':'#888', fontWeight:i===0?700:500, borderBottom:i===0?`2.5px solid ${brand.primary}`:'2.5px solid transparent', marginBottom:-1.5, whiteSpace:'nowrap' }}>{t}</span>
      ))}
    </div>
  );
}

function W_FilterRow({ brand, w, isMobile=false }) {
  if (isMobile) return (
    <div style={{ display:'flex', gap:6, marginBottom:8 }}>
      <input type="text" placeholder="Search…" style={{ flex:1, fontSize:11, padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:5 }} />
      <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:'6px 12px', fontSize:11, fontWeight:600, cursor:'pointer' }}>Search</button>
    </div>
  );
  const filters = w.filters || [];
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-end', marginBottom:10, flexWrap:'wrap' }}>
      {filters.map(f => (
        <div key={f} style={{ display:'flex', flexDirection:'column', gap:2 }}>
          <label style={{ fontSize:10, color:'#555', fontWeight:500 }}>{f}</label>
          {f.toLowerCase().includes('search')||f.toLowerCase().includes('keyword')
            ? <input type="text" placeholder={`${f}…`} style={{ fontSize:11, padding:'5px 8px', border:'1px solid #d1d5db', borderRadius:5, width:130 }} />
            : <select style={{ fontSize:11, padding:'5px 8px', border:'1px solid #d1d5db', borderRadius:5, width:130 }}><option>All</option></select>
          }
        </div>
      ))}
      <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:'7px 14px', fontSize:11, fontWeight:600, cursor:'pointer', alignSelf:'flex-end' }}>Search</button>
    </div>
  );
}

function W_ProgressBar({ brand, w, isMobile=false }) {
  const steps = w.steps&&w.steps.length>0?w.steps:['Step 1','Step 2','Step 3','Step 4','Step 5'];
  const active = 2;
  return (
    <div style={{ background:'white', borderRadius:8, padding:isMobile?'10px 12px':'14px 18px', border:'0.5px solid #e5e7eb', marginBottom:isMobile?10:14 }}>
      {w.label && <div style={{ fontSize:isMobile?10:12, fontWeight:600, color:'#333', marginBottom:isMobile?8:12 }}>{w.label}</div>}
      <div style={{ display:'flex', alignItems:'center', position:'relative' }}>
        <div style={{ position:'absolute', top:10, left:0, right:0, height:3, background:'#e5e7eb', zIndex:0 }} />
        <div style={{ position:'absolute', top:10, left:0, width:`${(active/(steps.length-1))*100}%`, height:3, background:brand.primary, zIndex:1 }} />
        {steps.map((s,i) => (
          <div key={s} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:2 }}>
            <div style={{ width:isMobile?16:22, height:isMobile?16:22, borderRadius:'50%', background:i<=active?brand.primary:'white', border:`2px solid ${i<=active?brand.primary:'#d1d5db'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?7:10, color:i<=active?'white':'#888', fontWeight:600 }}>{i<active?'✓':i+1}</div>
            <div style={{ fontSize:isMobile?7:9, color:i<=active?brand.primary:'#aaa', marginTop:3, textAlign:'center', fontWeight:i===active?600:400, maxWidth:isMobile?40:60, lineHeight:1.3 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_TaskList({ brand, w, isMobile=false }) {
  const tasks = [
    { done:true,  label:'Complete personal details form', due:'Done', cat:'Documents' },
    { done:true,  label:'Upload right to work documents', due:'Done', cat:'Documents' },
    { done:false, label:'Watch compliance training video', due:'2 days', cat:'Training' },
    { done:false, label:'Set up IT access and email', due:'3 days', cat:'IT Setup' },
    { done:false, label:'Book first day induction session', due:'4 days', cat:'Onboarding' },
  ].slice(0, isMobile?3:w.maxItems||5);
  return (
    <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden', marginBottom:isMobile?10:14 }}>
      {w.title && <div style={{ padding:isMobile?'8px 10px 6px':'10px 14px 8px', fontSize:isMobile?11:13, fontWeight:600, color:'#111', borderBottom:'1px solid #f5f5f5' }}>{w.title}</div>}
      {tasks.map((t,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:isMobile?'7px 10px':'9px 14px', borderBottom:i<tasks.length-1?'0.5px solid #f5f5f5':'none' }}>
          <div style={{ width:16, height:16, borderRadius:3, border:`2px solid ${t.done?brand.primary:'#d1d5db'}`, background:t.done?brand.primary:'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            {t.done && <span style={{ color:'white', fontSize:9, fontWeight:700 }}>✓</span>}
          </div>
          <div style={{ flex:1, fontSize:isMobile?10:12, color:t.done?'#aaa':'#333', textDecoration:t.done?'line-through':'none' }}>{t.label}</div>
          {w.showCategory && !isMobile && <span style={{ fontSize:9, padding:'2px 6px', background:lighten(brand.primary,230), color:brand.primary, borderRadius:10 }}>{t.cat}</span>}
        </div>
      ))}
    </div>
  );
}

function W_JobCards({ brand, w, isMobile=false }) {
  const md = brand.mockData || {};
  const count = isMobile ? 2 : (w.count||4);
  const roles = (md.jobs || ['Store Supervisor','Area Manager','Crew Leader','Graduate Trainee','Customer Experience Lead','Finance Analyst']).slice(0,count);
  const locs  = (md.locations || ['Lagos','Abuja','Accra','Nairobi','Kampala','Dar es Salaam']).slice(0,count);
  const depts = (md.departments || ['Operations','Management','Restaurant Ops','Training','Service','Finance']).slice(0,count);
  return (
    <div style={{ marginBottom:isMobile?10:14 }}>
      {w.title && <div style={{ fontSize:isMobile?12:14, fontWeight:700, color:'#111', marginBottom:isMobile?8:10 }}>{w.title}</div>}
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(count,isMobile?2:3)},1fr)`, gap:isMobile?6:10 }}>
        {roles.map((r,i) => (
          <div key={r} style={{ background:'white', borderRadius:8, padding:isMobile?'10px 10px 8px':'14px 14px 12px', border:'0.5px solid #e5e7eb', cursor:'pointer' }}>
            <div style={{ fontSize:isMobile?10:12, fontWeight:600, color:brand.primary, marginBottom:3 }}>{r}</div>
            <div style={{ fontSize:isMobile?8:10, color:'#888', marginBottom:6 }}>{depts[i]} · {locs[i]}</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:8, padding:'2px 6px', background:lighten(brand.primary,230), color:brand.primary, borderRadius:20, fontWeight:600 }}>Full-time</span>
              <span style={{ fontSize:isMobile?9:10, color:brand.primary, fontWeight:600 }}>Apply →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_EventsList({ brand, w, isMobile=false }) {
  const count = isMobile ? 2 : (w.count||4);
  const events = [
    { title:'Graduate Careers Fair', date:'15 Jan', loc:'Lagos ExCeL', spaces:'38 spaces left' },
    { title:'Virtual Open Day', date:'22 Jan', loc:'Online', spaces:'120 spaces left' },
    { title:'Assessment Centre', date:'3 Feb', loc:'Abuja', spaces:'12 spaces left' },
    { title:'Networking Evening', date:'10 Feb', loc:'Accra', spaces:'45 spaces left' },
  ].slice(0,count);
  return (
    <div style={{ marginBottom:isMobile?10:14 }}>
      {w.title && <div style={{ fontSize:isMobile?12:14, fontWeight:700, color:'#111', marginBottom:8 }}>{w.title}</div>}
      <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden' }}>
        {events.map((e,i) => (
          <div key={e.title} style={{ display:'flex', alignItems:'center', gap:isMobile?10:14, padding:isMobile?'8px 10px':'12px 16px', borderBottom:i<events.length-1?'0.5px solid #f5f5f5':'none' }}>
            <div style={{ width:isMobile?36:48, height:isMobile?36:48, background:brand.primary, borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <div style={{ fontSize:isMobile?12:16, fontWeight:700, color:'white', lineHeight:1 }}>{e.date.split(' ')[0]}</div>
              <div style={{ fontSize:8, color:'white', opacity:0.85 }}>{e.date.split(' ')[1]}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:isMobile?11:13, fontWeight:600, color:'#111', marginBottom:1 }}>{e.title}</div>
              {w.showLocation && !isMobile && <div style={{ fontSize:10, color:'#888' }}>📍 {e.loc}</div>}
            </div>
            {w.showSpaces && !isMobile && <div style={{ fontSize:10, color:brand.primary, fontWeight:600 }}>{e.spaces}</div>}
            <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:isMobile?'4px 8px':'5px 12px', fontSize:isMobile?9:11, fontWeight:600, cursor:'pointer', flexShrink:0 }}>Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_TeamGrid({ brand, w, isMobile=false }) {
  const md = brand.mockData || {};
  const members = (md.team || [
    { name:'Sarah Chen', role:'Head of People' },
    { name:'James Okafor', role:'HR Business Partner' },
    { name:'Priya Sharma', role:'L&D Manager' },
    { name:'Tom Williams', role:'Recruiter' },
    { name:'Aisha Al-Rashid', role:'Benefits Analyst' },
    { name:'David Park', role:'HR Coordinator' },
  ]).slice(0, isMobile?4:6);
  const cols = isMobile ? 2 : 3;
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:isMobile?6:10, marginBottom:isMobile?10:14 }}>
      {members.map((m,mi) => (
        <div key={mi} style={{ background:'white', borderRadius:8, padding:isMobile?'10px 8px':'14px 12px', textAlign:'center', border:'0.5px solid #e5e7eb' }}>
          <div style={{ width:isMobile?30:40, height:isMobile?30:40, borderRadius:'50%', background:`linear-gradient(135deg,${brand.primary},${brand.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?10:14, fontWeight:700, color:'white', margin:'0 auto 6px' }}>{initials(m.name)}</div>
          <div style={{ fontSize:isMobile?10:12, fontWeight:600, color:'#111', marginBottom:1 }}>{m.name}</div>
          {w.showRole && <div style={{ fontSize:isMobile?8:10, color:'#888' }}>{m.role}</div>}
        </div>
      ))}
    </div>
  );
}

function W_NotificationFeed({ brand, w, isMobile=false }) {
  const md = brand.mockData || {};
  const items = (md.notifications || [
    { icon:'👤', text:'Tunde Adeyemi moved to Interview stage', time:'2m ago' },
    { icon:'📋', text:'New application for Store Supervisor', time:'14m ago' },
    { icon:'✅', text:'Offer accepted by Kofi Mensah', time:'1h ago' },
    { icon:'📅', text:'Interview scheduled for tomorrow 10am', time:'2h ago' },
  ]).slice(0, isMobile?3:4);
  return (
    <div style={{ marginBottom:isMobile?10:14 }}>
      {w.title && <div style={{ fontSize:isMobile?12:14, fontWeight:700, color:'#111', marginBottom:8 }}>{w.title}</div>}
      <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden' }}>
        {items.map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:isMobile?'8px 10px':'10px 14px', borderBottom:i<items.length-1?'0.5px solid #f5f5f5':'none' }}>
            <span style={{ fontSize:isMobile?13:16 }}>{item.icon}</span>
            <div style={{ flex:1, fontSize:isMobile?10:12, color:'#333' }}>{item.text}</div>
            {!isMobile && <div style={{ fontSize:10, color:'#aaa', flexShrink:0 }}>{item.time}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function W_WelcomeCard({ brand, w, isMobile=false }) {
  return (
    <div style={{ background:`linear-gradient(135deg,${lighten(brand.primary,230)},${lighten(brand.accent,200)})`, borderRadius:10, padding:isMobile?'12px 12px':'16px 18px', border:`1px solid ${lighten(brand.primary,200)}`, marginBottom:isMobile?10:14 }}>
      <div style={{ fontSize:isMobile?9:11, color:brand.primary, fontWeight:600, marginBottom:3, textTransform:'uppercase', letterSpacing:'0.05em' }}>A message from your manager</div>
      <div style={{ fontSize:isMobile?11:13, color:'#333', lineHeight:1.6, marginBottom:8 }}>
        "We're really excited to have you join the {brand.company} team. Your first few weeks are all about getting settled in — reach out any time."
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:24, height:24, borderRadius:'50%', background:brand.primary, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'white' }}>{initials(brand.managerName)}</div>
        <div>
          <div style={{ fontSize:isMobile?10:11, fontWeight:600, color:'#111' }}>{brand.managerName}</div>
          <div style={{ fontSize:isMobile?8:10, color:'#888' }}>{brand.department} · {brand.company}</div>
        </div>
      </div>
    </div>
  );
}

function W_JobSearch({ brand, isMobile=false }) {
  return (
    <div style={{ background:'white', borderRadius:10, padding:isMobile?'12px 12px':'18px 20px', border:'0.5px solid #e5e7eb', marginBottom:isMobile?10:16 }}>
      <div style={{ fontSize:isMobile?11:14, fontWeight:600, color:'#333', marginBottom:8 }}>Find your next role at {brand.company}</div>
      <div style={{ display:'flex', gap:6, flexDirection:isMobile?'column':'row' }}>
        <input type="text" placeholder="Job title or keywords" style={{ flex:1, fontSize:isMobile?11:13, padding:isMobile?'7px 10px':'9px 12px', border:'1px solid #d1d5db', borderRadius:6 }} />
        {!isMobile && <input type="text" placeholder="Location" style={{ width:140, fontSize:13, padding:'9px 12px', border:'1px solid #d1d5db', borderRadius:6 }} />}
        <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:6, padding:isMobile?'8px 12px':'9px 20px', fontSize:isMobile?12:13, fontWeight:700, cursor:'pointer' }}>Search</button>
      </div>
    </div>
  );
}

function SectionTitle({ brand, children, isMobile=false }) {
  return <div style={{ fontSize:isMobile?11:13, fontWeight:700, color:brand.primary, marginBottom:6, paddingBottom:4, borderBottom:`2px solid ${lighten(brand.primary,210)}` }}>{children}</div>;
}

function AIBox({ brand, title, children, isMobile=false }) {
  return (
    <div style={{ border:'1px solid #fff0cc', borderRadius:7, marginBottom:8, overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 10px', background:'#fffcf0' }}>
        <div style={{ fontSize:isMobile?10:12, fontWeight:700, color:brand.primary }}>{title}</div>
        <span style={{ fontSize:10, color:'#999' }}>∧</span>
      </div>
      <div style={{ padding:'3px 10px 8px', fontSize:isMobile?9:10, color:'#333', lineHeight:1.5 }}>{children}</div>
    </div>
  );
}

function W_ProfileTwoCol({ brand, w, isMobile=false }) {
  const dept = brand.department;
  const left  = w.left  || [];
  const right = w.right || [];
  const md = brand.mockData || {};

  const leftContent = (key) => {
    if (key==='basic_info') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>Basic Information</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
          {[['APPLYING TO',`${dept} Supervisor`],['EMAIL','candidate@email.com'],['LOCATION',(md.locations?.[0]||'Lagos')+', Nigeria'],['CURRENT EMPLOYER',md.employers?.[0]||'KFC Nigeria']].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:8, color:'#888', fontWeight:600, textTransform:'uppercase', marginBottom:1 }}>{l}</div><div style={{ fontSize:isMobile?10:11, color:'#222' }}>{v}</div></div>
          ))}
        </div>
      </div>
    );
    if (key==='employment_info'||key==='personal_info') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>{key==='personal_info'?'Personal Details':'Employment'}</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
          {[['EMPLOYEE ID','EMP-00421'],['START DATE','12 Jan 2023'],['DEPARTMENT',dept],['MANAGER',brand.managerName]].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:8, color:'#888', fontWeight:600, textTransform:'uppercase', marginBottom:1 }}>{l}</div><div style={{ fontSize:isMobile?10:11, color:'#222' }}>{v}</div></div>
          ))}
        </div>
      </div>
    );
    if (key==='skills_analysis'||key==='skills_tags') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>Skills</SectionTitle>
        <div>{(md.skills||['Leadership','Communication','Problem Solving','Data Analysis','Project Mgmt']).map(s=>(
          <span key={s} style={{ display:'inline-block', fontSize:8, padding:'2px 7px', borderRadius:20, border:`1px solid ${lighten(brand.primary,160)}`, color:brand.primary, background:lighten(brand.primary,230), margin:2 }}>{s}</span>
        ))}</div>
      </div>
    );
    if (key==='ai_screening') return (
      <AIBox brand={brand} title="✦ Screening Summary" isMobile={isMobile}>
        <ul style={{ paddingLeft:12 }}>
          <li style={{ marginBottom:2 }}><strong>Strengths:</strong> Strong operational background in {dept.toLowerCase()}.</li>
          <li style={{ marginBottom:2 }}><strong>Experience:</strong> 4 years in similar roles.</li>
          <li><strong>Areas to probe:</strong> Multi-site management and P&L ownership.</li>
        </ul>
      </AIBox>
    );
    if (key==='ai_interview_questions') return (
      <AIBox brand={brand} title="✦ Suggested Interview Questions" isMobile={isMobile}>
        <ul style={{ paddingLeft:12 }}>
          <li style={{ marginBottom:2 }}><strong>Competency:</strong> How have you driven performance in a team?</li>
          <li style={{ marginBottom:2 }}><strong>Situational:</strong> How would you handle conflicting priorities?</li>
          <li><strong>Values:</strong> What draws you to {brand.company}?</li>
        </ul>
      </AIBox>
    );
    if (key==='ai_sourcing') return (
      <AIBox brand={brand} title="✦ AI Sourcing Strategy" isMobile={isMobile}>
        {[`Job Boards — Specialist boards for ${dept.toLowerCase()} professionals`,`LinkedIn — ${dept} leads with 3+ years experience`,`Referrals — ${brand.company} referral programme`,`Universities — Graduate partnerships`].map((l,i)=>(
          <div key={i} style={{ marginBottom:3 }}>{l}</div>
        ))}
      </AIBox>
    );
    if (key==='job_info') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>General Information</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
          {[['JOB TYPE','Permanent'],['LOCATION',(md.locations?.[0]||'Lagos')+', Nigeria'],['DEPARTMENT',dept],['OPENINGS','10'],['CLOSING DATE','31 Jan 2026'],['SALARY BAND','Band 4']].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:8, color:'#888', fontWeight:600, textTransform:'uppercase', marginBottom:1 }}>{l}</div><div style={{ fontSize:isMobile?10:11, color:'#222' }}>{v}</div></div>
          ))}
        </div>
      </div>
    );
    if (key==='pipeline_stats') return (
      <div style={{ display:'flex', gap:isMobile?10:14, marginBottom:12, flexWrap:'wrap' }}>
        {[['12','Applied'],['8','Screening'],['5','Interview'],['2','Offer'],['1','Hired']].map(([n,l])=>(
          <div key={l} style={{ textAlign:'center' }}>
            <div style={{ fontSize:isMobile?16:20, fontWeight:700, color:brand.primary }}>{n}</div>
            <div style={{ fontSize:8, color:'#888', textTransform:'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>
    );
    if (key==='required_skills') return (
      <div style={{ marginBottom:10 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>Required Skills</SectionTitle>
        {[['Must-Have',['Customer Service','Team Leadership','Food Safety'],'#e3f2fd','#0d47a1'],['Preferred',['Inventory Mgmt','Scheduling'],'#e8f5e9','#2e7d32']].map(([cat,skills,bg,col])=>(
          <div key={cat} style={{ marginBottom:6 }}>
            <div style={{ fontSize:9, fontWeight:700, color:'#888', textTransform:'uppercase', marginBottom:3 }}>{cat}</div>
            {skills.map(s=><span key={s} style={{ display:'inline-block', fontSize:9, padding:'2px 8px', borderRadius:20, border:`1px solid ${col}40`, color:col, background:bg, margin:2 }}>{s}</span>)}
          </div>
        ))}
      </div>
    );
    if (key==='job_description'||key==='requirements'||key==='benefits') return (
      <div style={{ marginBottom:10 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>{key==='job_description'?'About the role':key==='requirements'?'What we need':'What we offer'}</SectionTitle>
        <div style={{ fontSize:isMobile?10:11, color:'#444', lineHeight:1.6 }}>
          {key==='job_description' && `Join ${brand.company}'s ${dept} team. You'll work with our growing network across Africa.`}
          {key==='requirements' && ['3+ years in a similar role','Strong leadership skills','Degree or equivalent'].map((r,i)=><div key={i} style={{ marginBottom:2 }}>• {r}</div>)}
          {key==='benefits' && ['Competitive salary','Flexible working','Healthcare cover','L&D budget'].map((r,i)=><div key={i} style={{ marginBottom:2 }}>• {r}</div>)}
        </div>
      </div>
    );
    if (key==='application_status') return (
      <div style={{ marginBottom:10 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>Application Status</SectionTitle>
        <div style={{ background:lighten(brand.primary,230), border:`1px solid ${lighten(brand.primary,180)}`, borderRadius:8, padding:'9px 12px' }}>
          <div style={{ fontSize:isMobile?11:13, fontWeight:700, color:brand.primary, marginBottom:1 }}>Currently at: Interview stage</div>
          <div style={{ fontSize:isMobile?9:11, color:'#555' }}>Your interview is scheduled for 22 January.</div>
        </div>
      </div>
    );
    if (key==='next_steps') return (
      <div style={{ marginBottom:10 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>Next Steps</SectionTitle>
        <div style={{ fontSize:isMobile?10:11, color:'#444', lineHeight:1.7 }}>
          {['Complete your interview preparation','Review the role brief sent to your email','Confirm interview attendance via the link below'].map((r,i)=><div key={i} style={{ marginBottom:3 }}>→ {r}</div>)}
        </div>
      </div>
    );
    if (key==='documents') return (
      <div style={{ marginBottom:10 }}>
        <SectionTitle brand={brand} isMobile={isMobile}>Documents</SectionTitle>
        {['Offer letter.pdf','Contract.pdf','Benefits guide.pdf'].map((d,i)=>(
          <div key={d} style={{ display:'flex', alignItems:'center', gap:7, padding:'6px 8px', background:'#fafafa', borderRadius:5, marginBottom:4, border:'0.5px solid #eee' }}>
            <span style={{ fontSize:12 }}>📄</span>
            <span style={{ fontSize:isMobile?10:11, color:brand.primary, flex:1, cursor:'pointer' }}>{d}</span>
            <span style={{ fontSize:9, color:'#aaa' }}>↓</span>
          </div>
        ))}
      </div>
    );
    return null;
  };

  const rightContent = (key) => {
    if (key==='match_score') return (
      <div style={{ textAlign:'center', marginBottom:12 }}>
        <button style={{ background:brand.primary, border:'none', borderRadius:6, padding:'7px 10px', fontSize:10, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:10, color:'white' }}>Review candidate</button>
        <div style={{ width:56, height:56, position:'relative', margin:'0 auto 4px' }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke={lighten(brand.primary,180)} strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke={brand.primary} strokeWidth="6" strokeDasharray="142 21" strokeDashoffset="41" />
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:brand.primary }}>87%</div>
        </div>
        <div style={{ fontSize:9, color:'#888' }}>Matching Score</div>
      </div>
    );
    if (key==='more_candidates') return (
      <div>
        <div style={{ fontSize:9, color:'#888', marginBottom:6 }}>More candidates</div>
        {(md.candidates||[['Okonkwo, Ify'],['Mensah, Kofi'],['Abubakar, Fatima']]).slice(0,3).map((c,i)=>(
          <div key={i} style={{ marginBottom:6 }}>
            <div style={{ fontSize:10, fontWeight:500, color:brand.primary, cursor:'pointer' }}>{Array.isArray(c)?c[0]:c}</div>
            <div style={{ fontSize:8, color:'#888' }}>{dept}</div>
          </div>
        ))}
        <span style={{ fontSize:9, color:brand.primary, cursor:'pointer' }}>View all</span>
      </div>
    );
    if (key==='job_actions') return (
      <div>
        <button style={{ background:brand.primary, border:'none', borderRadius:6, padding:'7px 10px', fontSize:10, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:6, color:'white' }}>Edit job</button>
        <button style={{ background:'white', color:brand.primary, border:`1.5px solid ${brand.primary}`, borderRadius:6, padding:'6px 10px', fontSize:10, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:6 }}>Add candidate</button>
        <button style={{ background:'white', color:'#888', border:'1px solid #ddd', borderRadius:6, padding:'6px 10px', fontSize:10, cursor:'pointer', width:'100%' }}>Share job link</button>
      </div>
    );
    if (key==='related_jobs') return (
      <div style={{ marginTop:12 }}>
        <div style={{ fontSize:9, color:'#888', marginBottom:5 }}>Related jobs</div>
        {(md.jobs||[`Senior ${dept} Lead`,`${dept} Manager`,'Graduate Trainee']).slice(0,3).map((j,i)=>(
          <div key={i} style={{ marginBottom:6 }}>
            <div style={{ fontSize:10, fontWeight:500, color:brand.primary, cursor:'pointer' }}>{j}</div>
            <div style={{ fontSize:8, color:'#888' }}>{md.locations?.[0]||'Lagos'} · Open</div>
          </div>
        ))}
      </div>
    );
    if (key==='apply_cta') return (
      <div style={{ background:lighten(brand.primary,230), border:`1px solid ${lighten(brand.primary,180)}`, borderRadius:8, padding:'12px', textAlign:'center', marginBottom:8 }}>
        <div style={{ fontSize:12, fontWeight:700, color:brand.primary, marginBottom:7 }}>Interested?</div>
        <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:6, padding:'9px 16px', fontSize:12, fontWeight:700, cursor:'pointer', width:'100%', marginBottom:6 }}>Apply now</button>
        <button style={{ background:'white', color:'#555', border:'1px solid #ddd', borderRadius:6, padding:'7px 16px', fontSize:11, cursor:'pointer', width:'100%' }}>Save job</button>
      </div>
    );
    if (key==='share') return (
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:9, color:'#888', marginBottom:5 }}>Share</div>
        <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
          {['LinkedIn','Email','Copy'].map(s=>(
            <button key={s} style={{ fontSize:9, padding:'3px 6px', border:'1px solid #ddd', borderRadius:4, background:'white', cursor:'pointer', color:'#555' }}>{s}</button>
          ))}
        </div>
      </div>
    );
    if (key==='quick_actions') return (
      <div style={{ marginBottom:10 }}>
        <button style={{ background:brand.primary, border:'none', borderRadius:6, padding:'7px 10px', fontSize:10, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:6, color:'white' }}>Edit profile</button>
        <button style={{ background:'white', color:brand.primary, border:`1.5px solid ${brand.primary}`, borderRadius:6, padding:'6px 10px', fontSize:10, fontWeight:600, cursor:'pointer', width:'100%' }}>Download CV</button>
      </div>
    );
    if (key==='upcoming_leave') return (
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:9, fontWeight:600, color:'#555', marginBottom:5, textTransform:'uppercase' }}>Upcoming leave</div>
        <div style={{ background:'#fafafa', borderRadius:6, padding:'7px 9px', fontSize:10, color:'#333', border:'0.5px solid #eee' }}>
          <div style={{ fontWeight:600, color:brand.primary, marginBottom:1 }}>Annual leave</div>
          <div style={{ color:'#666', fontSize:9 }}>3–7 Feb 2026 · 5 days</div>
        </div>
      </div>
    );
    if (key==='your_recruiter') return (
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:9, fontWeight:600, color:'#555', marginBottom:5, textTransform:'uppercase' }}>Your recruiter</div>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${brand.primary},${brand.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'white' }}>SR</div>
          <div>
            <div style={{ fontSize:10, fontWeight:600 }}>Sarah Rodriguez</div>
            <div style={{ fontSize:9, color:brand.primary, cursor:'pointer' }}>Send message</div>
          </div>
        </div>
      </div>
    );
    if (key==='useful_links') return (
      <div>
        <div style={{ fontSize:9, fontWeight:600, color:'#555', marginBottom:5, textTransform:'uppercase' }}>Useful links</div>
        {['Interview tips','Role overview','Our culture','FAQs'].map(l=>(
          <div key={l} style={{ fontSize:10, color:brand.primary, cursor:'pointer', marginBottom:4 }}>→ {l}</div>
        ))}
      </div>
    );
    return null;
  };

  if (isMobile) {
    return (
      <div>
        {left.slice(0,3).map(k => <div key={k}>{leftContent(k)}</div>)}
        {right.slice(0,2).map(k => <div key={k}>{rightContent(k)}</div>)}
      </div>
    );
  }
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 190px', gap:16 }}>
      <div>{left.map(k => <div key={k}>{leftContent(k)}</div>)}</div>
      <div>{right.map(k => <div key={k}>{rightContent(k)}</div>)}</div>
    </div>
  );
}

function Widget({ brand, w, isMobile=false }) {
  const t = w.type;
  if (t==='hero_banner')     return <W_HeroBanner brand={brand} w={w} isMobile={isMobile} />;
  if (t==='page_hero')       return <W_PageHero brand={brand} w={w} isMobile={isMobile} />;
  if (t==='kpi_row')         return <W_KpiRow brand={brand} w={w} isMobile={isMobile} />;
  if (t==='data_table')      return <W_DataTable brand={brand} w={w} isMobile={isMobile} />;
  if (t==='stat_row')        return <W_StatRow brand={brand} w={w} isMobile={isMobile} />;
  if (t==='pipeline_tabs')   return <W_PipelineTabs brand={brand} w={w} isMobile={isMobile} />;
  if (t==='filter_row')      return <W_FilterRow brand={brand} w={w} isMobile={isMobile} />;
  if (t==='progress_bar')    return <W_ProgressBar brand={brand} w={w} isMobile={isMobile} />;
  if (t==='task_list')       return <W_TaskList brand={brand} w={w} isMobile={isMobile} />;
  if (t==='job_cards')       return <W_JobCards brand={brand} w={w} isMobile={isMobile} />;
  if (t==='events_list')     return <W_EventsList brand={brand} w={w} isMobile={isMobile} />;
  if (t==='team_grid')       return <W_TeamGrid brand={brand} w={w} isMobile={isMobile} />;
  if (t==='notification_feed') return <W_NotificationFeed brand={brand} w={w} isMobile={isMobile} />;
  if (t==='welcome_card')    return <W_WelcomeCard brand={brand} w={w} isMobile={isMobile} />;
  if (t==='profile_two_col') return <W_ProfileTwoCol brand={brand} w={w} isMobile={isMobile} />;
  if (t==='job_search')      return <W_JobSearch brand={brand} isMobile={isMobile} />;
  return null;
}

function PortalScreen({ brand, template, screenIndex, isMobile=false }) {
  const screen = template.screens[screenIndex];
  if (!screen) return null;
  const nav = template.nav || ['Dashboard'];
  const OUTSIDE = ['hero_banner','page_hero','pipeline_tabs'];
  const outsideWidgets = screen.widgets.filter(w => OUTSIDE.includes(w.type));
  const bodyWidgets    = screen.widgets.filter(w => !OUTSIDE.includes(w.type));
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'white' }}>
      <Header brand={brand} nav={nav} activeIndex={screenIndex} isMobile={isMobile} />
      {outsideWidgets.map((w,i) => <Widget key={i} brand={brand} w={w} isMobile={isMobile} />)}
      {bodyWidgets.length > 0 && (
        <div style={{ flex:1, background:'#f0f2f5', padding:isMobile?'10px 12px':'18px 22px', overflow:'auto' }}>
          {bodyWidgets.map((w,i) => <Widget key={i} brand={brand} w={w} isMobile={isMobile} />)}
        </div>
      )}
      <Footer brand={brand} isMobile={isMobile} />
    </div>
  );
}

function PhoneFrame({ children, brand }) {
  return (
    <div style={{ position:'relative', width:375, height:812, flexShrink:0 }}>
      <div style={{ position:'absolute', inset:0, background:'#1a1a1a', borderRadius:44, boxShadow:'0 24px 80px rgba(0,0,0,0.5), inset 0 0 0 1px #333' }} />
      <div style={{ position:'absolute', top:12, left:10, right:10, bottom:12, borderRadius:34, overflow:'hidden', background:'white' }}>
        <div style={{ height:28, background:brand.primary, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 18px', flexShrink:0 }}>
          <span style={{ fontSize:10, fontWeight:600, color:'white' }}>9:41</span>
          <div style={{ display:'flex', gap:4, alignItems:'center' }}>
            <span style={{ fontSize:9, color:'white' }}>●●●●</span>
            <span style={{ fontSize:9, color:'white' }}>WiFi</span>
            <span style={{ fontSize:9, color:'white' }}>🔋</span>
          </div>
        </div>
        <div style={{ position:'absolute', top:28, left:0, right:0, bottom:0, overflow:'hidden' }}>{children}</div>
      </div>
      <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', width:120, height:28, background:'#1a1a1a', borderRadius:'0 0 18px 18px', zIndex:10 }} />
      <div style={{ position:'absolute', left:-3, top:100, width:3, height:32, background:'#333', borderRadius:'3px 0 0 3px' }} />
      <div style={{ position:'absolute', left:-3, top:145, width:3, height:56, background:'#333', borderRadius:'3px 0 0 3px' }} />
      <div style={{ position:'absolute', left:-3, top:210, width:3, height:56, background:'#333', borderRadius:'3px 0 0 3px' }} />
      <div style={{ position:'absolute', right:-3, top:130, width:3, height:72, background:'#333', borderRadius:'0 3px 3px 0' }} />
      <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', width:100, height:4, background:'#555', borderRadius:2 }} />
    </div>
  );
}

async function generateMockData(brand) {
  const prompt = `Generate realistic mock data for an Avature HR portal mockup for "${brand.company}", a ${brand.department} company.

Return ONLY valid JSON (no markdown) with this exact structure:
{
  "kpis": ["4","85","73","22","11"],
  "stats": ["3","81%","88%"],
  "jobs": ["Job title 1","Job title 2","Job title 3","Job title 4"],
  "departments": ["dept 1","dept 2","dept 3","dept 4"],
  "locations": ["city 1","city 2","city 3","city 4"],
  "candidates": [["Surname, Firstname","Current role","Current employer","Applying to"],["Surname, Firstname","Current role","Current employer","Applying to"],["Surname, Firstname","Current role","Current employer","Applying to"],["Surname, Firstname","Current role","Current employer","Applying to"]],
  "employers": ["competitor 1","competitor 2","competitor 3"],
  "skills": ["skill 1","skill 2","skill 3","skill 4","skill 5"],
  "team": [{"name":"Full Name","role":"HR role"},{"name":"Full Name","role":"HR role"},{"name":"Full Name","role":"HR role"},{"name":"Full Name","role":"HR role"}],
  "notifications": [{"icon":"👤","text":"candidate name moved to stage","time":"2m ago"},{"icon":"📋","text":"New application for job title","time":"14m ago"},{"icon":"✅","text":"Offer accepted by name","time":"1h ago"}],
  "tableRows": [["Job title","City","openings","shortlisted","interviewing","offers","onboarding"],["Job title","City","number","number","number","number","number"],["Job title","City","number","number","number","number","number"],["Job title","City","number","number","number","number","number"]]
}

Use realistic data for the industry and geography. African names/cities if the company operates in Africa.`;

  const res = await fetch('/api/claude', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({
      model:'claude-sonnet-4-6',
      max_tokens:1200,
      messages:[{ role:'user', content:prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  return JSON.parse(text.replace(/```json|```/g,'').trim());
}

const DEFAULT_BRAND = {
  company:'Avature Demo Co', managerName:'Jamie Chen', department:'Operations',
  primary:'#1a56db', accent:'#f5a623', logoUrl:'', bannerUrl:'',
  overlayOpacity:0.88, overlayColor:'', mockData:null,
};

const PRESETS = [
  { name:'Standard Bank',     primary:'#1B3A6B', accent:'#4B2E83' },
  { name:'Vodafone',          primary:'#E60000', accent:'#333333' },
  { name:'KPMG',              primary:'#00338D', accent:'#005EB8' },
  { name:'Deloitte',          primary:'#86BC25', accent:'#012169' },
  { name:'Chicken Republic',  primary:'#CC1417', accent:'#F5C400' },
  { name:'Riyadh Air',        primary:'#1A1A2E', accent:'#C5A028' },
  { name:'Northumbria Police',primary:'#003087', accent:'#FFD100' },
  { name:'Atkins Realis',     primary:'#E4002B', accent:'#1B365D' },
];

export default function PortalGenerator() {
  const [brand, setBrand]               = useState(DEFAULT_BRAND);
  const [selectedTemplate, setSelectedTemplate] = useState(BUILTIN_TEMPLATES[0]);
  const [screenIndex, setScreenIndex]   = useState(0);
  const [rightPanel, setRightPanel]     = useState('templates');
  const [capturing, setCapturing]       = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [generating, setGenerating]     = useState(false);
  const previewRef = useRef(null);
  const screens = selectedTemplate?.screens || [];

  const handleFile = useCallback((key, file) => {
    if (!file) return;
    setBrand(b => ({ ...b, [key]: URL.createObjectURL(file) }));
  }, []);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    try {
      const data = await generateMockData(brand);
      setBrand(b => ({ ...b, mockData:data }));
    } catch(e) { alert('Generation failed: ' + e.message); }
    setGenerating(false);
  }, [brand]);

  const capture = useCallback(async (idx, mobile=false) => {
    setScreenIndex(idx);
    await new Promise(r => setTimeout(r, 500));
    const h2c = (await import('html2canvas')).default;
    const el = previewRef.current;
    const w = mobile ? 375 : 1200;
    const h = mobile ? 784 : 900;
    return h2c(el, { scale:2, useCORS:true, allowTaint:true, backgroundColor:'#e8eaed', width:w, height:h, windowWidth:w, windowHeight:h });
  }, []);

  const downloadCurrent = useCallback(async () => {
    setCapturing(true);
    try {
      const canvas = await capture(screenIndex, isMobile);
      const a = document.createElement('a');
      a.download = `${brand.company.replace(/\s+/g,'_')}_${screens[screenIndex]?.id||screenIndex}${isMobile?'_mobile':''}.png`;
      a.href = canvas.toDataURL('image/png'); a.click();
    } catch(e) { alert(e.message); }
    setCapturing(false);
  }, [brand.company, screenIndex, screens, capture, isMobile]);

  const downloadAll = useCallback(async () => {
    setCapturing(true);
    try {
      for (let i=0; i<screens.length; i++) {
        const canvas = await capture(i, isMobile);
        const a = document.createElement('a');
        a.download = `${brand.company.replace(/\s+/g,'_')}_${screens[i].id}${isMobile?'_mobile':''}.png`;
        a.href = canvas.toDataURL('image/png'); a.click();
        await new Promise(r => setTimeout(r, 200));
      }
    } catch(e) { alert(e.message); }
    setCapturing(false);
  }, [brand.company, screens, capture, isMobile]);

  const overlayColor = brand.overlayColor || brand.primary;

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', overflow:'hidden' }}>

      {/* ── LEFT SIDEBAR ───────────────────────────────────────── */}
      <div style={{ width:272, background:'white', borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column', flexShrink:0, overflow:'hidden' }}>
        <div style={{ padding:'14px 18px 10px', borderBottom:'1px solid #f0f0f0', flexShrink:0 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#111' }}>Portal Generator</div>
          <div style={{ fontSize:10, color:'#888' }}>Avature mockups · brand-driven</div>
        </div>

        <div style={{ flex:1, overflow:'auto', padding:'12px 18px' }}>

          <Sec title="Company">
            <Fld label="Company name"><input value={brand.company} onChange={e=>setBrand(b=>({...b,company:e.target.value}))} /></Fld>
            <Fld label="Manager name"><input value={brand.managerName} onChange={e=>setBrand(b=>({...b,managerName:e.target.value}))} /></Fld>
            <Fld label="Department / Industry"><input value={brand.department} onChange={e=>setBrand(b=>({...b,department:e.target.value}))} /></Fld>
          </Sec>

          {/* ✦ AI Data Generation */}
          <Sec title="✦ AI Data">
            <div style={{ fontSize:10, color:'#666', marginBottom:8, lineHeight:1.4 }}>
              Auto-fill jobs, candidates and locations to match your company & industry.
            </div>
            <button onClick={handleGenerate} disabled={generating}
              style={{ width:'100%', background:generating?'#f0f2f5':'linear-gradient(135deg,#6366f1,#4f46e5)', color:generating?'#888':'white', border:'none', borderRadius:6, padding:'9px 0', fontSize:12, fontWeight:600, cursor:generating?'not-allowed':'pointer', marginBottom:4 }}>
              {generating ? '✦ Generating…' : `✦ Generate for ${brand.company||'this company'}`}
            </button>
            {brand.mockData && (
              <div style={{ fontSize:10, color:'#22c55e', textAlign:'center', padding:'3px 0' }}>
                ✓ Data generated · {brand.mockData.jobs?.length||0} jobs · {brand.mockData.candidates?.length||0} candidates
              </div>
            )}
            {brand.mockData && (
              <button onClick={()=>setBrand(b=>({...b,mockData:null}))}
                style={{ width:'100%', fontSize:10, color:'#888', background:'none', border:'1px solid #e5e7eb', borderRadius:5, padding:'4px', cursor:'pointer', marginTop:4 }}>
                ✕ Clear generated data
              </button>
            )}
          </Sec>

          <Sec title="Brand colours">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
              <Fld label="Primary">
                <div style={{ display:'flex', gap:4 }}>
                  <input type="color" value={brand.primary} onChange={e=>setBrand(b=>({...b,primary:e.target.value}))} style={{ width:32, height:28, padding:2, border:'1px solid #ddd', borderRadius:4, cursor:'pointer', flexShrink:0 }} />
                  <input value={brand.primary} onChange={e=>setBrand(b=>({...b,primary:e.target.value}))} style={{ minWidth:0 }} />
                </div>
              </Fld>
              <Fld label="Accent">
                <div style={{ display:'flex', gap:4 }}>
                  <input type="color" value={brand.accent} onChange={e=>setBrand(b=>({...b,accent:e.target.value}))} style={{ width:32, height:28, padding:2, border:'1px solid #ddd', borderRadius:4, cursor:'pointer', flexShrink:0 }} />
                  <input value={brand.accent} onChange={e=>setBrand(b=>({...b,accent:e.target.value}))} style={{ minWidth:0 }} />
                </div>
              </Fld>
            </div>
            <div style={{ fontSize:10, color:'#888', marginBottom:5, fontWeight:600 }}>PRESETS</div>
            <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
              {PRESETS.map(p=>(
                <button key={p.name} onClick={()=>setBrand(b=>({...b,primary:p.primary,accent:p.accent}))} style={{ fontSize:9, padding:'3px 7px', border:'1px solid #ddd', borderRadius:20, background:'white', cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:p.primary, display:'inline-block', flexShrink:0 }} />{p.name}
                </button>
              ))}
            </div>
          </Sec>

          <Sec title="Logo">
            <Fld label="Upload logo"><input type="file" accept="image/*" onChange={e=>handleFile('logoUrl',e.target.files[0])} style={{ fontSize:11 }} /></Fld>
            {brand.logoUrl && (
              <div style={{ marginTop:5, padding:6, background:'#f5f5f5', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <img src={brand.logoUrl} alt="logo" style={{ maxHeight:26, maxWidth:130, objectFit:'contain' }} />
                <button onClick={()=>setBrand(b=>({...b,logoUrl:''}))} style={{ fontSize:10, color:'#888', background:'none', border:'none', cursor:'pointer' }}>✕</button>
              </div>
            )}
          </Sec>

          <Sec title="Hero banner">
            <Fld label="Upload banner image"><input type="file" accept="image/*" onChange={e=>handleFile('bannerUrl',e.target.files[0])} style={{ fontSize:11 }} /></Fld>
            {brand.bannerUrl && (
              <div style={{ marginTop:5, position:'relative' }}>
                <img src={brand.bannerUrl} alt="banner" style={{ width:'100%', height:50, objectFit:'cover', borderRadius:5 }} />
                <button onClick={()=>setBrand(b=>({...b,bannerUrl:''}))} style={{ position:'absolute', top:3, right:3, fontSize:10, color:'white', background:'rgba(0,0,0,0.5)', border:'none', borderRadius:3, cursor:'pointer', padding:'1px 5px' }}>✕</button>
              </div>
            )}
            {/* Overlay controls */}
            <div style={{ marginTop:10 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                <label style={{ fontSize:10, color:'#666', fontWeight:500 }}>Overlay opacity</label>
                <span style={{ fontSize:10, color:brand.primary, fontWeight:600 }}>{Math.round((brand.overlayOpacity??0.88)*100)}%</span>
              </div>
              <input type="range" min="0" max="100" value={Math.round((brand.overlayOpacity??0.88)*100)}
                onChange={e=>setBrand(b=>({...b,overlayOpacity:parseInt(e.target.value)/100}))}
                style={{ width:'100%', accentColor:brand.primary, cursor:'pointer' }} />
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
                <label style={{ fontSize:10, color:'#666', fontWeight:500, flexShrink:0 }}>Overlay tint</label>
                <input type="color" value={overlayColor} onChange={e=>setBrand(b=>({...b,overlayColor:e.target.value}))}
                  style={{ width:28, height:24, padding:2, border:'1px solid #ddd', borderRadius:4, cursor:'pointer', flexShrink:0 }} />
                <input value={overlayColor} onChange={e=>setBrand(b=>({...b,overlayColor:e.target.value}))}
                  style={{ flex:1, fontSize:11, padding:'3px 7px', border:'1px solid #ddd', borderRadius:4 }} />
                {brand.overlayColor && (
                  <button onClick={()=>setBrand(b=>({...b,overlayColor:''}))} style={{ fontSize:10, color:'#888', background:'none', border:'none', cursor:'pointer', flexShrink:0 }}>↺</button>
                )}
              </div>
              {/* Live mini preview */}
              <div style={{ marginTop:8, height:28, borderRadius:5, overflow:'hidden', position:'relative', background:brand.primary }}>
                {brand.bannerUrl && <img src={brand.bannerUrl} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />}
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(to right,${rgba(overlayColor,brand.overlayOpacity??0.88)},${rgba(brand.accent,0.3)})` }} />
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', paddingLeft:8 }}>
                  <span style={{ fontSize:9, fontWeight:600, color:'white', textShadow:'0 1px 3px rgba(0,0,0,0.4)' }}>Preview</span>
                </div>
              </div>
            </div>
          </Sec>

          {selectedTemplate && (
            <Sec title="Active template">
              <div style={{ padding:'8px 10px', background:lighten(brand.primary,230), borderRadius:6, border:`1px solid ${lighten(brand.primary,180)}`, fontSize:11 }}>
                <div style={{ fontWeight:600, color:brand.primary, marginBottom:1 }}>{selectedTemplate.label}</div>
                <div style={{ fontSize:10, color:'#666' }}>{(selectedTemplate.screens||[]).length} screens · layout only</div>
              </div>
            </Sec>
          )}
        </div>

        {/* Export */}
        <div style={{ padding:'10px 18px 14px', borderTop:'1px solid #f0f0f0', flexShrink:0 }}>
          <button onClick={downloadCurrent} disabled={capturing||!selectedTemplate}
            style={{ width:'100%', background:brand.primary, color:'white', border:'none', borderRadius:6, padding:'9px 0', fontSize:12, fontWeight:600, cursor:capturing?'not-allowed':'pointer', marginBottom:6, opacity:capturing||!selectedTemplate?0.6:1 }}>
            {capturing?'Capturing…':`📷 ${isMobile?'📱 Mobile':'🖥 Desktop'} screenshot`}
          </button>
          <button onClick={downloadAll} disabled={capturing||!selectedTemplate}
            style={{ width:'100%', background:'white', color:brand.primary, border:`1.5px solid ${brand.primary}`, borderRadius:6, padding:'8px 0', fontSize:12, fontWeight:600, cursor:capturing?'not-allowed':'pointer', opacity:capturing||!selectedTemplate?0.6:1 }}>
            {capturing?'Capturing…':`📦 Download all ${screens.length} screens`}
          </button>
        </div>
      </div>

      {/* ── CENTRE: TABS + PREVIEW ─────────────────────────────── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <div style={{ display:'flex', background:'white', borderBottom:'1px solid #e5e7eb', padding:'0 14px', flexShrink:0, alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', overflow:'auto' }}>
            {screens.map((s,i) => (
              <button key={s.id} onClick={()=>{ setScreenIndex(i); setRightPanel('preview'); }}
                style={{ fontSize:12, padding:'12px 13px', border:'none', background:'none', cursor:'pointer', whiteSpace:'nowrap', fontWeight:screenIndex===i&&rightPanel==='preview'?600:400, color:screenIndex===i&&rightPanel==='preview'?brand.primary:'#555', borderBottom:screenIndex===i&&rightPanel==='preview'?`2.5px solid ${brand.primary}`:'2.5px solid transparent' }}>
                {s.label}
              </button>
            ))}
            {!selectedTemplate && <span style={{ fontSize:11, color:'#bbb', padding:'14px 10px' }}>← choose a template</span>}
          </div>
          <div style={{ display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
            <div style={{ display:'flex', background:'#f0f2f5', borderRadius:20, padding:2, gap:2 }}>
              <button onClick={()=>setIsMobile(false)} style={{ fontSize:11, padding:'4px 10px', borderRadius:18, border:'none', cursor:'pointer', background:!isMobile?'white':'transparent', color:!isMobile?brand.primary:'#888', fontWeight:!isMobile?600:400, boxShadow:!isMobile?'0 1px 3px rgba(0,0,0,0.1)':'none' }}>🖥 Desktop</button>
              <button onClick={()=>setIsMobile(true)}  style={{ fontSize:11, padding:'4px 10px', borderRadius:18, border:'none', cursor:'pointer', background:isMobile?'white':'transparent', color:isMobile?brand.primary:'#888', fontWeight:isMobile?600:400, boxShadow:isMobile?'0 1px 3px rgba(0,0,0,0.1)':'none' }}>📱 Mobile</button>
            </div>
            <button onClick={()=>setRightPanel(p=>p==='templates'?'preview':'templates')}
              style={{ fontSize:11, padding:'6px 13px', border:`1.5px solid ${rightPanel==='templates'?brand.primary:'#ddd'}`, borderRadius:20, background:rightPanel==='templates'?brand.primary:'white', color:rightPanel==='templates'?'white':'#555', cursor:'pointer', fontWeight:600 }}>
              📚{rightPanel==='templates'?' ↑':' Templates'}
            </button>
          </div>
        </div>

        <div style={{ flex:1, overflow:'auto', padding:20, background:'#e8eaed', display:'flex', justifyContent:'center' }}>
          {isMobile ? (
            <div style={{ transform:'scale(0.88)', transformOrigin:'top center', marginBottom:-80 }}>
              <PhoneFrame brand={brand}>
                <div ref={previewRef} style={{ width:375, height:784, display:'flex', flexDirection:'column', overflow:'hidden' }}>
                  {selectedTemplate
                    ? <PortalScreen brand={brand} template={selectedTemplate} screenIndex={screenIndex} isMobile={true} />
                    : <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa', fontSize:12 }}>Select a template</div>
                  }
                </div>
              </PhoneFrame>
            </div>
          ) : (
            <div ref={previewRef}
              style={{ width:1200, height:900, boxShadow:'0 8px 32px rgba(0,0,0,0.18)', borderRadius:8, overflow:'hidden', transform:'scale(0.72)', transformOrigin:'top center', marginBottom:-252, display:'flex', flexDirection:'column', background:'white' }}
            >
              {selectedTemplate
                ? <PortalScreen brand={brand} template={selectedTemplate} screenIndex={screenIndex} isMobile={false} />
                : <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, color:'#aaa' }}>
                    <div style={{ fontSize:32 }}>📚</div>
                    <div style={{ fontSize:16, fontWeight:600 }}>Select a template to begin</div>
                    <div style={{ fontSize:12 }}>Click "Templates" above to browse layouts</div>
                  </div>
              }
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: TEMPLATE LIBRARY ──────────────────────────────── */}
      {rightPanel==='templates' && (
        <div style={{ width:380, borderLeft:'1px solid #e5e7eb', flexShrink:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <TemplateLibrary brand={brand} selectedTemplate={selectedTemplate}
            onSelectTemplate={t => { setSelectedTemplate(t); setScreenIndex(0); setRightPanel('preview'); }} />
        </div>
      )}
    </div>
  );
}

function Sec({ title, children }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:10, fontWeight:700, color:'#333', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8 }}>{title}</div>
      {children}
    </div>
  );
}
function Fld({ label, children }) {
  return (
    <div style={{ marginBottom:7 }}>
      <label style={{ fontSize:10, color:'#666', display:'block', marginBottom:3 }}>{label}</label>
      {children}
    </div>
  );
}
