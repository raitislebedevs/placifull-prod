import { RealEstatePost } from 'components/common';
import { ListingNavigation } from '../index';

const RealEstateSubmit = (props) => {
  const { t } = props;

  return (
    <div className="form__section">
      <ListingNavigation t={t} active="REAL_ESTATE" />
      <RealEstatePost t={t} />
    </div>
  );
};

export default RealEstateSubmit;
