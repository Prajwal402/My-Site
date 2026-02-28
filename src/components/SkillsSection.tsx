import { motion } from "framer-motion";
import { useTilt3D } from "@/hooks/useTilt3D";
import FloatingOrbs from "./FloatingOrbs";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", level: 95, icon: "🌐" },
      { name: "CSS3", level: 90, icon: "🎨" },
      { name: "JavaScript (ES6+)", level: 90, icon: "⚡" },
      { name: "React.js", level: 85, icon: "⚛️" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python", level: 80, icon: "🐍" },
      { name: "Node.js", level: 82, icon: "🟢" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", level: 78, icon: "🗄️" },
    ],
  },
];

const SkillBar = ({ skill, delay }: { skill: Skill; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="group"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
        <span className="text-lg">{skill.icon}</span>
        {skill.name}
      </span>
      <span className="text-xs text-primary font-mono opacity-70 group-hover:opacity-100 transition-opacity">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary/80 overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
        className="h-full rounded-full relative"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
          boxShadow: "0 0 15px hsl(var(--primary) / 0.4), 0 0 30px hsl(var(--primary) / 0.1)",
        }}
      >
        <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-white/30 to-transparent rounded-full" />
      </motion.div>
    </div>
  </motion.div>
);

const TiltCard = ({ group, gi }: { group: typeof skillGroups[0]; gi: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(12);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: gi * 0.15 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-holographic rounded-xl p-6 hover:neon-border-strong card-3d h-full"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-accent" />
          <h3 className="font-heading font-semibold text-lg text-primary">
            {group.title}
          </h3>
        </div>
        <div className="space-y-5">
          {group.skills.map((skill, si) => (
            <SkillBar key={skill.name} skill={skill} delay={si * 0.1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <FloatingOrbs variant="default" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text-strong font-mono text-lg mr-2">02.</span>
            Skills & Technologies
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-primary/60 to-transparent mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <TiltCard key={group.title} group={group} gi={gi} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
