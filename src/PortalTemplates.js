// Templates define STRUCTURE ONLY — nav, sections, widgets, content areas.
// All colours, typography, logo, banner = driven by brand settings.

export const TEMPLATE_CATEGORIES = [
  { id: 'fieldmanager', label: 'Field Manager',     icon: '👥' },
  { id: 'careers',      label: 'Careers Site',       icon: '🌐' },
  { id: 'onboarding',   label: 'Onboarding Portal',  icon: '🚀' },
  { id: 'mobility',     label: 'Internal Mobility',  icon: '🔄' },
  { id: 'hrm',          label: 'HCM / HRM',          icon: '🏢' },
  { id: 'events',       label: 'Events Portal',       icon: '📅' },
];

// Layout widget types — tell the renderer what to put in each section
export const WIDGET_TYPES = {
  KPI_ROW:       'kpi_row',
  DATA_TABLE:    'data_table',
  STAT_ROW:      'stat_row',
  HERO_BANNER:   'hero_banner',
  PAGE_HERO:     'page_hero',
  PIPELINE_TABS: 'pipeline_tabs',
  FILTER_ROW:    'filter_row',
  CANDIDATE_ROW: 'candidate_row',
  TASK_LIST:     'task_list',
  JOB_SEARCH:    'job_search',
  JOB_CARDS:     'job_cards',
  PROFILE_TWO_COL: 'profile_two_col',
  WELCOME_CARD:  'welcome_card',
  PROGRESS_BAR:  'progress_bar',
  TEAM_GRID:     'team_grid',
  EVENTS_LIST:   'events_list',
  SKILLS_TAGS:   'skills_tags',
  NOTIFICATION_FEED: 'notification_feed',
};

