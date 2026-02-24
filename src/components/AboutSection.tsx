import { motion } from "framer-motion";
import { Code2, Server, Lightbulb } from "lucide-react";
import prajwalPhoto from "@/assets/prajwal-photo.jpeg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text font-mono text-lg mr-2">01.</span>
            About Me
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative w-48 h-48 mx-auto md:mx-0 mb-4">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              <img
                src={prajwalPhoto}
                alt="Prajwal Gowda"
                className="relative w-48 h-48 rounded-full object-cover border-2 border-primary/40 shadow-[0_0_30px_hsl(185_100%_50%/0.2)]"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate Full Stack Developer with a strong foundation in both frontend and backend technologies. 
              I love transforming complex problems into simple, elegant, and intuitive solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With experience across the entire development stack — from crafting pixel-perfect UIs with React.js to 
              building robust APIs with Node.js and Python — I bring a holistic approach to every project I work on.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, I'm exploring new technologies, contributing to open-source, or deepening 
              my understanding of system design and scalable architectures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-4"
          >
            {[
              {
                icon: <Code2 size={22} />,
                title: "Frontend Craft",
                desc: "Building responsive, accessible, and performant user interfaces with modern frameworks.",
              },
              {
                icon: <Server size={22} />,
                title: "Backend Architecture",
                desc: "Designing RESTful APIs, managing databases, and implementing secure authentication systems.",
              },
              {
                icon: <Lightbulb size={22} />,
                title: "Problem Solving",
                desc: "Breaking down complex challenges into clean, maintainable, and testable solutions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass rounded-xl p-5 group hover:neon-border transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-primary mt-0.5 group-hover:animate-float">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
