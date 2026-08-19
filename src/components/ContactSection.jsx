import { motion } from 'framer-motion';
import { HiPaperAirplane } from 'react-icons/hi2';
import { socialLinks } from '../data/portfolioData';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-800/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Build Together</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            I'm actively seeking AI/ML internships and collaboration opportunities.
            Whether you're a recruiter, a fellow engineer, or an open-source maintainer —
            I'd love to connect.
          </p>
        </motion.div>

        {/* CTA Button */}
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
          >
            <HiPaperAirplane className="w-5 h-5 rotate-0" />
            Let's Connect
          </a>
        </motion.div>

        {/* Social Links */}
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
                style={{
                  '--hover-color': s.color,
                }}
                aria-label={s.name}
              >
                <Icon
                  className="w-5 h-5 text-slate-500 transition-colors group-hover:text-[var(--hover-color)]"
                />
              </a>
            );
          })}
        </motion.div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Footer */}
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
  );
}
