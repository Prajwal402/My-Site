import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Instagram, Phone } from "lucide-react";
import { useTilt3D } from "@/hooks/useTilt3D";
import FloatingOrbs from "./FloatingOrbs";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { ref: formRef, handleMouseMove, handleMouseLeave } = useTilt3D(6);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative">
      <FloatingOrbs variant="dense" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text-strong font-mono text-lg mr-2">05.</span>
            Get In Touch
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-primary/60 to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            I'm currently open to new opportunities. Whether you have a project idea or just want to say hi, my inbox is always open!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-sm text-muted-foreground">
            <a href="mailto:prajwalgowda17003@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={16} /> prajwalgowda17003@gmail.com
            </a>
            <a href="tel:+917899815573" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={16} /> +91 7899815573
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          ref={formRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-holographic rounded-xl p-8 hover:neon-border-strong card-3d relative overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <form onSubmit={handleSubmit} className="text-left space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block font-mono text-xs">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-secondary/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block font-mono text-xs">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-secondary/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-mono text-xs">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-secondary/50 transition-all resize-none"
                placeholder="What's on your mind?"
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitted}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 relative overflow-hidden group"
              style={{
                boxShadow: "0 0 25px hsl(var(--primary) / 0.25), 0 8px 30px hsl(var(--primary) / 0.1)",
              }}
            >
              <Send size={16} />
              {submitted ? "Sent!" : "Send Message"}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </form>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-5 mt-12"
        >
          {[
            { icon: <Github size={20} />, href: "https://github.com/Prajwal402", label: "GitHub" },
            { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/b-b-prajwal-3b1449267", label: "LinkedIn" },
            { icon: <Instagram size={20} />, href: "https://www.instagram.com/prajwalgowda736/", label: "Instagram" },
            { icon: <Mail size={20} />, href: "mailto:prajwalgowda17003@gmail.com", label: "Email" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass-holographic flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border-strong transition-all duration-300"
              aria-label={s.label}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
