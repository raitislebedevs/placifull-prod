import { SubPageHeading } from 'components/common';
import weekDays from 'components//fields/weekDays';

const ContactTimes = (props) => {
  const { t, listingItem } = props;
  const contactHoursLabel = weekDays(t);
  return (
    <div className="right-section__contact-times">
      <SubPageHeading className="contact-times__heading text-center">
        {t('real-estate-detail:contact-times.heading')}
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
                t('real-estate-detail:contact-form.not-specified')
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactTimes;
