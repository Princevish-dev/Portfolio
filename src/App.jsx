import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiDatabase, FiLayers, FiMessageSquare, FiTerminal, FiChevronDown } from 'react-icons/fi';

const ROLES = ["AI/ML Engineer", "Multi-Agent Systems Architect", "Systems Builder"];

const PROJECTS = [
  {
    title: "KrishiVani",
    tag: "Multimodal AI",
    impact: "Bridging speech and translation pipelines using Gemini Vision and Bhashini.",
    icon: <FiMessageSquare className="w-12 h-12 text-indigo-400" />,
    gradient: "from-indigo-500/20 to-cyan-500/20",
  },
  {
    title: "Agent Saathi",
    tag: "Multi-Agent Framework",
    impact: "Bringing emotional memory banks and agent-to-agent protocols to life via 15 ADK concepts.",
    icon: <FiCpu className="w-12 h-12 text-purple-400" />,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Project AntiGrav",
    tag: "Agentic Control",
    impact: "Levitation control system via state observation and adaptive feedback loops in C++.",
    icon: <FiLayers className="w-12 h-12 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "GrowthOS",
    tag: "AI Marketing Suite",
    impact: "Execution-driven NLP sentiment analysis and content repurposing built on Streamlit.",
    icon: <FiDatabase className="w-12 h-12 text-orange-400" />,
    gradient: "from-orange-500/20 to-amber-500/20",
  }
];

