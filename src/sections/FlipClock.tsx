import { useEffect, useRef, useState, useCallback } from 'react';

interface FlipDigitProps {
  value: string;
  prevValue: string;
  label: string;
}

function FlipDigit({ value, prevValue, label }: FlipDigitProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayPrev, setDisplayPrev] = useState(prevValue);
  const [displayCurr, setDisplayCurr] = useState(value);

  useEffect(() => {
    if (value !== prevValue && prevValue !== '') {
      setDisplayPrev(prevValue);
      setDisplayCurr(value);
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flip-unit">
      <div className="flip">
        <div className="digit">
          {/* Static top (current) */}
          <div className="card card-top">
            <span className="number">{displayCurr}</span>
          </div>
          {/* Static bottom (previous) */}
          <div className="card card-bottom">
            <span className="number">{displayPrev}</span>
          </div>
          <div className="divider" />

          {/* Animated overlay during flip */}
          {isFlipping && (
            <>
              {/* Old top flipping down */}
              <div
                className="card card-top animate-flip-top"
                style={{ zIndex: 20 }}
              >
                <span className="number">{displayPrev}</span>
              </div>
              {/* New bottom flipping up */}
              <div
                className="card card-bottom animate-flip-bottom"
                style={{ zIndex: 20 }}
              >
                <span className="number">{displayCurr}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

export default function FlipClock() {
  const [time, setTime] = useState({
    days: '02',
    hours: '18',
    minutes: '45',
    seconds: '30',
  });
  const prevTimeRef = useRef(time);

  const updateClock = useCallback(() => {
    setTime((prev) => {
      prevTimeRef.current = prev;
      let d = parseInt(prev.days);
      let h = parseInt(prev.hours);
      let m = parseInt(prev.minutes);
      let s = parseInt(prev.seconds);

      s -= 1;
      if (s < 0) {
        s = 59;
        m -= 1;
      }
      if (m < 0) {
        m = 59;
        h -= 1;
      }
      if (h < 0) {
        h = 23;
        d -= 1;
      }
      if (d < 0) {
        d = 2;
        h = 18;
        m = 45;
        s = 30;
      }

      return {
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  const prev = prevTimeRef.current;

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="font-mono-tech text-xs tracking-[0.3em] mb-3"
          style={{ color: 'var(--accent)' }}
        >
          PROVISIONAMIENTO
        </p>
        <h2
          className="text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: 'var(--text)' }}
        >
          Implementación Garantizada
        </h2>
        <p
          className="text-sm sm:text-base mb-12 max-w-lg mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Cada servidor dedicado y VPN es provisionado en tiempo récord. Tu IP estará lista antes de que termine esta cuenta regresiva.
        </p>

        <div className="flip-clock-container">
          <FlipDigit value={time.days} prevValue={prev.days} label="Días" />
          <span className="text-3xl font-light" style={{ color: 'var(--border)' }}>:</span>
          <FlipDigit value={time.hours} prevValue={prev.hours} label="Horas" />
          <span className="text-3xl font-light" style={{ color: 'var(--border)' }}>:</span>
          <FlipDigit value={time.minutes} prevValue={prev.minutes} label="Minutos" />
          <span className="text-3xl font-light" style={{ color: 'var(--border)' }}>:</span>
          <FlipDigit value={time.seconds} prevValue={prev.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
}
