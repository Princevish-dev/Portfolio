import {
  FaPython, FaJsSquare, FaGithub, FaLinkedin, FaInstagram,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import {
  SiCplusplus, SiNetlify, SiRender, SiGithubactions, SiArduino,
} from 'react-icons/si';
import { VscTerminalPowershell } from 'react-icons/vsc';
import { HiCpuChip } from 'react-icons/hi2';
import { TbBrain, TbTestPipe } from 'react-icons/tb';
import { MdWindPower } from 'react-icons/md';

/* ——————————————— ABOUT ——————————————— */
export const aboutData = {
  headline: 'Engineer in Progress',
  paragraphs: [
    "I'm Prince Vishwakarma, a B.Tech Engineering student at Lovely Professional University from Ghazipur, India. I enjoy turning curious questions into useful software, experiments, and systems that can make a real-world difference.",
    "My current path sits at the intersection of AI/ML, web development, cybersecurity troubleshooting, CI/CD, and beginner electronics. I learn by building: from sustainability platforms and deployment workflows to Arduino prototypes and problem-solving practice.",
    "My long-term aim is to become a top 1% AI/ML engineer by 2028 while building a strong open-source foundation through GSSoC, internships, and meaningful collaborations.",
  ],
  highlights: [
    { label: 'University', value: 'LPU — Lovely Professional University' },
    { label: 'Graduation', value: 'B.Tech Engineering · 2029' },
    { label: 'Hometown', value: 'Ghazipur, India' },
    { label: 'Role', value: 'Student · Builder · Problem Solver' },
    { label: 'Focus', value: 'AI/ML · Web · DevOps · Hardware' },
  ],
  goals: [
    'Build and scale EngageEarth, a sustainability-focused digital impact platform.',
    'Grow through GSSoC, open source, internships, and production-minded projects.',
    'Become a top 1% AI/ML engineer by 2028 and secure strong placements.',
  ],
  currentWork: [
    'Developing EngageEarth and preparing its frontend for a custom Netlify domain.',
    'Configuring backend deployment on Render and building GitHub Actions CI/CD.',
    'Adding Playwright end-to-end tests and preparing a GSSoC application.',
  ],
  interests: [
    'AI/ML roadmaps', 'Problem solving', 'Cybersecurity', 'CI/CD', 'Arduino',
    'Indian cooking', 'Stock-market basics', 'Chemistry', 'Bhojpuri & lofi music',
  ],
};

/* ——————————————— TECH STACK ——————————————— */
export const techCategories = [
  {
    title: 'AI, ML & Core Languages',
    color: '#06b6d4',
    techs: [
      { name: 'Python', icon: FaPython },
      { name: 'JavaScript', icon: FaJsSquare },
      { name: 'C++', icon: SiCplusplus },
      { name: 'Deep Learning', icon: TbBrain },
    ],
  },
  {
    title: 'DevOps & Deployment',
    color: '#8b5cf6',
    techs: [
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Playwright', icon: TbTestPipe },
      { name: 'Netlify', icon: SiNetlify },
      { name: 'Render', icon: SiRender },
    ],
  },
  {
    title: 'Hardware & Systems',
    color: '#10b981',
    techs: [
      { name: 'Arduino', icon: SiArduino },
      { name: 'PowerShell', icon: VscTerminalPowershell },
      { name: 'Windows CLI', icon: MdWindPower },
      { name: 'Electronics', icon: HiCpuChip },
    ],
  },
];

/* ——————————————— PROJECTS ——————————————— */
export const projects = [
  {
    id: 'engageearth',
    title: 'EngageEarth',
    emoji: '🌍',
    tagline: 'Sustainability-Focused Digital Hub',
    description:
      'A comprehensive platform designed to promote environmental sustainability through interactive tools, community engagement, and data-driven insights. Built with a focus on clean architecture and real-world impact.',
    impact: 'Connecting communities with actionable sustainability data.',
    techStack: ['React', 'JavaScript', 'APIs', 'Netlify'],
    accentColor: 'from-emerald-500 to-cyan-500',
    borderColor: 'rgba(16,185,129,0.4)',
    link: '#',
  },
  {
    id: 'cicd',
    title: 'CI/CD Automation',
    emoji: '⚙️',
    tagline: 'Production-Grade Pipelines',
    description:
      'End-to-end continuous integration and deployment pipelines built with GitHub Actions and Playwright testing. Automated build, test, and deploy workflows that ensure code quality and rapid iteration cycles.',
    impact: 'Zero-downtime deployments with automated quality gates.',
    techStack: ['GitHub Actions', 'Playwright', 'YAML', 'Node.js'],
    accentColor: 'from-violet-500 to-purple-600',
    borderColor: 'rgba(139,92,246,0.4)',
    link: '#',
  },
  {
    id: 'arduino',
    title: 'Arduino Prototyping',
    emoji: '🔧',
    tagline: 'Hardware-Software Integration',
    description:
      'Hands-on electronics experiments bridging the gap between software and physical computing. Sensor integrations, actuator control, and embedded systems development demonstrating full-stack thinking beyond the browser.',
    impact: 'Bridging digital logic with real-world physical systems.',
    techStack: ['Arduino', 'C++', 'Electronics', 'Sensors'],
    accentColor: 'from-cyan-500 to-blue-600',
    borderColor: 'rgba(6,182,212,0.4)',
    link: '#',
  },
];

/* ——————————————— SOCIAL LINKS ——————————————— */
export const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Princevish-dev', color: '#f1f5f9' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/prince-vishwakarma405', color: '#0a66c2' },
  { name: 'Email', icon: HiOutlineMail, url: 'mailto:princevishwakarma405@gmail.com', color: '#06b6d4' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/prv.405/', color: '#e1306c' },
];

/* ——————————————— NAV LINKS ——————————————— */
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