const TIMELINE = [
  {
    title: "Academic",
    content: "B.Tech Computer Science (2nd Year, 3rd Sem) @ Lovely Professional University. Forging a strong foundation in mathematics and optimization."
  },
  {
    title: "The Philosophy",
    content: "The Architecture of Logic. Before touching the keyboard, I dry-run Data Structures & Algorithms by hand on paper. Code is the final translation of a well-architected thought."
  },
  {
    title: "The Vision",
    content: "Relentless Mission. Building toward becoming a Top 1% AI/ML Engineer, designing intelligent systems that don't just compute, but truly connect theory with real-world impact."
  }
];

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNavVisible, setIsNavVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsNavVisible(heroBottom < 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgX = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 40 : 0;
  const bgY = typeof window !== 'undefined' ? (mousePosition.y / window.innerHeight - 0.5) * 40 : 0;

  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-indigo-500/50 blur-[2px] pointer-events-none z-50 flex items-center justify-center hidden md:flex"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee]" />
      </motion.div>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        <motion.div 
          animate={{ x: bgX, y: bgY }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 blur-[120px]"
        />
        <motion.div 
          animate={{ x: -bgX, y: -bgY }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/10 blur-[120px]"
        />
      </div>

      {/* Floating Nav */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-700/50 shadow-[0_0_20px_rgba(79,70,229,0.15)] hidden md:flex gap-8 items-center"
          >
            <a href="#hero" className="text-sm font-medium hover:text-indigo-400 transition-colors">Home</a>
            <a href="#timeline" className="text-sm font-medium hover:text-indigo-400 transition-colors">Path</a>
            <a href="#projects" className="text-sm font-medium hover:text-indigo-400 transition-colors">Architectures</a>
            <a href="#contact" className="text-sm font-medium hover:text-indigo-400 transition-colors">Contact</a>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        
        {/* Section 1: Hero */}
        <section id="hero" ref={heroRef} className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-16 lg:px-24 pt-20 pb-10 relative">
          
          <div className="flex-1 w-full flex flex-col items-start justify-center space-y-6 max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white leading-tight"
            >
              Prince <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Vishwakarma</span>
            </motion.h1>
            
            <div className="h-10">
              <Typewriter roles={ROLES} />
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
            >
              I am driven by a builder's mindset. My journey began with a Hindi-medium mathematics foundation, where logic and first principles became my compass. Today, I translate that discipline into code—dry-running algorithms on paper, architecting systems with precision, and optimizing every line until it feels like poetry.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a href="#projects" className="px-8 py-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                Explore My Work <FiArrowRight />
              </a>
              <a href="#contact" className="px-8 py-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-slate-200 font-medium hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                Initialize Contact
              </a>
            </motion.div>
          </div>

          <div className="flex-1 w-full flex items-center justify-center mt-16 md:mt-0" style={{ perspective: '1000px' }}>
            <HeroCarousel />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiChevronDown className="w-5 h-5 text-indigo-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: Timeline */}
        <section id="timeline" className="py-32 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-24"
          >
            The Builder's Path
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-cyan-500/0 md:-translate-x-1/2" />
            
            <div className="space-y-24">
              {TIMELINE.map((item, i) => (
                <TimelineNode key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Projects Grid */}
        <section id="projects" className="py-32 px-8 md:px-16 lg:px-24 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-end mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Architectures</h2>
              <div className="hidden md:flex gap-4">
                <span className="text-sm font-mono text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full bg-indigo-500/10">All</span>
                <span className="text-sm font-mono text-slate-400 hover:text-slate-200 cursor-pointer transition-colors px-3 py-1">AI/ML</span>
                <span className="text-sm font-mono text-slate-400 hover:text-slate-200 cursor-pointer transition-colors px-3 py-1">Systems</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Deep Dive */}
        <section className="py-32 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold mb-16"
          >
            Deep Dive: KrishiVani
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><FiTerminal className="text-indigo-400" /> Core Logic</h3>
              <p className="text-slate-300 leading-relaxed">
                KrishiVani represents a paradigm shift in rural communication interfaces. By bridging native speech input with Gemini's vision-language multimodal capabilities and Bhashini's robust translation layer, the system abstracts extreme complexity behind a singular, resilient API endpoint.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><FiCode className="text-cyan-400" /> Implementation</h3>
              <p className="text-slate-300 leading-relaxed">
                Architected with failure in mind. Features asynchronous task queues, automatic retry mechanisms for LLM hallucinations, and a fallback tree that degrades gracefully under high latency—all while maintaining a highly coherent contextual memory for the end-user session.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <Metric title="100%" subtitle="Paper-Tested Logic" />
            <Metric title="900+" subtitle="LeetCode Hours" delay={0.1} />
            <Metric title="∞" subtitle="Infinite Optimization" delay={0.2} />
          </div>
        </section>

        {/* Footer */}
        <section id="contact" className="py-40 px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-900/10 opacity-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <a href="mailto:contact@princevish.dev" className="group inline-flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-serif font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-500">
                Deploy Next Project
              </span>
              <div className="mt-8 px-6 py-3 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-sm border border-indigo-500/30 flex items-center gap-2 group-hover:bg-indigo-500/30 transition-all">
                contact@princevish.dev <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function Typewriter({ roles }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative h-full overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl font-mono text-cyan-400 font-medium"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroCarousel() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      <motion.div 
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `rotateY(${i * 120}deg) translateZ(160px)` }}
          >
            <div className="w-48 h-64 md:w-56 md:h-72 rounded-2xl bg-slate-800/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.2)] p-6 flex flex-col justify-between overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center z-10">
                <FiCode className="text-slate-400" />
              </div>
              <div className="z-10">
                <div className="h-1.5 w-1/3 bg-slate-600 rounded-full mb-3 group-hover:bg-indigo-400/50 transition-colors" />
                <div className="h-1.5 w-2/3 bg-slate-600 rounded-full mb-3 group-hover:bg-cyan-400/50 transition-colors" />
                <div className="h-1.5 w-1/2 bg-slate-600 rounded-full group-hover:bg-purple-400/50 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TimelineNode({ item, index }) {
  const isLeft = index % 2 === 0;
  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${isLeft ? '' : 'md:flex-row-reverse'}`}>
      <div className="hidden md:block w-1/2" />
      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] -translate-x-[7px] md:-translate-x-1/2 border-4 border-[#0F172A] z-10" />
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}
      >
        <div className="p-6 md:p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 hover:bg-slate-800/60">
          <h3 className="text-xl font-bold font-serif mb-4 text-white group-hover:text-indigo-400 transition-colors">{item.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">{item.content}</p>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-full hover:bg-slate-800/50"
    >
      <div className={`h-56 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[size:10px_10px]" />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative z-10"
        >
          {project.icon}
        </motion.div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <h3 className="text-2xl font-bold font-serif text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50 whitespace-nowrap">{project.tag}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">{project.impact}</p>
        <div className="overflow-hidden">
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-indigo-400 font-medium text-sm flex items-center gap-2 group/btn"
          >
            View Architecture <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({ title, subtitle, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center text-center p-8 border border-slate-700/30 bg-slate-800/20 rounded-2xl hover:bg-slate-800/40 transition-colors"
    >
      <div className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">
        {title}
      </div>
      <div className="text-sm md:text-base text-slate-400 uppercase tracking-widest font-medium">
        {subtitle}
      </div>
    </motion.div>
  );
}
