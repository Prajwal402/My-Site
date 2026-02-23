import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, integrate with a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            <span className="neon-text font-mono text-lg mr-2">05.</span>
            Get In Touch
          </h2>
          <div className="w-20 h-0.5 bg-primary/40 mx-auto mb-6" />
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            I'm currently open to new opportunities. Whether you have a project idea or just want to say hi, my inbox is always open!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-xl p-8 text-left space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_30px_hsl(185_100%_50%/0.4)] transition-all duration-300 disabled:opacity-50"
          >
            <Send size={16} />
            {submitted ? "Sent!" : "Send Message"}
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-10"
        >
          {[
            { icon: <Github size={20} />, href: "https://github.com/Prajwal402", label: "GitHub" },
            { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/b-b-prajwal-3b1449267", label: "LinkedIn" },
            { icon: <Mail size={20} />, href: "mailto:prajwalgowda17003@gmail.com", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
