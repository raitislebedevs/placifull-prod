import { SectionHeading } from 'components/common';

const About = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="left-section__about">
      <SectionHeading className="about__heading">
        {t('real-estate-detail:about.heading')}
      </SectionHeading>
      <div className="about__description">{listingItem?.description}</div>
    </div>
  );
};

export default About;
