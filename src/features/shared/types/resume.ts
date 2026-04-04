export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  linkedin: string;
  cta: string;
}

export interface HeroSceneData {
  theme: string;
  centerObject: string;
  motion: string;
  background: string;
  nodeStyle: string;
  interaction: {
    hover: string[];
    click: string[];
  };
}

export interface SkillsData {
  frontend: string[];
  stateManagement: string[];
  apisAndServices: string[];
  engineering: string[];
  tools: string[];
}

export interface JobEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  orbitOrder: number;
  accent: string;
  summary: string;
  bullets: string[];
  techStack: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  start: string;
  end: string;
}

export interface ResumeData {
  profile: Profile;
  heroScene: HeroSceneData;
  skills: SkillsData;
  jobs: JobEntry[];
  education: EducationEntry[];
}
