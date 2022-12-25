import { Loans } from 'components/common';
import { Container } from 'react-bootstrap';
import { BudgetNavigation } from '../index';

const CreditAccounts = (props) => {
  const { t } = props;

  return (
    <Container className="form__section budget__container">
      <BudgetNavigation t={t} active="LOANS" />

      <Loans t={t} />
    </Container>
  );
};

export default CreditAccounts;
