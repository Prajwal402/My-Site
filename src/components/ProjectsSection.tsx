import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { useTilt3D } from "@/hooks/useTilt3D";
import FloatingOrbs from "./FloatingOrbs";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  category: "Frontend" | "Backend" | "Full Stack";
}

const projects: Project[] = [
  {
    title: "Ganesh Fruit Juice Centre",
    description:
      "A fully responsive website built for a local fruit juice business, featuring an attractive menu display, online ordering interface, and modern UI design.",
    tech: ["React.js", "CSS3", "JavaScript"],
    github: "https://github.com/Prajwal402/Ganesh-Fruit-Juice-Centre",
    live: "https://ganesh-fruit-juice-centre.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Banking System Simulation (Vibe Coding)",
    description:
      "A full-stack banking application with user authentication, account management, transaction history, and real-time balance updates.",
    tech: ["Python", "MySQL", "React.js", "Node.js"],
    github: "https://github.com/prajwalgowda",
    live: "https://trusted-vault-app.vercel.app/",
    category: "Full Stack",
  },
  {
    title: "Netflix Clone UI (Vibe Coding)",
    description:
      "A pixel-perfect Netflix clone with dynamic content fetching from TMDB API, trailer playback, and responsive category rows.",
    tech: ["React.js", "CSS3", "TMDB API"],
    github: "https://github.com/prajwalgowda",
    live: "https://flick-lover-ui-c6kd.vercel.app/",
    category: "Frontend",
  },
  {
    title: "Vibe Coding - LMS",
    description:
      "A Learning Management System with course management, student enrollment, and interactive learning features for an engaging educational experience.",
    tech: ["React.js", "Node.js", "MongoDB"],
    github: "https://github.com/Prajwal402/LMS",
    live: "https://lms-liard-beta.vercel.app/",
    category: "Full Stack",
  },
];

const filters = ["All", "Frontend", "Backend", "Full Stack"] as const;

const ProjectCard = ({ project, i }: { project: Project; i: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(14);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-holographic rounded-xl p-7 group hover:neon-border-strong card-3d h-full relative overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">{project.category}</span>
            <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors mt-1.5">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2.5">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary/40 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] transition-all duration-300">
              <Github size={16} />
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary/40 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] transition-all duration-300">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-[11px] font-mono px-3 py-1.5 rounded-md bg-primary/8 text-primary/80 border border-primary/10">
                {t}
              </span>
            ))}
          </div>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary">
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding relative spotlight-section">
      <FloatingOrbs variant="dense" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text-strong font-mono text-lg mr-2">03.</span>
            Projects
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-primary/60 to-transparent mb-8" />
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-sm px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(185_100%_50%/0.35)]"
                  : "glass-holographic text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} i={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
