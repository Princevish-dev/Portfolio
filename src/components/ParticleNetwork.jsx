import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ——— Particle Network Globe ——— */
function ParticleGlobe({ count = 180 }) {
  const meshRef = useRef();
  const linesRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Detect mobile for reduced particle count
  const isMobile = viewport.width < 6;
  const particleCount = isMobile ? 90 : count;

  // Generate sphere-distributed particles
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const radius = isMobile ? 2.5 : 3.5;

    const cyanColor = new THREE.Color('#06b6d4');
    const violetColor = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for even coverage
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.8 + Math.random() * 0.4);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random velocity for subtle animation
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      // Gradient color based on position
      const t = (pos[i * 3 + 1] / radius + 1) * 0.5;
      const mixedColor = cyanColor.clone().lerp(violetColor, t);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, [particleCount, isMobile]);

  // Line connections (computed each frame for dynamic effect)
  const linePositions = useMemo(
    () => new Float32Array(particleCount * particleCount * 0.1 * 6),
    [particleCount]
  );
  const lineColors = useMemo(
    () => new Float32Array(particleCount * particleCount * 0.1 * 6),
    [particleCount]
  );

  // Track mouse
  useFrame((state) => {
    const { pointer } = state;
    mouseRef.current.x = pointer.x * 2;
    mouseRef.current.y = pointer.y * 2;

    if (!meshRef.current) return;

    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array;
    const radius = isMobile ? 2.5 : 3.5;

    // Animate particles
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      posArray[idx] += velocities[idx];
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2];

      // Keep within sphere bounds
      const dist = Math.sqrt(
        posArray[idx] ** 2 +
        posArray[idx + 1] ** 2 +
        posArray[idx + 2] ** 2
      );
      if (dist > radius * 1.3 || dist < radius * 0.6) {
        velocities[idx] *= -1;
        velocities[idx + 1] *= -1;
        velocities[idx + 2] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    // Slow auto-rotation + mouse influence
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.x =
      THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseRef.current.y * 0.15, 0.02);
    meshRef.current.rotation.y +=
      (mouseRef.current.x * 0.05 - meshRef.current.rotation.y) * 0.005;

    // Update lines
    if (!linesRef.current) return;
    const maxDist = isMobile ? 1.2 : 1.0;
    let lineIndex = 0;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < maxDist && lineIndex < linePositions.length / 6) {
          const li = lineIndex * 6;
          linePositions[li] = posArray[i * 3];
          linePositions[li + 1] = posArray[i * 3 + 1];
          linePositions[li + 2] = posArray[i * 3 + 2];
          linePositions[li + 3] = posArray[j * 3];
          linePositions[li + 4] = posArray[j * 3 + 1];
          linePositions[li + 5] = posArray[j * 3 + 2];

          const alpha = 1 - d / maxDist;
          lineColors[li] = 0.024 * alpha;
          lineColors[li + 1] = 0.714 * alpha;
          lineColors[li + 2] = 0.831 * alpha;
          lineColors[li + 3] = 0.545 * alpha;
          lineColors[li + 4] = 0.361 * alpha;
          lineColors[li + 5] = 0.965 * alpha;

          lineIndex++;
        }
      }
    }

    // Zero out remaining positions
    for (let i = lineIndex * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.035}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ——— Wrapper Component ——— */
export default function ParticleNetwork() {
  return (
    <div className="absolute inset-0 canvas-container">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleGlobe />
      </Canvas>
    </div>
  );
}
