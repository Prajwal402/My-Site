import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative h-32 overflow-hidden">
    {/* Central line */}
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-px h-full"
      style={{
        background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.2), transparent)",
      }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
    {/* Center diamond */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-primary"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 }}
      style={{
        boxShadow: "0 0 15px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.15)",
      }}
    />
    {/* Side lines */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px"
      style={{
        width: "60px",
        background: "linear-gradient(to right, hsl(var(--primary) / 0.3), transparent)",
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    />
    <motion.div
      className="absolute right-1/2 top-1/2 -translate-y-1/2 h-px"
      style={{
        width: "60px",
        background: "linear-gradient(to left, hsl(var(--primary) / 0.3), transparent)",
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    />
  </div>
);

export default SectionDivider;
