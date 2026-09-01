import codecs
import re

with codecs.open('src/App.jsx', 'r', 'utf-8') as f:
    content = f.read()

# 1. Update Hero Roles
content = content.replace(
    'const ROLES = ["AI/ML Engineer", "Multi-Agent Systems Architect", "Systems Builder"];',
    'const ROLES = ["AI/ML Engineer", "Multi-Agent Systems Architect", "Optimization Enthusiast"];'
)

# 2. Add Project AntiGrav back
projects_old = '''  {
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

projects_new = '''  {
    title: "GrowthOS",
    tag: "AI Marketing Suite",
    impact: "An end-to-end, execution-driven marketing automation platform built on Streamlit & Gemini AI for content repurposing and ad optimization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    specs: ["Streamlit Dashboard", "Gemini Content Engine", "Competitor Sentiment Analysis", "Automated HTML Ad Gen"],
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    borderGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    link: "https://github.com/Princevish-dev/ai-for-marketers-hackathon-vishwak",
  },
  {
    title: "Project AntiGrav",
    tag: "Agentic Control",
    impact: "Agentic AI levitation control system with adaptive feedback loops and precision algorithms.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    specs: ["C++ Core Logic", "Adaptive Feedback Loops", "Real-time State Observation", "PID Control Mechanics"],
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderGlow: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    link: "https://github.com/Princevish-dev/Portfolio",
  }
];'''
content = content.replace(projects_old, projects_new)


# 3. Update Education
education_old = '''                <h4 className="text-3xl font-serif font-bold text-white mb-2">B.Tech Engineering</h4>
                <p className="text-xl text-slate-400 font-light mb-6">Lovely Professional University</p>'''
education_new = '''                <h4 className="text-3xl font-serif font-bold text-white mb-2">B.Tech in Computer Science</h4>
                <p className="text-xl text-slate-400 font-light mb-6">2nd Year (3rd Semester) at LPU</p>'''
content = content.replace(education_old, education_new)


# 4. Update Skills
skills_old = '''{[
              {name: "Communication", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Public Speaking", img: "https://images.unsplash.com/photo-1475721028314-3905f1725c63?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Creative Writing", img: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Collaboration", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Tech & MS Office", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop"}
            ]'''
skills_new = '''{[
              {name: "Python & C++", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Gemini AI & Nemotron", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Agent Development Kit", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"}, 
              {name: "Streamlit & Docker", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=400&auto=format&fit=crop"}, 
              {name: "DSA & Optimization", img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop"}
            ]'''
content = content.replace(skills_old, skills_new)


# 5. Update Internship/Experience
experience_old = '''            <TimelineNode 
              item={{ 
                title: "Software Engineering Intern", 
                subtitle: "Your Next Company", 
                content: "Actively seeking opportunities to build robust systems, optimize backend architectures, and implement scalable machine learning models.",
                icon: <HiOutlineBriefcase className="w-6 h-6 text-indigo-400" />
              }} 
              index={0} 
              setIsHovering={setIsHovering} 
            />'''
experience_new = '''            <TimelineNode 
              item={{ 
                title: "Open Source Contributor & Builder", 
                subtitle: "GSSoC & EngageEarth", 
                content: "Actively contributing to open-source through GSSoC while architecting EngageEarth, a sustainability-focused digital impact platform bridging technology with real-world issues.",
                icon: <FiCode className="w-6 h-6 text-indigo-400" />
              }} 
              index={0} 
              setIsHovering={setIsHovering} 
            />'''
content = content.replace(experience_old, experience_new)


# 6. Update Achievements/Milestones
achievements_old = '''          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Metric title="500+" subtitle="GitHub Contributions" delay={0} />
            <Metric title="1st" subtitle="Hackathon Excellence" delay={0.1} />
            <Metric title="OSS" subtitle="Open Source Contributor" delay={0.2} />
          </div>'''
achievements_new = '''          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Metric title="Active" subtitle="GSSoC Contributor" delay={0} />
            <Metric title="Mastery" subtitle="DSA Optimization" delay={0.1} />
            <Metric title="Logical" subtitle="First-Principles" delay={0.2} />
          </div>'''
content = content.replace(achievements_old, achievements_new)


# 7. Update Strengths
strengths_old = '''            {["Adaptable", "Quick Learner", "Positive Attitude", "Problem Solver"].map((strength, i) => ('''
strengths_new = '''            {["Extreme Optimization", "First-Principles", "Builder Mindset", "Precision & Efficiency"].map((strength, i) => ('''
content = content.replace(strengths_old, strengths_new)


# 8. Update Goal text completely
goal_old = '''"MY GOAL IS TO BUILD MEANINGFUL SOFTWARE, MASTER ARTIFICIAL INTELLIGENCE, AND ENGINEER SYSTEMS THAT SOLVE REAL-WORLD PROBLEMS."'''
goal_new = '''"ARCHITECT INTELLIGENT MULTI-AGENT ECOSYSTEMS BLENDING NLP AND COMPUTER VISION. BRIDGE THE GAP BETWEEN THEORETICAL AI AND REAL-WORLD IMPACT."'''
content = content.replace(goal_old, goal_new)

with codecs.open('src/App.jsx', 'w', 'utf-8') as f:
    f.write(content)

print("Content injection completed successfully!")
