import { motion } from 'framer-motion';
import { aboutData } from '../data/portfolioData';
import { HiAcademicCap, HiCalendar, HiMapPin, HiCpuChip, HiCodeBracket } from 'react-icons/hi2';

const highlightIcons = {
  University: HiAcademicCap,
  Graduation: HiCalendar,
  Hometown: HiMapPin,
  Focus: HiCpuChip,
  'Open Source': HiCodeBracket,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
            Get to Know Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="gradient-text">{aboutData.headline}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 glass-strong p-6 sm:p-8 gradient-border"
          >
            <div className="space-y-4">
              {aboutData.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Highlights Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-3"
          >
            {aboutData.highlights.map((item, i) => {
              const Icon = highlightIcons[item.label] || HiCpuChip;
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="glass p-4 flex items-center gap-4 group cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: `rgba(6,182,212,${0.1 + i * 0.03})`,
                      border: '1px solid rgba(6,182,212,0.15)',
                    }}
                  >
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-mono">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-slate-300">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <motion.div variants={itemVariants} className="glass p-6 gradient-border">
            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
              Direction
            </p>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">What I’m building toward</h3>
            <ul className="space-y-3">
              {aboutData.goals.map((goal) => (
                <li key={goal} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                  <span className="text-cyan-400 mt-1">+</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="glass p-6 gradient-border">
            <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-3">
              Now
            </p>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Recent work</h3>
            <ul className="space-y-3">
              {aboutData.currentWork.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                  <span className="text-violet-400 mt-1">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="glass p-6 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="shrink-0">
              <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Outside the terminal</p>
              <h3 className="text-lg font-semibold text-slate-200">Curiosity has range</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {aboutData.interests.map((interest) => (
                <span key={interest} className="tech-pill">{interest}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
