import { Brain, Layers, Zap, Code, Database, Rocket } from 'lucide-react'

export const ROLES = ['Full Stack AI Engineer', 'AI Product Builder', 'RAG Systems Developer']

export const NAV_LINKS = ['Home', 'Projects', 'Services', 'About', 'Contact']

export const CAPABILITIES = [
  {
    icon: Brain,
    title: 'Build Intelligent AI Systems',
    desc: 'LLM-powered applications with RAG, agents, and semantic search. From prototype to production-ready.',
    featured: false,
  },
  {
    icon: Layers,
    title: 'Design Scalable Full Stack Platforms',
    desc: 'MERN stack frontends with cloud deployment, real-time features, and beautiful modern UI.',
    featured: true,
  },
  {
    icon: Zap,
    title: 'Automate Business Workflows',
    desc: 'AI-driven automation systems that eliminate repetitive tasks and reduce manual work by 80%+.',
    featured: false,
  },
  {
    icon: Code,
    title: 'Custom Web Applications',
    desc: 'Tailored web applications built with modern frameworks to solve specific business challenges efficiently.',
    featured: false,
  },
  {
    icon: Database,
    title: 'Database Architecture',
    desc: 'Designing and optimizing complex data structures using both SQL and NoSQL database systems.',
    featured: false,
  },
  {
    icon: Rocket,
    title: 'Performance Optimization',
    desc: 'Auditing and improving existing web applications for maximum speed, SEO, and user experience.',
    featured: false,
  },
]





  
 export const PROJECTS = [


  {

    category: 'Full Stack AI',
    name: 'SnapEat',
    tagline: 'Snap.Eat.Repeat',
    desc: 'Intelligent food recognition platform using computer vision and MERN stack.',
    stats: [{ val: '98%', label: 'Accuracy' }, { val: 'MERN', label: 'Stack' }, { val: 'Cloud', label: 'Storage' }],
    tags: ['Cloudinary', 'Firebase', 'Tailwind'],
    icon: '🍔', 
    color: '#d755f7',
    liveLink: 'https://snap-eat-6tp3.vercel.app/',
    githubLink: 'https://github.com/Hasnain-saeed7/SnapEat'
  },

    {
    category: 'AI / ML',
    name: 'The Pacman',
    tagline: 'RAG PACMAN AGENT',
    desc: 'AI agent that autonomously navigates the Pacman game environment using Retrieval-Augmented Generation (RAG) techniques.',
    stats: [{ val: '95%', label: 'Accuracy' }, { val: 'MERN', label: 'Stack' }, { val: 'Live', label: 'Booking' }],
    tags: ['RAG', 'Python', 'React', 'Node.js'],
    icon: '👻',
    color: '#f75555',
    liveLink: 'https://the-pacman-live.com', 
    githubLink: 'https://github.com/hasnain/pacman-rag' 
  },
  {
    category: 'Ecommerce',
    name: 'HQ Clothing',
    tagline: 'AI-POWERED ECOMMERCE',
    desc: 'Next-gen fashion marketplace with smart search and dynamic product filtering.',
    stats: [{ val: '92%', label: 'Performance' }, { val: 'MERN', label: 'Stack' }, { val: 'Live', label: 'Sales' }],
    tags: ['Stripe', 'Redux', 'Express'],
    icon: '👕', 
    color: '#f2f755',
    liveLink: 'https://ecommerce-frontend-g2b5.vercel.app/',
    githubLink: 'https://github.com/Hasnain-saeed7/ecommerce-frontend'
  },
  {
    category: 'Tech Showcase',
    name: 'Skill Market',
    tagline: 'Web3 Skill Marketplace',
    desc: 'Decentralized platform for hiring talent and managing projects with crypto integration.',
    stats: [{ val: 'Web3', label: 'Ready' }, { val: 'MERN', label: 'Stack' }, { val: 'Live', label: 'Beta' }],
    tags: ['Web3.js', 'Solidity', 'React'],
    icon: '💎', 
    color: '#99f755',
    liveLink: 'https://skillmarket-chi.vercel.app/',
    githubLink: 'https://github.com/Hasnain-saeed7/SkillMarket'
  } ,

    {
    category: 'MERN Web App',
    name: 'Airbnb Clone',
    tagline: 'AI-POWERED AIRBNB CLONE',
    desc: 'Full-featured property rental platform with real-time booking and AI-driven recommendations.',
    stats: [{ val: '95%', label: 'Accuracy' }, { val: 'MERN', label: 'Stack' }, { val: 'Live', label: 'Booking' }],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    icon: '🏡', // Maine icon change kar diya hai
    color: '#f78655',
    liveLink: 'https://newbnb-production.up.railway.app/', 
    githubLink: 'https://github.com/Hasnain-saeed7/NewBnb'
  },
];  
 






export const SKILLS = [
  {
    category: 'AI & Machine Learning',
    items: [
      { name: 'RAG Systems', pct: 90 },
      { name: 'LLM Integration', pct: 88 },
      { name: 'AI Agents', pct: 83 },
      { name: 'Semantic Search', pct: 85 },
    ],
  },
  {
    category: 'Frontend ',
    items: [
      { name: 'React', pct: 92 },
      { name: 'Tailwind CSS', pct: 89 },
      { name: 'Redux', pct: 80 },
      { name: 'Next.js', pct: 84 },
    ],     
    },   
  { 

    category: 'Backend',
    items: [
      { name: 'Node.js', pct: 90 },
      { name: 'Express', pct: 87 },
      { name: 'FastAPI', pct: 82 },
      { name: 'Django', pct: 78 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'Firebase', pct: 86 },
      { name: 'Cloudinary', pct: 88 },
      { name: 'Vercel / Netlify', pct: 84 },
      { name: 'Docker', pct: 72 },
    ],
  },
  {
    category: 'Databases & Tools',
    items: [
      { name: 'Vector DBs', pct: 80 },
      { name: 'PostgreSQL', pct: 83 },
      { name: 'Git / GitHub', pct: 94 },
      { name: 'REST APIs', pct: 91 },
    ],
  },
]