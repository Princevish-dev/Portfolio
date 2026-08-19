import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { techCategories } from '../data/portfolioData';

/* ——— Single floating tech node in 3D ——— */
function TechNode3D({ name, color, index, total, radius = 3 }) {
  const ref = useRef();
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;

  const basePos = useMemo(
    () => [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ],
    [phi, theta, radius]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = basePos[0] + Math.sin(t * 0.5 + index) * 0.15;
    ref.current.position.y = basePos[1] + Math.cos(t * 0.3 + index * 2) * 0.2;
    ref.current.position.z = basePos[2] + Math.sin(t * 0.4 + index * 3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ref} position={basePos}>
        {/* Glowing sphere */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Outer glow ring */}
        <mesh>
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -0.35, 0]}
          fontSize={0.14}
          color="#94a3b8"
          anchorX="center"
          anchorY="top"
          font="https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.woff2"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

/* ——— Rotating group of all nodes ——— */
function TechGlobe() {
  const groupRef = useRef();
  const allTechs = useMemo(() => {
    const techs = [];
    techCategories.forEach((cat) => {
      cat.techs.forEach((tech) => {
        techs.push({ name: tech.name, color: cat.color });
      });
    });
    return techs;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {allTechs.map((tech, i) => (
        <TechNode3D
          key={tech.name}
          name={tech.name}
          color={tech.color}
          index={i}
          total={allTechs.length}
          radius={2.5}
        />
      ))}
    </group>
  );
}

/* ——— 2D Category cards below canvas ——— */
function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-strong p-5 sm:p-6 gradient-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color, boxShadow: `0 0 12px ${category.color}40` }}
        />
        <h3 className="text-sm font-semibold text-slate-300">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.techs.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="tech-pill"
              style={{
                borderColor: `${category.color}30`,
                background: `${category.color}10`,
                color: category.color,
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {tech.name}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ——— Main TechStack component ——— */
export default function TechStack() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-3">
            Technical Arsenal
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {/* 3D Globe Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[350px] sm:h-[420px] mb-12 canvas-container"
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#06b6d4" />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
            <TechGlobe />
          </Canvas>
        </motion.div>

        {/* 2D Category Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techCategories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
