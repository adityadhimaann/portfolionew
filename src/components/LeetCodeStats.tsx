import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

interface LeetCodeData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

const LEETCODE_USERNAME = "adityadhimaann";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
const HACKERRANK_URL = "https://www.hackerrank.com/profile/dhimanaditya56";

// Totals on LeetCode (approximate)
const TOTAL_EASY = 850;
const TOTAL_MEDIUM = 1800;
const TOTAL_HARD = 800;

const CodingProfiles = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [stats, setStats] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const difficulties = stats
    ? [
        { label: "Easy", solved: stats.easySolved, total: TOTAL_EASY, color: "#00b8a3" },
        { label: "Medium", solved: stats.mediumSolved, total: TOTAL_MEDIUM, color: "#ffc01e" },
        { label: "Hard", solved: stats.hardSolved, total: TOTAL_HARD, color: "#ff375f" },
      ]
    : [];

  return (
    <section id="coding-profiles" className="relative py-24">
      <div className="container px-6 lg:px-12" ref={ref}>
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

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-2">
          {/* ── LeetCode Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div
              className="glass-card group relative overflow-hidden p-6 sm:p-7 cursor-pointer transition-colors hover:border-[#FFA116]/50 h-full"
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
              className="glass-card group relative overflow-hidden p-6 sm:p-7 cursor-pointer transition-colors hover:border-[#00EA64]/50 h-full flex flex-col"
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
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
