import { GameModeProps } from "../BaseGameShell";

interface MatchingModeProps extends GameModeProps {
  bg?: string;
  objects?: string[];
}

export default function MatchingMode(_props: MatchingModeProps) { return null; }
