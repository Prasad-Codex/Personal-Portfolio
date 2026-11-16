export interface SkillItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  code: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  iconType: 'ml' | 'python' | 'database';
  summary: string;
  topics: string[];
}

export interface InternshipInfo {
  role: string;
  company: string;
  duration: string;
  type: string;
  description: string;
  responsibilities: string[];
  skillsGained: string[];
}

export interface ProjectItem {
  id: 'portfolio' | 'calculator' | 'landing';
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export const PROFILE = {
  name: 'Prasad M',
  role: 'CSE Student',
  headline: 'Frontend Developer',
  intro:
    'Computer Science Engineering student interested in Frontend Development, Web Development, and Artificial Intelligence. Passionate about learning new technologies and building creative projects.',
  aboutParagraphs: [
    'I am a Computer Science Engineering (CSE) student with a strong interest in Frontend Development, Web Development, and Artificial Intelligence.',
    'I enjoy learning new technologies, writing clean and structured code, and building creative projects that turn concepts into practical digital experiences.',
  ],
  focusAreas: [
    {
      title: 'Frontend Development',
      detail: 'Crafting structured, accessible layouts with semantic HTML5 and modern CSS3.',
    },
    {
      title: 'Web Development',
      detail: 'Building responsive websites with clean visual hierarchy and smooth user flows.',
    },
    {
      title: 'Artificial Intelligence',
      detail: 'Exploring machine learning basics, Python data structures, and computer vision workflows.',
    },
  ],
};

export const SKILLS: SkillItem[] = [
  {
    id: 'genai',
    name: 'Generative AI Tools',
    category: 'AI & Workflow',
    summary: 'Using modern generative AI tools for ideation, productivity, and prototyping.',
    code: 'GA',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    category: 'AI Domain',
    summary: 'Core AI principles, machine learning concepts, and intelligent problem solving.',
    code: 'AI',
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    category: 'AI Domain',
    summary: 'Foundational image processing concepts and visual recognition workflows.',
    code: 'CV',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    summary: 'Readable scripting, data structures, algorithms, and AI foundations.',
    code: 'PY',
  },
  {
    id: 'webdev',
    name: 'Web Development',
    category: 'Web',
    summary: 'Building complete, structured websites with responsive multi-device support.',
    code: 'WD',
  },
  {
    id: 'frontend-dev',
    name: 'Frontend Development',
    category: 'Frontend',
    summary: 'Implementing interactive client-side interfaces and clean component structure.',
    code: 'FD',
  },
  {
    id: 'frontend-design',
    name: 'Front End Design',
    category: 'UI Design',
    summary: 'Designing balanced typography, accessible color contrast, and visual layouts.',
    code: 'UI',
  },
  {
    id: 'software-eng',
    name: 'Software Engineering',
    category: 'Engineering',
    summary: 'Structured problem solving, modular code organization, and version control.',
    code: 'SE',
  },
];

export const LANGUAGES: LanguageItem[] = [
  { name: 'English', proficiency: 'Both (Read, Write & Speak)' },
  { name: 'Tamil', proficiency: 'Both (Read, Write & Speak)' },
  { name: 'Telugu', proficiency: 'Spoken' },
];

export const CERTIFICATIONS: CertificateItem[] = [
  {
    id: 'cert-aws-ml',
    title: 'AWS Foundations: Machine Learning Basics',
    organization: 'AWS Training & Certification',
    iconType: 'ml',
    summary:
      'Covered core machine learning concepts, model training workflows, and foundational cloud ML terminology.',
    topics: ['Machine Learning Basics', 'Supervised Learning', 'Model Evaluation', 'Cloud ML'],
  },
  {
    id: 'cert-dsa-python',
    title: 'Data Structures and Algorithms in Python',
    organization: 'Simplilearn SkillUp',
    iconType: 'python',
    summary:
      'Completed foundational coursework on arrays, linked lists, stacks, queues, trees, sorting, and searching in Python.',
    topics: ['Python', 'Data Structures', 'Algorithms', 'Problem Solving'],
  },
  {
    id: 'cert-aws-nosql',
    title: 'NoSQL Foundational Learning Plan',
    organization: 'AWS Training & Certification',
    iconType: 'database',
    summary:
      'Learned key NoSQL database concepts, data modeling patterns, and modern non-relational storage fundamentals.',
    topics: ['NoSQL Concepts', 'Data Modeling', 'Key-Value Stores', 'Scalable Storage'],
  },
];

export const INTERNSHIP: InternshipInfo = {
  role: 'Web Development Internship',
  company: 'CODSOFT',
  duration: '1 Month',
  type: 'Virtual Internship',
  description:
    'Completed a 1-month virtual Web Development internship at CODSOFT focused on building clean, responsive frontend projects from scratch.',
  responsibilities: [
    'Built and structured responsive web pages using semantic HTML5 and modern CSS3 layouts.',
    'Implemented interactive user interface behavior and clean input handling.',
    'Tested cross-device responsiveness and refined visual spacing, typography, and usability.',
  ],
  skillsGained: [
    'Web Development',
    'Frontend Development',
    'Front End Design',
    'Responsive Design',
    'UI Structuring',
    'Problem Solving',
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    description:
      'A website to showcase my profile, skills, and projects with clean typography, smooth navigation, and responsive design.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    highlights: [
      'Clean single-page architecture with smooth section scrolling',
      'Dedicated sections for About, Skills, Certificates, Internship, and Projects',
      'Downloadable resume and interactive project previews',
    ],
  },
  {
    id: 'calculator',
    title: 'Calculator App',
    description:
      'A simple calculator using HTML, CSS, and JavaScript supporting arithmetic operations, clear/backspace actions, and keyboard input.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    highlights: [
      'Supports addition, subtraction, multiplication, division, and percentage',
      'Responsive grid keypad with clear visual feedback on button press',
      'Handles decimal precision and division-by-zero gracefully',
    ],
  },
  {
    id: 'landing',
    title: 'Landing Page',
    description:
      'A responsive landing page created using HTML and CSS featuring a structured hero, feature highlights, and mobile-friendly layout.',
    technologies: ['HTML5', 'CSS3'],
    highlights: [
      'Balanced hero split layout with clear primary call to action',
      'Fluid multi-column feature cards built with CSS Grid and Flexbox',
      'Clean typography and consistent spacing across mobile and desktop',
    ],
  },
];
