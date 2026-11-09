// All website content lives in this file.
// To update the site, edit the text here — the components read from it.

/* ---------- Types ---------- */

export type WaveKind = "voice" | "text" | "eeg" | "dna" | "sign" | "map";

export type Work = {
  id: string;
  kind: string;
  org: string;
  orgFull: string;
  place: string;
  role: string;
  period: string;
  duration: string;
  bullets: string[];
  tags: string[];
  photos: string[]; // paths inside /public, e.g. "/images/work/aimp-1.jpg"
  photoCaption?: string;
};

export type Project = {
  id: string;
  genre: string;
  title: string;
  course: string;
  date: string;
  headline: string;
  headlineNote: string;
  steps: { text: string; tag: string }[];
  tools: string[];
  cover: { bg: string; ink: string; label: string; wave: WaveKind };
  codeUrl?: string;
  caseStudyUrl?: string;
};

export type Organization = {
  id: string;
  org: string;
  role: string;
  period: string;
  bullets: string[];
  photo?: string;
};

export type Committee = {
  role: string;
  event: string;
  period: string;
  detail: string;
};

export type Achievement = {
  tier: "PLATINUM" | "GOLD" | "SILVER";
  big: string;
  title: string;
  issuer: string;
  date: string;
  detail: string;
  shape: "star" | "circle" | "rect";
};

export type Skill = {
  name: string;
  use: string;
  projects: string[]; // project ids
  usedAt?: string;
};

/* ---------- Profile ---------- */

export const profile = {
  firstName: "Nadia",
  lastName: "Indriani Sumardi",
  fullName: "Nadia Indriani Sumardi",
  roles: "Aspiring Data Scientist · Data Analyst · AI Engineer",
  intro:
    "I build models that listen, read and see — and I care just as much about whether their numbers can be trusted.",
  location: "Makassar, Indonesia",
  email: "nadiaindriani1493@gmail.com",
  linkedin: "https://www.linkedin.com/in/nadia-indriani-sumardi/",
  github: "https://github.com/nanadiaa14",
  cvUrl: "/cv.pdf",
  photo: "", // e.g. "/images/profile.jpg"
  coverImage: "/images/album-cover.png",
};

/* ---------- Navigation ---------- */

export const sections = [
  { id: "work", no: "01", label: "work", title: "Work Experience" },
  { id: "projects", no: "02", label: "projects", title: "Projects" },
  { id: "organizations", no: "03", label: "organizations", title: "Organizational Experience" },
  { id: "achievements", no: "04", label: "achievements", title: "Achievements" },
  { id: "about", no: "05", label: "about", title: "About me & Skills" },
  { id: "contact", no: "06", label: "contact", title: "Contact" },
];

/* ---------- Work experience ---------- */

export const work: Work[] = [
  {
    id: "aimp",
    kind: "Research · Part-time",
    org: "AIMP Research Group",
    orgFull: "AIMP Research Group, Universitas Hasanuddin",
    place: "Universitas Hasanuddin, Makassar",
    role: "Project Assistant",
    period: "Sep 2024 – Apr 2026",
    duration: "19 months",
    bullets: [
      "Assisted research projects in Artificial Intelligence.",
      "Worked with the team on research administration — financial documents, reports and documentation.",
    ],
    tags: ["AI research", "Research admin", "Financial documents", "Documentation"],
    photos: [],
  },
  {
    id: "brida",
    kind: "Internship",
    org: "BRIDA Makassar",
    orgFull: "BRIDA Makassar",
    place: "Makassar",
    role: "Software Engineering Intern",
    period: "Jan – Apr 2026",
    duration: "4 months",
    bullets: [
      "Built, as part of a team, an innovation-consultation submission system for BRIDA Makassar.",
      "Contributed to backend development in Laravel, including database integration.",
    ],
    tags: ["Laravel", "PHP", "Database integration", "Teamwork"],
    photos: [],
  },
];

/* ---------- Projects ---------- */

