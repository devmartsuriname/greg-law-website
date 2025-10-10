interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface CareerTimelineProps {
  events: TimelineEvent[];
}

export default function CareerTimeline({ events }: CareerTimelineProps) {
  return (
    <section className="feature-section-two">
      <div className="container">
        <div className="inner-container">
          <div className="row clearfix">
            {events.map((event, index) => (
              <div key={index} className="feature-block-two col-lg-4 col-md-6 col-sm-12">
                <div className="fill-line"></div>
                <div className="inner-box">
                  <div className="year">{event.year}</div>
                  <h3>{event.title}</h3>
                  <div className="text">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
