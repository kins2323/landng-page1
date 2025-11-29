import { useState, useEffect } from 'react';

export interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: Date): TimeRemaining {
  const initial = (() => {
    const now = Date.now();
    const difference = targetDate.getTime() - now;
    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, isExpired: false };
  })();

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(initial);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const difference = targetDate.getTime() - now;
      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeRemaining({ hours, minutes, seconds, isExpired: false });
    };
    const interval = setInterval(tick, 1000);
    tick();
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

export function use4HourLoopCountdown(): TimeRemaining {
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const stored = localStorage.getItem('scrapCountdownTarget');
    if (stored) {
      const storedDate = new Date(stored);
      if (storedDate.getTime() > new Date().getTime()) {
        return storedDate;
      }
    }
    const newTarget = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
    localStorage.setItem('scrapCountdownTarget', newTarget.toISOString());
    return newTarget;
  });

  const timeRemaining = useCountdown(targetDate);

  useEffect(() => {
    if (timeRemaining.isExpired) {
      const newTarget = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
      setTargetDate(newTarget);
      localStorage.setItem('scrapCountdownTarget', newTarget.toISOString());
    }
  }, [timeRemaining.isExpired]);

  return timeRemaining;
}
