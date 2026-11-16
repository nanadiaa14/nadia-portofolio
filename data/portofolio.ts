// All website content lives in this file.
// To update the site, edit the text here — the components read from it.

/* ---------- Types ---------- */

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
  course: string; // course or competition
  date: string;
  team: string; // "Solo project", "Team of 3", ...
  why: string; // the problem / motivation
  goal: string; // what the project set out to do
  steps: { text: string; tag: string }[]; // method, shown step by step
  headline: string; // the key result in a few characters
  headlineNote: string;
  result: string; // what came out of it, including limits
  contribution: string[]; // what I did
  tools: string[];
  cover: { image: string; label: string }; // image = preview in /public, label = colour of the disc centre
  figure?: { src: string; width: number; height: number; caption: string };
  codeUrl: string;
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
  cvUrl: "/CV_Nadia Indriani Sumardi_October 2026.pdf",
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
    id: "dehaze",
    genre: "Vision",
    title: "Single Image Dehazing with Dark Channel Prior",
    course: "Computer Vision",
    date: "Jun 2026",
    team: "Solo project",
    why: "Haze scatters light before it reaches the camera, so photos lose contrast, colours fade toward grey and details disappear.",
    goal: "Restore a hazy photo with the Dark Channel Prior (DCP), measure how each parameter changes the result, and find where the method stops working.",
    steps: [
      { text: "Try DCP first on a cloudy Sentinel-2 satellite image", tag: "satellite" },
      { text: "Switch to an outdoor photo after the satellite result came out too dark", tag: "outdoor" },
      { text: "Build the pipeline in MATLAB: dark channel, airlight, guided-filter transmission map, recovery", tag: "DCP" },
      { text: "Test patch size, ω, t_min and filter radius one at a time", tag: "4 parameters" },
    ],
    headline: "3.19 → 2.80",
    headlineNote: "NIQE score of the photo after tuning (lower means more natural).",
    result:
      "The tuned setting (patch 10, ω 1.0, radius 20) gave the most natural result, and entropy rose from 7.30 to 7.35. On the satellite image DCP failed: thick clouds pushed the estimated airlight to pure white, so the land turned black and entropy dropped from 6.58 to 5.86.",
    contribution: ["Solo project: implementation, experiments and write-up"],
    tools: ["MATLAB", "Image Processing Toolbox"],
    cover: { image: "/images/projects/dehazing.jpg", label: "#94A3B8" },
    figure: {
      src: "/images/projects/dehazing-pipeline.jpg",
      width: 1476,
      height: 640,
      caption: "Hazy input → dark channel → refined transmission map → dehazed result.",
    },
    codeUrl: "https://github.com/nanadiaa14/image-dehazing-dcp",
  },
  {
    id: "eeg",
    genre: "Signal",
    title: "EEG Cognitive Load While Watching a Video",
    course: "Special Topics in Artificial Intelligence",
    date: "May 2026",
    team: "Team of 2",
    why: "In the literature, a higher Theta/Alpha ratio over the forehead is linked to higher cognitive load. We wanted to see how it changes while people watch a motivational video.",
    goal: "Compare the ratio between the left (AF7) and right (AF8) sensors, between people, and against what was on screen.",
    steps: [
      { text: "Record 6 people for about 3 minutes each with a Muse headband", tag: "6 subjects" },
      { text: "Keep the band-power columns, fill gaps and shift values above zero", tag: "cleaning" },
      { text: "Average into 1-second windows and compute Theta / Alpha", tag: "θ / α" },
      { text: "Compare left vs right (Wilcoxon) and find moments everyone moved together", tag: "statistics" },
    ],
    headline: "5 of 6",
    headlineNote: "people had a higher Theta/Alpha ratio on the right side (AF8).",
    result:
      "The difference was significant for 4 people on their own, but across the group the trend is not yet significant (p = 0.06). Moments when all six rose together tended to fall on social or emotional scenes — a descriptive finding from only six people.",
    contribution: ["Observed the EEG recording sessions", "Wrote the analysis code and the report together with my teammate"],
    tools: ["Python", "pandas", "NumPy", "SciPy", "matplotlib"],
    cover: { image: "/images/projects/eeg-pattern.jpg", label: "#F9A8D4" },
    figure: {
      src: "/images/projects/eeg-moments.jpg",
      width: 1600,
      height: 677,
      caption: "Moments when all six people's ratios rose (green) or fell (red) together.",
    },
    codeUrl: "https://github.com/nanadiaa14/eeg-attention-theta-alpha-muse",
    caseStudyUrl: "https://github.com/nanadiaa14/eeg-attention-theta-alpha-muse/blob/main/report/Laporan%20EEG.pdf",
  },
  {
    id: "datasci",
    genre: "Data",
    title: "Four Data Science Case Studies with CRISP-DM",
    course: "Data Science",
    date: "Apr – May 2026",
    team: "Solo project",
    why: "The course asked us to go through the full CRISP-DM process — from the business question to evaluation — on different kinds of problems.",
    goal: "Apply clustering, classification, regression and association rules to four Kaggle datasets, writing two of the algorithms from scratch.",
    steps: [
      { text: "Group Korean dramas by popularity with K-Medoids", tag: "clustering" },
      { text: "Predict whether a Chicago crime ends in arrest with a tuned SVM", tag: "classification" },
      { text: "Predict cognitive scores with a Random Forest written from scratch", tag: "regression" },
      { text: "Find items bought together at a bakery with ECLAT, also from scratch", tag: "association" },
    ],
    headline: "R² 0.91",
    headlineNote: "from my from-scratch Random Forest on 16,000 test rows.",
    result:
      "K-Medoids found 3 clusters (silhouette 0.59). The SVM reached 0.69 accuracy and 0.70 ROC-AUC but still misses many arrests. ECLAT found 10 rules; the strongest was Toast → Coffee (lift 1.47).",
    contribution: ["Solo project: all four analyses, from data preparation to evaluation"],
    tools: ["Python", "pandas", "NumPy", "scikit-learn", "pyclustering", "Kaggle"],
    cover: { image: "/images/projects/ds-clusters.jpg", label: "#86EFAC" },
    figure: {
      src: "/images/projects/ds-four-methods.jpg",
      width: 1600,
      height: 1200,
      caption: "Clusters (PCA), SVM ROC curve, Random Forest predictions and the bakery rules.",
    },
    codeUrl: "https://github.com/nanadiaa14/data-science-crisp-dm",
  },
  {
    id: "ser",
    genre: "Audio",
    title: "Speech Emotion Recognition",
    course: "Special Topics in Artificial Intelligence",
    date: "Apr 2026",
    team: "Team of 3",
    why: "Emotion in speech can be recognised with a classic classifier on audio features or with a deep network. We wanted to see which works better on the same data, and what each one relies on.",
    goal: "Classify 7 emotions in the TESS dataset with an SVM baseline and a CNN-LSTM, then explain both with SHAP.",
    steps: [
      { text: "Extract MFCC, Chroma and Mel-spectrogram features from 2,800 clips", tag: "3 features" },
      { text: "Add noisy, stretched and pitch-shifted copies of each training clip", tag: "augmentation" },
      { text: "Split by original file so no copy of a test clip appears in training", tag: "no leakage" },
      { text: "Train the SVM and the CNN-LSTM, then explain them with SHAP", tag: "SHAP" },
    ],
    headline: "98.1%",
    headlineNote: "CNN-LSTM accuracy on 700 unseen clips (SVM: 96.3%).",
    result:
      "Most mistakes mixed up disgust and pleasant surprise, which have similar spectra. MFCC features had the most influence in both models. TESS has only two speakers, so these scores do not show how the models would do on new voices.",
    contribution: ["Extracted the MFCC features", "Built and compared the models together with the team"],
    tools: ["Python", "librosa", "TensorFlow", "Keras", "scikit-learn", "SHAP"],
    cover: { image: "/images/projects/ser-spectrogram.jpg", label: "#EC4899" },
    figure: {
      src: "/images/projects/ser-confusion.jpg",
      width: 1600,
      height: 639,
      caption: "Confusion matrices on 700 test clips. Most mistakes mix up disgust and pleasant surprise.",
    },
    codeUrl: "https://github.com/nanadiaa14/speech-emotion-recognition-tess",
  },
  {
    id: "queue",
    genre: "Simulation",
    title: "Supermarket Checkout Queue Simulation",
    course: "Modelling and Simulation",
    date: "Oct 2025",
    team: "Team of 5",
    why: "Checkout lines decide how comfortable and efficient a supermarket feels — long queues lower customer satisfaction.",
    goal: "Model the checkout area of a supermarket with 5 cashiers and test changes that could shorten waiting time.",
    steps: [
      { text: "Record arrival, service-start and service-end times of 161 customers over 92 minutes", tag: "field data" },
      { text: "Describe waiting and service times with frequency distributions", tag: "statistics" },
      { text: "Model the system as M/M/5 and simulate it in SimPy", tag: "M/M/5" },
      { text: "Test 4 or 6 cashiers, a rush hour and one shared queue", tag: "4 scenarios" },
    ],
    headline: "11.7 min",
    headlineNote: "average wait per customer measured on site, against 1.9 min of actual service.",
    result:
      "In the simulation, one shared queue for all cashiers gave the shortest waits. The simulated waits were much shorter than the observed ones, and that gap has not been analysed yet.",
    contribution: ["Field observation and data collection", "Statistical analysis of waiting and service times", "Report writing"],
    tools: ["Python", "SimPy", "pandas", "matplotlib"],
    cover: { image: "/images/projects/queue-sim.jpg", label: "#7DD3FC" },
    figure: {
      src: "/images/projects/queue-animation.jpg",
      width: 1380,
      height: 367,
      caption: "A frame from the simulation animation: each cashier with its own line.",
    },
    codeUrl: "https://github.com/nanadiaa14/supermarket_queue_simulation_analysis",
  },
  {
    id: "traffic",
    genre: "Vision",
    title: "Indonesian Traffic Sign Recognition",
    course: "Intelligent Transportation Systems",
    date: "Sep 2025",
    team: "Solo project",
    why: "Many road accidents involve drivers missing warning or prohibition signs. Driver-assistance systems need to read signs automatically, fast enough to run inside a car.",
    goal: "Detect and classify 5 common Indonesian traffic signs in real time.",
    steps: [
      { text: "Combine Indonesian sign datasets from Roboflow Universe and re-split them", tag: "1,589 images" },
      { text: "Fine-tune YOLOv8n for 100 epochs on a Kaggle T4 GPU", tag: "YOLOv8n" },
      { text: "Evaluate on a held-out test set of 68 images", tag: "test set" },
      { text: "Measure processing time per frame", tag: "speed" },
    ],
    headline: "99.5%",
    headlineNote: "mAP@50 on the test set, at 9.6 ms per frame (about 104 FPS).",
    result:
      "Precision 99.3%, recall 98.8% and mAP@50-95 73.3%. The test set is small and the model has only been tested on still images; voice alerts for drivers are planned but not built yet.",
    contribution: ["Solo project: dataset preparation, training and evaluation"],
    tools: ["Python", "YOLOv8", "PyTorch", "Roboflow", "Kaggle"],
    cover: { image: "/images/projects/traffic-sign.jpg", label: "#FCD34D" },
    figure: {
      src: "/images/projects/traffic-sign-curves.jpg",
      width: 1600,
      height: 800,
      caption: "Training and validation loss, precision, recall and mAP over 100 epochs.",
    },
    codeUrl: "https://github.com/nanadiaa14/indonesian-traffic-sign-recognition-yolov8",
  },
  {
    id: "crime",
    genre: "NLP · Map",
    title: "Mapping Crime-Prone Areas in South Sulawesi",
    course: "GEMASTIK XVII",
    date: "Feb – Jun 2024",
    team: "Team of 3 · team lead",
    why: "South Sulawesi had the 6th-highest number of crime cases in Indonesia in 2022. Patrols mostly rely on past case reports, while people report crimes faster on online and social media.",
    goal: "Classify crime news by type, location and time of day, then map which areas of South Sulawesi are crime-prone.",
    steps: [
      { text: "Crawl crime posts from Tribun Timur, Fajar, Instagram and X (Mar 2019 – Feb 2024)", tag: "1,303 posts" },
      { text: "Label crime type, district and time of day in Label Studio", tag: "7 crime types" },
      { text: "Train text CNNs across 25 filter and dropout settings", tag: "CNN" },
      { text: "Geocode the districts and map crime-prone areas in ArcGIS", tag: "map" },
    ],
    headline: "0.89",
    headlineNote: "best F1 for both crime type and location (time of day: 0.58).",
    result:
      "One model per label worked much better than one model for all labels (F1 0.58). Time of day stayed hard because only 262 posts mentioned it.",
    contribution: [
      "Led the team",
      "Crawled the news and social-media data",
      "Built and tuned the CNN models",
      "Labelled the data and wrote the report together with the team",
    ],
    tools: ["Python", "Keras", "Sastrawi", "BeautifulSoup", "Label Studio"],
    cover: { image: "/images/projects/crime-map.jpg", label: "#BE185D" },
    figure: {
      src: "/images/projects/crime-map-full.jpg",
      width: 693,
      height: 473,
      caption: "Districts that appear most often in crime news (red = crime-prone, above the 75th percentile).",
    },
    codeUrl: "https://github.com/nanadiaa14/cnn-online-news-text-classification",
    caseStudyUrl:
      "https://github.com/nanadiaa14/cnn-online-news-text-classification/blob/main/Technical%20Report_Analisis%20Spasial%20Daerah%20Rawan%20Kejahatan%20di%20Sulawesi%20Selatan%20Berdasarkan%20Data%20Media%20Online.pdf",
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
    { name: "Python", use: "main language", projects: ["eeg", "datasci", "ser", "queue", "traffic", "crime"] },
    { name: "Kaggle", use: "datasets & notebooks", projects: ["datasci", "traffic"] },
    { name: "Google Colab", use: "notebooks & GPU", projects: [] },
    { name: "GitHub", use: "version control", projects: [] },
    { name: "Roboflow", use: "data annotation", projects: ["traffic"] },
    { name: "MATLAB", use: "image processing", projects: ["dehaze"] },
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