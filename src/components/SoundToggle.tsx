import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled, SOUND_ENABLED_KEY } from "@/hooks/useSound";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(isSoundEnabled);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
    window.dispatchEvent(new Event("sound-toggle"));
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
      aria-label={enabled ? "Disable sounds" : "Enable sounds"}
      title={enabled ? "Sounds ON" : "Sounds OFF"}
    >
      <AnimatePresence mode="wait">
        {enabled ? (
          <motion.div key="on" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
            <Volume2 size={16} className="text-primary" />
          </motion.div>
        ) : (
          <motion.div key="off" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
            <VolumeX size={16} />
          </motion.div>
        )}
      </AnimatePresence>
      {enabled && (
        <motion.div className="absolute inset-0 rounded-lg bg-primary/10" layoutId="sound-bg" />
      )}
    </motion.button>
  );
}
