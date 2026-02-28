import { motion } from "framer-motion";

const Footer = () => (
  <footer className="relative border-t border-border/50 py-12 text-center overflow-hidden">
    {/* Grid background */}
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
    {/* Ambient glow */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
      }}
    />
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-10 space-y-2"
    >
      <p className="text-sm text-muted-foreground">
        Designed & Built by{" "}
        <span className="text-primary font-medium">Prajwal Gowda</span>
      </p>
      <p className="text-xs text-muted-foreground/50 font-mono">
        © {new Date().getFullYear()} | Full Stack Developer
      </p>
    </motion.div>
  </footer>
);

export default Footer;
