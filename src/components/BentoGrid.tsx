import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock, Code2, GitBranch, Layers, Zap, MapPin, Mail, ExternalLink, Star,
} from "lucide-react";
import { SiTypescript, SiExpress, SiMongodb, SiReact, SiNodedotjs } from "react-icons/si";

const SKILLS = [
  { name: "React.js", level: 92, color: "hsl(193 95% 68%)" },
  { name: "Node.js", level: 90, color: "hsl(120 61% 50%)" },
  { name: "TypeScript", level: 88, color: "hsl(211 78% 60%)" },
  { name: "Java", level: 85, color: "hsl(38 92% 55%)" },
  { name: "MongoDB", level: 87, color: "hsl(120 45% 45%)" },
  { name: "Python", level: 80, color: "hsl(210 65% 55%)" },
];

const TECH_STACK = [
  { name: "React", icon: <SiReact className="text-blue-600" style={{ fontSize: 20 }} /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-600" style={{ fontSize: 20 }} /> },
  { name: "Express", icon: <SiExpress className="text-black" style={{ fontSize: 20 }} /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-700" style={{ fontSize: 20 }} /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" style={{ fontSize: 20 }} /> },
  { name: "Java", icon: <i className="fa-brands text-red-200 fa-java"></i> },
  { name: "Tailwind", icon: <i className="fa-brands text-red-400 fa-css text-blue-600" ></i> },
  { name: "Docker", icon: <i className="fa-brands fa-docker" style={{ color: "rgb(26, 46, 194)" }}></i> },
];

const CODE_LINES = [
  { text: "const developer = {", indent: 0, color: "text-foreground" },
  { text: '  name: "Aditya Kumar",', indent: 0, color: "text-green-400" },
  { text: '  role: "Full Stack Dev",', indent: 0, color: "text-green-400" },
  { text: "  passion: Infinity,", indent: 0, color: "text-amber-400" },
  { text: "  available: true,", indent: 0, color: "text-blue-400" },
  { text: "};", indent: 0, color: "text-foreground" },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = time.getHours() % 12;
  const m = time.getMinutes();
  const s = time.getSeconds();
  const hDeg = (h / 12) * 360 + (m / 60) * 30;
  const mDeg = (m / 60) * 360 + (s / 60) * 6;
  const sDeg = (s / 60) * 360;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--primary))"
            strokeWidth="2" strokeDasharray="3 10" opacity="0.4" />
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <circle key={i} cx={50 + 40 * Math.cos(angle)} cy={50 + 40 * Math.sin(angle)}
                r="1.5" fill="hsl(var(--muted-foreground))" />
            );
          })}
          {/* Hour hand */}
          <line x1="50" y1="50" x2="50" y2="22"
            stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round"
            style={{ transformOrigin: "50px 50px", transform: `rotate(${hDeg}deg)` }} />
          {/* Minute hand */}
          <line x1="50" y1="50" x2="50" y2="16"
            stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round"
            style={{ transformOrigin: "50px 50px", transform: `rotate(${mDeg}deg)` }} />
          {/* Second hand */}
          <line x1="50" y1="55" x2="50" y2="12"
            stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"
            style={{ transformOrigin: "50px 50px", transform: `rotate(${sDeg}deg)`, transition: "transform 0.1s" }} />
          <circle cx="50" cy="50" r="2.5" fill="hsl(var(--primary))" />
        </svg>
      </div>
      <div className="text-center">
        <p className="font-mono text-2xl font-bold text-foreground">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Punjab, India</p>
        <p className="text-xs text-muted-foreground">
          {time.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}

function TypingCode() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [visible, setVisible] = useState<string[]>([]);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    if (lineIdx >= CODE_LINES.length) {
      const reset = setTimeout(() => {
        setLineIdx(0); setCharIdx(0); setVisible([]);
      }, 2500);
      return () => clearTimeout(reset);
    }
    const line = CODE_LINES[lineIdx].text;
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCharIdx((c) => c + 1);
        setVisible((v) => {
          const updated = [...v];
          updated[lineIdx] = line.slice(0, charIdx + 1);
          return updated;
        });
      }, 40 + Math.random() * 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 180);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  return (
    <div className="font-mono text-xs leading-relaxed space-y-0.5">
      {CODE_LINES.map((line, i) => (
        <div key={i} className={`${line.color} ${i > lineIdx ? "opacity-0" : ""}`}>
          {visible[i] ?? ""}
          {i === lineIdx && <span className={`inline-block w-0.5 h-3.5 bg-primary ml-px align-middle ${blink ? "opacity-100" : "opacity-0"}`} />}
        </div>
      ))}
    </div>
  );
}

