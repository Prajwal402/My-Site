import { motion } from "framer-motion";
import { Code2, Server, Lightbulb } from "lucide-react";
import { useRef, useState } from "react";
import { useTilt3D } from "@/hooks/useTilt3D";
import FloatingOrbs from "./FloatingOrbs";
import prajwalPhoto from "@/assets/prajwal-photo.jpeg";

const AboutCard = ({ item, i }: { item: { icon: React.ReactNode; title: string; desc: string }; i: number }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt3D(12);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.15 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-holographic rounded-xl p-5 group hover:neon-border-strong card-3d h-full"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            {item.icon}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
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
    setTilt({ x: y * -25, y: x * 25 });
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
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text-strong font-mono text-lg mr-2">01.</span>
            About Me
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-primary/60 to-transparent mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* 3D Photo */}
            <div
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-56 h-56 mx-auto md:mx-0 mb-6"
              style={{ perspective: "1000px" }}
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-[-12px] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.4), transparent, hsl(var(--accent) / 0.3), transparent)",
                  maskImage: "radial-gradient(circle, transparent 44%, black 45%, black 48%, transparent 49%)",
                  WebkitMaskImage: "radial-gradient(circle, transparent 44%, black 45%, black 48%, transparent 49%)",
                }}
              />
              {/* Inner rotating ring */}
              <motion.div
                className="absolute inset-[-4px] rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "conic-gradient(from 180deg, transparent, hsl(var(--accent) / 0.3), transparent, hsl(var(--primary) / 0.2), transparent)",
                  maskImage: "radial-gradient(circle, transparent 46%, black 47%, black 49%, transparent 50%)",
                  WebkitMaskImage: "radial-gradient(circle, transparent 46%, black 47%, black 49%, transparent 50%)",
                }}
              />
              <div
                className="relative w-full h-full rounded-full transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Deep shadow layer */}
                <div
                  className="absolute inset-4 rounded-full bg-primary/15 blur-3xl"
                  style={{ transform: "translateZ(-60px)" }}
                />
                {/* Photo */}
                <img
                  src={prajwalPhoto}
                  alt="Prajwal Gowda"
                  className="relative w-full h-full rounded-full object-cover border-2 border-primary/30"
                  style={{
                    transform: "translateZ(25px)",
                    boxShadow: "0 0 50px hsl(var(--primary) / 0.2), 0 25px 80px rgba(0,0,0,0.5)",
                  }}
                />
                {/* Glass overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    transform: "translateZ(35px)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)",
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
            className="grid gap-5"
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
