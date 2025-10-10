import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface HeroCard {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface HeroCardsProps {
  cards: HeroCard[];
}

export const HeroCards = ({ cards }: HeroCardsProps) => {
  return (
    <section className="info-section">
      <div className="auto-container">
        <div className="row">
          {cards.map((card, index) => (
            <div key={index} className="info-block col-lg-4 col-md-6 col-sm-12">
              <div className="inner-box">
                <div className="icon-box">
                  <Icon icon={card.icon} width="60" height="60" />
                </div>
                <h3>
                  <Link to={card.link}>{card.title}</Link>
                </h3>
                <div className="text">{card.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
