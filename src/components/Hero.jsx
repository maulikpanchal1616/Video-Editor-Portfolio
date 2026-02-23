import { motion } from "framer-motion";
import { useEffect, useRef } from "react";


export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    };

    hero.addEventListener("mousemove", handleMouseMove);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      
      {/* 🎬 Cursor Glow Background */}
      <div className="hero-cursor-glow"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="hero-badge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎬 Professional Video Editor
        </motion.span>

        <h1>
          Turning <span>Ideas</span> into
          <br /> Cinematic <span>Stories</span>
        </h1>

        <p>
          I help brands, creators, and businesses grow with
          high-impact video editing and visual storytelling.
        </p>

        <div className="hero-buttons">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            View My Work
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            Hire Me
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}