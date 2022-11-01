import { useState } from 'react';
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';

function ExpenseModal(props) {
  const {
    showModal,
    handleModalClose,
    processSubmit,
    headerText,
    submitText,
    cancelText,
    theme
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await processSubmit();
    setIsLoading(false);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
    }
  }));

  const BorderOverSpentLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#f44336' : '#f44336'
    }
  }));

  const BorderWarningLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#ffb74d' : '#ffb74d'
    }
  }));

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
        <Modal.Title>
          <div> {headerText}</div>
          <div>
            <BorderLinearProgress variant="determinate" value={14.35} />
          </div>
          <div>
            <BorderWarningLinearProgress variant="determinate" value={87.25} />
          </div>
          <div>
            <BorderOverSpentLinearProgress variant="determinate" value={100} />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>30 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 7.46</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>27 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 15.15</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>17 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.13</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col>4 September 2022</Col>
              <Col>
                <div className="action_container">
                  <span className="label">EUR 5.56</span>
                  <span className="icon">
                    <AiOutlineEdit />
                  </span>
                </div>
              </Col>
            </Row>
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

export default ExpenseModal;
