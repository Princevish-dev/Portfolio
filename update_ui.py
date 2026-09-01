import codecs
import re

with codecs.open('src/App.jsx', 'r', 'utf-8') as f:
    content = f.read()

# 1. Update CGPA
content = content.replace("CGPA: 8.7/10", "CGPA: 7.16/10")

# 2. Remove all "0X. " prefixes
content = re.sub(r'0\d\.\s*', '', content)

# 3. Update My Goal
goal_old = '''"Become a top 1% AI/ML engineer by 2028."'''
goal_new = '''"MY GOAL IS TO BUILD MEANINGFUL SOFTWARE, MASTER ARTIFICIAL INTELLIGENCE, AND ENGINEER SYSTEMS THAT SOLVE REAL-WORLD PROBLEMS."'''
content = content.replace(goal_old, goal_new)

# 4. Update Projects Data with Images and Specs
projects_old = '''const PROJECTS = [
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
];'''

projects_new = '''const PROJECTS = [
  {
    title: "KrishiVani",
    tag: "Multimodal AI",
    impact: "Bridging speech and translation pipelines using Gemini Vision and Bhashini.",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop",
    specs: ["Gemini Vision Pro", "Bhashini API", "Speech-to-Text", "React UI"],
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    borderGlow: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.2)]",
    link: "https://github.com/Princevish-dev/Portfolio",
  },
  {
    title: "Agent Saathi",
    tag: "Multi-Agent Framework",
    impact: "A modular multi-agent system implementing 15 ADK concepts for emotional support, study planning, and community impact.",
    image: "https://images.unsplash.com/photo-1531297172866-d85fe2169527?q=80&w=800&auto=format&fit=crop",
    specs: ["15 ADK Concepts", "Google Gemini AI", "Parallel & Loop Agents", "Emotional Memory Bank"],
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    borderGlow: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    link: "https://github.com/Princevish-dev/agent-saathi",
  },
  {
    title: "GrowthOS",
    tag: "AI Marketing Suite",
    impact: "An end-to-end, execution-driven marketing automation platform built on Streamlit & Gemini AI for content repurposing and ad optimization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    specs: ["Streamlit Dashboard", "Gemini Content Engine", "Competitor Sentiment Analysis", "Automated HTML Ad Gen"],
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    borderGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    link: "https://github.com/Princevish-dev/ai-for-marketers-hackathon-vishwak",
  }
];'''
content = content.replace(projects_old, projects_new)

# 5. Fix App.jsx State for Modal
app_start_old = "  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });"
app_start_new = "  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });\n  const [selectedProject, setSelectedProject] = useState(null);"
content = content.replace(app_start_old, app_start_new)

# 6. Insert Modal JSX at the end of the sections
modal_jsx = '''
        {/* --- PROJECT MODAL --- */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`relative w-full max-w-4xl bg-[#05050A] rounded-[2rem] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col md:flex-row`}
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] to-transparent z-10 md:bg-gradient-to-r" />
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col relative z-20">
                  <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors">✕</button>
                  <span className="text-xs font-mono px-4 py-2 rounded-xl bg-white/[0.05] text-cyan-400 w-fit mb-4">{selectedProject.tag}</span>
                  <h3 className="text-4xl font-serif font-bold text-white mb-6">{selectedProject.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">{selectedProject.impact}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Specifications</h4>
                    <ul className="space-y-3">
                      {selectedProject.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300 font-light">
                          <FiCheckCircle className="text-emerald-400 w-5 h-5" /> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/[0.05]">
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-slate-200 transition-colors w-full justify-center"
                    >
                      View GitHub Repository <FiArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
'''
content = content.replace("      </div>\n    </div>\n  );\n}\n\nfunction ProjectCard", modal_jsx + "      </div>\n    </div>\n  );\n}\n\nfunction ProjectCard")

# 7. Update ProjectCard to show image and trigger modal
card_old = '''      <div className={`h-72 w-full bg-gradient-to-b ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
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
      </div>'''

card_new = '''      <div className={`h-72 w-full bg-gradient-to-b ${project.gradient} relative overflow-hidden cursor-pointer`} onClick={() => setSelectedProject(project)}>
        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-sm shadow-xl flex items-center gap-2">
            View Details <FiArrowRight />
          </div>
        </div>
      </div>'''
