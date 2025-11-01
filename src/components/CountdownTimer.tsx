import { Clock, AlertCircle, Zap, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TimeRemaining } from '../hooks/useCountdown';

interface CountdownTimerProps {
  timeRemaining: TimeRemaining;
  label: string;
  variant?: 'urgent' | 'warning';
}

const PulseAnimation = () => (
  <style>{`
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 92, 53, 0.4), 0 0 40px rgba(255, 92, 53, 0.2); }
      50% { box-shadow: 0 0 30px rgba(255, 92, 53, 0.6), 0 0 60px rgba(255, 92, 53, 0.3); }
    }
    @keyframes slide-in {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes flip {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }
    .pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    .slide-in {
      animation: slide-in 0.6s ease-out;
    }
  `}</style>
);

export default function CountdownTimer({ timeRemaining, label, variant = 'urgent' }: CountdownTimerProps) {
  const { hours, minutes, seconds, isExpired } = timeRemaining;
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 300);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  if (isExpired) {
    return (
      <>
        <PulseAnimation />
        <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-6 rounded-2xl shadow-2xl border-2 border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-2xl"></div>
          <div className="relative flex items-center justify-center gap-3">
            <AlertCircle className="w-6 h-6 animate-pulse" />
            <span className="font-bold text-lg tracking-wide">Offer Expired</span>
          </div>
        </div>
      </>
    );
  }

  const isUrgent = hours < 1;
  const urgentClass = isUrgent ? 'pulse-glow' : '';

  return (
    <>
      <PulseAnimation />
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#ff5c35] via-[#ff7a5c] to-[#ff4520] text-white px-8 py-8 rounded-3xl shadow-2xl border-2 border-[#ff5c35] ${urgentClass}`}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1))] bg-[length:40px_40px] animate-pulse opacity-20"></div>

        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff5c35] to-[#ff4520] rounded-3xl opacity-30 blur-xl -z-10"></div>

        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              {isUrgent && (
                <>
                  <Flame className="w-5 h-5 text-yellow-300 animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-200">URGENT</span>
                </>
              )}
              {!isUrgent && (
                <>
                  <Clock className="w-5 h-5" />
                </>
              )}
            </div>
          </div>

          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-white/90 mb-4 drop-shadow-lg">
            {label}
          </h3>

          <div className="flex items-center justify-center gap-1 md:gap-2">
            <div className={`flex flex-col items-center bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 min-w-[80px] border border-white/30 hover:bg-white/30 transition-all ${showFlash ? 'bg-white/40 scale-110' : ''} slide-in`}>
              <span className="text-4xl font-black tabular-nums drop-shadow-lg">{String(hours).padStart(2, '0')}</span>
              <span className="text-xs font-bold uppercase tracking-wider opacity-95 mt-1">Hours</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-black text-white/80">:</span>
            </div>

            <div className={`flex flex-col items-center bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 min-w-[80px] border border-white/30 hover:bg-white/30 transition-all ${showFlash ? 'bg-white/40 scale-110' : ''} slide-in`}>
              <span className="text-4xl font-black tabular-nums drop-shadow-lg">{String(minutes).padStart(2, '0')}</span>
              <span className="text-xs font-bold uppercase tracking-wider opacity-95 mt-1">Minutes</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-black text-white/80">:</span>
            </div>

            <div className={`flex flex-col items-center bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 min-w-[80px] border border-white/30 hover:bg-white/30 transition-all ${showFlash ? 'bg-white/40 scale-110' : ''} slide-in`}>
              <span className="text-4xl font-black tabular-nums drop-shadow-lg">{String(seconds).padStart(2, '0')}</span>
              <span className="text-xs font-bold uppercase tracking-wider opacity-95 mt-1\">Seconds</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/20 text-center">
          <p className="text-xs font-bold text-white/80 uppercase tracking-wider drop-shadow-lg">
            {isUrgent ? 'Last hour to secure your spot!' : 'Hurry, spots filling up fast'}
          </p>
        </div>
      </div>
    </>
  );
}
