import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
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
    title: "Banking System Simulation",
    description:
      "A full-stack banking application with user authentication, account management, transaction history, and real-time balance updates.",
    tech: ["Python", "MySQL", "React.js", "Node.js"],
    github: "https://github.com/prajwalgowda",
    live: "#",
    category: "Full Stack",
  },
  {
    title: "Netflix Clone UI",
    description:
      "A pixel-perfect Netflix clone with dynamic content fetching from TMDB API, trailer playback, and responsive category rows.",
    tech: ["React.js", "CSS3", "TMDB API"],
    github: "https://github.com/prajwalgowda",
    live: "#",
    category: "Frontend",
  },
  {
    title: "Weather App",
    description:
      "Real-time weather tracking with auto-location detection, 5-day forecasts, and dynamic background themes based on conditions.",
    tech: ["JavaScript", "HTML5", "OpenWeather API"],
    github: "https://github.com/prajwalgowda",
    live: "#",
    category: "Frontend",
  },
  {
    title: "AI Chatbot Integration",
    description:
      "An intelligent chatbot powered by API integration with natural language processing, conversation history, and smart replies.",
    tech: ["Node.js", "Python", "React.js", "API"],
    github: "https://github.com/prajwalgowda",
    live: "#",
    category: "Full Stack",
  },
];

const filters = ["All", "Frontend", "Backend", "Full Stack"] as const;

const ProjectCard = ({ project }: { project: Project }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(10);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-xl p-6 group hover:neon-border transition-all duration-300 h-full"
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s, border-color 0.3s" }}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-3">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-primary">{t}</span>
          ))}
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
    <section id="projects" className="section-padding relative">
      <FloatingOrbs variant="dense" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text font-mono text-lg mr-2">03.</span>
            Projects
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-8" />
        </motion.div>

        {/* 3D filter buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(185_100%_50%/0.3)]"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
