import React, { useState, useRef, useCallback } from 'react';
import TemplateLibrary from './PortalTemplateLibrary';
import { BUILTIN_TEMPLATES } from './PortalTemplates';

// ─── Brand helpers ────────────────────────────────────────────────────────────
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

// ─── Shared chrome ────────────────────────────────────────────────────────────
function Header({ brand, nav, activeIndex=0 }) {
  const hasCaret = idx => idx > 0 && idx < nav.length - 1;
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

function Footer({ brand }) {
  return (
    <div style={{ background:'white', borderTop:`3px solid ${brand.primary}`, padding:'9px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        {brand.logoUrl
          ? <img src={brand.logoUrl} alt="" style={{ height:18, objectFit:'contain' }} />
          : <div style={{ width:14, height:14, background:brand.primary, borderRadius:3 }} />
        }
        <span style={{ fontSize:10, color:'#aaa' }}>Copyright © 2026 {brand.company}</span>
      </div>
      <div style={{ display:'flex', gap:12, fontSize:12, color:'#bbb' }}>{['f','𝕏','in','▶'].map(s=><span key={s}>{s}</span>)}</div>
    </div>
  );
}

// ─── Widget renderers — every one takes brand + widget config ────────────────

function W_HeroBanner({ brand, w }) {
  const ctas = w.showCTA || [];
  const headline = w.headline ? tokenise(w.headline, brand) : `Welcome, ${firstName(brand.managerName)}`;
  return (
    <div style={{ position:'relative', height:210, overflow:'hidden', background:brand.primary, flexShrink:0 }}>
      {brand.bannerUrl && <img src={brand.bannerUrl} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', opacity:0.5 }} />}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(to right,${rgba(brand.primary,0.88)},${rgba(brand.accent,0.32)})` }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 22px', display:'flex', alignItems:'flex-end', gap:14 }}>
        {w.showManagerName !== false && (
          <div style={{ width:54, height:54, borderRadius:'50%', border:'3px solid white', background:brand.accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden' }}>
            {brand.logoUrl ? <img src={brand.logoUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'contain', padding:6 }} /> : <span style={{ fontSize:18, fontWeight:700, color:brand.primary }}>{initials(brand.managerName)}</span>}
          </div>
        )}
        <div>
          <div style={{ fontSize:22, fontWeight:700, color:'white', marginBottom:ctas.length?8:0, textShadow:'0 1px 4px rgba(0,0,0,0.4)' }}>{headline}</div>
          {ctas.length > 0 && (
            <div style={{ display:'flex', gap:8 }}>
              {ctas.map((c,i) => i===0
                ? <button key={c} style={{ background:brand.primary, color:'white', border:'none', borderRadius:6, padding:'7px 16px', fontSize:12, fontWeight:700, cursor:'pointer' }}>{c}</button>
                : <button key={c} style={{ background:'transparent', color:'white', border:'2px solid white', borderRadius:6, padding:'5px 14px', fontSize:12, fontWeight:600, cursor:'pointer' }}>{c}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function W_PageHero({ brand, w }) {
  const crumbs = w.breadcrumb || [];
  const title = crumbs[crumbs.length - 1] || '';
  return (
    <>
      <div style={{ padding:'16px 22px 12px', background:`linear-gradient(135deg,${brand.primary},${brand.accent})`, flexShrink:0 }}>
        {crumbs.length > 1 && <div style={{ fontSize:10, color:'rgba(255,255,255,0.75)', marginBottom:3 }}>{crumbs.slice(0,-1).join(' / ')}</div>}
        <div style={{ fontSize:22, fontWeight:700, color:'white' }}>{title}</div>
      </div>
      {crumbs.length > 0 && (
        <div style={{ fontSize:10, color:'#888', padding:'6px 22px', background:'white', borderBottom:'0.5px solid #ebebeb', flexShrink:0 }}>
          {crumbs.map((c,i) => <span key={i}>{i>0&&' / '}<span style={{ color:i<crumbs.length-1?brand.primary:'#888', cursor:i<crumbs.length-1?'pointer':'default' }}>{c}</span></span>)}
        </div>
      )}
    </>
  );
}

function W_KpiRow({ brand, w }) {
  const items = w.items || [];
  const nums = ['4','85','73','22','11','6','94%','3'];
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:8, marginBottom:16 }}>
      {items.map((label,i) => (
        <div key={label} style={{ background:'white', borderRadius:8, padding:'12px 10px', textAlign:'center', border:'0.5px solid #e5e7eb' }}>
          <div style={{ width:'100%', height:3, borderRadius:2, background:brand.primary, marginBottom:10 }} />
          <div style={{ fontSize:22, fontWeight:700, color:'#111', marginBottom:2 }}>{nums[i]||'–'}</div>
          <div style={{ fontSize:10, color:'#777' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function W_DataTable({ brand, w }) {
  const cols = w.columns || ['Name','Details','Status','Action'];
  const hasCheckbox = cols[0]==='';
  const hasBulk = !!w.bulkAction;
  const rows = [
    ['Alpha role','Team A','Active','—'],
    ['Beta role','Team B','Active','—'],
    ['Gamma role','Team C','Review','—'],
    ['Delta role','Team A','Active','—'],
  ];
  return (
    <div style={{ marginBottom:14 }}>
      {(w.title||hasBulk) && (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
          {w.title && <span style={{ fontSize:14, fontWeight:700, color:'#111' }}>{w.title}</span>}
          {w.viewAll && <span style={{ fontSize:11, color:brand.primary, cursor:'pointer' }}>View all</span>}
          {hasBulk && (
            <div style={{ display:'flex', alignItems:'center', gap:10, marginLeft:'auto' }}>
              <span style={{ fontSize:10, color:'#888' }}>1–10 of 85 results</span>
              <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:'5px 12px', fontSize:11, fontWeight:600, cursor:'pointer' }}>{w.bulkAction} ▾</button>
            </div>
          )}
        </div>
      )}
      <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11, tableLayout:'fixed' }}>
          <thead>
            <tr style={{ background:'#fafafa' }}>
              {cols.map((h,i) => (
                <th key={i} style={{ padding:'9px 12px', textAlign:'left', fontSize:10, fontWeight:600, color:'#888', borderBottom:'1px solid #f0f0f0', width:h===''?28:undefined }}>
                  {h==='' ? <input type="checkbox" /> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:'0.5px solid #f5f5f5' }}>
                {hasCheckbox && <td style={{ padding:'9px 12px' }}><input type="checkbox" /></td>}
                {row.slice(0, hasCheckbox ? cols.length-1 : cols.length).map((cell,ci) => (
                  <td key={ci} style={{ padding:'9px 12px', color:ci===0?brand.primary:'#333', fontWeight:ci===0?500:400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', cursor:ci===0?'pointer':'default' }}>
                    {ci===row.length-1 && cols[cols.length-1]==='Action'
                      ? <button style={{ fontSize:10, padding:'3px 8px', border:`1px solid ${lighten(brand.primary,160)}`, borderRadius:4, background:'white', color:brand.primary, cursor:'pointer', fontWeight:500 }}>Actions ▾</button>
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

function W_StatRow({ brand, w }) {
  const items = w.items || [];
  const vals = ['5','78%','84%'];
  const subs = ['How quickly you respond to new candidates','Quality from recruiters, past month','How often candidates accepted the offer'];
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:8 }}>
      {items.map((label,i) => (
        <div key={label} style={{ background:'white', borderRadius:8, padding:14, textAlign:'center', border:'0.5px solid #e5e7eb' }}>
          <div style={{ fontSize:24, fontWeight:700, color:brand.primary, marginBottom:2 }}>{vals[i]||'–'}</div>
          <div style={{ fontSize:11, fontWeight:600, color:'#333', marginBottom:2 }}>{label}</div>
          <div style={{ fontSize:10, color:'#888' }}>{subs[i]||''}</div>
        </div>
      ))}
    </div>
  );
}

function W_PipelineTabs({ brand, w }) {
  const tabs = w.tabs || [];
  return (
    <div style={{ display:'flex', borderBottom:'1.5px solid #e5e7eb', background:'white', padding:'0 22px', flexShrink:0 }}>
      {tabs.map((t,i) => (
        <span key={t} style={{ fontSize:11, padding:'7px 12px', cursor:'pointer', color:i===0?'#111':'#888', fontWeight:i===0?700:500, borderBottom:i===0?`2.5px solid ${brand.primary}`:'2.5px solid transparent', marginBottom:-1.5, whiteSpace:'nowrap' }}>{t}</span>
      ))}
    </div>
  );
}

function W_FilterRow({ brand, w }) {
  const filters = w.filters || [];
  return (
    <div style={{ display:'flex', gap:8, alignItems:'flex-end', marginBottom:10, flexWrap:'wrap' }}>
      {filters.map(f => (
        <div key={f} style={{ display:'flex', flexDirection:'column', gap:2 }}>
          <label style={{ fontSize:10, color:'#555', fontWeight:500 }}>{f}</label>
          {f.toLowerCase().includes('search') || f.toLowerCase().includes('keyword')
            ? <input type="text" placeholder={`${f}…`} style={{ fontSize:11, padding:'5px 8px', border:'1px solid #d1d5db', borderRadius:5, width:130 }} />
            : <select style={{ fontSize:11, padding:'5px 8px', border:'1px solid #d1d5db', borderRadius:5, width:130 }}><option>All</option></select>
          }
        </div>
      ))}
      <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:'7px 14px', fontSize:11, fontWeight:600, cursor:'pointer', alignSelf:'flex-end' }}>Search</button>
    </div>
  );
}

function W_ProgressBar({ brand, w }) {
  const steps = w.steps && w.steps.length > 0 ? w.steps : ['Step 1','Step 2','Step 3','Step 4','Step 5'];
  const active = 2;
  return (
    <div style={{ background:'white', borderRadius:8, padding:'14px 18px', border:'0.5px solid #e5e7eb', marginBottom:14 }}>
      {w.label && <div style={{ fontSize:12, fontWeight:600, color:'#333', marginBottom:12 }}>{w.label}</div>}
      <div style={{ display:'flex', alignItems:'center', position:'relative' }}>
        <div style={{ position:'absolute', top:10, left:0, right:0, height:3, background:'#e5e7eb', zIndex:0 }} />
        <div style={{ position:'absolute', top:10, left:0, width:`${(active/(steps.length-1))*100}%`, height:3, background:brand.primary, zIndex:1, transition:'width 0.3s' }} />
        {steps.map((s,i) => (
          <div key={s} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:2 }}>
            <div style={{ width:22, height:22, borderRadius:'50%', background:i<=active?brand.primary:'white', border:`2px solid ${i<=active?brand.primary:'#d1d5db'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:i<=active?'white':'#888', fontWeight:600 }}>{i<active?'✓':i+1}</div>
            <div style={{ fontSize:9, color:i<=active?brand.primary:'#aaa', marginTop:4, textAlign:'center', fontWeight:i===active?600:400, maxWidth:60, lineHeight:1.3 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_TaskList({ brand, w }) {
  const tasks = [
    { done:true,  label:'Complete personal details form', due:'Done', cat:'Documents' },
    { done:true,  label:'Upload right to work documents',  due:'Done', cat:'Documents' },
    { done:false, label:'Watch compliance training video',  due:'2 days', cat:'Training' },
    { done:false, label:'Set up IT access and email',       due:'3 days', cat:'IT Setup' },
    { done:false, label:'Book first day induction session', due:'4 days', cat:'Onboarding' },
  ].slice(0, w.maxItems||5);
  return (
    <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden', marginBottom:14 }}>
      {w.title && <div style={{ padding:'10px 14px 8px', fontSize:13, fontWeight:600, color:'#111', borderBottom:'1px solid #f5f5f5' }}>{w.title}</div>}
      {tasks.map((t,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 14px', borderBottom:i<tasks.length-1?'0.5px solid #f5f5f5':'none' }}>
          <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${t.done?brand.primary:'#d1d5db'}`, background:t.done?brand.primary:'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            {t.done && <span style={{ color:'white', fontSize:10, fontWeight:700 }}>✓</span>}
          </div>
          <div style={{ flex:1, fontSize:12, color:t.done?'#aaa':'#333', textDecoration:t.done?'line-through':'none' }}>{t.label}</div>
          {w.showCategory && <span style={{ fontSize:9, padding:'2px 6px', background:lighten(brand.primary,230), color:brand.primary, borderRadius:10 }}>{t.cat}</span>}
          {w.showDueDate && <span style={{ fontSize:10, color:t.done?'#aaa':'#888' }}>{t.due}</span>}
        </div>
      ))}
    </div>
  );
}

function W_JobCards({ brand, w }) {
  const count = w.count || 4;
  const roles = ['Operations Manager','Graduate Trainee','Customer Experience Lead','Finance Analyst','HR Business Partner','Marketing Executive'].slice(0,count);
  const locs  = ['London','Dubai','Lagos','Riyadh','Singapore','Paris'];
  const depts = ['Operations','Early Careers','Customer','Finance','HR','Marketing'];
  return (
    <div style={{ marginBottom:14 }}>
      {w.title && <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:10 }}>{w.title}</div>}
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(count,3)},1fr)`, gap:10 }}>
        {roles.map((r,i) => (
          <div key={r} style={{ background:'white', borderRadius:8, padding:'14px 14px 12px', border:'0.5px solid #e5e7eb', cursor:'pointer' }}>
            <div style={{ fontSize:12, fontWeight:600, color:brand.primary, marginBottom:4 }}>{r}</div>
            <div style={{ fontSize:10, color:'#888', marginBottom:8 }}>{depts[i]} · {locs[i]}</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:9, padding:'2px 8px', background:lighten(brand.primary,230), color:brand.primary, borderRadius:20, fontWeight:600 }}>Full-time</span>
              <span style={{ fontSize:10, color:brand.primary, fontWeight:600 }}>Apply →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_EventsList({ brand, w }) {
  const count = w.count || 4;
  const events = [
    { title:'Graduate Careers Fair', date:'15 Jan', loc:'London ExCeL', spaces:'38 spaces left' },
    { title:'Virtual Open Day',      date:'22 Jan', loc:'Online',       spaces:'120 spaces left' },
    { title:'Assessment Centre',     date:'3 Feb',  loc:'Birmingham',   spaces:'12 spaces left' },
    { title:'Networking Evening',    date:'10 Feb', loc:'Manchester',   spaces:'45 spaces left' },
  ].slice(0,count);
  return (
    <div style={{ marginBottom:14 }}>
      {w.title && <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:10 }}>{w.title}</div>}
      <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden' }}>
        {events.map((e,i) => (
          <div key={e.title} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 16px', borderBottom:i<events.length-1?'0.5px solid #f5f5f5':'none' }}>
            <div style={{ width:48, height:48, background:brand.primary, borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <div style={{ fontSize:16, fontWeight:700, color:'white', lineHeight:1 }}>{e.date.split(' ')[0]}</div>
              <div style={{ fontSize:9, color:'white', opacity:0.85 }}>{e.date.split(' ')[1]}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#111', marginBottom:2 }}>{e.title}</div>
              {w.showLocation && <div style={{ fontSize:10, color:'#888' }}>📍 {e.loc}</div>}
            </div>
            {w.showSpaces && <div style={{ fontSize:10, color:brand.primary, fontWeight:600, textAlign:'right' }}>{e.spaces}</div>}
            <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:5, padding:'5px 12px', fontSize:11, fontWeight:600, cursor:'pointer', flexShrink:0 }}>Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_TeamGrid({ brand, w }) {
  const members = [
    { name:'Sarah Chen',      role:'Head of People',      email:'s.chen@co.com' },
    { name:'James Okafor',    role:'HR Business Partner', email:'j.okafor@co.com' },
    { name:'Priya Sharma',    role:'L&D Manager',         email:'p.sharma@co.com' },
    { name:'Tom Williams',    role:'Recruiter',           email:'t.williams@co.com' },
    { name:'Aisha Al-Rashid', role:'Benefits Analyst',    email:'a.rashid@co.com' },
    { name:'David Park',      role:'HR Coordinator',      email:'d.park@co.com' },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:14 }}>
      {members.map(m => (
        <div key={m.name} style={{ background:'white', borderRadius:8, padding:'14px 12px', textAlign:'center', border:'0.5px solid #e5e7eb' }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:`linear-gradient(135deg,${brand.primary},${brand.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'white', margin:'0 auto 8px' }}>{initials(m.name)}</div>
          <div style={{ fontSize:12, fontWeight:600, color:'#111', marginBottom:2 }}>{m.name}</div>
          {w.showRole  && <div style={{ fontSize:10, color:'#888', marginBottom:3 }}>{m.role}</div>}
          {w.showEmail && <div style={{ fontSize:9, color:brand.primary, cursor:'pointer' }}>{m.email}</div>}
        </div>
      ))}
    </div>
  );
}

function W_NotificationFeed({ brand, w }) {
  const items = [
    { icon:'👤', text:'Tunde Adeyemi moved to Interview stage', time:'2m ago' },
    { icon:'📋', text:'New application for Operations Manager', time:'14m ago' },
    { icon:'✅', text:'Offer accepted by Sarah Johnson',        time:'1h ago' },
    { icon:'📅', text:'Interview scheduled for tomorrow 10am', time:'2h ago' },
  ];
  return (
    <div style={{ marginBottom:14 }}>
      {w.title && <div style={{ fontSize:14, fontWeight:700, color:'#111', marginBottom:10 }}>{w.title}</div>}
      <div style={{ background:'white', borderRadius:8, border:'0.5px solid #e5e7eb', overflow:'hidden' }}>
        {items.map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderBottom:i<items.length-1?'0.5px solid #f5f5f5':'none' }}>
            <span style={{ fontSize:16 }}>{item.icon}</span>
            <div style={{ flex:1, fontSize:12, color:'#333' }}>{item.text}</div>
            <div style={{ fontSize:10, color:'#aaa', flexShrink:0 }}>{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_WelcomeCard({ brand, w }) {
  return (
    <div style={{ background:`linear-gradient(135deg,${lighten(brand.primary,230)},${lighten(brand.accent,200)})`, borderRadius:10, padding:'16px 18px', border:`1px solid ${lighten(brand.primary,200)}`, marginBottom:14 }}>
      <div style={{ fontSize:11, color:brand.primary, fontWeight:600, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.05em' }}>A message from your manager</div>
      <div style={{ fontSize:13, color:'#333', lineHeight:1.6, marginBottom:8 }}>
        "We're really excited to have you join the {brand.company} team. Your first few weeks are all about getting settled in — please reach out any time."
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:28, height:28, borderRadius:'50%', background:brand.primary, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'white' }}>{initials(brand.managerName)}</div>
        <div>
          <div style={{ fontSize:11, fontWeight:600, color:'#111' }}>{brand.managerName}</div>
          <div style={{ fontSize:10, color:'#888' }}>{brand.department} · {brand.company}</div>
        </div>
      </div>
    </div>
  );
}

function W_ProfileTwoCol({ brand, w }) {
  const dept = brand.department;
  const left  = w.left  || [];
  const right = w.right || [];

  const leftContent = (key) => {
    if (key==='basic_info') return (
      <div style={{ marginBottom:14 }}>
        <SectionTitle brand={brand}>Basic Information</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {[['APPLYING TO',`${dept} Lead`],['EMAIL','candidate@email.com'],['LOCATION','London, UK'],['CURRENT EMPLOYER','Previous Co']].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:9, color:'#888', fontWeight:600, textTransform:'uppercase', marginBottom:1 }}>{l}</div><div style={{ fontSize:11, color:'#222' }}>{v}</div></div>
          ))}
        </div>
      </div>
    );
    if (key==='employment_info'||key==='personal_info') return (
      <div style={{ marginBottom:14 }}>
        <SectionTitle brand={brand}>{key==='personal_info'?'Personal Details':'Employment'}</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {[['EMPLOYEE ID','EMP-00421'],['START DATE','12 Jan 2023'],['DEPARTMENT',dept],['MANAGER',brand.managerName]].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:9, color:'#888', fontWeight:600, textTransform:'uppercase', marginBottom:1 }}>{l}</div><div style={{ fontSize:11, color:'#222' }}>{v}</div></div>
          ))}
        </div>
      </div>
    );
    if (key==='skills_analysis'||key==='skills_tags') return (
      <div style={{ marginBottom:14 }}>
        <SectionTitle brand={brand}>Skills</SectionTitle>
        <div style={{ marginBottom:8 }}>
          {['Leadership','Communication','Problem Solving','Data Analysis','Project Mgmt'].map(s=>(
            <span key={s} style={{ display:'inline-block', fontSize:9, padding:'2px 8px', borderRadius:20, border:`1px solid ${lighten(brand.primary,160)}`, color:brand.primary, background:lighten(brand.primary,230), margin:2 }}>{s}</span>
          ))}
        </div>
      </div>
    );
    if (key==='ai_screening') return (
      <AIBox brand={brand} title="✦ Screening Summary">
        <ul style={{ paddingLeft:14 }}>
          <li style={{ marginBottom:3 }}><strong>Strengths:</strong> Consistent track record in {dept.toLowerCase()}, strong cross-functional collaboration.</li>
          <li style={{ marginBottom:3 }}><strong>Experience:</strong> 4 years in similar roles. Relevant qualifications confirmed.</li>
          <li><strong>Areas to probe:</strong> Budget ownership and senior stakeholder management experience.</li>
        </ul>
      </AIBox>
    );
    if (key==='ai_interview_questions') return (
      <AIBox brand={brand} title="✦ Suggested Interview Questions">
        <ul style={{ paddingLeft:14 }}>
          <li style={{ marginBottom:3 }}><strong>Competency:</strong> Tell me about a time you improved a process in your team.</li>
          <li style={{ marginBottom:3 }}><strong>Situational:</strong> How would you handle conflicting priorities across two departments?</li>
          <li><strong>Values:</strong> What draws you to {brand.company} specifically?</li>
        </ul>
      </AIBox>
    );
    if (key==='ai_sourcing') return (
      <AIBox brand={brand} title="✦ AI Sourcing Strategy">
        {[`Job Boards — Target specialist boards for ${dept.toLowerCase()} professionals`,`LinkedIn — ${dept} leads with 3+ years experience in sector`,`Referrals — ${brand.company} employee referral programme`,`University — Graduate partnerships with local institutions`].map((l,i)=>(
          <div key={i} style={{ marginBottom:4 }}>{l}</div>
        ))}
      </AIBox>
    );
    if (key==='job_info') return (
      <div style={{ marginBottom:14 }}>
        <SectionTitle brand={brand}>General Information</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {[['JOB TYPE','Permanent'],['LOCATION','London, UK'],['DEPARTMENT',dept],['OPENINGS','3'],['CLOSING DATE','31 Jan 2026'],['SALARY BAND','Band 5']].map(([l,v])=>(
            <div key={l}><div style={{ fontSize:9, color:'#888', fontWeight:600, textTransform:'uppercase', marginBottom:1 }}>{l}</div><div style={{ fontSize:11, color:'#222' }}>{v}</div></div>
          ))}
        </div>
      </div>
    );
    if (key==='pipeline_stats') return (
      <div style={{ display:'flex', gap:14, marginBottom:14, flexWrap:'wrap' }}>
        {[['12','Applied'],['8','Screening'],['5','Interview'],['2','Offer'],['1','Hired']].map(([n,l])=>(
          <div key={l} style={{ textAlign:'center' }}>
            <div style={{ fontSize:20, fontWeight:700, color:brand.primary }}>{n}</div>
            <div style={{ fontSize:9, color:'#888', textTransform:'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>
    );
    if (key==='required_skills') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand}>Required Skills</SectionTitle>
        {[['Must-Have',['Communication','Leadership','Data analysis'],'#e3f2fd','#0d47a1'],['Preferred',['Project management','Budget ownership'],'#e8f5e9','#2e7d32'],['Nice to Have',['Agile','Stakeholder engagement'],'#fff3e0','#e65100']].map(([cat,skills,bg,col])=>(
          <div key={cat} style={{ marginBottom:8 }}>
            <div style={{ fontSize:10, fontWeight:700, color:'#888', textTransform:'uppercase', marginBottom:4 }}>{cat}</div>
            {skills.map(s=><span key={s} style={{ display:'inline-block', fontSize:10, padding:'3px 10px', borderRadius:20, border:`1px solid ${col}40`, color:col, background:bg, margin:2 }}>{s}</span>)}
          </div>
        ))}
      </div>
    );
    if (key==='job_description'||key==='requirements'||key==='benefits') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand}>{key==='job_description'?'About the role':key==='requirements'?'What we need':'What we offer'}</SectionTitle>
        <div style={{ fontSize:11, color:'#444', lineHeight:1.7 }}>
          {key==='job_description' && `Join ${brand.company}'s ${dept} team in a role that drives real impact. You'll work closely with senior leaders and cross-functional teams to deliver our core objectives.`}
          {key==='requirements' && ['3+ years in a similar role','Strong communication skills','Degree or equivalent experience','Ability to work in a fast-paced environment'].map((r,i)=><div key={i} style={{ marginBottom:3 }}>• {r}</div>)}
          {key==='benefits' && ['Competitive salary and bonus','25 days annual leave','Flexible working','Private healthcare','Learning & development budget'].map((r,i)=><div key={i} style={{ marginBottom:3 }}>• {r}</div>)}
        </div>
      </div>
    );
    if (key==='application_status') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand}>Application Status</SectionTitle>
        <div style={{ background:lighten(brand.primary,230), border:`1px solid ${lighten(brand.primary,180)}`, borderRadius:8, padding:'10px 14px' }}>
          <div style={{ fontSize:13, fontWeight:700, color:brand.primary, marginBottom:2 }}>Currently at: Interview stage</div>
          <div style={{ fontSize:11, color:'#555' }}>Your interview has been scheduled for 22 January. Check your email for the details.</div>
        </div>
      </div>
    );
    if (key==='next_steps') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand}>Next Steps</SectionTitle>
        <div style={{ fontSize:11, color:'#444', lineHeight:1.7 }}>
          {['Complete your interview preparation','Review the role brief sent to your email','Confirm interview attendance via the link below'].map((r,i)=><div key={i} style={{ marginBottom:4 }}>→ {r}</div>)}
        </div>
      </div>
    );
    if (key==='documents') return (
      <div style={{ marginBottom:12 }}>
        <SectionTitle brand={brand}>Documents</SectionTitle>
        {['Offer letter.pdf','Contract of employment.pdf','Benefits guide.pdf'].map((d,i)=>(
          <div key={d} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', background:'#fafafa', borderRadius:5, marginBottom:5, border:'0.5px solid #eee' }}>
            <span style={{ fontSize:14 }}>📄</span>
            <span style={{ fontSize:11, color:brand.primary, flex:1, cursor:'pointer' }}>{d}</span>
            <span style={{ fontSize:10, color:'#aaa' }}>Download</span>
          </div>
        ))}
      </div>
    );
    return null;
  };

  const rightContent = (key) => {
    if (key==='match_score') return (
      <div style={{ textAlign:'center', marginBottom:16 }}>
        <button style={{ background:brand.primary, border:'none', borderRadius:6, padding:'8px 12px', fontSize:11, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:12, color:'white' }}>Review candidate</button>
        <div style={{ width:64, height:64, position:'relative', margin:'0 auto 6px' }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke={lighten(brand.primary,180)} strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke={brand.primary} strokeWidth="6" strokeDasharray="142 21" strokeDashoffset="41" />
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:brand.primary }}>87%</div>
        </div>
        <div style={{ fontSize:9, color:'#888', textAlign:'center' }}>Matching Score</div>
      </div>
    );
    if (key==='more_candidates') return (
      <div>
        <div style={{ fontSize:10, color:'#888', marginBottom:8 }}>More candidates</div>
        {['Jordan Smith','Maya Patel','Chris Liu'].map(n=>(
          <div key={n} style={{ marginBottom:8 }}>
            <div style={{ fontSize:11, fontWeight:500, color:brand.primary, cursor:'pointer' }}>{n}</div>
            <div style={{ fontSize:9, color:'#888' }}>{dept}</div>
          </div>
        ))}
        <span style={{ fontSize:10, color:brand.primary, cursor:'pointer' }}>View all</span>
      </div>
    );
    if (key==='job_actions') return (
      <div>
        <button style={{ background:brand.primary, border:'none', borderRadius:6, padding:'8px 12px', fontSize:11, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:8, color:'white' }}>Edit job</button>
        <button style={{ background:'white', color:brand.primary, border:`1.5px solid ${brand.primary}`, borderRadius:6, padding:'7px 12px', fontSize:11, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:8 }}>Add candidate</button>
        <button style={{ background:'white', color:'#888', border:'1px solid #ddd', borderRadius:6, padding:'7px 12px', fontSize:11, cursor:'pointer', width:'100%' }}>Share job link</button>
      </div>
    );
    if (key==='related_jobs') return (
      <div style={{ marginTop:14 }}>
        <div style={{ fontSize:10, color:'#888', marginBottom:6 }}>Related jobs</div>
        {[`Senior ${dept} Lead`,`${dept} Manager`,'Graduate Trainee'].map(j=>(
          <div key={j} style={{ marginBottom:7 }}>
            <div style={{ fontSize:11, fontWeight:500, color:brand.primary, cursor:'pointer' }}>{j}</div>
            <div style={{ fontSize:9, color:'#888' }}>London · Open</div>
          </div>
        ))}
      </div>
    );
    if (key==='apply_cta') return (
      <div style={{ background:lighten(brand.primary,230), border:`1px solid ${lighten(brand.primary,180)}`, borderRadius:8, padding:'14px', textAlign:'center', marginBottom:10 }}>
        <div style={{ fontSize:13, fontWeight:700, color:brand.primary, marginBottom:8 }}>Interested in this role?</div>
        <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:6, padding:'10px 20px', fontSize:13, fontWeight:700, cursor:'pointer', width:'100%', marginBottom:8 }}>Apply now</button>
        <button style={{ background:'white', color:'#555', border:'1px solid #ddd', borderRadius:6, padding:'8px 20px', fontSize:12, cursor:'pointer', width:'100%' }}>Save job</button>
      </div>
    );
    if (key==='share') return (
      <div style={{ marginBottom:10 }}>
        <div style={{ fontSize:10, color:'#888', marginBottom:6 }}>Share this role</div>
        <div style={{ display:'flex', gap:6 }}>
          {['LinkedIn','Email','Copy link'].map(s=>(
            <button key={s} style={{ fontSize:10, padding:'4px 8px', border:'1px solid #ddd', borderRadius:5, background:'white', cursor:'pointer', color:'#555' }}>{s}</button>
          ))}
        </div>
      </div>
    );
    if (key==='similar_roles') return (
      <div>
        <div style={{ fontSize:10, color:'#888', marginBottom:6 }}>Similar roles</div>
        {[`${dept} Lead`,`Senior ${dept} Manager`].map(r=>(
          <div key={r} style={{ marginBottom:6 }}>
            <div style={{ fontSize:11, fontWeight:500, color:brand.primary, cursor:'pointer' }}>{r}</div>
            <div style={{ fontSize:9, color:'#888' }}>London · Full-time</div>
          </div>
        ))}
      </div>
    );
    if (key==='quick_actions') return (
      <div style={{ marginBottom:12 }}>
        <button style={{ background:brand.primary, border:'none', borderRadius:6, padding:'8px 12px', fontSize:11, fontWeight:600, cursor:'pointer', width:'100%', marginBottom:8, color:'white' }}>Edit profile</button>
        <button style={{ background:'white', color:brand.primary, border:`1.5px solid ${brand.primary}`, borderRadius:6, padding:'7px 12px', fontSize:11, fontWeight:600, cursor:'pointer', width:'100%' }}>Download CV</button>
      </div>
    );
    if (key==='upcoming_leave') return (
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:600, color:'#555', marginBottom:6, textTransform:'uppercase' }}>Upcoming leave</div>
        <div style={{ background:'#fafafa', borderRadius:6, padding:'8px 10px', fontSize:11, color:'#333', border:'0.5px solid #eee' }}>
          <div style={{ fontWeight:600, color:brand.primary, marginBottom:2 }}>Annual leave</div>
          <div style={{ color:'#666' }}>3–7 Feb 2026 · 5 days</div>
        </div>
      </div>
    );
    if (key==='your_recruiter') return (
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:600, color:'#555', marginBottom:6, textTransform:'uppercase' }}>Your recruiter</div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${brand.primary},${brand.accent})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'white' }}>SR</div>
          <div>
            <div style={{ fontSize:11, fontWeight:600 }}>Sarah Rodriguez</div>
            <div style={{ fontSize:10, color:brand.primary, cursor:'pointer' }}>Send message</div>
          </div>
        </div>
      </div>
    );
    if (key==='useful_links') return (
      <div>
        <div style={{ fontSize:10, fontWeight:600, color:'#555', marginBottom:6, textTransform:'uppercase' }}>Useful links</div>
        {['Interview tips','Role overview','Our culture','FAQs'].map(l=>(
          <div key={l} style={{ fontSize:11, color:brand.primary, cursor:'pointer', marginBottom:5 }}>→ {l}</div>
        ))}
      </div>
    );
    return null;
  };

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 190px', gap:16 }}>
      <div>{left.map(k => <div key={k}>{leftContent(k)}</div>)}</div>
      <div>{right.map(k => <div key={k}>{rightContent(k)}</div>)}</div>
    </div>
  );
}

