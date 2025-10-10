import { useEffect, useRef, useState } from 'react';

interface MetricsCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export const MetricsCounter = ({ value, label, suffix = '' }: MetricsCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={counterRef} className="counter-block">
      <div className="inner-box">
        <div className="count-box">
          <span className="count-text" data-speed="3000" data-stop={value}>
            {count}
          </span>
          {suffix && <span className="suffix">{suffix}</span>}
        </div>
        <div className="counter-title">{label}</div>
      </div>
    </div>
  );
};
