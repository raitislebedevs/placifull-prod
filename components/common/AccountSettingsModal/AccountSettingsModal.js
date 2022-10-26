import { useState } from 'react';
import { Row, Col, Form, Modal, Button, Spinner } from 'react-bootstrap';
import { CurrencyInput } from '../index';

function AccountSettingsModal(props) {
  const {
    showModal,
    handleModalClose,
    processSubmit,
    headerText,
    submitText,
    cancelText,
    theme,
    handleOnChange,
    setSubmitCurrency,
    inputValues,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await processSubmit();
    setIsLoading(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      size="md"
      backdrop="static"
      centered
      className="delete-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}>
            <Form.Group>
              <CurrencyInput
                handleOnChange={handleOnChange}
                setCurrency={setSubmitCurrency}
                currencyId={'budgetCurrency'}
                initialSelect={inputValues?.budgetCurrency}
                isMandatory={true}
              />
            </Form.Group>
          </Col>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}></Col>
          <Col xl={2} lg={2} md={4} sm={6} xs={6}>
            <div className="button__container">
              <Button variant="info">Transfer</Button>
            </div>
          </Col>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}>
            <div className="button__container">
              <Button variant="info">Reocurring exp.</Button>
            </div>
          </Col>
          <Col xl={12} lg={12} md={12} sm={6} xs={6}>
            <div className="button__container">
              <Button variant="info">Import csv...</Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => handleModalClose()}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant={`${theme === 'green' ? 'success' : 'primary'}`}
          onClick={() => handleSubmit()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" />
              {submitText}
            </>
          ) : (
            submitText
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AccountSettingsModal;
