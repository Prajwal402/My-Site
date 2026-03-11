import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FolderOpen, Mail, Sparkles } from "lucide-react";

const HeroBackground3D = lazy(() => import("./HeroBackground3D"));

const roles = ["Full Stack Developer", "React Engineer", "Backend Developer", "Problem Solver"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden scanline">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroBackground3D />
      </Suspense>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Cinematic ambient layers */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[250px] pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 80%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-holographic text-primary font-mono text-xs tracking-[0.3em] uppercase border border-primary/15">
            <Sparkles size={12} className="animate-pulse" />
            Hello, I'm
            <Sparkles size={12} className="animate-pulse" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Prajwal</span>{" "}
          <span className="gradient-text-shimmer">Gowda</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-10 mb-8"
        >
          <span className="text-xl md:text-2xl text-muted-foreground font-mono">
            {"// "}
            <span className="text-primary/80">{text}</span>
            <span className="border-r-2 border-primary animate-blink ml-0.5" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          I build scalable, performant, and beautiful web applications from frontend to backend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.a
            href="#projects"
            className="group flex items-center gap-2.5 px-9 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm relative overflow-hidden"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              boxShadow: "0 0 40px hsl(var(--primary) / 0.35), 0 15px 50px hsl(var(--primary) / 0.2)",
            }}
          >
            <FolderOpen size={18} />
            View Projects
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.a>
          <motion.a
            href="#contact"
            className="flex items-center gap-2.5 px-9 py-4 rounded-xl glass-holographic text-foreground font-semibold text-sm hover:neon-border-strong transition-all duration-300"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={18} />
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-primary/50" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
