import { JobPost } from 'components/common';

import { ListingNavigation } from '../index';

const JobSubmit = props => {
  const { t } = props;

  return (
    <div className="form__section">
      <ListingNavigation t={t} active="JOB" />

      <JobPost t={t} />
    </div>
  );
};

export default JobSubmit;
