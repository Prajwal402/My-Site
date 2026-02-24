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
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-lg">{skill.icon}</span>
        {skill.name}
      </span>
      <span className="text-xs text-primary font-mono">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        style={{
          boxShadow: "0 0 10px hsl(var(--primary) / 0.4)",
        }}
      />
    </div>
  </motion.div>
);

const TiltCard = ({ group, gi }: { group: typeof skillGroups[0]; gi: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(10);
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
        className="glass rounded-xl p-6 hover:neon-border transition-all duration-300 h-full"
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s, border-color 0.3s" }}
      >
        <h3 className="font-heading font-semibold text-lg text-primary mb-6">
          {group.title}
        </h3>
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text font-mono text-lg mr-2">02.</span>
            Skills & Technologies
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-10" />
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
