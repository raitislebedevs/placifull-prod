import { SectionHeading } from 'components/common';
import { Markup } from 'interweave';

const About = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="left-section__about">
      <SectionHeading className="about__heading">
        {t('real-estate-detail:about.heading')}
      </SectionHeading>
      <div className="about__description">
        <Markup content={listingItem?.description} />
      </div>
    </div>
  );
};

export default About;
