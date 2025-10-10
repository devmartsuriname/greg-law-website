interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface CareerTimelineProps {
  events: TimelineEvent[];
}

export const CareerTimeline = ({ events }: CareerTimelineProps) => {
  return (
    <section className="history-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="history-timeline">
              {events.map((event, index) => (
                <div key={index} className="history-block">
                  <div className="inner-box">
                    <div className="year">{event.year}</div>
                    <h4>{event.title}</h4>
                    <div className="text">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
