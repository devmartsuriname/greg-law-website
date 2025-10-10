import { useEffect, useRef, useState } from 'react';

interface Metric {
  icon: string;
  count: number;
  suffix?: string;
  title: string;
}

interface MetricsCounterProps {
  metrics: Metric[];
  variant?: 'style-two' | 'style-three';
}

export default function MetricsCounter({ metrics, variant = 'style-two' }: MetricsCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Trigger counter animations
            const counters = entry.target.querySelectorAll('.count-text');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-stop') || '0');
              const speed = parseInt(counter.getAttribute('data-speed') || '2000');
              const increment = target / (speed / 16);
              let current = 0;

              const updateCount = () => {
                current += increment;
                if (current < target) {
                  counter.textContent = Math.floor(current).toString();
                  requestAnimationFrame(updateCount);
                } else {
                  counter.textContent = target.toString();
                }
              };

              updateCount();
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  if (variant === 'style-three') {
    return (
      <section className="counter-section" ref={sectionRef}>
        <div className="container">
          <div className="fact-counter style-three">
            <div className="row clearfix">
              {metrics.map((metric, index) => (
                <div key={index} className="column counter-column col-lg-3 col-md-6 col-sm-12">
                  <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                    <div className="count-outer count-box">
                      <div className={`icon ${metric.icon}`}></div>
                      <span className="count-text" data-speed="3000" data-stop={metric.count}>
                        0
                      </span>
                      {metric.suffix && <span>{metric.suffix}</span>}
                      <div className="counter-title">{metric.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="fact-counter style-two" ref={sectionRef}>
      <div className="container">
        <div className="row clearfix">
          {metrics.map((metric, index) => (
            <div key={index} className="column counter-column col-lg-4 col-md-6 col-sm-12">
              <div className="inner wow fadeInLeft" data-wow-delay={`${index * 300}ms`} data-wow-duration="1500ms">
                <div className="count-outer count-box">
                  <span className="count-text" data-speed="2000" data-stop={metric.count}>
                    0
                  </span>
                  {metric.suffix && <span>{metric.suffix}</span>}
                  <div className="counter-title">{metric.title}</div>
                  {metric.icon && <div className="text">{metric.icon}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
