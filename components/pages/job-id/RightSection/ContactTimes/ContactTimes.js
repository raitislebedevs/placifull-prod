import weekDays from 'components//fields/weekDays';
import { SubPageHeading } from 'components/common';

const ContactTimes = (props) => {
  const { t, listingItem } = props;
  const contactHoursLabel = weekDays(t);

  return (
    <div className="right-section__contact-times">
      <SubPageHeading className="contact-times__heading text-center">
        {t('job-common:contact-times.label')}
      </SubPageHeading>
      <div className="contact-times__items">
        {contactHoursLabel?.map((item) => (
          <div className="items__wrapper" key={item.key}>
            <div className="wrapper__label">{item.label}</div>
            <div className="wrapper__value">
              {listingItem?.contactHours[`${item.key}_open`] &&
              listingItem?.contactHours[`${item.key}_close`] ? (
                <>
                  {listingItem?.contactHours[`${item.key}_open`]} -{' '}
                  {listingItem?.contactHours[`${item.key}_close`]}
                </>
              ) : (
                t('job-common:contact-times.not-specified')
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactTimes;