export const projects: Project[] = [
  {
    id: "ser",
    genre: "Audio",
    title: "Speech Emotion Recognition",
    course: "Special Topics in AI",
    date: "Apr 2026",
    headline: "> 98%",
    headlineNote: "accuracy for both models — then I checked why.",
    steps: [
      { text: "Extract MFCC, Chroma and Mel-spectrogram features from the TESS dataset", tag: "3 features" },
      { text: "Train an SVM baseline and a CNN-LSTM", tag: "2 models" },
      { text: "Both models score above 98% accuracy", tag: "> 98%" },
      { text: "Flag speaker-identity leakage as a validity concern", tag: "caveat" },
    ],
    tools: ["Python", "TensorFlow", "Keras", "librosa", "scikit-learn", "SHAP"],
    cover: { bg: "#EC4899", ink: "#231920", label: "#231920", wave: "voice" },
  },
  {
    id: "hate",
    genre: "NLP",
    title: "Hate Speech Classification on Indonesian Twitter",
    course: "Natural Language Processing",
    date: "May – Jun 2026",
    headline: "7 labels",
    headlineNote: "individual, group, religion, race, physical, gender, other.",
    steps: [
      { text: "Frame it as multi-label classification across 7 categories", tag: "7 labels" },
      { text: "Baseline: SVM with TF-IDF", tag: "baseline" },
      { text: "Compare Attention-BiLSTM, TextGCN and IndoBERT", tag: "3 models" },
      { text: "Measure whether complex architectures beat the baseline", tag: "[result]" },
    ],
    tools: ["Python", "PyTorch", "PyTorch Geometric", "HuggingFace", "Sastrawi", "scikit-learn"],
    cover: { bg: "#FDF8F9", ink: "#BE185D", label: "#EC4899", wave: "text" },
  },
  {
    id: "eeg",
    genre: "Signal",
    title: "EEG-Based Attention Span Analysis",
    course: "Special Topics in AI",
    date: "May – Jun 2026",
    headline: "4 of 6",
    headlineNote: "subjects showed clear right-hemisphere dominance.",
    steps: [
      { text: "Record EEG from prefrontal channels AF7 & AF8 during video-watching", tag: "6 subjects" },
      { text: "Compute the Theta/Alpha power ratio as a Cognitive Load Index", tag: "θ / α" },
      { text: "Test left–right hemisphere differences statistically", tag: "stats" },
      { text: "Find clear right-hemisphere dominance", tag: "4 of 6" },
    ],
    tools: ["Python", "NumPy", "pandas", "matplotlib"],
    cover: { bg: "#CBD5E1", ink: "#231920", label: "#EC4899", wave: "eeg" },
  },
  {
    id: "apoe",
    genre: "Bio",
    title: "APOE ε3 vs ε4 DNA Sequence Analysis",
    course: "Biomedical Computing",
    date: "Oct 2025",
    headline: "91.96%",
    headlineNote: "nucleotide similarity between the two alleles.",
    steps: [
      { text: "Align the alleles globally with Needleman–Wunsch", tag: "N–W" },
      { text: "Measure nucleotide similarity between ε3 and ε4", tag: "91.96%" },
      { text: "Pinpoint the critical SNP at position 388", tag: "TGC → CGC" },
      { text: "Trace it to the Cys112Arg substitution", tag: "Cys112Arg" },
    ],
    tools: ["Python", "Biopython", "matplotlib"],
    cover: { bg: "#2E2129", ink: "#F9A8D4", label: "#F9A8D4", wave: "dna" },
  },
  {
    id: "road",
    genre: "Vision",
    title: "Road Sign Detection",
    course: "Intelligent Transport System",
    date: "Sep 2025",
    headline: "YOLO",
    headlineNote: "object detection for road signs.",
    steps: [
      { text: "Manage and annotate the dataset in Roboflow", tag: "[n images]" },
      { text: "Train a YOLO-based detector on road signs", tag: "YOLO" },
      { text: "Evaluate detection performance", tag: "[mAP@50]" },
    ],
    tools: ["YOLO", "Roboflow"],
    cover: { bg: "#FCD34D", ink: "#231920", label: "#231920", wave: "sign" },
  },
  {
    id: "crime",
    genre: "Data",
    title: "Spatial Analysis of Crime-Prone Areas in South Sulawesi",
    course: "Data Mining · GEMASTIK XVII",
    date: "Feb – Jun 2024",
    headline: "Team lead",
    headlineNote: "NLP + spatial analysis built from online news.",
    steps: [
      { text: "Lead the team", tag: "lead" },
      { text: "Web-crawl news articles from multiple online media", tag: "crawl" },
      { text: "Pre-process the text and build a CNN classifier", tag: "CNN" },
      { text: "Map crime reports across South Sulawesi", tag: "map" },
    ],
    tools: ["CNN", "Web crawling", "Spatial analysis"],
    cover: { bg: "#FBCFE8", ink: "#231920", label: "#BE185D", wave: "map" },
  },
];

/* ---------- Organizational experience ---------- */

export const organizations: Organization[] = [
  {
    id: "gdgoc",
    org: "Google Developer Groups on Campus UNHAS",
    role: "Event Organizer",
    period: "Sep 2025 – Aug 2026",
    bullets: [
      "Managed finances — budgeting, income and expenditures for GDGoC activities.",
      "Handled fundraising and sales, from preparation and production review to distribution.",
      "Kept transparent, well-documented financial records for accountability.",
    ],
  },
  {
    id: "mentor",
    org: "Mentor Academy FT-UH 2024",
    role: "Mentor",
    period: "Jul 2024 – Jul 2026",
    bullets: [
      "Guided first-year engineering students in academic and personal development.",
      "Event organizer for PKKMB FT-UH, Dies Natalis and an International Conference.",
      "Tutored the next Mentor Academy cohort throughout their mentoring period.",
    ],
  },
  {
    id: "hmif",
    org: "HMIF FT-UH",
    role: "Member, Secretariat Department",
    period: "Sep 2024 – Jun 2025",
    bullets: ["Contributed to committees for HMIF programmes and events."],
  },
];