// Each template defines:
//   id, category, label, description
//   nav: array of nav item labels (first = active home screen)
//   screens: array of screen defs, each with a label and widgets[]
export const BUILTIN_TEMPLATES = [

  // ── FIELD MANAGER ──────────────────────────────────────────────────────────
  {
    id: 'fieldmanager-standard',
    category: 'fieldmanager',
    label: 'Field Manager — Standard',
    description: 'Hiring manager portal with dashboard, applicant pipeline and candidate review',
    nav: ['Dashboard','Applicants','Jobs','Talent pool','Reports'],
    screens: [
      {
        id: 'dashboard', label: 'Dashboard',
        widgets: [
          { type: 'hero_banner', showManagerName: true, showCTA: ['New job','Submit a candidate'] },
          { type: 'kpi_row', items: ['Open jobs','Shortlisted','Interviewing','Active offers','Onboardings'] },
          { type: 'data_table', title: 'My open jobs', viewAll: true, columns: ['Job','Openings','Shortlisted','Interviewing','Offers','Onboarding'] },
          { type: 'stat_row', items: ['Avg response time','Candidates approved rate','Offer acceptance rate'] },
        ]
      },
      {
        id: 'applicants', label: 'Applicants',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Dashboard','Shortlisted'] },
          { type: 'pipeline_tabs', tabs: ['Shortlisted','Interviewing','Active offers','Onboardings','Not a fit','Withdrawn'] },
          { type: 'filter_row', filters: ['Search by name','Preferred shift','Availability','Skills'] },
          { type: 'data_table', columns: ['','Name','Current position','Employer','Applying to','Status','Action'], bulkAction: 'Mass Update' },
        ]
      },
      {
        id: 'auto-screened', label: 'Auto Screened',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Dashboard','Auto Screened'] },
          { type: 'pipeline_tabs', tabs: ['All','Progressed','Rejected','Under review'] },
          { type: 'filter_row', filters: ['Search by name','Role','Outcome'] },
          { type: 'auto_screened_table' },
        ]
      },
      {
        id: 'candidate', label: 'Candidate profile',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Dashboard','Shortlisted','Profile'] },
          { type: 'profile_two_col',
            left: ['basic_info','skills_analysis','ai_screening','ai_interview_questions'],
            right: ['match_score','more_candidates']
          },
        ]
      },
      {
        id: 'job', label: 'Job detail',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Dashboard','Open jobs','Job detail'] },
          { type: 'profile_two_col',
            left: ['job_info','pipeline_stats','required_skills','ai_sourcing'],
            right: ['job_actions','related_jobs']
          },
        ]
      },
    ]
  },

  {
    id: 'fieldmanager-volume',
    category: 'fieldmanager',
    label: 'Field Manager — Volume Hiring',
    description: 'High-volume hiring focus with batch actions, group scheduling and availability filters',
    nav: ['Dashboard','Applicants','Schedule','Reports'],
    screens: [
      {
        id: 'dashboard', label: 'Dashboard',
        widgets: [
          { type: 'hero_banner', showManagerName: true, showCTA: ['Post new role','Bulk import'] },
          { type: 'kpi_row', items: ['Open roles','Total pipeline','Interviews today','Offers out','Starts this week'] },
          { type: 'data_table', title: 'Active requisitions', columns: ['Role','Location','Pipeline','This week','SLA status'] },
          { type: 'notification_feed', title: 'Recent activity' },
        ]
      },
      {
        id: 'applicants', label: 'Applicants',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Dashboard','Applicants'] },
          { type: 'pipeline_tabs', tabs: ['New','Screened','Interview','Assessment','Offer','Onboarding','Rejected'] },
          { type: 'filter_row', filters: ['Search','Location','Availability','Shift preference','Skills'] },
          { type: 'data_table', columns: ['','Name','Role applied','Location','Availability','Score','Action'], bulkAction: 'Mass Update' },
        ]
      },
    ]
  },

  // ── CAREERS SITE ───────────────────────────────────────────────────────────
  {
    id: 'careers-standard',
    category: 'careers',
    label: 'Careers Site — Standard',
    description: 'Candidate-facing careers portal with job search, company story and application flow',
    nav: ['Home','Jobs','Life at {company}','Diversity','Early Careers'],
    screens: [
      {
        id: 'home', label: 'Home',
        widgets: [
          { type: 'hero_banner', showManagerName: false, showCTA: ['Search jobs','Learn more'], headline: 'Build your future with {company}' },
          { type: 'job_search', prominent: true },
          { type: 'kpi_row', items: ['Open roles','Countries','Employees','Awards'] },
          { type: 'job_cards', title: 'Featured roles', count: 6 },
        ]
      },
      {
        id: 'jobs', label: 'Job search',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Home','Jobs'] },
          { type: 'filter_row', filters: ['Keyword','Location','Department','Job type','Level'] },
          { type: 'data_table', columns: ['Job title','Department','Location','Type','Posted'], viewAll: false },
        ]
      },
      {
        id: 'apply', label: 'Job detail & Apply',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Home','Jobs','Job detail'] },
          { type: 'profile_two_col',
            left: ['job_description','requirements','benefits'],
            right: ['apply_cta','share','similar_roles']
          },
        ]
      },
    ]
  },

  {
    id: 'careers-early',
    category: 'careers',
    label: 'Careers Site — Early Careers',
    description: 'Graduate and apprenticeship portal with programme finder, events and application tracker',
    nav: ['Home','Programmes','Events','Application tracker','FAQs'],
    screens: [
      {
        id: 'home', label: 'Home',
        widgets: [
          { type: 'hero_banner', showManagerName: false, showCTA: ['Explore programmes','Upcoming events'], headline: 'Start your career at {company}' },
          { type: 'kpi_row', items: ['Programmes','Locations','Starters per year','Application rate'] },
          { type: 'job_cards', title: 'Our programmes', count: 4 },
          { type: 'events_list', title: 'Upcoming events', count: 3 },
        ]
      },
      {
        id: 'tracker', label: 'Application tracker',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Home','My application'] },
          { type: 'progress_bar', steps: ['Applied','Screening','Assessment','Interview','Offer'] },
          { type: 'profile_two_col',
            left: ['application_status','next_steps','documents'],
            right: ['your_recruiter','useful_links']
          },
        ]
      },
    ]
  },

  // ── ONBOARDING ─────────────────────────────────────────────────────────────
  {
    id: 'onboarding-standard',
    category: 'onboarding',
    label: 'Onboarding Portal — Standard',
    description: 'New joiner portal with welcome message, task checklist, team intro and company content',
    nav: ['Welcome','My tasks','My team','Resources','Benefits'],
    screens: [
      {
        id: 'welcome', label: 'Welcome',
        widgets: [
          { type: 'hero_banner', showManagerName: true, headline: 'Welcome to {company}', showCTA: [] },
          { type: 'progress_bar', label: 'Onboarding progress', steps: [] },
          { type: 'task_list', title: 'Complete before your first day', maxItems: 5 },
          { type: 'stat_row', items: ['Tasks complete','Days to start','Team members'] },
        ]
      },
      {
        id: 'tasks', label: 'My tasks',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Welcome','My tasks'] },
          { type: 'pipeline_tabs', tabs: ['To do','In progress','Complete','Overdue'] },
          { type: 'task_list', showDueDate: true, showCategory: true },
        ]
      },
      {
        id: 'team', label: 'My team',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Welcome','My team'] },
          { type: 'team_grid', showRole: true, showEmail: true },
        ]
      },
    ]
  },

  {
    id: 'onboarding-preboarding',
    category: 'onboarding',
    label: 'Onboarding Portal — Pre-boarding',
    description: 'Pre-start experience from offer accept to day one — documents, IT setup, meet the team',
    nav: ['Home','Documents','IT setup','Your team','FAQs'],
    screens: [
      {
        id: 'home', label: 'Home',
        widgets: [
          { type: 'hero_banner', showManagerName: true, headline: 'Your journey to {company} starts here', showCTA: ['Complete documents','Meet your team'] },
          { type: 'progress_bar', label: 'Pre-boarding checklist', steps: ['Offer accepted','Documents','IT setup','Meet team','Day one ready'] },
          { type: 'task_list', title: 'Action required', maxItems: 4 },
          { type: 'welcome_card', showManager: true },
        ]
      },
    ]
  },

  // ── INTERNAL MOBILITY ──────────────────────────────────────────────────────
  {
    id: 'mobility-marketplace',
    category: 'mobility',
    label: 'Internal Mobility — Talent Marketplace',
    description: 'Employee-facing internal job board with skills matching, mentoring and project opportunities',
    nav: ['Discover','Jobs','Mentoring','Projects','My profile'],
    screens: [
      {
        id: 'discover', label: 'Discover',
        widgets: [
          { type: 'hero_banner', showManagerName: true, headline: 'Where do you want to go next?', showCTA: ['Explore roles','Update my skills'] },
          { type: 'kpi_row', items: ['Matching roles','Open projects','Available mentors','Skills to develop'] },
          { type: 'job_cards', title: 'Recommended for you', count: 4 },
        ]
      },
      {
        id: 'roles', label: 'Internal roles',
        widgets: [
          { type: 'page_hero', breadcrumb: ['Discover','Internal roles'] },
          { type: 'filter_row', filters: ['Search','Department','Location','Level','Skills match'] },
          { type: 'data_table', columns: ['Role','Department','Location','Match %','Posted','Action'] },
        ]
      },
    ]
  },

  // ── HCM ───────────────────────────────────────────────────────────────────
  {
    id: 'hrm-employee',
    category: 'hrm',
    label: 'HCM — Employee Self Service',
    description: 'Employee portal for profile management, leave requests, documents and HR communications',
    nav: ['My profile','Time & Leave','Documents','HR Requests','News'],
    screens: [
      {
        id: 'profile', label: 'My profile',
        widgets: [
          { type: 'hero_banner', showManagerName: true, headline: '', showCTA: ['Edit profile','Download CV'] },
          { type: 'profile_two_col',
            left: ['personal_info','employment_info','skills_tags'],
            right: ['quick_actions','upcoming_leave','documents']
          },
        ]
      },
    ]
  },

  // ── EVENTS ────────────────────────────────────────────────────────────────
  {
    id: 'events-recruitment',
    category: 'events',
    label: 'Events Portal — Recruitment',
    description: 'Candidate-facing events portal for careers fairs, open days and virtual assessment centres',
    nav: ['Events','My registrations','Past events','Contact'],
    screens: [
      {
        id: 'events', label: 'Events',
        widgets: [
          { type: 'hero_banner', showManagerName: false, headline: '{company} Events & Careers Fairs', showCTA: ['Browse events'] },
          { type: 'filter_row', filters: ['Search','Event type','Location','Date','Audience'] },
          { type: 'events_list', showDate: true, showLocation: true, showSpaces: true, count: 6 },
        ]
      },
    ]
  },
];
