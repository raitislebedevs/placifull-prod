import { SectionHeading } from 'components/common';
import { Markup } from 'interweave';

const About = (props) => {
  const { t, listingItem } = props;

  return (
    <div className="left-section__about">
      {listingItem?.positionDescription && (
        <>
          <SectionHeading className="about__heading">
            {t('job-detail:about.description')}
          </SectionHeading>
          <div className="about__description">
            <Markup content={listingItem?.positionDescription} />
          </div>{' '}
        </>
      )}
      {listingItem?.positionRequirements && (
        <>
          <SectionHeading className="about__heading">
            {' '}
            {t('job-detail:about.requirements')}
          </SectionHeading>
          <div className="about__description">
            <Markup content={listingItem?.positionRequirements} />
          </div>
        </>
      )}
      {listingItem?.positionBenefits && (
        <>
          <SectionHeading className="about__heading">
            {' '}
            {t('job-detail:about.benefits')}
          </SectionHeading>
          <div className="about__description">
            <Markup content={listingItem?.positionBenefits} />
          </div>
        </>
      )}
    </div>
  );
};

export default About;