function W_JobSearch({ brand }) {
  return (
    <div style={{ background:'white', borderRadius:10, padding:'18px 20px', border:'0.5px solid #e5e7eb', marginBottom:16 }}>
      <div style={{ fontSize:14, fontWeight:600, color:'#333', marginBottom:10 }}>Find your next role at {brand.company}</div>
      <div style={{ display:'flex', gap:8 }}>
        <input type="text" placeholder="Job title, skills or keywords" style={{ flex:1, fontSize:13, padding:'9px 12px', border:'1px solid #d1d5db', borderRadius:6 }} />
        <input type="text" placeholder="Location" style={{ width:140, fontSize:13, padding:'9px 12px', border:'1px solid #d1d5db', borderRadius:6 }} />
        <button style={{ background:brand.primary, color:'white', border:'none', borderRadius:6, padding:'9px 20px', fontSize:13, fontWeight:700, cursor:'pointer' }}>Search</button>
      </div>
    </div>
  );
}

// ─── Section title helper ─────────────────────────────────────────────────────
function SectionTitle({ brand, children }) {
  return <div style={{ fontSize:13, fontWeight:700, color:brand.primary, marginBottom:8, paddingBottom:5, borderBottom:`2px solid ${lighten(brand.primary,210)}` }}>{children}</div>;
}

