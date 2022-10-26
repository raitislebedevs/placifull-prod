import { DepositAccount } from 'components/common';
import { Container } from 'react-bootstrap';
import { BudgetNavigation } from '../index';

const DepositAccounts = (props) => {
  const { t } = props;

  return (
    <Container className="form__section budget__container">
      <BudgetNavigation t={t} active="ACCOUNTS" />

      <DepositAccount t={t} />
    </Container>
  );
};

export default DepositAccounts;