export const committees: Committee[] = [
  { role: "Treasurer", event: "Build with AI 2026", period: "Feb – May 2026", detail: "Represented GDG on Campus Universitas Hasanuddin in coordinating financial planning, sponsorships and ticketing logistics with other university chapters; managed cash flow and delivered clear financial reports." },
  { role: "Treasurer", event: "RITECH 2025", period: "Jul 2024 – Sep 2025", detail: "Managed financial transactions and budgeting for the international conference hosted by the Department of Informatics, Faculty of Engineering, Universitas Hasanuddin." },
  { role: "Secretary", event: "IC-REST 2025", period: "May – Aug 2025", detail: "Recorded meeting notes and event documentation; ensured every administrative requirement was complete, including the conference book and final activity report." },
  { role: "Finance Division", event: "RECURSION 1.0", period: "Nov 2024 – Apr 2025", detail: "PIC of the Merchandise sub-division: prepared merchandise for sale, participants, judges and committee, and tracked expenses, revenue and inventory in Microsoft Excel." },
  { role: "Treasurer", event: "DIGITS · HMIF FT-UH", period: "Dec 2024 – Apr 2025", detail: "Oversaw budget planning and financial reporting for the community service programme." },
  { role: "Event Division", event: "IC-REST 2024", period: "Aug – Sep 2024", detail: "Contributed to event conceptualisation and developed symbolic elements for the conference." },
  { role: "Fundraising", event: "Seminar Coder Institute 2024", period: "Jul – Oct 2024", detail: "Supported fundraising initiatives to secure resources for the event." },
  { role: "Consumption Staff", event: "PKKMB FT-UH 2024", period: "Jul – Aug 2024", detail: "Planned meal distribution for participants and committee, guided new students during orientation, and served as event crew." },
];

/* ---------- Achievements ---------- */

export const achievements: Achievement[] = [
  { tier: "PLATINUM", big: "1st Place", title: "Business Idea Competition: Sustainable Innovation with AI", issuer: "Telkom Regional V, Makassar", date: "Jan 2026", detail: "First-place winner of the team poster competition.", shape: "star" },
  { tier: "GOLD", big: "Awardee", title: "Beasiswa Bakti BCA", issuer: "Bakti BCA", date: "Jan – Dec 2025", detail: "Scholarship awardee; project secretary in a community-empowerment programme — notes, reports and letters.", shape: "circle" },
];

/* ---------- About ---------- */

export const about = {
  heading: "Half lab,",
  headingItalic: "half backstage.",
  paragraphs: [
    "I’m an Informatics student at Universitas Hasanuddin drawn to models that work with real-world signals — voices, brainwaves, tweets, DNA and traffic signs — and to checking whether their scores can be trusted.",
    "The other half of me works behind the scenes: I’ve managed finances for GDG on Campus, international conferences and community programmes, and mentored first-year engineering students.",
  ],
  education: [
    "Universitas Hasanuddin — Informatics, Faculty of Engineering · Aug 2023 – now · IPK 3.95",
    "SMAN 17 Makassar — Science · 2020 – 2023",
  ],
  languages: "Bahasa Indonesia (native) · English · Korean (elementary)",
  strengths: "Analytical thinking · Team collaboration",
};

/* ---------- Skills ---------- */

export const skills: Skill[] = [
    { name: "Python", use: "main language", projects: ["ser", "hate", "eeg", "apoe"] },
    { name: "Kaggle", use: "datasets & notebooks", projects: [] },
    { name: "Google Colab", use: "notebooks & GPU", projects: [] },
    { name: "GitHub", use: "version control", projects: [] },
    { name: "Roboflow", use: "data annotation", projects: ["road"] },
    { name: "Laravel", use: "backend framework", projects: [], usedAt: "BRIDA Makassar internship" },
    { name: "PHP", use: "backend language", projects: [], usedAt: "BRIDA Makassar internship (Laravel backend)" },
    { name: "HTML", use: "web structure", projects: [] },
    { name: "CSS", use: "web styling", projects: [] },
    { name: "Flutter", use: "mobile apps", projects: [] },
    { name: "Microsoft Office", use: "documents & spreadsheets", projects: [], usedAt: "RECURSION 1.0 — inventory tracking in Excel" },
    { name: "Google Workspace", use: "collaboration", projects: [] },
    { name: "Canva", use: "visual design", projects: [] },
    { name: "Figma", use: "UI design", projects: [] },
    { name: "Administrative & Financial Management", use: "budgeting & reports", projects: [], usedAt: "GDG on Campus UNHAS · AIMP Research Group · Build with AI 2026 · RITECH 2025 · DIGITS · RECURSION 1.0 · Beasiswa Bakti BCA" },
    { name: "Analytical Thinking", use: "soft skill", projects: [] },
    { name: "Team Collaboration", use: "soft skill", projects: [] },
  ];