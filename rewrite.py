import codecs

with codecs.open('src/App.jsx', 'r', 'utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '{/* --- SECTION 2: INTERACTIVE TIMELINE --- */}' in line:
        start_idx = i
    if '{/* --- FOOTER CTA --- */}' in line:
        end_idx = i

if start_idx != -1 and end_idx != -1:
    new_sections = """        {/* --- SECTION 2: MY EDUCATION --- */}
        <section id="education" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">02. My Education</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Academic Foundation</h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-white/[0.1] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h4 className="text-3xl font-serif font-bold text-white mb-2">B.Tech Engineering</h4>
                <p className="text-xl text-slate-400 font-light mb-6">Lovely Professional University</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-sm shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                  <FaGraduationCap className="w-5 h-5" /> CGPA: 8.7/10
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-right">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">03. My Skills</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Core Competencies</h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[{name: "Communication", icon: <FiMessageSquare/>}, {name: "Public Speaking", icon: <FiAward/>}, {name: "Creative Writing", icon: <FiCode/>}, {name: "Team Collaboration", icon: <FiLayers/>}, {name: "MS Office", icon: <FiDatabase/>}].map((skill, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 flex flex-col items-center justify-center text-center gap-4 group hover:-translate-y-2 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-500 shadow-lg">{skill.icon}</div>
                <span className="font-mono text-xs text-slate-300 tracking-wider uppercase">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: MY INTERNSHIP EXPERIENCE --- */}
        <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">04. My Internship Experience</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Professional Journey</h3>
          </motion.div>
          <div className="relative pl-8 md:pl-0 mt-20">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-400/20 to-transparent -translate-x-1/2" />
            <TimelineNode 
              item={{ 
                title: "Content Writing Intern", 
                subtitle: "Bright Minds Media", 
                content: "Delivered high-quality content, enhanced communication strategies, and collaborated with cross-functional teams to drive brand engagement.",
                icon: <HiOutlineBriefcase className="w-6 h-6 text-indigo-400" />
              }} 
              index={0} 
              setIsHovering={setIsHovering} 
            />
          </div>
        </section>

        {/* --- SECTION 5: MY PROJECT --- */}
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-right">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">05. My Project</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Featured Work</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} setIsHovering={setIsHovering} />)}
          </div>
        </section>

        {/* --- SECTION 6: MY ACHIEVEMENTS --- */}
        <section id="achievements" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">06. My Achievements</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">Milestones</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Metric title="2023" subtitle="Dean's List" delay={0} />
            <Metric title="1st" subtitle="Extempore Winner" delay={0.1} />
            <Metric title="NSS" subtitle="Active Volunteer" delay={0.2} />
          </div>
        </section>

        {/* --- SECTION 7: MY STRENGTHS --- */}
        <section id="strengths" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] uppercase mb-4">07. My Strengths</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">What Drives Me</h3>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {["Adaptable", "Quick Learner", "Positive Attitude", "Problem Solver"].map((strength, i) => (
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
            <h2 className="text-sm font-mono text-emerald-400 tracking-[0.4em] uppercase mb-8 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">08. My Goal</h2>
            <p className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 leading-tight drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] max-w-5xl mx-auto">
              "Become a top 1% AI/ML engineer by 2028."
            </p>
          </motion.div>
        </section>
"""
    new_content = "".join(lines[:start_idx]) + new_sections + "".join(lines[end_idx:])
    with codecs.open('src/App.jsx', 'w', 'utf-8') as f:
        f.write(new_content)
    print("Replaced sections successfully!")
else:
    print(f"Error: Could not find section markers. start_idx={start_idx}, end_idx={end_idx}")
