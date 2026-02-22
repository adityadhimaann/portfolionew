import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, MapPin, Copy, Check } from "lucide-react";
import { LiquidOcean } from "@/components/ui/liquid-ocean";
import AnimatedButton from "@/components/ui/animated-button";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const email = "dhimanaditya56@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — integrate with backend
    alert("Message sent! (This is a demo)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative">
      <LiquidOcean className="w-full bg-black">
      <div className="container px-6 py-32 lg:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Contact</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-400">
            Have a project in mind or looking for a Full Stack Developer? Let's connect and build something great together.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-6"
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label
                  htmlFor={field.id}
                  className={`absolute left-4 transition-all duration-300 ${
                    focused === field.id || formData[field.id as keyof typeof formData]
                      ? "-top-2.5 text-xs text-primary bg-black px-1"
                      : "top-3.5 text-sm text-gray-400"
                  }`}
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors focus:border-primary"
                />
              </div>
            ))}

            <div className="relative">
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 ${
                  focused === "message" || formData.message
                    ? "-top-2.5 text-xs text-primary bg-black px-1"
                    : "top-3.5 text-sm text-gray-400"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3.5 text-white outline-none transition-colors focus:border-primary"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
            >
              <Send size={16} /> Send Message
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="space-y-8"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-white">{email}</span>
              </div>
              <motion.button
                onClick={copyEmail}
                whileTap={{ scale: 0.95 }}
                className="mt-3 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy email"}
              </motion.button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-white">Punjab, India</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Available for remote work worldwide</p>
            </div>

            {/* Social */}
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "GitHub", url: "https://github.com/adityadhimaann" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/adityadhimaann" },
                { label: "Portfolio", url: "https://www.adidev.works" },
              ].map((social) => (
                <AnimatedButton
                  key={social.label}
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:border-primary hover:text-primary"
                  onClick={() => window.open(social.url, "_blank")}
                >
                  {social.label}
                </AnimatedButton>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      </LiquidOcean>
    </section>
  );
};

export default Contact;
