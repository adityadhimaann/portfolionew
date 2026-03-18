import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AdBanner = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } 
    }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as any;

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "3rem", opacity: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
  } as any;

  return (
    <section className="relative pt-8 pb-4 lg:pt-12 lg:pb-8 -mt-8 lg:-mt-16 z-10" ref={ref}>
      <div className="container px-6 lg:px-12 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
        >
          {/* Ambient Amber Background Glow behind the text */}
          <div className="absolute top-0 left-0 w-full md:w-[60%] h-full bg-[radial-gradient(circle_at_0%_0%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none z-0" />

          {/* Left Column - Text content */}
          <div className="flex flex-col justify-center p-10 sm:p-14 lg:p-24 w-full md:w-[50%] lg:w-[55%] z-10 relative bg-transparent backdrop-blur-sm">
            <motion.h2 
              variants={itemVariants}
              className="text-[2.5rem] sm:text-5xl lg:text-[4rem] font-sans font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            >
              Clean Code.<br />
              <span className="text-zinc-300">Fast Delivery.</span>
            </motion.h2>
            
            <motion.div 
              variants={lineVariants}
              className="h-1.5 bg-gradient-to-r from-primary to-amber-300 mb-8 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]" 
            />
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-zinc-400 max-w-sm lg:max-w-md font-medium leading-[1.6]"
            >
              A reliable freelance partner for startups seeking premium technical execution and growth.
            </motion.p>
          </div>

          {/* Right Column - Image with Parallax wrapper */}
          <div className="w-full md:w-[50%] lg:w-[45%] relative min-h-[350px] md:min-h-[450px] overflow-hidden">
            <img
              src="/adidevworks.jpeg"
              alt="Aditya Dhiman"
              className="absolute inset-0 w-full h-full object-cover object-top sm:object-[center_15%]"
              loading="lazy"
            />
            {/* Richer Gradients for seamless cinematic blending */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent hidden md:block z-10" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent md:hidden z-10" />
            {/* Edge vignette on the right side for deeper mood */}
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a]/50 to-transparent hidden md:block z-10" />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AdBanner;
