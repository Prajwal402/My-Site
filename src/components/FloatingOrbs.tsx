import { motion } from "framer-motion";

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  color: "primary" | "accent";
  delay: number;
  duration: number;
  blur: number;
}

const FloatingOrbs = ({ variant = "default" }: { variant?: "default" | "sparse" | "dense" }) => {
  const configs: Record<string, OrbConfig[]> = {
    default: [
      { size: 250, x: "8%", y: "15%", color: "primary", delay: 0, duration: 12, blur: 80 },
      { size: 180, x: "78%", y: "55%", color: "accent", delay: 3, duration: 15, blur: 60 },
      { size: 120, x: "55%", y: "8%", color: "primary", delay: 5, duration: 10, blur: 50 },
    ],
    sparse: [
      { size: 220, x: "82%", y: "25%", color: "primary", delay: 1, duration: 14, blur: 70 },
      { size: 160, x: "12%", y: "65%", color: "accent", delay: 4, duration: 16, blur: 55 },
    ],
    dense: [
      { size: 200, x: "3%", y: "10%", color: "primary", delay: 0, duration: 11, blur: 70 },
      { size: 150, x: "88%", y: "20%", color: "accent", delay: 1.5, duration: 13, blur: 55 },
      { size: 180, x: "45%", y: "70%", color: "primary", delay: 3, duration: 12, blur: 65 },
      { size: 100, x: "25%", y: "45%", color: "accent", delay: 5, duration: 15, blur: 45 },
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
            background: `radial-gradient(circle, hsl(var(--${orb.color}) / 0.1) 0%, hsl(var(--${orb.color}) / 0.03) 40%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
          }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 20, -15, 8, 0],
            scale: [1, 1.15, 0.9, 1.08, 1],
            opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
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
