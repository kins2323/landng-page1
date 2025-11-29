import { Clock } from 'lucide-react';
import { TimeRemaining } from '../hooks/useCountdown';

interface SmallCountdownTimerProps {
  timeRemaining: TimeRemaining;
  label?: string;
  bgClass?: string; // background class, e.g., 'bg-amber-700'
  textClass?: string; // text color class, e.g., 'text-white'
}

export default function SmallCountdownTimer({ timeRemaining, label = "Module removed in", bgClass = 'bg-amber-600', textClass = 'text-white' }: SmallCountdownTimerProps) {
  const { hours, minutes, seconds, isExpired } = timeRemaining;

  if (isExpired) {
    return (
      <div className={`inline-flex items-center gap-2 p-2 rounded-md text-xs ${bgClass} ${textClass}`}>
        <Clock className="w-3 h-3" />
        <span className="font-semibold">Removed</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 p-2 rounded-md text-xs ${bgClass} ${textClass}`}>
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3" />
        <span className="font-medium">{label}</span>
      </div>
      <div className="font-mono font-semibold">
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}
