import { useState } from 'react';
import { Row, Col, Form, Modal, Button, Spinner } from 'react-bootstrap';
import { CurrencyInput } from '../index';
import {
  AiOutlineEdit,
  AiOutlineUserAdd,
  AiOutlineUserDelete
} from 'react-icons/ai';

import { MdAddchart } from 'react-icons/md';

function AccountsSettingsModal(props) {
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
    inputValues
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingCCY, setIsEditingCCY] = useState(false);

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
      className="account__modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>Account currency</Col>
              <Col>
                {isEditingCCY ? (
                  <Form.Group>
                    <CurrencyInput
                      handleOnChange={handleOnChange}
                      setCurrency={setSubmitCurrency}
                      currencyId={'budgetCurrency'}
                      initialSelect={inputValues?.budgetCurrency}
                      isMandatory={true}
                    />
                  </Form.Group>
                ) : (
                  <div className="action_container">
                    <span className="label">
                      {inputValues?.budgetCurrency || 'ALL'}
                    </span>
                    <span className="icon">
                      <AiOutlineEdit />
                    </span>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>Accounts</Col>
              <Col>
                <div className="action_container">
                  <span className="label">4</span>
                  <span className="action">
                    <div className="icon">
                      <MdAddchart />
                    </div>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>Linked users</Col>
              <Col>
                <div className="action_container">
                  <span className="label">John Doe</span>

                  <span className="action">
                    <div className="icon">
                      <AiOutlineUserAdd />
                    </div>
                    <div className="icon">
                      <AiOutlineUserDelete />
                    </div>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>Managed users</Col>
              <Col>
                <div className="action_container">
                  <span className="label">John Doe Junior</span>
                  <span className="action">
                    <div className="icon">
                      <AiOutlineUserAdd />
                    </div>
                    <div className="icon">
                      <AiOutlineUserDelete />
                    </div>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={6} lg={6} sm={12} xs={12}>
            <div className="button__container">
              <div className="button_action category">Categories</div>
            </div>
          </Col>
          <Col xl={6} lg={6} sm={12} xs={12}>
            <div className="button__container">
              <div className="button_action category">Sub categories</div>
            </div>
          </Col>
          <Col xl={12} lg={12} sm={12} xs={12}>
            <div className="button__container">
              <div className="button_action budget">Master budget</div>
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

export default AccountsSettingsModal;
