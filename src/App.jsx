import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiDatabase, FiLayers, FiMessageSquare, FiTerminal, FiChevronDown, FiCommand, FiActivity, FiAward, FiTarget, FiStar, FiCheckCircle } from 'react-icons/fi';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, PerspectiveCamera } from '@react-three/drei';
import { FaGithub, FaLinkedin, FaInstagram, FaGraduationCap } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineBriefcase } from 'react-icons/hi';
import { HiPaperAirplane } from 'react-icons/hi2';

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/Princevish-dev', color: '#f1f5f9' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/prince-vishwakarma405', color: '#0a66c2' },
  { name: 'Email', icon: HiOutlineMail, url: 'mailto:princevishwakarma405@gmail.com', color: '#06b6d4' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/prv.405/', color: '#e1306c' },
];

const ROLES = ["AI/ML Engineer", "Multi-Agent Systems Architect", "Optimization Enthusiast"];

const PROJECTS = [
  {
    title: "KrishiVani",
    tag: "Multimodal AI",
    impact: "Bridging speech and translation pipelines using Gemini Vision and Bhashini.",
    icon: <FiMessageSquare className="w-8 h-8 text-indigo-400" />,
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    borderGlow: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.2)]",
    link: "https://github.com/Princevish-dev/Portfolio",
  },
  {
    title: "Agent Saathi",
    tag: "Multi-Agent Framework",
    impact: "A modular multi-agent system implementing 15 ADK concepts for emotional support, study planning, and community impact.",
    icon: <FiCpu className="w-8 h-8 text-cyan-400" />,
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    borderGlow: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    link: "https://github.com/Princevish-dev/agent-saathi",
  },
  {
    title: "GrowthOS",
    tag: "AI Marketing Suite",
    impact: "An end-to-end, execution-driven marketing automation platform built on Streamlit & Gemini AI for content repurposing and ad optimization.",
    icon: <FiDatabase className="w-8 h-8 text-purple-400" />,
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    borderGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    link: "https://github.com/Princevish-dev/ai-for-marketers-hackathon-vishwak",
  }
];

const TIMELINE = [
  {
    title: "Academic Foundation",
    subtitle: "B.Tech Computer Science (2nd Year) @ LPU",
    content: "Forging a strong foundation in mathematics and optimization. Building the theoretical bedrock required for advanced intelligent systems.",
    icon: <FiCommand className="w-5 h-5 text-indigo-400" />
  },
  {
    title: "The Philosophy",
    subtitle: "The Architecture of Logic",
    content: "Before touching the keyboard, I dry-run Data Structures & Algorithms by hand on paper. Code is the final translation of a well-architected thought.",
    icon: <FiCode className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "The Vision",
    subtitle: "Relentless Mission",
    content: "Building toward becoming a Top 1% AI/ML Engineer, designing intelligent systems that don't just compute, but truly connect theory with real-world impact.",
    icon: <FiActivity className="w-5 h-5 text-emerald-400" />
  }
];

