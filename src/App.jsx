import { lazy, Suspense, useState, useCallback } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

const TechStack = lazy(() => import('./components/TechStack'));

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <Loader onComplete={handleLoadComplete} />

      {/* Noise overlay for premium texture */}
      <div className="noise-overlay" />

      {/* Main Content */}
      <div
        className={`transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />

        <main>
          <HeroSection showBackground={loaded} />

          <div className="section-divider max-w-6xl mx-auto" />

          <AboutSection />

          <div className="section-divider max-w-6xl mx-auto" />

          <Suspense fallback={<div className="min-h-[420px]" />}>
            <TechStack />
          </Suspense>

          <div className="section-divider max-w-6xl mx-auto" />

          <ProjectsSection />

          <div className="section-divider max-w-6xl mx-auto" />

          <ContactSection />
        </main>
      </div>
    </>
  );
}
