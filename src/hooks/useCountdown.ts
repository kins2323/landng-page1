import { useState, useEffect } from 'react';

export interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: Date): TimeRemaining {
  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isExpired: false };
  };

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}

export function use6HourLoopCountdown(): TimeRemaining {
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const stored = localStorage.getItem('intakeCountdownTarget');
    if (stored) {
      const storedDate = new Date(stored);
      if (storedDate.getTime() > new Date().getTime()) {
        return storedDate;
      }
    }
    const newTarget = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
    localStorage.setItem('intakeCountdownTarget', newTarget.toISOString());
    return newTarget;
  });

  const timeRemaining = useCountdown(targetDate);

  useEffect(() => {
    if (timeRemaining.isExpired) {
      const newTarget = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
      setTargetDate(newTarget);
      localStorage.setItem('intakeCountdownTarget', newTarget.toISOString());
    }
  }, [timeRemaining.isExpired]);

  return timeRemaining;
}