function AIBox({ brand, title, children }) {
  return (
    <div style={{ border:'1px solid #fff0cc', borderRadius:7, marginBottom:8, overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'#fffcf0' }}>
        <div style={{ fontSize:12, fontWeight:700, color:brand.primary }}>{title}</div>
        <span style={{ fontSize:11, color:'#999' }}>∧</span>
      </div>
      <div style={{ padding:'4px 12px 10px', fontSize:10, color:'#333', lineHeight:1.6 }}>{children}</div>
    </div>
  );
}

// ─── Widget dispatcher ────────────────────────────────────────────────────────
function Widget({ brand, w }) {
  const t = w.type;
  if (t==='hero_banner')    return <W_HeroBanner brand={brand} w={w} />;
  if (t==='page_hero')      return <W_PageHero brand={brand} w={w} />;
  if (t==='kpi_row')        return <W_KpiRow brand={brand} w={w} />;
  if (t==='data_table')     return <W_DataTable brand={brand} w={w} />;
  if (t==='stat_row')       return <W_StatRow brand={brand} w={w} />;
  if (t==='pipeline_tabs')  return <W_PipelineTabs brand={brand} w={w} />;
  if (t==='filter_row')     return <W_FilterRow brand={brand} w={w} />;
  if (t==='progress_bar')   return <W_ProgressBar brand={brand} w={w} />;
  if (t==='task_list')      return <W_TaskList brand={brand} w={w} />;
  if (t==='job_cards')      return <W_JobCards brand={brand} w={w} />;
  if (t==='events_list')    return <W_EventsList brand={brand} w={w} />;
  if (t==='team_grid')      return <W_TeamGrid brand={brand} w={w} />;
  if (t==='notification_feed') return <W_NotificationFeed brand={brand} w={w} />;
  if (t==='welcome_card')   return <W_WelcomeCard brand={brand} w={w} />;
  if (t==='profile_two_col') return <W_ProfileTwoCol brand={brand} w={w} />;
  if (t==='job_search')     return <W_JobSearch brand={brand} w={w} />;
  return null;
}

