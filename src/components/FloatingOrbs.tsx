import { motion } from "framer-motion";

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  color: "primary" | "accent";
  delay: number;
  duration: number;
}

const FloatingOrbs = ({ variant = "default" }: { variant?: "default" | "sparse" | "dense" }) => {
  const configs: Record<string, OrbConfig[]> = {
    default: [
      { size: 200, x: "10%", y: "20%", color: "primary", delay: 0, duration: 8 },
      { size: 150, x: "80%", y: "60%", color: "accent", delay: 2, duration: 10 },
      { size: 100, x: "60%", y: "10%", color: "primary", delay: 4, duration: 7 },
    ],
    sparse: [
      { size: 180, x: "85%", y: "30%", color: "primary", delay: 1, duration: 9 },
      { size: 120, x: "15%", y: "70%", color: "accent", delay: 3, duration: 11 },
    ],
    dense: [
      { size: 160, x: "5%", y: "15%", color: "primary", delay: 0, duration: 7 },
      { size: 120, x: "90%", y: "25%", color: "accent", delay: 1, duration: 9 },
      { size: 140, x: "50%", y: "75%", color: "primary", delay: 2, duration: 8 },
      { size: 80, x: "30%", y: "50%", color: "accent", delay: 3, duration: 10 },
    ],
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {configs[variant].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, hsl(var(--${orb.color}) / 0.12) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
