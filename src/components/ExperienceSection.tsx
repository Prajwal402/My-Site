import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

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

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text font-mono text-lg mr-2">04.</span>
            Experience & Journey
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-12" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary neon-glow z-10 mt-1.5" />

              {/* Content */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <div className="glass rounded-xl p-5 hover:neon-border transition-all duration-300">
                  <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    <span className="text-primary">
                      {item.type === "work" ? (
                        <Briefcase size={16} />
                      ) : (
                        <GraduationCap size={16} />
                      )}
                    </span>
                    <span className="text-xs font-mono text-primary">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