content = content.replace(card_old, card_new)

# Update ProjectCard signature
content = content.replace("function ProjectCard({ project, index, setIsHovering }) {", "function ProjectCard({ project, index, setIsHovering, setSelectedProject }) {")

# Update ProjectCard usage
content = content.replace("<ProjectCard key={i} project={p} index={i} setIsHovering={setIsHovering} />", "<ProjectCard key={i} project={p} index={i} setIsHovering={setIsHovering} setSelectedProject={setSelectedProject} />")

# Update ProjectCard bottom button to match what user wants (they want clicks on the card to show specs)
card_footer_old = '''        <div className="overflow-hidden mt-auto">
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
        </div>'''

card_footer_new = '''        <div className="overflow-hidden mt-auto">
          <motion.button 
            onClick={() => setSelectedProject(project)}
            whileHover={{ x: 8 }}
            className="text-white font-mono text-sm flex items-center gap-4 group/btn px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 w-fit"
          >
            View Specifications <FiArrowRight className="text-indigo-400 group-hover/btn:translate-x-2 transition-transform w-5 h-5" />
          </motion.button>
        </div>'''
content = content.replace(card_footer_old, card_footer_new)


# 8. Skills Images
skills_old = '''{[{name: "Communication", icon: <FiMessageSquare/>}, {name: "Public Speaking", icon: <FiAward/>}, {name: "Creative Writing", icon: <FiCode/>}, {name: "Team Collaboration", icon: <FiLayers/>}, {name: "MS Office", icon: <FiDatabase/>}].map((skill, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 flex flex-col items-center justify-center text-center gap-4 group hover:-translate-y-2 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-500 shadow-lg">{skill.icon}</div>
                <span className="font-mono text-xs text-slate-300 tracking-wider uppercase">{skill.name}</span>
              </motion.div>
            ))}'''

skills_new = '''{[
              {name: "Communication", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Public Speaking", img: "https://images.unsplash.com/photo-1475721028314-3905f1725c63?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Creative Writing", img: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Collaboration", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Tech & MS Office", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop"}
            ].map((skill, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="relative h-40 rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group hover:-translate-y-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500">
                <img src={skill.img} alt={skill.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 mix-blend-overlay grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="font-mono text-xs text-slate-200 tracking-wider uppercase font-bold drop-shadow-md">{skill.name}</span>
                </div>
              </motion.div>
            ))}'''
content = content.replace(skills_old, skills_new)


# 9. Replace Internship and Achievements
# Internship Replacement
internship_old = '''            <TimelineNode 
              item={{ 
                title: "Content Writing Intern", 
                subtitle: "Bright Minds Media", 
                content: "Delivered high-quality content, enhanced communication strategies, and collaborated with cross-functional teams to drive brand engagement.",
                icon: <HiOutlineBriefcase className="w-6 h-6 text-indigo-400" />
              }} 
              index={0} 
              setIsHovering={setIsHovering} 
            />'''
internship_new = '''            <TimelineNode 
              item={{ 
                title: "Software Engineering Intern", 
                subtitle: "Your Next Company", 
                content: "Actively seeking opportunities to build robust systems, optimize backend architectures, and implement scalable machine learning models.",
                icon: <HiOutlineBriefcase className="w-6 h-6 text-indigo-400" />
              }} 
              index={0} 
              setIsHovering={setIsHovering} 
            />'''
content = content.replace(internship_old, internship_new)

# Achievement Replacement
achievement_old = '''          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Metric title="2023" subtitle="Dean's List" delay={0} />
            <Metric title="1st" subtitle="Extempore Winner" delay={0.1} />
            <Metric title="NSS" subtitle="Active Volunteer" delay={0.2} />
          </div>'''
achievement_new = '''          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Metric title="500+" subtitle="GitHub Contributions" delay={0} />
            <Metric title="1st" subtitle="Hackathon Excellence" delay={0.1} />
            <Metric title="OSS" subtitle="Open Source Contributor" delay={0.2} />
          </div>'''
content = content.replace(achievement_old, achievement_new)

with codecs.open('src/App.jsx', 'w', 'utf-8') as f:
    f.write(content)

print("UI Upgrades Completed Successfully!")
