import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, MapPin, Copy, Check } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const email = "dhimanaditya56@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (!publicKey || !serviceId || !templateId) {
        // Fallback to mailto if EmailJS is not configured
        const mailtoLink = `mailto:${email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoLink;
        
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: email,
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      
      // Fallback to mailto on error
      const mailtoLink = `mailto:${email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="container px-6 py-32 lg:px-12 mx-auto" ref={ref}>
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
                      ? "-top-2.5 text-xs text-primary bg-[#050505] px-1"
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
                    ? "-top-2.5 text-xs text-primary bg-[#050505] px-1"
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
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-center"
              >
                <p className="text-sm text-green-400 font-medium">
                  ✓ Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}
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
                { label: "LeetCode", url: "https://leetcode.com/u/adityadhimaann/" },
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
    </section>
  );
};

export default Contact;
