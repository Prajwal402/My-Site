import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTilt3D } from "@/hooks/useTilt3D";
import FloatingOrbs from "./FloatingOrbs";

const timeline = [
  {
    type: "learning",
    title: "Started Self-Learning Web Development",
    period: "2022",
    description:
      "Dove into HTML, CSS, and JavaScript fundamentals. Built first static websites and fell in love with frontend development.",
  },
  {
    type: "project",
    title: "Full Stack Projects & API Integrations",
    period: "2023",
    description:
      "Built real-world projects including a banking simulation app and Netflix clone. Learned React.js, Node.js, and database management with MySQL.",
  },
  {
    type: "learning",
    title: "Backend & Authentication Mastery",
    period: "2023 - 2024",
    description:
      "Deepened backend skills with Python and Node.js. Implemented JWT authentication, RESTful APIs, and complex database schemas.",
  },
  {
    type: "work",
    title: "Freelance & Internship Projects",
    period: "2024 - Present",
    description:
      "Working on real client projects, building scalable full-stack applications, and collaborating with cross-functional teams.",
  },
];

const TimelineCard = ({ item, i }: { item: typeof timeline[0]; i: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(10);

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      className={`relative flex items-start gap-6 mb-14 ${
        i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot with pulse rings */}
      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10 mt-2">
        <div className="w-3.5 h-3.5 rounded-full bg-primary relative" style={{
          boxShadow: "0 0 15px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.2)",
        }}>
          <motion.div
            className="absolute inset-[-6px] rounded-full border border-primary/30"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          />
          <motion.div
            className="absolute inset-[-12px] rounded-full border border-primary/15"
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 + 0.5 }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
          i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
        }`}
      >
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-holographic rounded-xl p-6 hover:neon-border-strong card-3d relative overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className={`flex items-center gap-2.5 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
            <span className="p-1.5 rounded-md bg-primary/10 text-primary">
              {item.type === "work" ? <Briefcase size={14} /> : <GraduationCap size={14} />}
            </span>
            <span className="text-xs font-mono text-primary/80">{item.period}</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding relative">
      <FloatingOrbs variant="sparse" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text-strong font-mono text-lg mr-2">04.</span>
            Experience & Journey
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-primary/60 to-transparent mb-12" />
        </motion.div>

        <div className="relative">
          {/* Glowing vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.1), transparent)",
            }}
          />

          {timeline.map((item, i) => (
            <TimelineCard key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
