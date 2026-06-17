import React, { useState, useRef } from 'react';
import { TEMPLATE_CATEGORIES, BUILTIN_TEMPLATES } from './PortalTemplates';

function CatBadge({ category }) {
  const cat = TEMPLATE_CATEGORIES.find(c => c.id === category) || { label: category, icon: '📁' };
  const colors = {
    fieldmanager: ['#e8f5e9','#2e7d32'],
    careers:      ['#e3f2fd','#1565c0'],
    onboarding:   ['#fff3e0','#e65100'],
    mobility:     ['#f3e5f5','#7b1fa2'],
    hrm:          ['#e0f2f1','#00695c'],
    events:       ['#fce4ec','#c62828'],
  };
  const [bg, col] = colors[category] || ['#f5f5f5','#424242'];
  return (
    <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: bg, color: col, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {cat.icon} {cat.label}
    </span>
  );
}

// Thumbnail — pure layout sketch using brand colours
function LayoutSketch({ template, brand }) {
  const p = brand?.primary || '#1a56db';
  const a = brand?.accent  || '#f5a623';

  // Different sketch shapes per category
  const sketches = {
    fieldmanager: (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
        {/* header */}
        <rect x="0" y="0" width="200" height="18" fill={p} rx="0"/>
        {/* hero */}
        <rect x="0" y="18" width="200" height="30" fill={p} opacity="0.25"/>
        <rect x="10" y="26" width="60" height="8" fill={p} opacity="0.7" rx="2"/>
        <rect x="10" y="36" width="40" height="5" fill={a} opacity="0.8" rx="2"/>
        {/* kpi row */}
        {[0,1,2,3,4].map(i => <rect key={i} x={10+i*38} y="54" width="33" height="18" fill={p} opacity="0.12" rx="2"/>)}
        {[0,1,2,3,4].map(i => <rect key={i} x={18+i*38} y="58" width="16" height="6" fill={p} opacity="0.4" rx="1"/>)}
        {/* table */}
        <rect x="10" y="78" width="180" height="7" fill={p} opacity="0.15" rx="1"/>
        <rect x="10" y="87" width="180" height="6" fill={p} opacity="0.08" rx="1"/>
        <rect x="10" y="95" width="180" height="6" fill={p} opacity="0.08" rx="1"/>
        <rect x="10" y="103" width="180" height="6" fill={p} opacity="0.08" rx="1"/>
        {/* footer */}
        <rect x="0" y="114" width="200" height="6" fill={p} opacity="0.5"/>
      </svg>
    ),
    careers: (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="200" height="16" fill={p} rx="0"/>
        <rect x="0" y="16" width="200" height="38" fill={p} opacity="0.2"/>
        <rect x="50" y="24" width="100" height="10" fill={p} opacity="0.6" rx="2"/>
        <rect x="30" y="37" width="140" height="10" fill="white" opacity="0.9" rx="3"/>
        {/* job cards */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={10+i*62} y="62" width="56" height="32" fill={p} opacity="0.08" rx="3"/>
            <rect x={15+i*62} y="67" width="36" height="5" fill={p} opacity="0.4" rx="1"/>
            <rect x={15+i*62} y="75" width="28" height="4" fill={p} opacity="0.2" rx="1"/>
            <rect x={15+i*62} y="85" width="22" height="5" fill={a} opacity="0.7" rx="2"/>
          </g>
        ))}
        <rect x="0" y="112" width="200" height="8" fill={p} opacity="0.5"/>
      </svg>
    ),
    onboarding: (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="200" height="16" fill={p} rx="0"/>
        <rect x="0" y="16" width="200" height="28" fill={p} opacity="0.2"/>
        <rect x="10" y="22" width="80" height="10" fill={p} opacity="0.6" rx="2"/>
        {/* progress bar */}
        <rect x="10" y="50" width="180" height="6" fill={p} opacity="0.12" rx="3"/>
        <rect x="10" y="50" width="110" height="6" fill={p} opacity="0.6" rx="3"/>
        {[0,1,2,3,4].map(i => <circle key={i} cx={10+i*45} cy="53" r="5" fill={i<3?p:'white'} stroke={p} strokeWidth="1.5"/>)}
        {/* task list */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x="10" y={65+i*12} width="10" height="10" fill={i<2?p:'white'} stroke={p} strokeWidth="1" rx="2"/>
            <rect x="26" y={68+i*12} width={60+i*10} height="5" fill={p} opacity="0.3" rx="1"/>
          </g>
        ))}
        <rect x="0" y="112" width="200" height="8" fill={p} opacity="0.5"/>
      </svg>
    ),
    mobility: (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="200" height="16" fill={p} rx="0"/>
        <rect x="0" y="16" width="200" height="28" fill={p} opacity="0.2"/>
        <rect x="10" y="22" width="100" height="10" fill={p} opacity="0.6" rx="2"/>
        {/* role cards */}
        {[0,1].map(i => (
          <g key={i}>
            <rect x={10+i*95} y="52" width="88" height="50" fill={p} opacity="0.08" rx="3"/>
            <rect x={16+i*95} y="58" width="50" height="6" fill={p} opacity="0.5" rx="1"/>
            <rect x={16+i*95} y="67" width="36" height="4" fill={p} opacity="0.25" rx="1"/>
            <rect x={16+i*95} y="74" width="28" height="4" fill={p} opacity="0.2" rx="1"/>
            <rect x={16+i*95} y="83" width="40" height="14" fill={a} opacity="0.6" rx="3"/>
            <rect x={23+i*95} y="87" width="26" height="5" fill="white" opacity="0.9" rx="1"/>
          </g>
        ))}
        <rect x="0" y="112" width="200" height="8" fill={p} opacity="0.5"/>
      </svg>
    ),
    hrm: (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="200" height="16" fill={p} rx="0"/>
        <rect x="0" y="16" width="200" height="20" fill={p} opacity="0.2"/>
        {/* two col */}
        <rect x="10" y="42" width="120" height="65" fill={p} opacity="0.06" rx="3"/>
        <rect x="138" y="42" width="52" height="65" fill={p} opacity="0.06" rx="3"/>
        {[0,1,2,3].map(i => <rect key={i} x="16" y={48+i*14} width={50+i*10} height="8" fill={p} opacity="0.2" rx="1"/>)}
        <rect x="144" y="48" width="40" height="18" fill={a} opacity="0.6" rx="3"/>
        <rect x="144" y="72" width="40" height="14" fill={p} opacity="0.2" rx="3"/>
        <rect x="0" y="112" width="200" height="8" fill={p} opacity="0.5"/>
      </svg>
    ),
    events: (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="200" height="16" fill={p} rx="0"/>
        <rect x="0" y="16" width="200" height="22" fill={p} opacity="0.2"/>
        <rect x="10" y="44" width="180" height="8" fill={p} opacity="0.15" rx="2"/>
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x="10" y={58+i*18} width="22" height="12" fill={a} opacity="0.7" rx="2"/>
            <rect x="38" y={60+i*18} width="80" height="5" fill={p} opacity="0.4" rx="1"/>
            <rect x="38" y={67+i*18} width="50" height="4" fill={p} opacity="0.2" rx="1"/>
            <rect x="160" y={60+i*18} width="30" height="8" fill={p} opacity="0.15" rx="2"/>
          </g>
        ))}
        <rect x="0" y="112" width="200" height="8" fill={p} opacity="0.5"/>
      </svg>
    ),
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {sketches[template.category] || sketches.fieldmanager}
    </div>
  );
}

