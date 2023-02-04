import { useState } from 'react';
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

function CategoryData(props) {
  const {
    showModal,
    handleModalClose,
    headerText,
    submitText,
    cancelText,
    theme
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => isExpanded => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
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
        <div>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<MdOutlineExpandMore />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Food</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography>Fruits & Vegitables</Typography>
              </div>
              <div>
                <Typography>Fruits & Vegitables</Typography>
              </div>

              <Row>
                <Col xl={12} lg={12} sm={12} xs={12}>
                  <div
                    onClick={() => processCategories('income')}
                    className="button__container"
                  >
                    <div className="button_action category">
                      Add sub-category
                    </div>
                  </div>
                </Col>
              </Row>
            </AccordionDetails>
          </Accordion>
        </div>
        <Row>
          <Col xl={12} lg={12} sm={12} xs={12}>
            <div
              onClick={() => processCategories('income')}
              className="button__container"
            >
              <div className="button_action income">Add category</div>
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

export default CategoryData;
