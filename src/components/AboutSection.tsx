import { motion } from "framer-motion";
import { Code2, Server, Lightbulb } from "lucide-react";
import { useRef, useState } from "react";
import { useTilt3D } from "@/hooks/useTilt3D";
import FloatingOrbs from "./FloatingOrbs";
import prajwalPhoto from "@/assets/prajwal-photo.jpeg";

const AboutCard = ({ item, i }: { item: { icon: React.ReactNode; title: string; desc: string }; i: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(10);
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-xl p-5 group hover:neon-border transition-all duration-300"
      style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s, border-color 0.3s" }}
    >
      <div className="flex items-start gap-4">
        <span className="text-primary mt-0.5 group-hover:animate-float">{item.icon}</span>
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const cards = [
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
  ];

  return (
    <section id="about" className="section-padding relative">
      <FloatingOrbs variant="sparse" />

      <div className="max-w-6xl mx-auto relative z-10">
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
            <div
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-52 h-52 mx-auto md:mx-0 mb-4"
              style={{ perspective: "800px" }}
            >
              {/* Glow ring */}
              <div
                className="absolute inset-[-8px] rounded-full border-2 border-primary/30 animate-spin"
                style={{
                  animationDuration: "8s",
                  background: "conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.3), transparent, transparent)",
                  maskImage: "radial-gradient(circle, transparent 45%, black 46%)",
                  WebkitMaskImage: "radial-gradient(circle, transparent 45%, black 46%)",
                }}
              />
              <div
                className="relative w-full h-full rounded-full transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-2 rounded-full bg-primary/20 blur-2xl"
                  style={{ transform: "translateZ(-40px)" }}
                />
                <img
                  src={prajwalPhoto}
                  alt="Prajwal Gowda"
                  className="relative w-full h-full rounded-full object-cover border-2 border-primary/40"
                  style={{
                    transform: "translateZ(20px)",
                    boxShadow: "0 0 40px hsl(var(--primary) / 0.25), 0 20px 60px rgba(0,0,0,0.4)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    transform: "translateZ(30px)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
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
            {cards.map((item, i) => (
              <AboutCard key={i} item={item} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