function TemplateCard({ tmpl, brand, selected, onSelect, onDelete, isUploaded }) {
  const p = brand?.primary || '#1a56db';
  return (
    <div
      onClick={() => onSelect(tmpl)}
      style={{
        border: `${selected ? 2 : 1.5}px solid ${selected ? p : '#e5e7eb'}`,
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: 'white',
        boxShadow: selected ? `0 0 0 3px ${p}22` : 'none',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 96, background: '#fafafa', borderBottom: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden' }}>
        {isUploaded
          // Uploaded: show the screenshot but REPLACE header/footer with branded version
          ? <UploadedThumbnail tmpl={tmpl} brand={brand} />
          : <LayoutSketch template={tmpl} brand={brand} />
        }
        <div style={{ position: 'absolute', top: 5, right: 5 }}>
          <CatBadge category={tmpl.category} />
        </div>
        {isUploaded && onDelete && (
          <button
            onClick={e => { e.stopPropagation(); onDelete(tmpl.id); }}
            style={{ position: 'absolute', top: 4, left: 4, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
        )}
      </div>
      <div style={{ padding: '9px 11px 10px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#111', marginBottom: 3, lineHeight: 1.3 }}>{tmpl.label}</div>
        <div style={{ fontSize: 10, color: '#888', lineHeight: 1.4, marginBottom: 6 }}>{tmpl.description}</div>
        {tmpl.nav && (
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {tmpl.nav.slice(0,4).map(n => (
              <span key={n} style={{ fontSize: 9, padding: '1px 6px', background: '#f5f5f5', borderRadius: 10, color: '#666' }}>
                {n.replace('{company}', brand?.company || 'Company')}
              </span>
            ))}
            {tmpl.nav.length > 4 && <span style={{ fontSize: 9, color: '#aaa' }}>+{tmpl.nav.length - 4}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// Uploaded thumbnail: shows screenshot with brand header/footer overlaid
function UploadedThumbnail({ tmpl, brand }) {
  const p = brand?.primary || '#1a56db';
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={tmpl.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      {/* Brand header strip over the screenshot */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: p, display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
        {brand?.logoUrl
          ? <img src={brand.logoUrl} alt="" style={{ height: 10, objectFit: 'contain', filter: 'brightness(10)' }} />
          : <span style={{ fontSize: 7, fontWeight: 700, color: 'white' }}>{brand?.company || 'Company'}</span>
        }
      </div>
      {/* Brand footer strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: p, borderTop: `1.5px solid ${p}` }} />
    </div>
  );
}

// Upload + tag modal
function TagModal({ tmpl, brand, onSave, onCancel }) {
  const [label, setLabel] = useState(tmpl.fileName?.replace(/\.[^.]+$/, '') || '');
  const [category, setCategory] = useState('fieldmanager');
  const [notes, setNotes] = useState('');
  const p = brand?.primary || '#1a56db';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', borderRadius: 12, padding: 24, width: 420, boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 3 }}>Tag this template</div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 14 }}>The layout structure will be used — your brand colours and logo are applied automatically</div>

        <img src={tmpl.imageUrl} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', objectPosition: 'top', borderRadius: 6, marginBottom: 14, border: '1px solid #eee' }} />

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 3, fontWeight: 500 }}>Template name</label>
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Standard Bank Careers Site" style={{ width: '100%', fontSize: 13, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 3, fontWeight: 500 }}>Portal type</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', fontSize: 13, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6 }}>
            {TEMPLATE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 3, fontWeight: 500 }}>Notes (optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Standard Bank ATS — note the three-column applicant view..." rows={2} style={{ width: '100%', fontSize: 12, padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6, resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>

        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 6, padding: '8px 12px', marginBottom: 16, fontSize: 11, color: '#0369a1' }}>
          💡 Brand colours, logo and fonts from your brand settings will be applied — the screenshot is used for layout reference only
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ fontSize: 13, padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, background: 'white', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave({ ...tmpl, label, category, notes })} disabled={!label.trim()} style={{ fontSize: 13, padding: '8px 16px', border: 'none', borderRadius: 6, background: p, color: 'white', cursor: label.trim() ? 'pointer' : 'not-allowed', fontWeight: 600, opacity: label.trim() ? 1 : 0.5 }}>Save template</button>
        </div>
      </div>
    </div>
  );
}

function DropZone({ onFiles }) {
  const [over, setOver] = useState(false);
  const ref = useRef();
  const handle = files => Array.from(files).filter(f => f.type.startsWith('image/')).forEach(f => {
    onFiles({ imageUrl: URL.createObjectURL(f), fileName: f.name, id: Date.now() + Math.random() });
  });
  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
      onClick={() => ref.current?.click()}
      style={{ border: `1.5px dashed ${over ? '#1a56db' : '#d1d5db'}`, borderRadius: 8, padding: '18px 14px', textAlign: 'center', cursor: 'pointer', background: over ? '#eff6ff' : '#fafafa', transition: 'all 0.15s' }}
    >
      <div style={{ fontSize: 20, marginBottom: 5 }}>📸</div>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#555', marginBottom: 2 }}>Drop portal screenshots here</div>
      <div style={{ fontSize: 10, color: '#999' }}>PNG or JPG · drag multiple files or click to browse</div>
      <input ref={ref} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handle(e.target.files)} />
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default function TemplateLibrary({ brand, selectedTemplate, onSelectTemplate }) {
  const [userTemplates, setUserTemplates] = useState([]);
  const [pending, setPending] = useState([]);
  const [filterCat, setFilterCat] = useState('all');

  const handleUpload = f => setPending(p => [...p, f]);
  const handleTagSave = tagged => {
    setUserTemplates(p => [...p, tagged]);
    setPending(p => p.filter(x => x.id !== tagged.id));
  };
  const handleTagCancel = id => setPending(p => p.filter(x => x.id !== id));
  const handleDelete = id => {
    setUserTemplates(p => p.filter(t => t.id !== id));
    if (selectedTemplate?.id === id) onSelectTemplate(null);
  };

  const filteredBuiltin = BUILTIN_TEMPLATES.filter(t => filterCat === 'all' || t.category === filterCat);
  const filteredUser    = userTemplates.filter(t => filterCat === 'all' || t.category === filterCat);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white' }}>
      {/* Header */}
      <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 1 }}>Template Library</div>
        <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>Structure only — brand colours and logo applied automatically</div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {[{ id: 'all', label: 'All', icon: '' }, ...TEMPLATE_CATEGORIES].map(c => (
            <button key={c.id} onClick={() => setFilterCat(c.id)} style={{
              fontSize: 10, padding: '3px 8px', borderRadius: 20, border: '1px solid',
              cursor: 'pointer', fontWeight: filterCat === c.id ? 700 : 400,
              background: filterCat === c.id ? '#111' : 'white',
              color: filterCat === c.id ? 'white' : '#555',
              borderColor: filterCat === c.id ? '#111' : '#ddd',
              whiteSpace: 'nowrap',
            }}>{c.icon} {c.label}</button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 18px' }}>

        {/* Upload zone */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Upload your own</div>
          <DropZone onFiles={handleUpload} />
        </div>

        {/* Selected indicator */}
        {selectedTemplate && (
          <div style={{ marginBottom: 14, padding: '8px 12px', background: '#f0fdf4', borderRadius: 6, border: `1px solid ${brand?.primary || '#1a56db'}44`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: brand?.primary || '#1a56db' }}>Active: {selectedTemplate.label}</div>
              <div style={{ fontSize: 10, color: '#666' }}>Layout in use · brand colours applied</div>
            </div>
            <button onClick={() => onSelectTemplate(null)} style={{ fontSize: 10, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}>✕ clear</button>
          </div>
        )}

        {/* User uploads */}
        {filteredUser.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Your uploads ({filteredUser.length})</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {filteredUser.map(t => (
                <TemplateCard key={t.id} tmpl={t} brand={brand} selected={selectedTemplate?.id === t.id} onSelect={onSelectTemplate} onDelete={handleDelete} isUploaded />
              ))}
            </div>
          </div>
        )}

        {/* Built-in */}
        {filteredBuiltin.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Built-in layouts ({filteredBuiltin.length})</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {filteredBuiltin.map(t => (
                <TemplateCard key={t.id} tmpl={t} brand={brand} selected={selectedTemplate?.id === t.id} onSelect={onSelectTemplate} isUploaded={false} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tag modal */}
      {pending[0] && <TagModal tmpl={pending[0]} brand={brand} onSave={handleTagSave} onCancel={() => handleTagCancel(pending[0].id)} />}
    </div>
  );
}
