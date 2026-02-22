import { useTextScramble } from "@/hooks/useTextScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const ScrambleText = ({ text, className = "" }: ScrambleTextProps) => {
  const { display, scramble, reset } = useTextScramble(text);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </span>
  );
};

export default ScrambleText;
