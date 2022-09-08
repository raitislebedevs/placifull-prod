import { TransportPost } from 'components/common';
import { ListingNavigation } from '../index';

const TransportSubmit = (props) => {
  const { t } = props;

  return (
    <div className="form__section">
      <ListingNavigation t={t} active="TRANSPORT" />
      <TransportPost t={t} />
    </div>
  );
};

export default TransportSubmit;
