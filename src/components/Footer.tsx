import { motion } from "framer-motion";

const Footer = () => (
  <footer className="relative border-t border-border py-10 text-center overflow-hidden">
    {/* Ambient glow */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
      }}
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-sm text-muted-foreground relative z-10"
    >
      © {new Date().getFullYear()} Prajwal Gowda | Full Stack Developer
    </motion.p>
  </footer>
);

export default Footer;