function SkillsRadar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2.5">
      {SKILLS.map((skill, i) => (
        <div key={skill.name} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{skill.name}</span>
            <span className="text-foreground font-medium">{skill.level}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: skill.color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${skill.level}%` } : {}}
              transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 50;
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-display font-bold gradient-text">{count}{suffix}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function BentoCard({ i, className, children, onClick, hoverScale }: {
  i: number;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverScale?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={hoverScale ? { scale: 1.02 } : undefined}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bento" className="relative py-24">
      <div className="container px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Overview</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
            At a <span className="gradient-text">Glance</span>
          </h2>
          <img
            src={"/adiXdevbanner.png"}
            alt="Aditya X Dev Banner"
            className="mx-auto my-4 w-[100%] h-[100%] rounded-lg shadow-lg"
            
          />
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Everything you need to know, distilled into one beautiful dashboard.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 auto-rows-[180px]">

          {/* Live Clock — tall left */}
          <BentoCard i={0} className="glass-card col-span-1 row-span-2 flex flex-col items-center justify-center p-5 hover:border-primary/50 transition-colors">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Clock size={12} /> Live Clock
            </div>
            <LiveClock />
          </BentoCard>

          {/* Availability */}
          <BentoCard i={1} className="glass-card col-span-1 flex flex-col justify-between p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
              <motion.div
                className="h-2.5 w-2.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <div>
              <p className="text-lg font-display font-bold text-foreground">Available</p>
              <p className="text-xs text-muted-foreground">Open for projects</p>
            </div>
            <p className="text-xs font-medium text-primary">Q1 2026 · Remote OK</p>
          </BentoCard>

          {/* Stats row */}
          <BentoCard i={2} className="glass-card col-span-2 flex items-center justify-around p-5">
            <StatCounter value={2} label="Years Exp." suffix="+" />
            <div className="h-10 w-px bg-border" />
            <StatCounter value={15} label="Projects" suffix="+" />
            <div className="h-10 w-px bg-border" />
            <StatCounter value={5} label="Certifications" suffix="+" />
            <div className="h-10 w-px bg-border" />
            <StatCounter value={15} label="Top in 25K" suffix="" />
          </BentoCard>

          {/* Code snippet */}
          <BentoCard i={3} className="glass-card col-span-2 row-span-2 flex flex-col p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                  <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">portfolio.ts</span>
            </div>
            <div className="flex-1 overflow-hidden bg-muted/50 rounded-lg p-3">
              <TypingCode />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Code2 size={11} /> TypeScript
            </div>
          </BentoCard>

          {/* Skills */}
          <BentoCard i={4} className="glass-card col-span-2 row-span-2 flex flex-col p-5">
            <div className="mb-4 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Zap size={12} /> Skill Proficiency
            </div>
            <SkillsRadar />
          </BentoCard>

          {/* Tech Stack */}
          <BentoCard i={5} className="glass-card col-span-1 row-span-1 flex flex-col p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Layers size={11} /> Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.slice(0, 6).map((t) => (
                <motion.div
                  key={t.name}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="flex items-center gap-1 rounded-lg border border-border bg-muted px-2 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* Contact CTA */}
          <BentoCard i={6} className="glass-card col-span-1 flex flex-col justify-between p-5 group cursor-pointer hover:border-primary/60 transition-all"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            hoverScale={true}>
            <div className="flex items-center justify-between">
              <Mail size={18} className="text-primary" />
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ExternalLink size={12} className="text-muted-foreground" />
              </motion.div>
            </div>
            <div>
              <p className="text-sm font-display font-bold text-foreground">Let's Talk</p>
              <p className="text-xs text-muted-foreground">dhimanaditya56@gmail.com</p>
            </div>
          </BentoCard>

          {/* Location */}
          <BentoCard i={7} className="glass-card col-span-1 flex flex-col justify-between p-5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} className="text-primary" /> Location
            </div>
            <div>
              <p className="text-base font-display font-bold text-foreground">Punjab</p>
              <p className="text-xs text-muted-foreground">India</p>
              <p className="mt-1 text-xs text-primary">Remote Worldwide ✓</p>
            </div>
          </BentoCard>

          {/* GitHub */}
          <BentoCard i={8} className="glass-card col-span-1 flex flex-col justify-between p-5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <GitBranch size={12} className="text-primary" /> GitHub Activity
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: 35 }).map((_, idx) => {
                const intensity = (idx * 37 % 100) / 100;
                return (
                  <motion.div
                    key={idx}
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{
                      background: intensity > 0.7
                        ? "hsl(var(--primary))"
                        : intensity > 0.4
                        ? "hsl(var(--primary) / 0.5)"
                        : "hsl(var(--muted))",
                    }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2 + (idx % 3), delay: (idx % 5) * 0.2 }}
                  />
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">500+ contributions this year</p>
          </BentoCard>

          {/* Star rating */}
          <BentoCard i={9} className="glass-card col-span-1 flex flex-col justify-between p-5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx + 0.5 }}>
                  <Star size={14} className="text-primary fill-primary" />
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">5.0</p>
              <p className="text-xs text-muted-foreground">OCI Certified Developer</p>
              <p className="text-xs text-muted-foreground">Top 15 in Gromo-AWS</p>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
