import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="tilt-card relative rounded-2xl cursor-pointer"
        style={{
          perspective: '1000px',
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${isHovered ? project.borderColor : 'rgba(255,255,255,0.06)'}`,
            transition: 'border-color 0.3s ease',
          }}
        >
          {/* Top accent gradient bar */}
          <div
            className={`h-1 w-full bg-gradient-to-r ${project.accentColor}`}
          />

          {/* Glow overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{
              opacity: isHovered ? 0.06 : 0,
              background: `radial-gradient(circle at 50% 0%, ${project.borderColor}, transparent 70%)`,
            }}
          />

          <div className="tilt-card-inner p-6 sm:p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-2xl mb-2 block">{project.emoji}</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-200 mb-1">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  {project.tagline}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isHovered ? 0 : -45, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
                className="mt-1"
              >
                <HiArrowUpRight className="w-5 h-5 text-slate-600" />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Impact */}
            <div className="glass p-3 rounded-lg mb-5">
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
                Impact
              </p>
              <p className="text-sm text-slate-300 font-medium">
                {project.impact}
              </p>
            </div>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