// Custom 3D Component for the Hero Section
function ThreeDHeroScene({ setIsHovering }) {
  return (
    <div 
      className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing relative z-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#4F46E5" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
        
        {/* Outer Liquid Glass Sphere */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1.8, 64, 64]}>
            <MeshDistortMaterial 
              color="#0a0a1a"
              attach="material" 
              distort={0.4} 
              speed={2.5} 
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
        
        {/* Inner Glowing Wireframe Core */}
        <Float speed={3} rotationIntensity={3} floatIntensity={2}>
           <Sphere args={[1.3, 16, 16]}>
              <meshStandardMaterial 
                color="#4F46E5" 
                wireframe 
                transparent 
                opacity={0.4} 
              />
           </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setIsNavVisible(window.scrollY > window.innerHeight * 0.4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgX = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 80 : 0;
  const bgY = typeof window !== 'undefined' ? (mousePosition.y / window.innerHeight - 0.5) * 80 : 0;

  return (
    <div className="bg-[#05050A] min-h-screen text-slate-200 font-sans selection:bg-indigo-500/40 overflow-hidden relative">
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 origin-left z-50 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
        style={{ scaleX }}
      />

      {/* Premium Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-screen"
        animate={{ 
          x: mousePosition.x - (isHovering ? 24 : 12), 
          y: mousePosition.y - (isHovering ? 24 : 12),
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      >
        <div className={`w-full h-full rounded-full border border-cyan-400/80 transition-all duration-300 ${isHovering ? 'bg-cyan-400/20 scale-150' : 'bg-transparent'}`} />
        <div className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8]" />
      </motion.div>

      {/* Deep Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        {/* Parallax Glowing Orbs */}
        <motion.div 
          animate={{ x: bgX, y: bgY }}
          transition={{ type: "spring", stiffness: 50, damping: 40 }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/15 blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: -bgX * 1.5, y: -bgY * 1.5 }}
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
          className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/15 blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: bgX * 0.5, y: -bgY * 2 }}
          transition={{ type: "spring", stiffness: 30, damping: 50 }}
          className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-emerald-600/10 blur-[150px] mix-blend-screen"
        />
      </div>

      {/* Floating Glassmorphic Nav */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-40 px-2 py-2 rounded-2xl bg-[#05050A]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hidden md:flex items-center gap-1"
          >
            {['Education', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-mono text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        
        {/* --- SECTION 1: MASTER-CLASS HERO --- */}
        <section id="hero" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 pt-32 pb-10">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 w-full flex flex-col items-start space-y-10 z-10">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-[1px] w-12 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  <span className="font-mono text-cyan-400 text-sm uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">System Architect</span>
                </motion.div>
                
                <h1 className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-serif font-black tracking-tighter text-white leading-[1.05]">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Prince
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 pb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  >
                    Vishwakarma.
                  </motion.div>
                </h1>
              </div>
              
              <div className="h-12 border-l-2 border-indigo-500/40 pl-6 flex items-center bg-gradient-to-r from-indigo-500/5 to-transparent pr-10 rounded-r-xl">
                <Typewriter roles={ROLES} />
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
              >
                I am driven by a builder's mindset. My journey began with a Hindi-medium mathematics foundation, where logic and first principles became my compass. Today, I translate that discipline into code—dry-running algorithms on paper, architecting systems with precision, and optimizing every line until it feels like poetry.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 pt-6"
              >
                <a 
                  href="#projects" 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="relative group px-10 py-5 rounded-2xl bg-indigo-600 text-white font-medium overflow-hidden shadow-[0_10px_40px_-10px_rgba(79,70,229,0.8)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-[100%] group-hover:animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,transparent_50%,transparent_100%)] opacity-20 pointer-events-none" />
                  <span className="relative z-10 flex items-center gap-3 text-lg">
                    Explore Architectures <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </a>
                <a 
                  href="#contact" 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl text-slate-200 font-medium hover:bg-white/[0.08] transition-all duration-300 hover:border-white/[0.2] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] text-lg"
                >
                  Initialize Contact
                </a>
              </motion.div>
            </div>

            {/* Right Content: 3D Interactive Scene via R3F */}
            <div className="flex-1 w-full flex items-center justify-center lg:justify-end">
              <ThreeDHeroScene setIsHovering={setIsHovering} />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500 z-10"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-mono font-semibold">Scroll to Descend</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-indigo-500/50 to-transparent relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 64] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]"
              />
            </div>
          </motion.div>
        </section>

        {/* --- SECTION 2: MY EDUCATION --- */}
        <section id="education" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">My Education</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Academic Foundation</h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-white/[0.1] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h4 className="text-3xl font-serif font-bold text-white mb-2">B.Tech in Computer Science</h4>
                <p className="text-xl text-slate-400 font-light mb-6">2nd Year (3rd Semester) at Lovely Professional University</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-sm shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                  <FaGraduationCap className="w-5 h-5" /> CGPA: 7.16/10
                </div>
              </div>
              <div className="hidden md:block w-32 h-32 relative">
                <div className="absolute inset-0 border-[4px] border-cyan-400/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-2 border-[2px] border-indigo-500/40 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">🎓</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- SECTION 3: MY SKILLS --- */}
        <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">My Skills</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Core Competencies</h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {name: "Python & C++", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Gemini AI & Nemotron", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Agent Development Kit", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Streamlit & Docker", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=400&auto=format&fit=crop"}, 
              {name: "DSA & Optimization", img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop"}
            ].map((skill, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="relative h-40 rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group hover:-translate-y-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500">
                <img src={skill.img} alt={skill.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 mix-blend-overlay grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="font-mono text-xs text-slate-200 tracking-wider uppercase font-bold drop-shadow-md">{skill.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: MY INTERNSHIP EXPERIENCE --- */}
        <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">My Internship Experience</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Professional Journey</h3>
          </motion.div>
          <div className="relative pl-8 md:pl-0 mt-20">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-400/20 to-transparent -translate-x-1/2" />
            <TimelineNode 
              item={{ 
                title: "Open Source Contributor & Builder", 
                subtitle: "GSSoC & EngageEarth", 
                content: "Actively contributing to open-source through GSSoC while architecting EngageEarth, a sustainability-focused digital impact platform bridging technology with real-world issues.",
                icon: <FiCode className="w-6 h-6 text-indigo-400" />
              }} 
              index={0} 
              setIsHovering={setIsHovering} 
            />
          </div>
        </section>

        {/* --- SECTION 5: MY PROJECT --- */}
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">My Project</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Featured Work</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} setIsHovering={setIsHovering} setSelectedProject={setSelectedProject} />)}
          </div>
        </section>

        {/* --- SECTION 6: MY ACHIEVEMENTS --- */}
        <section id="achievements" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">My Achievements</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Milestones</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Metric title="Active" subtitle="GSSoC Contributor" delay={0} />
            <Metric title="Mastery" subtitle="DSA Optimization" delay={0.1} />
            <Metric title="Logical" subtitle="First-Principles" delay={0.2} />
          </div>
        </section>

        {/* --- SECTION 7: MY STRENGTHS --- */}
        <section id="strengths" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">My Strengths</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">What Drives Me</h3>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {["Extreme Optimization", "First-Principles", "Builder Mindset", "Precision & Efficiency"].map((strength, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15, type: "spring" }} viewport={{ once: true }} className="px-10 py-5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(34,211,238,0.2)] transition-all duration-500 cursor-default">
                <span className="font-mono text-lg text-slate-300 tracking-wider">{strength}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 8: MY GOAL --- */}
        <section id="goal" className="py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-sm font-mono text-emerald-400 tracking-[0.4em] uppercase mb-8 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">My Goal</h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 leading-tight drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] max-w-4xl mx-auto">
              "ARCHITECT MULTI-AGENT ECOSYSTEMS AND BRIDGE THE GAP BETWEEN THEORETICAL AI AND REAL-WORLD IMPACT."
            </p>
          </motion.div>
        </section>
        {/* --- FOOTER CTA --- */}
        <section id="contact" className="relative py-24 sm:py-32 overflow-hidden mt-20">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
                Get In Touch
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-serif">
                <span className="gradient-text">Let's Build Together</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed font-sans">
                I'm actively seeking AI/ML internships and collaboration opportunities.
                Whether you're a recruiter, a fellow engineer, or an open-source maintainer —
                I'd love to connect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <a
                href="mailto:princevishwakarma405@gmail.com"
                className="glow-btn inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base animate-glow-pulse transition-all"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <HiPaperAirplane className="w-5 h-5 rotate-0" />
                Let's Connect
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-4 mb-16"
            >
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 rounded-xl glass flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
                    style={{ '--hover-color': s.color }}
                    aria-label={s.name}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Icon className="w-5 h-5 text-slate-500 transition-colors group-hover:text-[var(--hover-color)]" />
                  </a>
                );
              })}
            </motion.div>

            <div className="section-divider mb-8" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-xs text-slate-600 font-mono">
                © {new Date().getFullYear()} Prince Vishwakarma · Built with{' '}
                <span className="text-cyan-500">React</span> +{' '}
                <span className="text-violet-400">Three.js</span>
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function Typewriter({ roles }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative h-full overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-mono text-indigo-400 font-medium drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TimelineNode({ item, index, setIsHovering }) {
  const isLeft = index % 2 === 0;
  return (
    <div 
      className={`relative flex flex-col md:flex-row items-start md:items-center w-full group ${isLeft ? '' : 'md:flex-row-reverse'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="hidden md:block w-1/2" />
      
      {/* Node Dot with pulse effect */}
      <div className="absolute left-[31px] md:left-1/2 w-8 h-8 rounded-full bg-[#05050A] border-[4px] border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,1)] -translate-x-1/2 z-10 flex items-center justify-center group-hover:scale-125 group-hover:border-cyan-400 transition-all duration-500">
        <div className="w-2 h-2 bg-cyan-300 rounded-full group-hover:animate-ping shadow-[0_0_10px_rgba(34,211,238,1)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full md:w-1/2 pl-24 md:pl-0 ${isLeft ? 'md:pr-32 md:text-right' : 'md:pl-32 text-left'}`}
      >
        <div className="relative p-8 rounded-3xl bg-transparent hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05] transition-all duration-500">
          <div className="flex items-center gap-4 mb-6 justify-start md:hidden">
             <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.1] shadow-lg flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">{item.icon}</div>
             <span className="font-mono text-xs text-indigo-400 tracking-[0.2em] uppercase">{item.subtitle}</span>
          </div>
          <div className={`hidden md:flex items-center gap-4 mb-6 ${isLeft ? 'justify-end' : 'justify-start'}`}>
             {isLeft ? (
               <>
                 <span className="font-mono text-xs text-indigo-400 tracking-[0.2em] uppercase">{item.subtitle}</span>
                 <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.1] shadow-lg flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">{item.icon}</div>
               </>
             ) : (
               <>
                 <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.1] shadow-lg flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-colors">{item.icon}</div>
                 <span className="font-mono text-xs text-indigo-400 tracking-[0.2em] uppercase">{item.subtitle}</span>
               </>
             )}
          </div>
          
          <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-500 inline-block">{item.title}</h3>
          <p className="text-slate-400 leading-relaxed text-lg md:text-xl font-light">{item.content}</p>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, setIsHovering, setSelectedProject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`group relative rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/[0.05] transition-all duration-700 flex flex-col h-full hover:bg-white/[0.04] hover:-translate-y-2 ${project.borderGlow}`}
    >
      <div className={`h-72 w-full bg-gradient-to-b ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:30px_30px] group-hover:scale-110 group-hover:opacity-[0.1] transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent opacity-80" />
        
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative z-10 w-24 h-24 rounded-3xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-xl flex items-center justify-center shadow-2xl group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-shadow duration-500"
        >
          {project.icon}
        </motion.div>
      </div>
      
      <div className="p-12 flex-1 flex flex-col relative z-10 -mt-12 bg-gradient-to-b from-transparent to-[#05050A]">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6 mb-8">
          <h3 className="text-4xl font-serif font-bold text-white group-hover:text-cyan-400 transition-colors drop-shadow-md">{project.title}</h3>
          <span className="text-xs font-mono px-5 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] backdrop-blur-xl whitespace-nowrap shadow-lg tracking-wider">{project.tag}</span>
        </div>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-12 flex-1 font-light">{project.impact}</p>
        
        <div className="overflow-hidden mt-auto">
          {project.link ? (
            <motion.a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 8 }}
              className="text-white font-mono text-sm flex items-center gap-4 group/btn px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 w-fit"
            >
              View Repository <FiArrowRight className="text-indigo-400 group-hover/btn:translate-x-2 transition-transform w-5 h-5" />
            </motion.a>
          ) : (
            <motion.button 
              whileHover={{ x: 8 }}
              className="text-white font-mono text-sm flex items-center gap-4 group/btn px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 w-fit"
            >
              View Architecture <FiArrowRight className="text-indigo-400 group-hover/btn:translate-x-2 transition-transform w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Metric({ title, subtitle, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="group flex flex-col items-center text-center p-14 border border-white/[0.05] bg-white/[0.01] rounded-[2.5rem] hover:bg-white/[0.03] hover:border-white/[0.1] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] group-hover:via-cyan-400/50 to-transparent transition-colors duration-500" />
      
      <div className="text-6xl lg:text-[5rem] font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:from-cyan-400 group-hover:to-indigo-600 transition-all duration-500 relative z-10 leading-none">
        {title}
      </div>
      <div className="text-sm lg:text-base text-slate-400 uppercase tracking-[0.3em] font-medium relative z-10 group-hover:text-slate-300 transition-colors">
        {subtitle}
      </div>
    </motion.div>
  );
}
