import { Clock, AlertCircle } from 'lucide-react';
import { TimeRemaining } from '../hooks/useCountdown';

interface CountdownTimerProps {
  timeRemaining: TimeRemaining;
  label: string;
  variant?: 'urgent' | 'warning';
}

export default function CountdownTimer({ timeRemaining, label, variant = 'urgent' }: CountdownTimerProps) {
  const { hours, minutes, seconds, isExpired } = timeRemaining;

  const bgColor = variant === 'urgent' ? 'bg-gradient-to-r from-red-600 to-orange-600' : 'bg-gradient-to-r from-orange-600 to-amber-600';

  if (isExpired) {
    return (
      <div className={`${bgColor} text-white px-6 py-4 rounded-xl shadow-lg`}>
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">Offer Expired</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgColor} text-white px-6 py-4 rounded-xl shadow-lg`}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <Clock className="w-5 h-5" />
        <span className="font-semibold text-sm uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold tabular-nums">{String(hours).padStart(2, '0')}</span>
          <span className="text-xs uppercase tracking-wider opacity-90">Hours</span>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold tabular-nums">{String(minutes).padStart(2, '0')}</span>
          <span className="text-xs uppercase tracking-wider opacity-90">Minutes</span>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
          <span className="text-2xl font-bold tabular-nums">{String(seconds).padStart(2, '0')}</span>
          <span className="text-xs uppercase tracking-wider opacity-90">Seconds</span>
        </div>
      </div>
    </div>
  );
}
