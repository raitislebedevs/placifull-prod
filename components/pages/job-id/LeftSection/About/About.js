import { SectionHeading } from 'components/common';

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
            {listingItem?.positionDescription}
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
            {listingItem?.positionRequirements}
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
            {listingItem?.positionBenefits}
          </div>
        </>
      )}
    </div>
  );
};

export default About;
