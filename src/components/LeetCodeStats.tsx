import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, GitFork, Users, Star, BookOpen } from "lucide-react";
import { SiLeetcode, SiHackerrank, SiGithub } from "react-icons/si";

interface LeetCodeData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
  created_at: string;
}

const LEETCODE_USERNAME = "adityadhimaann";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
const HACKERRANK_URL = "https://www.hackerrank.com/profile/dhimanaditya56";
const GITHUB_USERNAME = "adityadhimaann";
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

// Totals on LeetCode (approximate)
const TOTAL_EASY = 850;
const TOTAL_MEDIUM = 1800;
const TOTAL_HARD = 800;

const CodingProfiles = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [stats, setStats] = useState<LeetCodeData | null>(null);
  const [ghStats, setGhStats] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ghLoading, setGhLoading] = useState(true);

  useEffect(() => {
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          solvedProblem: data.solvedProblem,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
        });
        setLoading(false);
      })
      .catch(() => {
        setStats({ solvedProblem: 225, easySolved: 106, mediumSolved: 104, hardSolved: 15 });
        setLoading(false);
      });

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        setGhStats(data);
        setGhLoading(false);
      })
      .catch(() => {
        setGhStats({ public_repos: 40, followers: 1, following: 2, name: "Aditya", bio: "An innovative and creative Developer", created_at: "2023-09-05T05:35:59Z" });
        setGhLoading(false);
      });
  }, []);

  const difficulties = stats
    ? [
        { label: "Easy", solved: stats.easySolved, total: TOTAL_EASY, color: "#00b8a3" },
        { label: "Medium", solved: stats.mediumSolved, total: TOTAL_MEDIUM, color: "#ffc01e" },
        { label: "Hard", solved: stats.hardSolved, total: TOTAL_HARD, color: "#ff375f" },
      ]
    : [];

  // 3D code background canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio > 1 ? 1.5 : 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio > 1 ? 1.5 : 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const codeChars = [
      "{}", "=>", "()", "[]", "//", "/*", "*/", ";", "&&", "||",
      "fn", "if", "01", "++", "!=", "==", "<>", "::", "->", "$$",
    ];

    // Particles in 3D space
    const particles: { x: number; y: number; z: number; vx: number; vy: number; vz: number; char: string; life: number }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.7) * 2500, // Shifted higher linearly to fill the darker top space
        z: Math.random() * 1500 + 100,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.6 - 0.2,
        vz: (Math.random() - 0.5) * 0.4,
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        life: Math.random() * Math.PI * 2,
      });
    }

    // Grid lines for perspective floor
    const gridLines: { x1: number; z1: number; x2: number; z2: number }[] = [];
    for (let i = -16; i <= 16; i++) {
        gridLines.push({ x1: i * 150, z1: 100, x2: i * 150, z2: 1800 });
    }
    for (let z = 100; z <= 1800; z += 150) {
        gridLines.push({ x1: -2400, z1: z, x2: 2400, z2: z });
    }

    const project = (x: number, y: number, z: number, cx: number, cy: number) => {
      const fov = 500;
      const scale = fov / (fov + z);
      return { sx: cx + x * scale, sy: cy + y * scale, scale };
    };

    let time = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      const cx = w / 2;
      const cy = h / 2 + 380;

      // Draw perspective grid
      ctx.lineWidth = 1.0;
      for (const line of gridLines) {
        const p1 = project(line.x1, 350, line.z1 + ((time * 120) % 150), cx, cy);
        const p2 = project(line.x2, 350, line.z2 + ((time * 120) % 150), cx, cy);
        const avgZ = (line.z1 + line.z2) / 2 + ((time * 120) % 150);
        const avgX = Math.abs((line.x1 + line.x2) / 2);
        
        // Fade out based on depth (Z) and sideways edges (X) for equal, smooth shadow blending
        const zAlpha = Math.max(0, 0.5 - avgZ * 0.00015);
        const xAlpha = Math.max(0, 1 - (avgX / 2000));
        const alpha = zAlpha * xAlpha;
        
        ctx.strokeStyle = `rgba(255, 200, 50, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      // Update and draw particles
      ctx.font = "12px 'JetBrains Mono', 'Fira Code', monospace";
      ctx.textAlign = "center";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.life += 0.012;

        // Wrap around
        if (p.z < 50) p.z = 1600;
        if (p.z > 1700) p.z = 100;
        if (p.y < -1700) { p.y = 800; p.char = codeChars[Math.floor(Math.random() * codeChars.length)]; }
        if (Math.abs(p.x) > 1550) p.vx *= -1;

        const proj = project(p.x, p.y, p.z, cx, cy);
        const alpha = Math.min(1.0, (0.8 / (p.z * 0.002)) * (0.6 + 0.4 * Math.sin(p.life)));
        const size = Math.max(14, 28 * proj.scale);

        ctx.fillStyle = `rgba(255, 230, 120, ${alpha})`;
        ctx.font = `${size}px 'JetBrains Mono', 'Fira Code', monospace`;
        ctx.fillText(p.char, proj.sx, proj.sy);
      }

      // Draw faint connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 300) {
            const pa = project(a.x, a.y, a.z, cx, cy);
            const pb = project(b.x, b.y, b.z, cx, cy);
            const lineAlpha = (1 - dist / 300) * 0.4;
            
            ctx.strokeStyle = `rgba(255, 200, 80, ${lineAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(pa.sx, pa.sy);
            ctx.lineTo(pb.sx, pb.sy);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="coding-profiles" className="relative py-24 overflow-hidden">

      {/* 3D code canvas background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
      />

      <div className="container relative px-6 lg:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Problem Solving</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Consistent problem-solving across top competitive programming platforms.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* ── LeetCode Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div
              className="glass-card border-primary/20 group relative overflow-hidden p-6 sm:p-7 cursor-pointer transition-colors hover:border-primary/60 h-full"
              onClick={() => window.open(LEETCODE_URL, "_blank")}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFA116]/15 border border-[#FFA116]/30">
                    <SiLeetcode style={{ fontSize: 20, color: "#FFA116" }} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm sm:text-base">@{LEETCODE_USERNAME}</p>
                    <p className="text-xs text-muted-foreground">LeetCode</p>
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-[#FFA116] transition-colors" />
                </motion.div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <motion.div
                    className="h-7 w-7 rounded-full border-2 border-[#FFA116] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                </div>
              ) : stats ? (
                <>
                  {/* Total solved */}
                  <div className="text-center mb-5">
                    <motion.p
                      className="text-4xl sm:text-5xl font-display font-bold gradient-text"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    >
                      {stats.solvedProblem}
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-1">Problems Solved</p>
                  </div>

                  {/* Difficulty bars */}
                  <div className="space-y-3">
                    {difficulties.map((d, i) => (
                      <div key={d.label}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full" style={{ background: d.color }} />
                            <span className="text-xs text-muted-foreground">{d.label}</span>
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {d.solved}<span className="text-muted-foreground">/{d.total}</span>
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: d.color }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${(d.solved / d.total) * 100}%` } : {}}
                            transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom stats */}
                  <div className="mt-5 flex items-center justify-center gap-5 border-t border-border pt-4">
                    <div className="text-center">
                      <p className="text-base font-display font-bold" style={{ color: "#00b8a3" }}>{stats.easySolved}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Easy</p>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-base font-display font-bold" style={{ color: "#ffc01e" }}>{stats.mediumSolved}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Medium</p>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-base font-display font-bold" style={{ color: "#ff375f" }}>{stats.hardSolved}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Hard</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>

          {/* ── HackerRank Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <div
              className="glass-card border-primary/20 group relative overflow-hidden p-6 sm:p-7 cursor-pointer transition-colors hover:border-primary/60 h-full flex flex-col"
              onClick={() => window.open(HACKERRANK_URL, "_blank")}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00EA64]/15 border border-[#00EA64]/30">
                    <SiHackerrank style={{ fontSize: 20, color: "#00EA64" }} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm sm:text-base">@dhimanaditya56</p>
                    <p className="text-xs text-muted-foreground">HackerRank</p>
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-[#00EA64] transition-colors" />
                </motion.div>
              </div>

              {/* Badges */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { skill: "Problem Solving", stars: 5, color: "#00EA64" },
                    { skill: "Java", stars: 4, color: "#f89820" },
                    { skill: "Python", stars: 3, color: "#3776AB" },
                    { skill: "SQL", stars: 3, color: "#e38d13" },
                    { skill: "C++", stars: 3, color: "#00599C" },
                    { skill: "30 Days of Code", stars: 5, color: "#00EA64" },
                  ].map((badge, i) => (
                    <motion.div
                      key={badge.skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                      className="rounded-lg border border-border bg-muted/30 p-3 text-center hover:border-[#00EA64]/40 transition-colors"
                    >
                      <p className="text-xs font-medium text-foreground mb-1.5">{badge.skill}</p>
                      <div className="flex justify-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <svg
                            key={idx}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill={idx < badge.stars ? badge.color : "none"}
                            stroke={idx < badge.stars ? badge.color : "hsl(var(--muted-foreground))"}
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-5 border-t border-border pt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  View full profile & badges on <span className="text-[#00EA64] font-medium">HackerRank</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── GitHub Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <div
              className="glass-card border-primary/20 group relative overflow-hidden p-6 sm:p-7 cursor-pointer transition-colors hover:border-primary/60 h-full flex flex-col"
              onClick={() => window.open(GITHUB_URL, "_blank")}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f6fc]/10 border border-[#f0f6fc]/20">
                    <SiGithub style={{ fontSize: 20, color: "#f0f6fc" }} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm sm:text-base">@{GITHUB_USERNAME}</p>
                    <p className="text-xs text-muted-foreground">GitHub</p>
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-white transition-colors" />
                </motion.div>
              </div>

              {ghLoading ? (
                <div className="flex items-center justify-center py-6 flex-1">
                  <motion.div
                    className="h-7 w-7 rounded-full border-2 border-white/50 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                </div>
              ) : ghStats ? (
                <>
                  {/* Bio */}
                  {ghStats.bio && (
                    <p className="text-xs text-muted-foreground italic mb-5">"{ghStats.bio}"</p>
                  )}

                  {/* Stats grid */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {[
                      { label: "Repositories", value: ghStats.public_repos, icon: <BookOpen size={14} />, color: "#58a6ff" },
                      { label: "Followers", value: ghStats.followers, icon: <Users size={14} />, color: "#f78166" },
                      { label: "Following", value: ghStats.following, icon: <Users size={14} />, color: "#d2a8ff" },
                      { label: "Since", value: new Date(ghStats.created_at).getFullYear(), icon: <Star size={14} />, color: "#e3b341" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                        className="rounded-lg border border-border bg-muted/30 p-3 text-center"
                      >
                        <div className="flex justify-center mb-1.5" style={{ color: stat.color }}>{stat.icon}</div>
                        <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contribution graph image */}
                  <div className="mt-4 rounded-lg overflow-hidden border border-border">
                    <img
                      src={`https://ghchart.rshah.org/f59e0b/${GITHUB_USERNAME}`}
                      alt="GitHub Contribution Graph"
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-4 border-t border-border pt-3 text-center">
                    <p className="text-xs text-muted-foreground">
                      View all repos on <span className="text-white font-medium">GitHub</span>
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
