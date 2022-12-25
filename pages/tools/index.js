import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  HeroTerms,
  MortgageCalculator,
  SalaryCalculator
} from 'components/pages/tools';
import { toolOptions } from 'components//pages/tools/Hero/Constants/toolOptions';
import { useState } from 'react';

const UserBoard = props => {
  const { t } = props;
  const filters = toolOptions(t);
  const [activeItem, setActiveItem] = useState(filters[0]);

  return (
    <div className="termsPage-container main-container">
      <Head>
        <title>{t('tools:title')}</title>
        <meta
          name="keywords"
          content="mortgage calculator, interest calculator, amortization schedule"
        />
      </Head>
      {/* <HeroTerms
        filters={filters}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        t={t}
      />
      <>
        {(activeItem.filter === 'mortgage' || !activeItem.filter) && (
          <MortgageCalculator t={t} />
        )}
        {(activeItem.filter === 'salary' || !activeItem.filter) && (
          <SalaryCalculator t={t} />
        )}
      </> */}
    </div>
  );
};

UserBoard.getInitialProps = async () => ({
  namespacesRequired: ['tools', 'common', 'navbar', 'footer', 'error']
});

UserBoard.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(UserBoard);
