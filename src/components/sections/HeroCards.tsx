import { Link } from 'react-router-dom';

interface HeroCard {
  icon: string;
  title: string;
  subtitle: string;
  link?: string;
}

interface HeroCardsProps {
  cards: HeroCard[];
}

export default function HeroCards({ cards }: HeroCardsProps) {
  return (
    <section className="feature-section">
      <div className="container">
        <div className="inner-container">
          <div className="clearfix">
            {cards.map((card, index) => (
              <div key={index} className="feature-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className={`big-icon ${card.icon}`}></div>
                  <div className="content">
                    <div className="icon-box">
                      <span className={`icon ${card.icon}`}></span>
                    </div>
                    <div className="title">{card.title}</div>
                    <h4>{card.subtitle}</h4>
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
