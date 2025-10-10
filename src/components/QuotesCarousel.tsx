import { useQuotes } from '@/hooks/useQuotes';

export const QuotesCarousel = () => {
  const { quotes, loading, error } = useQuotes({ featured: true });

  if (loading) {
    return (
      <section className="testimonial-section">
        <div className="container">
          <div className="text-center">Loading quotes...</div>
        </div>
      </section>
    );
  }

  if (error || quotes.length === 0) {
    return null;
  }

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="section-title">
          <div className="title">Leadership Vision</div>
          <h3>
            Words that guide our<span> vision</span>
          </h3>
        </div>

        <div className="testimonial-carousel owl-carousel owl-theme">
          {quotes.map((quote) => (
            <div key={quote.id} className="testimonial-block-two">
              <div className="inner-box">
                <div className="text">{quote.quote_text}</div>
                <div className="author-post">
                  <div className="author-inner">
                    <h3>{quote.author_name}</h3>
                    <div className="designation">{quote.author_title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
