import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative h-24 overflow-hidden">
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-px h-full"
      style={{
        background: "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4), transparent)",
      }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.4 }}
      style={{
        boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.2)",
      }}
    />
  </div>
);

export default SectionDivider;