// ─── Screen renderer — reads template.screens[i].widgets[] ───────────────────
function PortalScreen({ brand, template, screenIndex }) {
  const screen = template.screens[screenIndex];
  if (!screen) return null;
  const nav   = template.nav || ['Dashboard'];
  const activeNavIndex = screenIndex; // first screen = first nav item active

  // Widgets that live outside the scrollable body (header, hero, page hero, tabs, breadcrumb)
  const OUTSIDE = ['hero_banner','page_hero','pipeline_tabs'];
  const outsideWidgets = screen.widgets.filter(w => OUTSIDE.includes(w.type));
  const bodyWidgets    = screen.widgets.filter(w => !OUTSIDE.includes(w.type));

  // Determine if we need a padded body wrapper
  const hasBody = bodyWidgets.length > 0;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'white' }}>
      <Header brand={brand} nav={nav} activeIndex={activeNavIndex} />
      {outsideWidgets.map((w,i) => <Widget key={i} brand={brand} w={w} />)}
      {hasBody && (
        <div style={{ flex:1, background:'#f0f2f5', padding:'18px 22px', overflow:'auto' }}>
          {bodyWidgets.map((w,i) => <Widget key={i} brand={brand} w={w} />)}
        </div>
      )}
      <Footer brand={brand} />
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_BRAND = {
  company:'Avature Demo Co', managerName:'Jamie Chen', department:'Operations',
  primary:'#1a56db', accent:'#f5a623', logoUrl:'', bannerUrl:'',
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

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function PortalGenerator() {
  const [brand, setBrand]                   = useState(DEFAULT_BRAND);
  const [selectedTemplate, setSelectedTemplate] = useState(BUILTIN_TEMPLATES[0]);
  const [screenIndex, setScreenIndex]       = useState(0);
  const [rightPanel, setRightPanel]         = useState('templates');
  const [capturing, setCapturing]           = useState(false);
  const previewRef = useRef(null);

  const screens = selectedTemplate?.screens || [];

  const handleFile = useCallback((key, file) => {
    if (!file) return;
    setBrand(b => ({ ...b, [key]: URL.createObjectURL(file) }));
  }, []);

  const capture = useCallback(async (idx) => {
    setScreenIndex(idx);
    await new Promise(r => setTimeout(r, 400));
    const h2c = (await import('html2canvas')).default;
    return h2c(previewRef.current, {
      scale:2, useCORS:true, allowTaint:true,
      backgroundColor:'#f0f2f5', width:1200, height:900,
      windowWidth:1200, windowHeight:900,
    });
  }, []);

  const downloadCurrent = useCallback(async () => {
    setCapturing(true);
    try {
      const canvas = await capture(screenIndex);
      const a = document.createElement('a');
      a.download = `${brand.company.replace(/\s+/g,'_')}_${screens[screenIndex]?.id||screenIndex}.png`;
      a.href = canvas.toDataURL('image/png'); a.click();
    } catch(e) { alert(e.message); }
    setCapturing(false);
  }, [brand.company, screenIndex, screens, capture]);

  const downloadAll = useCallback(async () => {
    setCapturing(true);
    try {
      for (let i=0; i<screens.length; i++) {
        const canvas = await capture(i);
        const a = document.createElement('a');
        a.download = `${brand.company.replace(/\s+/g,'_')}_${screens[i].id}.png`;
        a.href = canvas.toDataURL('image/png'); a.click();
        await new Promise(r => setTimeout(r, 200));
      }
    } catch(e) { alert(e.message); }
    setCapturing(false);
  }, [brand.company, screens, capture]);

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', overflow:'hidden' }}>

      {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
      <div style={{ width:272, background:'white', borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column', flexShrink:0, overflow:'hidden' }}>
        <div style={{ padding:'14px 18px 10px', borderBottom:'1px solid #f0f0f0', flexShrink:0 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#111' }}>Portal Generator</div>
          <div style={{ fontSize:10, color:'#888' }}>Avature mockups · brand-driven</div>
        </div>

        <div style={{ flex:1, overflow:'auto', padding:'12px 18px' }}>

          <Sec title="Company">
            <Fld label="Company name"><input value={brand.company} onChange={e=>setBrand(b=>({...b,company:e.target.value}))} /></Fld>
            <Fld label="Manager name"><input value={brand.managerName} onChange={e=>setBrand(b=>({...b,managerName:e.target.value}))} /></Fld>
            <Fld label="Department"><input value={brand.department} onChange={e=>setBrand(b=>({...b,department:e.target.value}))} /></Fld>
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

        <div style={{ padding:'10px 18px 14px', borderTop:'1px solid #f0f0f0', flexShrink:0 }}>
          <button onClick={downloadCurrent} disabled={capturing||!selectedTemplate} style={{ width:'100%', background:brand.primary, color:'white', border:'none', borderRadius:6, padding:'9px 0', fontSize:12, fontWeight:600, cursor:capturing?'not-allowed':'pointer', marginBottom:6, opacity:capturing||!selectedTemplate?0.6:1 }}>
            {capturing?'Capturing…':'📷 Screenshot this screen'}
          </button>
          <button onClick={downloadAll} disabled={capturing||!selectedTemplate} style={{ width:'100%', background:'white', color:brand.primary, border:`1.5px solid ${brand.primary}`, borderRadius:6, padding:'8px 0', fontSize:12, fontWeight:600, cursor:capturing?'not-allowed':'pointer', opacity:capturing||!selectedTemplate?0.6:1 }}>
            {capturing?'Capturing…':`📦 Download all ${screens.length} screens`}
          </button>
        </div>
      </div>

      {/* ── CENTRE: SCREEN TABS + PREVIEW ────────────────────── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <div style={{ display:'flex', background:'white', borderBottom:'1px solid #e5e7eb', padding:'0 14px', flexShrink:0, alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', overflow:'auto' }}>
            {screens.map((s,i) => (
              <button key={s.id} onClick={()=>{ setScreenIndex(i); setRightPanel('preview'); }} style={{ fontSize:12, padding:'12px 13px', border:'none', background:'none', cursor:'pointer', whiteSpace:'nowrap', fontWeight:screenIndex===i&&rightPanel==='preview'?600:400, color:screenIndex===i&&rightPanel==='preview'?brand.primary:'#555', borderBottom:screenIndex===i&&rightPanel==='preview'?`2.5px solid ${brand.primary}`:'2.5px solid transparent' }}>
                {s.label}
              </button>
            ))}
            {!selectedTemplate && <span style={{ fontSize:11, color:'#bbb', padding:'14px 10px' }}>← choose a template</span>}
          </div>
          <button onClick={()=>setRightPanel(p=>p==='templates'?'preview':'templates')} style={{ fontSize:11, padding:'6px 13px', border:`1.5px solid ${rightPanel==='templates'?brand.primary:'#ddd'}`, borderRadius:20, background:rightPanel==='templates'?brand.primary:'white', color:rightPanel==='templates'?'white':'#555', cursor:'pointer', fontWeight:600, flexShrink:0, marginLeft:8 }}>
            📚 Templates{rightPanel==='templates'?' ↑':' ↓'}
          </button>
        </div>

        <div style={{ flex:1, overflow:'auto', padding:20, background:'#e8eaed', display:'flex', justifyContent:'center' }}>
          <div
            ref={previewRef}
            style={{ width:1200, height:900, boxShadow:'0 8px 32px rgba(0,0,0,0.18)', borderRadius:8, overflow:'hidden', transform:'scale(0.72)', transformOrigin:'top center', marginBottom:-252, display:'flex', flexDirection:'column', background:'white' }}
          >
            {selectedTemplate
              ? <PortalScreen brand={brand} template={selectedTemplate} screenIndex={screenIndex} />
              : <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, color:'#aaa' }}>
                  <div style={{ fontSize:32 }}>📚</div>
                  <div style={{ fontSize:16, fontWeight:600 }}>Select a template to begin</div>
                  <div style={{ fontSize:12 }}>Click "Templates" in the top-right to browse layouts</div>
                </div>
            }
          </div>
        </div>
      </div>

      {/* ── RIGHT: TEMPLATE LIBRARY ───────────────────────────── */}
      {rightPanel==='templates' && (
        <div style={{ width:380, borderLeft:'1px solid #e5e7eb', flexShrink:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <TemplateLibrary
            brand={brand}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={t => { setSelectedTemplate(t); setScreenIndex(0); setRightPanel('preview'); }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Sidebar helpers ──────────────────────────────────────────────────────────
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
